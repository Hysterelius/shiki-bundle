// bundle-entry.js
// Single-entry file that statically imports languages/themes + engine
// so the bundler can produce one file with everything inlined.

import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

// Export a convenience factory that returns a configured highlighter.
// This is similar to the fine-grained approach in the docs.
export async function createHighlighterSingleFile(options = {}) {
  // Use the JS regex engine (no wasm). If you want oniguruma, swap engine() to createOnigurumaEngine
  const engine = () => createJavaScriptRegexEngine();

  const highlighter = await createHighlighterCore({
    engine: options.engine ?? engine(),
    langs: [
      // pass the imported modules directly (not strings)
      "javascript",
      "typescript",
      "css",
      "json",
      // add more static imports if needed
    ],
    themes: [
      "github-light",
      "github-dark",
      "nord",
      // add more static theme imports
    ],
    ...options,
  });

  return highlighter;
}

// Convenience tiny helper to highlight a string (sync once highlighter created)
export async function highlightToHtml(
  code,
  { lang = "javascript", theme = "github-dark" } = {},
) {
  const h = await createHighlighterSingleFile();
  return h.codeToHtml(code, { lang, theme });
}
