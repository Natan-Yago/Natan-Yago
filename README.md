# Natan Yago - Portfolio

A modern, responsive portfolio website built with Next.js showcasing my work and experience.

## Features

- **Responsive Design**: Optimized for all devices
- **Dark/Light Theme**: Toggle between themes
- **Modern UI**: Clean and professional interface
- **Portfolio Projects**: Showcase of selected work
- **Work Experience**: Professional background display
- **Contact Section**: Easy ways to get in touch

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Geist (Vercel)

## Getting Started

## Guides

See `guides/` for implementation guides and the tracker:

- `guides/case-study-implementation.md`
- `guides/tracker.md`

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── components/
│   ├── layout/          # Header, Footer components
│   ├── sections/        # Main page sections
│   └── ui/             # Reusable UI components
├── lib/                # Utilities and configurations
├── globals.css         # Global styles
├── layout.js          # Root layout
└── page.js            # Main page

public/
├── images/            # Project images and logos
└── ...               # Static assets
```

## Authoring workflow (Case Studies)

1. Add/update an entry in `app/data/work.json` using the existing shape. Set `caseStudy: true` to render the in-site case page.
2. Optionally include a `case` object with `sections` to render rich content. Supported section types: `text`, `image`, `stats`, `quote`, `list`.
3. Ensure your hero image exists in `public/images/projects/` and reference it via the project `image` field.
4. Visit `/work/{slug}` to review the page. All projects use the same grid-based CaseStudy layout.

## Rollout checklist

- All project links point to `/work/{slug}` (handled by `ProjectCard`).
- Dynamic route `/work/[slug]` uses static params for known slugs.
- No redirects: pages without case content still render the uniform CaseStudy layout.
- Images optimized via `next/image`; case hero is priority for LCP.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Feel free to reach out if you have any questions or would like to collaborate!

## Deployment (GitHub Pages)

This portfolio is configured for a fully static export and automatic deployment to **GitHub Pages** using GitHub Actions.

### How it works

1. `next.config.mjs` uses `output: "export"` so `next build` produces static HTML in `out/`.
2. When the CI workflow runs it sets `GITHUB_PAGES=true`, enabling a `basePath` + `assetPrefix` (`/Natan-Yago`).
3. The workflow uploads the `out/` directory as a GitHub Pages artifact and deploys it.
4. A `.nojekyll` file is added to prevent Jekyll processing (important for folders that start with `_`).

### Workflow file

Defined in `.github/workflows/deploy.yml` and triggers on pushes to `main`.

### Local preview with basePath

```bash
GITHUB_PAGES=true npm run build
npx serve -l 4321 out
# Open http://localhost:4321/Natan-Yago/
```

Or use the helper script:

```bash
npm run preview:export
# Opens on http://localhost:4321/Natan-Yago/
```

### Scripts

| Script                   | Purpose                                              |
| ------------------------ | ---------------------------------------------------- |
| `npm run build`          | Standard static build (no base path)                 |
| `npm run pages:build`    | Build with `GITHUB_PAGES=true` for production parity |
| `npm run preview:export` | Build with GitHub Pages settings and serve locally   |

### Custom domain (optional)

Add a `CNAME` file to `public/` (or echo it into `out/` during the workflow) and uncomment the CNAME step in the workflow.

### Notes & Caveats

- Only static-compatible Next.js features are used. Avoid adding server-only APIs or dynamic server functions unless you remove the static export strategy.
- Deep links like `/work/my-project` are exported as `work/my-project/index.html` and work directly on Pages.
- If you rename the repository, update `repoName` in `next.config.mjs` and re-deploy.

### Troubleshooting

| Symptom                | Likely Cause                         | Fix                                                                |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| CSS/images 404         | Missing or wrong basePath            | Ensure `GITHUB_PAGES=true` during build, confirm repo name matches |
| 404 on deep link       | Route not statically generated       | Confirm `generateStaticParams` covers slug                         |
| Assets double-prefixed | Manually prepended base path in code | Use root-relative paths (`/image.png`) and let Next rewrite        |

Deployment is automatic—push to `main` and the site updates.
