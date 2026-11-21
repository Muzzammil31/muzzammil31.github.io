# Muzammil Hussain — AI Engineer Portfolio

Professional React + TypeScript + Tailwind CSS portfolio, hosted independently on **GitHub Pages**. This site does not require a proprietary builder or a running application server.

## Live site (after GitHub Pages is enabled)

https://muzzammil31.github.io/

## Development

Requirements: Node.js 22.12+ or 24+, npm.

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

## GitHub Pages

Every push to `main` triggers `.github/workflows/deploy-pages.yml`. The workflow builds the static site and publishes the `dist/` directory using GitHub's official Pages actions.

In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the deployment source. This first-time setup is required before the workflow can deploy; otherwise `actions/configure-pages` fails with `Get Pages site failed`. Under GitHub Free, Pages requires a **public repository**; a **private repository** needs an eligible paid GitHub plan. The portfolio repository is public, and GitHub Pages is deployed automatically from the `main` branch.

**Privacy:** The PDF in `public/resume.pdf` is the original CV and contains a detailed residential address. The repository is public; consider using a privacy-safe CV before sharing its link widely. Previous file versions may also exist in Git history. If needed, publish a separate public repository with a privacy-safe CV instead.

### GitHub Pages asset paths

Vite uses a portable relative asset base (`./`), so CSS, JS, favicon and CV links work correctly on the free GitHub Pages URL without a custom domain. The portfolio is a static single-page site; no backend is needed for project filtering, galleries or the email-draft contact link.

## Control Center live sync

The published portfolio loads `public/portfolio-sync.js` from `index.html` using the public Control Center feed. Existing CV links are marked with `data-dashboard-cv`. Live updates reach the React hero, CV links, portfolio highlights and chatbot without replacing the original project data. When the feed is offline, the existing content and local CV remain accessible.

Setup, expected JSON fields, publishing requirements and troubleshooting: [CONTROL_CENTER_SYNC.md](CONTROL_CENTER_SYNC.md).

## Portfolio assistant

The floating **Ask about my work** chatbot and **Ask** actions on project cards answer common questions from the public portfolio data. They cover projects, architecture, tech stacks, work experience, internships, certifications, education, contact details and the CV.

This lightweight knowledge assistant runs entirely in the visitor's browser. No chatbot API key or paid hosting is required; answers are grounded in `src/data/portfolio.ts` rather than a live generative model. To update responses, update the data file. The assistant UI lives in `src/components/PortfolioChatbot.tsx` and the search logic in `src/lib/portfolioAssistant.ts`.

The GitHub Pages workflow checks that the production bundle contains the assistant and correct contact email, and that the updated resume PDF is included, before deploying.

## Content

Edit `src/data/portfolio.ts` to update work history, skills, certificates and project entries. The portfolio preserves the Red Fort/RFT 360 experience, UOH Assistant, Kaswa software, and the remaining CV projects.
