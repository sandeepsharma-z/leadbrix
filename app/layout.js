import "./globals.css";

export const metadata = {
  title: "LeadBrix — Digital Growth & Performance Marketing Agency",
  description: "LeadBrix helps businesses grow through SEO, Google Ads, social media, branding, web development, and business automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/vendor/cdn.jsdelivr.net/npm/tabler/icons-webfont-latest/tabler-icons.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
