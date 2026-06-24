import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const processor = remark()
  .use(gfm)
  .use(html, {
    safeHtml: true,
    sanitize: false,
  });

export async function renderMarkdown(content: string): Promise<string> {
  const result = await processor.process(content);
  return result.toString();
}
