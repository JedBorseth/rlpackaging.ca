import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_87e7d1db.mjs';
import 'react';
import 'react-dom/server';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import './chunks/astro_923132a5.mjs';
import 'clsx';
import 'html-escaper';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/generic_a5672da2.mjs');
const _page1  = () => import('./chunks/index_01d324c2.mjs');
const _page2  = () => import('./chunks/index_0f15c6ff.mjs');
const _page3  = () => import('./chunks/_item__68a8f0e6.mjs');
const _page4  = () => import('./chunks/404_9200902a.mjs');
const _page5  = () => import('./chunks/cleanupCheckoutUrls_cc491d32.mjs');
const _page6  = () => import('./chunks/checkout_c5c6522f.mjs');
const _page7  = () => import('./chunks/feedback_0aee0191.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.3.4/node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/shop/index.astro", _page2],["src/pages/shop/[item].astro", _page3],["src/pages/404.astro", _page4],["src/pages/api/cleanupCheckoutUrls.ts", _page5],["src/pages/api/checkout.ts", _page6],["src/pages/api/feedback.ts", _page7]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
