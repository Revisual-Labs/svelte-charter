import shiki from "shiki";

export async function highlight(code, lang = 'text') {
    const highlighter = await shiki.getHighlighter({ theme: 'slack-dark' });
    const result = highlighter.codeToHtml(code, lang);
    return result;
}
