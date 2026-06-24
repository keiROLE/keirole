import { remark } from "remark";
import html from "remark-html";

const processor = remark().use(html, {
  safeHtml: true,
  sanitize: false,
});

export async function renderMarkdown(content: string): Promise<string> {
  const result = await processor.process(content);
  return result.toString();
}
