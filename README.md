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
