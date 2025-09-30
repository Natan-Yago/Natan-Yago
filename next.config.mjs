// Detect GitHub Pages project deployment via env flag set in CI workflow
const isGitHubPages = process.env.GITHUB_PAGES === "true";
// Repository name (project site). For a user/org root site (username.github.io), leave basePath blank.
const repoName = "Natan-Yago";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate a fully static export suitable for uploading to any static host
  output: "export",
  // Ensure URLs end with a trailing slash to avoid GitHub Pages redirects losing hash fragments
  trailingSlash: true,
  images: {
    // Disable the Next.js Image Optimization API for static hosting
    unoptimized: true,
  },
  // Only apply basePath & assetPrefix when building for GitHub Pages project repo
  basePath: isGitHubPages ? `/${repoName}` : undefined,
  assetPrefix: isGitHubPages ? `/${repoName}/` : undefined,
};

export default nextConfig;
