# GitHub Pages Deployment & Dist Bundle Distribution

Configure Vite with relative asset paths, generate the production `dist` build, create an easily downloadable ZIP archive of the website distribution, and set up automated GitHub Pages deployment for the wedding invitation website.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed based on your selections:
>
> - **Asset Path Strategy**: Confirmed `base: './'` (relative base path) in Vite configuration so that assets (`./assets/...`) resolve seamlessly regardless of whether the site is hosted at `https://<username>.github.io/<repo-name>/`, a custom domain, or a local server.
> - **Dist Delivery Method**: Confirmed building the optimized production bundle (`dist/`) and generating a downloadable `.zip` archive package with a dedicated in-app download helper and clear deployment guide.
> - **Deployment Target**: Confirmed target deployment is the `gh-pages` branch for GitHub Pages.

---

### 1. Overview & Core Concept

- **What It Does**: Resolves the root cause of the blank page or broken assets when deploying the Vite React wedding invitation to GitHub Pages. It configures the build system to use relative paths, builds the complete static production distribution (`dist`), packages it into a ready-to-deploy archive (`dist.zip`), and provides both a one-command / automated GitHub Actions workflow and step-by-step instructions for `gh-pages`.
- **Target Audience / Persona**: The website developer (Imran Shahriar) and hosts (Md. Abrar Shahriar & Payelia Pervej Ripa) needing their wedding invitation live and accessible to family and guests around the globe via GitHub Pages.
- **Key Value**: Guarantees zero 404 errors for JavaScript/CSS bundles on GitHub Pages subpaths, and provides an immediate downloadable archive of the built site for direct upload or repository push.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. *Developer & Host Workflow*:
     - The production build is compiled with `npm run build` using `./` relative paths.
     - A ZIP archive `wedding-invitation-dist.zip` is generated containing all compiled assets, HTML, sound triggers, and icons.
     - A subtle, developer-friendly "Download dist.zip" shortcut is added to the developer credit badge or a discreet modal for instant browser download without needing terminal commands.
     - The automated GitHub Actions workflow (`.github/workflows/deploy.yml`) is added so any future git push automatically deploys to GitHub Pages without manual steps.
  2. *Wedding Guest Experience on GitHub Pages*:
     - Guest navigates to `https://<username>.github.io/<repository-name>/`.
     - The page loads instantly with 0 asset errors, displaying the royal burgundy & warm gold interactive envelope, background melody ("Kudmayi" starting at 0:06), event schedule, venue map, and RSVP form.

- **Visual Identity & Theme**:
  - *Color Palette & Mood*: Retains the luxurious Bengali royal wedding theme — Deep Burgundy (`#281016`, `#1c080d`), Rich Crimson/Wine (`#8B1D3B`), Vintage Champagne Gold (`#e0bd83`, `#ECC880`), and Warm Cream (`#fffaf2`).
  - *Typography*: Cormorant Garamond for display headers, Great Vibes for ceremonial script accents, and clean sans-serif for high-contrast legibility.
  - *Developer Access*: Seamlessly integrated with the existing "Developed by Imran Shahriar" badge at the top-right corner.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Vite `base: './'` vs Repository-Specific Path `base: '/repo-name/'`**
  - *Chosen Approach*: `base: './'` (relative paths).
  - *Why*: Setting `./` allows the built `dist` folder to work universally anywhere — on GitHub Pages under any repository name, on Netlify, on Vercel, on AWS S3/Cloudflare, or even opened locally in a web browser, without needing to hardcode the GitHub repository name.
  - *Alternatives Considered*: Hardcoding `/wedding-invitation/` would fail if the repository name is changed or capitalized differently on GitHub.

- **Decision 2: Automated GitHub Actions Workflow vs Manual Branch Commit**
  - *Chosen Approach*: Provide both the automated `.github/workflows/deploy.yml` (GitHub Pages Actions standard) and a pre-packaged `dist.zip` archive.
  - *Why*: Gives total flexibility. If the user prefers standard git push, GitHub Actions will automatically build and publish to GitHub Pages on every push. If the user prefers pushing the `dist` folder manually to the `gh-pages` branch or downloading the files directly, `dist.zip` is immediately ready.

- **Decision 3: In-App Download Link for dist.zip**
  - *Chosen Approach*: Expose the generated zip file via the app's public assets and provide a clean developer modal on clicking "Developed by Imran Shahriar".
  - *Why*: Allows immediate browser download of the exact distribution folder straight from the live AI Studio preview.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     Vite Configuration                      │
│             vite.config.ts (base: './')                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Production Build                         │
│                    npm run build                            │
└──────────────────────────────┬──────────────────────────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│          dist/ Output           │ │       GitHub Actions CI         │
│  ├── index.html (./assets/...)  │ │  .github/workflows/deploy.yml │
│  ├── assets/ (*.js, *.css)      │ │  Auto-deploys to Pages on push │
│  └── public assets              │ └─────────────────────────────────┘
└────────────────┬────────────────┘
                 ▼
┌─────────────────────────────────┐
│     dist.zip Archive Package    │
│  - Available for download       │
│  - Ready for gh-pages push      │
└─────────────────────────────────┘
```

#### Planned Steps for Execution

1. **Update `vite.config.ts`**:
   - Add `base: './'` to export configuration to ensure all generated asset URLs in `index.html` use relative paths.

2. **Add GitHub Pages Workflow (`.github/workflows/deploy.yml`)**:
   - Create standard GitHub Actions Pages deployment pipeline using official `actions/upload-pages-artifact` and `actions/deploy-pages`.

3. **Build Production Assets & Generate ZIP**:
   - Run compilation and production build (`npm run build`).
   - Create `dist.zip` archive containing the production build.
   - Place a copy in `public/` so it can be directly downloaded in the browser.

4. **Add Dist Download Helper in UI**:
   - Connect the top-right "Developed by Imran Shahriar" badge with an options menu or modal providing:
     - 1-click "Download dist.zip" button.
     - GitHub Pages 3-step setup guide (Settings > Pages > Source: GitHub Actions or gh-pages branch).

5. **Verify & Test**:
   - Verify index.html in dist contains relative script/style tags (`./assets/...`).
   - Test application compilation and linter.
