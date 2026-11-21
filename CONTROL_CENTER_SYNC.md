# Control Center ↔ GitHub Pages portfolio sync

## Installation

The static portfolio now contains a portable sync bridge at `public/portfolio-sync.js`.
Vite copies it to the published `portfolio-sync.js`. The entrypoint `index.html` loads the bridge with:

```html
<script
  src="%BASE_URL%portfolio-sync.js"
  data-feed="https://muzzammil-hussain-portfolio.excellentbrush8.chatgpt.site/live/portfolio.json"
  defer
></script>
```

The current CV links (hero, navigation, mobile menu, chatbot) use `data-dashboard-cv`.
These are the existing React links, not an additional duplicate HTML button. On GitHub
Pages the browser resolves the script as:

https://muzzammil31.github.io/portfolio-sync.js

## What the feed updates

The client-side bridge downloads public JSON using CORS, without credentials or API keys.
`src/lib/dashboardPortfolio.ts` validates and exposes the feed to React through a
single external-store subscription. Content is rendered as text, not HTML.

| Feed field                                                     | Website surface                                                               |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `introduction`                                                 | Hero summary (with local profile summary fallback)                            |
| `cvUrl` = the exact `/live/cv` endpoint; `cvLabel` = `View CV` | CV links in hero, navigation, mobile menu, and chatbot                        |
| `portfolioUrl`                                                 | Linked portfolio/media highlights, if an approved public share path           |
| `projects` (array with `name`, `category`)                     | Synced highlight cards in Projects; original 20 project entries remain intact |
| `links` (array with `label`, `url`)                            | Related links in the synced highlights section                                |
| `faq` (array with `question`, `answer`)                        | Portfolio chatbot answers                                                     |

The browser refreshes when the website opens, every 60 seconds, and when it is brought
back into focus. No page rebuild is needed when the public feed changes.

## Publishing on the control system

The feed and CV must first be **published and sync enabled** in the Control Center.
At implementation time (21 November 2026), the user-provided JSON endpoint returned
HTTP 404 with `{"error":"sync_unavailable"}`, and the live CV endpoint also returned
HTTP 404. This cannot be fixed by the GitHub Pages frontend.

After enabling and publishing the feed, verify:

1. `https://muzzammil-hussain-portfolio.excellentbrush8.chatgpt.site/live/portfolio.json` returns a valid public JSON object.
2. `https://muzzammil-hussain-portfolio.excellentbrush8.chatgpt.site/live/cv` serves the intended CV (if the public feed advertises it).
3. The feed permits cross-origin reads from the GitHub Pages origin.
4. Reload the public site, or bring the tab back into focus, to refresh the content.

The original CV (`public/resume.pdf`) and original projects and certificates remain
available when the live feed is offline, times out, or returns invalid data.

## Security and compatibility

- Only the configured public `/live/portfolio.json` endpoint is fetched.
- The CV can switch only to the matching `/live/cv` URL, never to arbitrary feed URLs.
- Shared public portfolio URLs are restricted to the expected control-system share path.
- The script never executes remote code or inserts unsanitized HTML from the feed.
- No private Control Center token is included in GitHub.
- The GitHub Pages workflow checks that the script and CV markers are built and deployed.
- The site is still hosted only at `https://muzzammil31.github.io/`;
  the sync feed is a read-only content source, not the website's hosting domain.

## Tests

```bash
npm run lint
npm run typecheck
npm run build
node --check public/portfolio-sync.js
```
