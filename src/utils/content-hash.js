/**
 * Generates a simple, deterministic FNV-1a 32-bit hash of a string.
 * This is synchronous and ideal for client-side local storage key generation.
 * Returns a 8-character hex string.
 */
export function contentHash(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
export default contentHash;
