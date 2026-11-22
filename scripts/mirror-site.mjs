import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://theleadbrix.in";
const outputRoot = path.resolve("public");

const pages = new Map([
  ["/", "mirror/index.html"],
  ["/about.php", "mirror/about.html"],
  ["/service.php", "mirror/service.html"],
  ["/pricing.php", "mirror/pricing.html"],
  ["/contact.php", "mirror/contact.html"],
  ["/industries.php", "mirror/industries.html"],
  ["/meeting.php", "mirror/meeting.html"],
  ["/thank-you.php", "mirror/thank-you.html"],
  ["/sitemap.php", "mirror/sitemap.html"],
]);

const downloaded = new Map();

function cleanSegment(value) {
  return value
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "resource";
}

function localPathFor(url) {
  if (url.origin === origin) {
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    if (pathname.endsWith("/")) pathname += "index.html";
    return pathname.replace(/^\//, "");
  }

  const parts = decodeURIComponent(url.pathname)
    .split("/")
    .filter(Boolean)
    .map(cleanSegment);
  let filename = parts.pop() || "index";
  if (url.search) {
    const extension = path.posix.extname(filename);
    const stem = extension ? filename.slice(0, -extension.length) : filename;
    const inferredExtension = url.hostname === "fonts.googleapis.com" ? ".css" : ".asset";
    filename = `${stem}-${cleanSegment(url.search.slice(1))}${extension || inferredExtension}`;
  }
  return path.posix.join("vendor", cleanSegment(url.hostname), ...parts, filename);
}

function publicUrlFor(url) {
  return `/${localPathFor(url).split(path.sep).join("/")}`;
}

async function save(relativePath, content) {
  const filePath = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content);
}

function isFetchableReference(value) {
  return value &&
    !value.startsWith("#") &&
    !value.startsWith("data:") &&
    !value.startsWith("mailto:") &&
    !value.startsWith("tel:") &&
    !value.startsWith("javascript:");
}

function isPageUrl(url) {
  return url.origin === origin && (url.pathname === "/" || url.pathname.endsWith(".php"));
}

async function fetchResource(url, forceText = false) {
  const key = url.href;
  if (downloaded.has(key)) return downloaded.get(key);

  const job = (async () => {
    const response = await fetch(url, {
      headers: { "user-agent": "LeadBrixLocalMirror/1.0" },
      redirect: "follow",
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url.href}`);

    const contentType = response.headers.get("content-type") || "";
    const isText = forceText || /(?:text|css|javascript|json|xml|svg)/i.test(contentType);
    const relativePath = localPathFor(url);

    if (!isText) {
      await save(relativePath, Buffer.from(await response.arrayBuffer()));
      return publicUrlFor(url);
    }

    let content = await response.text();
    if (/css/i.test(contentType) || url.pathname.endsWith(".css")) {
      content = await localizeCss(content, url);
    } else if (/javascript/i.test(contentType) || /\.(?:js|mjs)$/i.test(url.pathname)) {
      content = await localizeJs(content, url);
    }
    await save(relativePath, content);
    return publicUrlFor(url);
  })().catch((error) => {
    console.warn(`Skipped ${url.href}: ${error.message}`);
    return url.href;
  });

  downloaded.set(key, job);
  return job;
}

async function localizeCss(css, baseUrl) {
  const regex = /url\(\s*(['"]?)([^'"\)]+)\1\s*\)/gi;
  const matches = [...css.matchAll(regex)];
  let result = css;

  for (const match of matches) {
    const reference = match[2].trim();
    if (!isFetchableReference(reference)) continue;
    const remoteUrl = new URL(reference, baseUrl);
    const localUrl = await fetchResource(remoteUrl);
    result = result.replace(match[0], `url("${localUrl}")`);
  }

  return result;
}

async function localizeJs(javascript, baseUrl) {
  const moduleReference = /(?:\bfrom\s*|\bimport\s*\(\s*)['"]([^'"]+)['"]/g;
  const references = [...javascript.matchAll(moduleReference)]
    .map((match) => match[1])
    .filter(isFetchableReference);

  for (const reference of references) {
    await fetchResource(new URL(reference, baseUrl));
  }

  if (baseUrl.origin === origin && baseUrl.pathname === "/assets/js/app.js") {
    javascript = javascript.replace(
      /  window\.addEventListener\('load', \(\) => \{\n([\s\S]*?    \}, 600\);)\n  \}\);/,
      "  // Local mirror: boot after DOM ready so third-party widgets cannot hold the loader open.\n$1",
    );
  }

  return javascript;
}

async function localizeHtml(html, pageUrl) {
  const tagReference = /\b(src|href)\s*=\s*(["'])([^"']+)\2/gi;
  const matches = [...html.matchAll(tagReference)];
  let result = html;

  for (const match of matches) {
    const [full, attribute, quote, reference] = match;
    if (!isFetchableReference(reference)) continue;

    const remoteUrl = new URL(reference, pageUrl);
    if (attribute.toLowerCase() === "href" && remoteUrl.pathname === "/" && !remoteUrl.search) {
      continue;
    }
    if (isPageUrl(remoteUrl)) {
      if (remoteUrl.origin === origin) {
        const localPage = `${remoteUrl.pathname}${remoteUrl.hash}`;
        result = result.replace(full, `${attribute}=${quote}${localPage}${quote}`);
      }
      continue;
    }

    const isAsset = attribute.toLowerCase() === "src" ||
      /\.(?:css|js|mjs|png|jpe?g|webp|gif|svg|ico|json|webmanifest|woff2?|ttf|otf)(?:$|[?#])/i.test(remoteUrl.href) ||
      /fonts\.googleapis\.com|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|unpkg\.com|assets\.calendly\.com/i.test(remoteUrl.hostname);

    if (!isAsset) continue;
    const localUrl = await fetchResource(remoteUrl);
    result = result.replace(full, `${attribute}=${quote}${localUrl}${quote}`);
  }

  result = result
    .replaceAll("http://localhost:3000/", "/")
    .replaceAll("https://theleadbrix.in/", "/")
    .replaceAll("https://leadbrix.in/", "/");

  return result;
}

for (const [pathname, target] of pages) {
  const pageUrl = new URL(pathname, origin);
  const response = await fetch(pageUrl, { redirect: "follow" });
  if (!response.ok) throw new Error(`Could not download ${pageUrl.href}: ${response.status}`);
  const localized = await localizeHtml(await response.text(), pageUrl);
  await save(target, localized);
  console.log(`Saved ${pathname} -> public/${target}`);
}

console.log(`Mirror complete: ${pages.size} pages, ${downloaded.size} assets.`);
