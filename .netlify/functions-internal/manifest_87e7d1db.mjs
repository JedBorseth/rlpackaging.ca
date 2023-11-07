import 'cookie';
import 'kleur/colors';
import 'string-width';
import './chunks/astro_923132a5.mjs';
import 'clsx';
import 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@3.3.4/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.5ae16097.js"}],"styles":[{"type":"external","src":"/_astro/index.e43006b2.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b922536a.js"}],"styles":[{"type":"external","src":"/_astro/index.e43006b2.css"}],"routeData":{"route":"/shop","type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop/index.astro","pathname":"/shop","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b922536a.js"}],"styles":[{"type":"external","src":"/_astro/index.e43006b2.css"}],"routeData":{"route":"/shop/[item]","type":"page","pattern":"^\\/shop\\/([^/]+?)\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}],[{"content":"item","dynamic":true,"spread":false}]],"params":["item"],"component":"src/pages/shop/[item].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b922536a.js"}],"styles":[{"type":"external","src":"/_astro/index.e43006b2.css"}],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/cleanupcheckouturls","type":"endpoint","pattern":"^\\/api\\/cleanupCheckoutUrls$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"cleanupCheckoutUrls","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/cleanupCheckoutUrls.ts","pathname":"/api/cleanupCheckoutUrls","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/checkout","type":"endpoint","pattern":"^\\/api\\/checkout$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/checkout.ts","pathname":"/api/checkout","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/feedback","type":"endpoint","pattern":"^\\/api\\/feedback$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"feedback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/feedback.ts","pathname":"/api/feedback","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/shop/[item].astro",{"propagation":"none","containsHead":true}],["/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/shop/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/shop/[item].astro":"chunks/pages/_item__c959b40b.mjs","/src/pages/api/checkout.ts":"chunks/pages/checkout_2cc95674.mjs","/src/pages/api/cleanupCheckoutUrls.ts":"chunks/pages/cleanupCheckoutUrls_96112b60.mjs","/src/pages/api/feedback.ts":"chunks/pages/feedback_277813fb.mjs","/node_modules/.pnpm/astro@3.3.4/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_be7b6b91.mjs","\u0000@astrojs-manifest":"manifest_87e7d1db.mjs","/Users/jedborseth/Documents/2023/rlpackaging.ca/node_modules/.pnpm/@astrojs+react@2.3.2_@types+react-dom@18.2.14_@types+react@18.2.31_react-dom@18.2.0_react@18.2.0/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_fcfb9d47.mjs","\u0000@astro-page:node_modules/.pnpm/astro@3.3.4/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_a5672da2.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_01d324c2.mjs","\u0000@astro-page:src/pages/shop/index@_@astro":"chunks/index_0f15c6ff.mjs","\u0000@astro-page:src/pages/shop/[item]@_@astro":"chunks/_item__68a8f0e6.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_9200902a.mjs","\u0000@astro-page:src/pages/api/cleanupCheckoutUrls@_@ts":"chunks/cleanupCheckoutUrls_cc491d32.mjs","\u0000@astro-page:src/pages/api/checkout@_@ts":"chunks/checkout_c5c6522f.mjs","\u0000@astro-page:src/pages/api/feedback@_@ts":"chunks/feedback_0aee0191.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.b922536a.js","/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/Form":"_astro/Form.5c1b93b8.js","@astrojs/react/client.js":"_astro/client.1244ca89.js","/astro/hoisted.js?q=1":"_astro/hoisted.5ae16097.js","/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/History":"_astro/History.7edcf0fc.js","/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/SingleShopItem":"_astro/SingleShopItem.403b6d77.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/index.e43006b2.css","/arrow-down-circle-fill.svg","/envelope.svg","/geo-alt-fill.svg","/list.svg","/logo.svg","/telephone-fill.svg","/_astro/Form.5c1b93b8.js","/_astro/History.7edcf0fc.js","/_astro/SingleShopItem.403b6d77.js","/_astro/client.1244ca89.js","/_astro/hoisted.5ae16097.js","/_astro/hoisted.b922536a.js","/_astro/index.5df4e8c0.js","/_astro/index.f187768b.js","/_astro/jsx-runtime.5289e481.js"]});

export { manifest };
