import { Client, Environment } from 'square';
import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, u as unescapeHTML, F as Fragment, m as maybeRenderHead } from '../astro_923132a5.mjs';
import 'clsx';
import { visit } from 'unist-util-visit';
import { getHighlighter } from 'shikiji';
import 'html-escaper';

const ASTRO_COLOR_REPLACEMENTS = {
  "#000001": "var(--astro-code-color-text)",
  "#000002": "var(--astro-code-color-background)",
  "#000004": "var(--astro-code-token-constant)",
  "#000005": "var(--astro-code-token-string)",
  "#000006": "var(--astro-code-token-comment)",
  "#000007": "var(--astro-code-token-keyword)",
  "#000008": "var(--astro-code-token-parameter)",
  "#000009": "var(--astro-code-token-function)",
  "#000010": "var(--astro-code-token-string-expression)",
  "#000011": "var(--astro-code-token-punctuation)",
  "#000012": "var(--astro-code-token-link)"
};
const COLOR_REPLACEMENT_REGEX = new RegExp(
  `(${Object.keys(ASTRO_COLOR_REPLACEMENTS).join("|")})`,
  "g"
);
const cachedHighlighters = /* @__PURE__ */ new Map();
function replaceCssVariables(str) {
  return str.replace(COLOR_REPLACEMENT_REGEX, (match) => ASTRO_COLOR_REPLACEMENTS[match] || match);
}
function getCachedHighlighter(opts) {
  const key = JSON.stringify(opts, Object.keys(opts).sort());
  if (cachedHighlighters.has(key)) {
    return cachedHighlighters.get(key);
  }
  const highlighter = getHighlighter(opts);
  cachedHighlighters.set(key, highlighter);
  return highlighter;
}

const $$Astro$1 = createAstro();
const $$Code = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Code;
  const {
    code,
    lang = "plaintext",
    theme = "github-dark",
    wrap = false,
    inline = false
  } = Astro2.props;
  if (typeof lang === "object") {
    if (lang.id && !lang.name) {
      lang.name = lang.id;
    }
    if (lang.grammar) {
      Object.assign(lang, lang.grammar);
    }
  }
  const highlighter = await getCachedHighlighter({
    langs: [lang],
    themes: [theme]
  });
  const html = highlighter.codeToHtml(code, {
    lang: typeof lang === "string" ? lang : lang.name,
    theme,
    transforms: {
      pre(node) {
        if (inline) {
          node.tagName = "code";
        }
        const classValue = node.properties.class ?? "";
        const styleValue = node.properties.style ?? "";
        node.properties.class = classValue.replace(/shiki/g, "astro-code");
        if (wrap === false) {
          node.properties.style = styleValue + "; overflow-x: auto;";
        } else if (wrap === true) {
          node.properties.style = styleValue + "; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;";
        }
      },
      code(node) {
        if (inline) {
          return node.children[0];
        }
      },
      root(node) {
        const themeName = typeof theme === "string" ? theme : theme.name;
        if (themeName === "css-variables") {
          visit(node, "element", (child) => {
            if (child.properties?.style) {
              child.properties.style = replaceCssVariables(child.properties.style);
            }
          });
        }
      }
    }
  });
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/node_modules/.pnpm/astro@3.3.4/node_modules/astro/components/Code.astro", void 0);

const $$Astro = createAstro();
const $$Debug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Debug;
  const key = Object.keys(Astro2.props)[0];
  const value = Astro2.props[key];
  return renderTemplate`${maybeRenderHead()}<div class="astro-debug"><div class="astro-debug-header"><h2 class="astro-debug-title"><span class="astro-debug-label">Debug</span><span class="astro-debug-name">"${key}"</span></h2></div>${renderComponent($$result, "Code", $$Code, { "code": JSON.stringify(value, null, 2) })}</div><style>
	.astro-debug {
		font-size: 14px;
		padding: 1rem 1.5rem;
		background: white;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.astro-debug-header,
	pre.astro-code {
		margin: -1rem -1.5rem 1rem;
		padding: 0.25rem 0.75rem;
	}

	.astro-debug-header {
		background: #ff1639;
		border-radius: 4px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.astro-debug-title {
		font-size: 1em;
		color: white;
		margin: 0.5em 0;
	}

	.astro-debug-label {
		font-weight: bold;
		text-transform: uppercase;
		margin-right: 0.75em;
	}

	pre.astro-code {
		border: 1px solid #eee;
		padding: 1rem 0.75rem;
		border-radius: 4px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		font-size: 14px;
	}
</style>`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/node_modules/.pnpm/astro@3.3.4/node_modules/astro/components/Debug.astro", void 0);

const GET = async ({ request, redirect, params }) => {
  const client = await new Client({
    accessToken: "EAAAF2y_qo6mTkW0SVC2jq-_ItQOrfSPMlLoR8u2m5ijEK0XagGuUqSKAuaEVCrj",
    environment: Environment.Production
  });
  const getAllUrls = async () => {
    try {
      const response = await client.checkoutApi.listPaymentLinks();
      return response.result.paymentLinks;
    } catch (error) {
      console.log(error);
    }
  };
  const urlsArr = await getAllUrls();
  new URL(request.url).searchParams;
  const deleteUrl = async (url) => {
    try {
      const response = await client.checkoutApi.deletePaymentLink(url);
      return response.result;
    } catch (error) {
      console.log(error);
    }
  };
  urlsArr?.forEach(async (url) => {
    await deleteUrl(url.id);
  });
  return redirect("/shop?success=true");
};

export { GET };
