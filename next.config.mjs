const mirroredPages = [
  ["/about.php", "/mirror/about.html"],
  ["/service.php", "/mirror/service.html"],
  ["/pricing.php", "/mirror/pricing.html"],
  ["/contact.php", "/mirror/contact.html"],
  ["/industries.php", "/mirror/industries.html"],
  ["/meeting.php", "/mirror/meeting.html"],
  ["/thank-you.php", "/mirror/thank-you.html"],
  ["/sitemap.php", "/mirror/sitemap.html"],
];

const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: mirroredPages.map(([source, destination]) => ({ source, destination })),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
