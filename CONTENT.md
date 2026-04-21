# How to add content

Everything you need to update lives in two places:
1. **Copy** → `src/content/`
2. **Assets** → `public/assets/`

You never need to touch a component or a page file to update content.

---

## Updating copy

### Site-wide (name, tagline, thesis, how I work, contact links)
Edit `src/content/site.ts`

Key fields:
- `author.linkedin` → paste your LinkedIn URL
- `author.resume` → stays as `/assets/resume.pdf` — just drop your resume PDF into `public/assets/`
- `heroLeft.lines` / `heroRight.lines` → the big serif text on the homepage
- `howIWork` → the numbered list on the homepage
- `thesis` → the big statement that appears after the hero

### Per-project copy (Sygnalist or Waymark)
Edit `src/content/projects.ts`

Each project has these sections:
- `problem.headline` / `problem.body` — Beat 1
- `approach.headline` / `approach.body` — Beat 2
- `product.screens[].caption` — captions under each screen
- `tools.body` — the paragraph about your stack choices
- `proof.headline` / `proof.body` — Beat 5, the closing argument
- `proof.stat` / `proof.statLabel` — the big number or word (e.g. "Solo", "Automated")

---

## Dropping in assets

### Folder structure

```
public/
  assets/
    resume.pdf                        ← your CV
    sygnalist/
      hero.png                        ← shown on homepage card
      before.png                      ← "the chaos" — Beat 1
      architecture.png                ← system diagram — Beat 2
      walkthrough.mp4                 ← 45-60s screen recording — Beat 3
      screens/
        01.png                        ← screen 1 of 3
        02.png
        03.png
    waymark/
      hero.png
      before.png
      architecture.png
      walkthrough.mp4
      screens/
        01.png
        02.png
        03.png
```

### After dropping a file in

Open `src/app/work/[slug]/page.tsx` and find the `AssetImage` component for that slot.
Replace:
```tsx
<Placeholder label="..." aspect="wide" />
```
With:
```tsx
<Image src="/assets/sygnalist/before.png" alt="Before state" fill className="object-cover rounded-sm" />
```
(wrapped in `<div className="relative w-full aspect-[4/3]">`)

Or just tell me what you've dropped in and I'll swap it for you. That's faster.

---

## Asset guide — what to capture

### For each project, you need:

| File | What it is | How to get it |
|------|-----------|---------------|
| `hero.png` | Glamour shot — best single frame of the product | Screenshot + CleanShot or shots.so for device frame |
| `before.png` | The mess your product solves | Screenshot of a chaotic Gmail inbox (Sygnalist) or a failed training note (Waymark) |
| `architecture.png` | How the system works — one diagram | Draw on paper + photo, or use excalidraw.com |
| `walkthrough.mp4` | 45-60s screen recording | Cmd+Shift+5 (Mac) for Sygnalist; QuickTime → New Movie Recording → iPhone for Waymark |
| `screens/01-03.png` | Your 3 best product screens | Screenshots from the app/browser |

### Walkthrough script — Sygnalist
- 0–10s: Gmail inbox. Caption: "Recruitment runs on email. It's chaos."
- 10–30s: Email arrives → sidebar parses it → candidate card fills in → score appears
- 30–45s: Admin portal, filters, client portal
- 45–60s: End on the cleanest screen

### Walkthrough script — Waymark
- 0–10s: A blown-up training plan / skipped session. Caption: "Plans don't survive contact with real life."
- 10–30s: Week view, a workout, coach adjusting
- 30–45s: Reactive moment — skip fires, plan updates silently
- 45–60s: End on the lock screen Live Activity

---

## LinkedIn and resume

In `src/content/site.ts`:
```ts
author: {
  linkedin: "https://linkedin.com/in/YOUR-SLUG-HERE",
  resume: "/assets/resume.pdf",
}
```

Drop `resume.pdf` into `public/assets/` and it'll work.

---

## Deploying to Vercel

1. Push to GitHub: `git add -A && git commit -m "your message" && git push`
2. Go to vercel.com → New Project → Import your GitHub repo
3. Click Deploy. Done. You'll get a `*.vercel.app` URL immediately.
4. When you have `bridgefour.co`: add it in Vercel → Project → Settings → Domains
