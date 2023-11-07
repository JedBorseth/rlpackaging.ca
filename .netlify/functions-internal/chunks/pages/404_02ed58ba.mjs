/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, g as renderSlot, h as renderHead, i as addAttribute, m as maybeRenderHead, j as renderComponent } from '../astro_923132a5.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template([`<html lang="en"><head><meta charset="UTF-8"><meta name="google-site-verification" content="boWoBHxWUeary5MjXJTzk17h0vksS1aNi3nghb1mOHI"><meta name="description" content="Solution Focused on difficult projects for your packaging needs. We do our best to help in areas where no one else can. With no minimums and a support mentality, we are the partner to the small business, distributor, and packaging manufacturer."><meta name="viewport" content="width=device-width"><script async src="https://www.googletagmanager.com/gtag/js?id=G-HX7WTLZW1D"><\/script><!-- <script>window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());   gtag('config', 'G-HX7WTLZW1D');<\/script> --><link rel="icon" type="image/svg+xml" href="/logo.svg"><meta name="generator"`, "><title>", "</title>", "</head><body>", "</body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navbar;
  const atHome = Astro2.url.pathname === "/";
  return renderTemplate`${maybeRenderHead()}<div class="drawer drawer-end text-2xl"><input id="mobile-nav" type="checkbox" class="drawer-toggle"><div class="drawer-content flex flex-col"><div class="w-full navbar bg-base-300"><div class="flex-none md:hidden"><label for="mobile-nav" class="btn btn-square btn-ghost" id="menu-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label></div><div class="flex-1 px-2 mx-2"><a href="../"><img src="../logo.svg" alt="RL Packaging Logo" width="100"></a></div><div class="flex-none hidden md:block"><ul class="menu menu-horizontal"><li><a class="home-scroll"${addAttribute(atHome ? null : "/", "href")}>Home</a></li><li><a class="about-scroll"${addAttribute(atHome ? null : "/", "href")}>About</a></li><li><a class="history-scroll"${addAttribute(atHome ? null : "/", "href")}>History</a></li><li><a class="contact-scroll"${addAttribute(atHome ? null : "/", "href")}>Contact</a></li></ul></div></div></div><div class="drawer-side"><label for="mobile-nav" class="drawer-overlay"></label><ul class="menu p-4 w-72 h-full bg-base-100 gap-5 text-lg pt-20" id="mobile-items"><li><a class="home-scroll"${addAttribute(atHome ? null : "/", "href")}>Home</a></li><li><a class="about-scroll"${addAttribute(atHome ? null : "/", "href")}>About</a></li><li><a class="history-scroll"${addAttribute(atHome ? null : "/", "href")}>History</a></li><li><a class="contact-scroll"${addAttribute(atHome ? null : "/", "href")}>Contact</a></li><li class="opacity-0 flex-1"></li><li class="menu-title flex flex-row gap-10 border-t-2 pt-3 justify-between"><a href="mailto:orders@rlpackaging.ca" target="_blank" class="hover:opacity-80"><img src="./envelope.svg" alt="Email"></a><a href="tel:6047586040" target="_blank" class="hover:opacity-80"><img src="./telephone-fill.svg" alt="Phone"></a><a href="https://maps.app.goo.gl/qTK8hopH4X9CrohH6" target="_blank" class="hover:opacity-80"><img src="./geo-alt-fill.svg" alt="Location"></a></li></ul></div></div>`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/Navbar.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const date = /* @__PURE__ */ new Date();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "R&L Packaging" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50">${renderComponent($$result2, "Navbar", $$Navbar, {})}</header><main class="min-h-screen font-mono font-bold grid place-items-center pt-10"><a class="h-screen w-screen absolute z-50 top-0 left-0 cursor-default" href="/"></a><div><h1 class="text-[10rem] w-full text-center h-min">404</h1><h2 class="w-full text-center">"${Astro2.url.pathname}"</h2></div><h3 class="text-2xl">Page Not Found.</h3></main><footer class="footer footer-center p-10 bg-base-200 text-base-content rounded"><div class="grid grid-flow-col gap-4"><a class="link link-hover home-scroll">Home</a><a class="link link-hover about-scroll">About</a><a class="link link-hover history-scroll">History</a><a class="link link-hover contact-scroll">Contact</a></div><div><p>
Copyright © ${date.getFullYear()} - All right reserved by R&L Packaging
</p><p class="text-xs">
Website designed by <a href="https://jedborseth.com">Jed Borseth</a></p></div></footer>` })}`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/404.astro", void 0);

const $$file = "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Navbar as $, _404 as _, $$Layout as a };
