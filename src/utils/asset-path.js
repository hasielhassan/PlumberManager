/**
 * Helper to resolve public static assets with Vite base URL support.
 * Ensures asset paths resolve correctly whether deployed at domain root or a subpath (e.g. GitHub Pages /PlumberManager/).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('data:') || path.startsWith('http:') || path.startsWith('https:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
}
