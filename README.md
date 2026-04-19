# Truecaller + Vercel (Free Tier)

Simple Truecaller One-Tap integration using:
- Static frontend from `public/index.html`
- Serverless functions in `api/`
- Upstash Redis for short-lived session storage

## Project structure

- `public/index.html` - client page that starts Truecaller flow
- `api/callback.js` - receives Truecaller token and stores profile in Redis
- `api/check-status.js` - polling endpoint used by frontend
- `vercel.json` - function runtime settings for Vercel

## Prerequisites

- A Vercel account (free tier is enough)
- An Upstash Redis database
- A Truecaller app key configured in the frontend

## Environment variables (Vercel Project Settings)

Set the following in Vercel:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

You can copy `.env.example` for local usage with `vercel dev`.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy to Vercel

```bash
vercel
```

or connect the GitHub repo in the Vercel dashboard and deploy automatically.

## Notes for free tier

- API functions are short and within free limits.
- `maxDuration` is set to 10 seconds in `vercel.json`.
- Redis entries are kept for 5 minutes (`ex: 300`) and deleted after read.