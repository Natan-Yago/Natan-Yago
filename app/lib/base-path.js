export const withBasePath = (inputPath) => {
  if (!inputPath || typeof inputPath !== "string") return inputPath;

  // Allow external URLs and data URIs unchanged
  const lower = inputPath.toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("data:")) {
    return inputPath;
  }

  const base = process.env.NEXT_PUBLIC_PAGES_BASE_PATH || "";
  if (!base) return inputPath;

  // Avoid double prefixing
  if (inputPath.startsWith(base + "/") || inputPath === base) return inputPath;

  if (inputPath.startsWith("/")) return `${base}${inputPath}`;
  return `${base}/${inputPath}`;
};


