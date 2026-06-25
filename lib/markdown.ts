import { remark } from "remark";
import htmlPlugin from "remark-html";
import gfm from "remark-gfm";
import { codeToHtml } from "shiki";

// Languages to pre-load for faster highlighting
const LANGS = [
  "javascript", "typescript", "tsx", "jsx",
  "python", "bash", "sh",
  "json", "css", "html", "yaml",
  "md", "markdown", "sql", "rust", "go", "java", "c", "cpp",
] as string[];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w一-鿿㐀-䶿豈-﫿]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Extract heading text and inject id attributes into rendered HTML */
function addHeadingIds(html: string): string {
  return html.replace(/<(h([1-6]))>(.*?)<\/\1>/gi, (match, tag, depth, content) => {
    // Skip if already has an id
    if (match.includes(' id="')) return match;
    const id = slugify(content.replace(/<[^>]*>/g, ""));
    if (id) return `<${tag} id="${id}">${content}</${tag}>`;
    return match;
  });
}

export async function renderMarkdown(content: string): Promise<string> {
  // Pre-process code blocks with shiki, then let remark handle the rest
  const processedContent = await preprocessCodeBlocks(content);

  const result = await remark()
    .use(gfm)
    .use(htmlPlugin, {
      safeHtml: true,
      sanitize: false,
      pretty: true,
    })
    .process(processedContent);

  let html = String(result);
  // Inject id attributes into all heading tags
  html = addHeadingIds(html);
  return html;
}

async function preprocessCodeBlocks(markdown: string): Promise<string> {
  const codeBlockRegex = /```(?:(\w+))?\n?([\s\S]*?)```/g;
  const replacements: { start: number; end: number; html: string }[] = [];

  let match;
  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    const lang = match[1] || "";
    const code = match[2];
    try {
      const html = await codeToHtml(code, { lang, theme: "github-dark" });
      replacements.push({ start: match.index, end: match.index + match[0].length, html });
    } catch {
      // Fallback: escape HTML for unknown languages
      const escaped = escapeHtml(code);
      const html = `<pre><code${lang ? ` data-lang="${lang}"` : ""}>${escaped}</code></pre>`;
      replacements.push({ start: match.index, end: match.index + match[0].length, html });
    }
  }

  // Apply replacements in reverse order to preserve indices
  let result = markdown;
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { start, end, html: repl } = replacements[i];
    result = result.slice(0, start) + repl + result.slice(end);
  }

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
