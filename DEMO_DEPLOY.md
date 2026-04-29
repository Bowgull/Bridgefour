# Demo deployment guide

How to bring the **Try the demo** buttons live on the case study pages.

The two demo apps are fully sandboxed:
- **Sygnalist**: read-only Supabase project + Next.js deploy with `DEMO_MODE=true` (writes/cron/external APIs all 403)
- **Waymark**: separate Cloudflare Worker + D1 with `DEMO_MODE=true` (Anthropic calls return stubs, cron disabled, no Strava token)

Both are wired into bridgefour via two env vars:
```
NEXT_PUBLIC_SYGNALIST_DEMO_URL=https://sygnalist-demo.bridgefour.xyz
NEXT_PUBLIC_WAYMARK_DEMO_URL=https://waymark-demo.bridgefour.xyz
```

If a URL is unset, the button shows **Demo coming soon** and the modal renders a placeholder.

---

## Sygnalist demo

### 1. Create demo Supabase project
- New project on supabase.com (free tier)
- Copy `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Run all migrations in `/supabase/00*.sql` order against the new project (SQL editor)

### 2. Seed demo data
```bash
cd /Users/lindsaybell/Developer/sygnalist-brain/app
NEXT_PUBLIC_SUPABASE_URL=<demo-url> SUPABASE_SERVICE_ROLE_KEY=<demo-service-key> npm run seed:demo
```
This creates 3 fake clients (Luther, Priya, Marcus), 40 inbox jobs, 9 tracker entries, 12 tickets, 80 user events, fetch logs, and error logs. Idempotent — safe to re-run.

### 3. Create demo admin auth user
In the Supabase Auth dashboard for the demo project:
- Add user: `demo@bridgefour.xyz` / `demo-readonly-2026` (or any throwaway)
- In SQL editor, link the auth user to the admin profile:
```sql
UPDATE profiles SET auth_user_id = '<auth-user-uuid>' WHERE profile_id = 'demo-admin';
```

### 4. Deploy Sygnalist app to Vercel (separate project)
- Import the `sygnalist-brain` repo on vercel.com as a new project (set root to `app/`)
- Set env vars on the new Vercel project:
  - `NEXT_PUBLIC_SUPABASE_URL=<demo-url>`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<demo-anon>`
  - `SUPABASE_SERVICE_ROLE_KEY=<demo-service>`
  - `DEMO_MODE=true`
- Add custom domain `sygnalist-demo.bridgefour.xyz` (CNAME to Vercel)

### 5. Lock auth + iframe
- The DEMO_MODE proxy gate already returns 403 on writes/fetch/cron
- Auto-login the demo session on a `/demo-login` route, OR pre-share the throwaway creds in copy
- Allow iframe embedding from bridgefour: in `next.config.js` add headers:
```js
{ source: '/(.*)', headers: [{ key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://bridgefour.xyz https://*.vercel.app" }] }
```

---

## Waymark demo

### 1. Create demo D1 database
```bash
cd /Users/lindsaybell/Developer/Waymark
npx wrangler d1 create waymark-demo-db
# copy database_id from output
```

### 2. Create `wrangler.demo.jsonc`
```jsonc
{
  "name": "waymark-demo",
  "main": "src/index.ts",
  "compatibility_date": "2024-12-01",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "waymark-demo-db",
      "database_id": "<copy-from-step-1>"
    }
  ],
  "vars": { "DEMO_MODE": "true" }
  // No cron triggers in demo
}
```

### 3. Seed demo D1
```bash
npm run db:migrate:remote -- --config wrangler.demo.jsonc
npm run db:demo:seed:remote -- --config wrangler.demo.jsonc
```

### 4. Deploy Worker
```bash
npx wrangler deploy --config wrangler.demo.jsonc
```
Note the worker URL (e.g. `https://waymark-demo.<your-subdomain>.workers.dev`).

### 5. Deploy Pages frontend
- Build the React app: `npm run build`
- Create a Cloudflare Pages project pointing at the same repo
- Build command: `npm run build`
- Build output: `dist`
- Env var: `VITE_API_URL=<worker-url-from-step-4>`
- Custom domain: `waymark-demo.bridgefour.xyz`

---

## Bridgefour env

In Vercel project settings for the bridgefour app, add:
```
NEXT_PUBLIC_SYGNALIST_DEMO_URL=https://sygnalist-demo.bridgefour.xyz
NEXT_PUBLIC_WAYMARK_DEMO_URL=https://waymark-demo.bridgefour.xyz
```

Redeploy. The buttons on `/work/sygnalist` and `/work/waymark` will switch from **Demo coming soon** to **Try the demo →**.

---

## Rate-limit / cost guardrails

- **Sygnalist**: DEMO_MODE returns 403 on every external API path. Zero spend possible from demo traffic.
- **Waymark**: `installDemoFetchGuard()` intercepts every `fetch()` to `api.anthropic.com` and returns a stubbed response. Zero spend possible.
- **Both**: Use separate API keys (or no keys at all) on the demo deploys. Never share the production Anthropic/OpenAI keys with demo environments.
- **Cloudflare**: D1 free tier covers 5M reads / 100K writes per day — well above any plausible demo traffic.
- **Supabase**: free tier (500MB DB, 50K MAU) is plenty for a frozen demo.

---

## Verifying the gates

**Sygnalist:**
```bash
curl -X POST https://sygnalist-demo.bridgefour.xyz/api/fetch
# → 403 {"error":"demo_mode","message":"This is a read-only demo..."}
```

**Waymark:** check the Worker logs after a session-complete in the demo:
```
[demo] blocked external call to api.anthropic.com https://api.anthropic.com/v1/messages
```
