// bundle-entry.js
// Single-entry file that statically imports languages/themes + engine
// so the bundler can produce one file with everything inlined.

import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
// If you prefer Oniguruma + wasm, replace above with:
// import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
// import wasm from 'shiki/wasm' // some bundlers treat this specially

// Static language imports: add whatever you need here.
// Importing the default export (module interop) is correct for @shikijs/langs packages.
import javascriptLang from '@shikijs/langs/javascript'
import typescriptLang from '@shikijs/langs/typescript'
import cssLang from '@shikijs/langs/css'
import jsonLang from '@shikijs/langs/json'

// Static theme imports
import githubLight from '@shikijs/themes/github-light'
import githubDark from '@shikijs/themes/github-dark'
import nordTheme from '@shikijs/themes/nord'

// Export a convenience factory that returns a configured highlighter.
// This is similar to the fine-grained approach in the docs.
export async function createHighlighterSingleFile(options = {}) {
  // Use the JS regex engine (no wasm). If you want oniguruma, swap engine() to createOnigurumaEngine
  const engine = () => createJavaScriptRegexEngine()

  const highlighter = await createHighlighterCore({
    engine: options.engine ?? engine(),
    langs: [
      // pass the imported modules directly (not strings)
      javascriptLang,
      typescriptLang,
      cssLang,
      jsonLang,
      // add more static imports if needed
    ],
    themes: [
      githubLight,
      githubDark,
      nordTheme,
      // add more static theme imports
    ],
    ...options,
  })

  return highlighter
}

// Convenience tiny helper to highlight a string (sync once highlighter created)
export async function highlightToHtml(code, { lang = 'javascript', theme = 'github-dark' } = {}) {
  const h = await createHighlighterSingleFile()
  return h.codeToHtml(code, { lang, theme })
}