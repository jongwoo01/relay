# Relay Landing Page

Marketing site for Relay, a desktop voice agent for Google Workspace workflows and grounded local desktop tasks.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production site URL

Set the production origin before deploying:

```bash
cp .env.example .env.local
```

Then update:

```bash
NEXT_PUBLIC_SITE_URL=https://relay.leejongwoo.com
```

This value is used for:

- canonical URLs
- Open Graph URLs
- `robots.txt`
- `sitemap.xml`
- JSON-LD `url` fields

If `NEXT_PUBLIC_SITE_URL` is missing in production, the app falls back to `https://relay.leejongwoo.com`, or to the detected Vercel host when present.

## Verification

Run before shipping:

```bash
npm run lint
npm run build
```

After deployment, confirm these URLs use the real production domain:

- `/`
- `/robots.txt`
- `/sitemap.xml`
