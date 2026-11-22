# Leadbrix local mirror

This project stores a local mirror of the public frontend at `https://theleadbrix.in/`.

## Run locally

```powershell
npm.cmd run dev
```

Open `http://localhost:3000/`. The original `.php` page URLs are preserved by Next.js rewrites.

## Refresh the public mirror

```powershell
npm.cmd run mirror
```

The refresh script downloads the public HTML, styles, scripts, images, fonts, and CDN assets used by the pages into `public/`.

Form endpoints are local demo handlers. They preserve validation and success/thank-you flows without sending email, writing to a CRM, or copying private server-side PHP code.
