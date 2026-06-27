/** Extract plain text from markdown content */
export function extractPlainText(md: string): string {
  return md
    .replace(/#{1,6}\s*/g, "")      // remove headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // keep link text
    .replace(/[!*>/`~_-]/g, "")     // remove formatting
    .replace(/\n+/g, " ")            // collapse whitespace
    .trim();
}

/** Case-insensitive substring match */
export function matches(text: string, query: string): boolean {
  if (!query) return true;
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  return t.includes(q);
}
