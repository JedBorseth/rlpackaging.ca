import 'react-dom';
/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../astro_923132a5.mjs';
import 'clsx';
import { $ as $$Navbar, a as $$Layout } from './404_02ed58ba.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Client, Environment } from 'square';
import 'html-escaper';

const SingleShopItem = ({
  name,
  imageUrl,
  inventoryCount,
  description,
  price,
  id,
  category,
  attr1
}) => {
  const [tab, setTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState(false);
  const [googleAddress, setGoogleAddress] = useState(null);
  const [shippable, setShippable] = useState(false);
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371;
    const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };
  useEffect(() => {
    if (quantity >= Number(inventoryCount))
      setQuantity(Number(inventoryCount));
  }, [quantity]);
  const RLCOORDS = {
    lat: 49.04453454773623,
    lng: -122.36579867346927
  };
  useEffect(() => {
    if (googleAddress === null)
      return;
    geocodeByAddress(googleAddress.label).then(async (results) => {
      let canada = false;
      results[0].address_components.forEach((component) => {
        if (component.types.includes("country")) {
          canada = component.short_name === "CA";
        }
      });
      const latLng = await getLatLng(results[0]);
      return { ...latLng, inCanada: canada };
    }).then(({ lat, lng, inCanada }) => {
      const distance = haversineDistance(
        RLCOORDS.lat,
        RLCOORDS.lng,
        lat,
        lng
      );
      console.log(distance);
      if (distance < 50 && inCanada) {
        setShippable(true);
      }
    });
  }, [googleAddress]);
  const modal = useRef(null);
  return /* @__PURE__ */ jsx("section", { className: "text-gray-600 body-font overflow-hidden bg-neutral-300", children: /* @__PURE__ */ jsx("div", { className: "container px-5 py-24 mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "lg:w-4/5 mx-auto flex flex-wrap", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm title-font text-gray-500 tracking-widest", children: category }),
      /* @__PURE__ */ jsx("h1", { className: "text-gray-900 text-3xl title-font font-medium mb-4", children: name }),
      /* @__PURE__ */ jsxs("div", { className: "flex mb-4", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            onClick: () => {
              setTab("description");
            },
            className: `flex-grow border-b-2 py-2 text-lg px-1 border-gray-300 cursor-pointer ${tab === "description" && "border-red-500 text-red-500"}`,
            children: "Description"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: `flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 cursor-pointer ${tab === "reviews" && "border-red-500 text-red-500"}`,
            onClick: () => {
              setTab("reviews");
            },
            children: "Reviews"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: `flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 cursor-pointer ${tab === "details" && "border-red-500 text-red-500"}`,
            onClick: () => {
              setTab("details");
            },
            children: "Details"
          }
        )
      ] }),
      tab === "description" && /* @__PURE__ */ jsx("p", { className: "leading-relaxed mb-4", children: description }),
      /* @__PURE__ */ jsxs("div", { className: "flex border-t border-gray-200 py-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Stock" }),
        /* @__PURE__ */ jsx("span", { className: "ml-auto text-gray-900", children: inventoryCount })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex border-t border-gray-200 py-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: attr1.name }),
        /* @__PURE__ */ jsx("span", { className: "ml-auto text-gray-900", children: attr1.value })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex border-t border-b mb-6 border-gray-200 py-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Quantity" }),
        /* @__PURE__ */ jsx("span", { className: "ml-auto text-gray-900", children: inventoryCount })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "title-font font-medium text-2xl text-gray-900", children: price }),
          /* @__PURE__ */ jsx(
            "input",
            {
              onChange: (e) => {
                setQuantity(parseInt(e.target.value));
              },
              name: "quantity",
              value: quantity,
              type: "number",
              max: inventoryCount,
              min: 0,
              className: "dark:text-white px-2 rounded"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-primary ml-auto bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded",
            onClick: () => {
              modal.current?.showModal();
            },
            children: "Buy"
          }
        ),
        /* @__PURE__ */ jsxs("dialog", { id: "my_modal_2", className: "modal", ref: modal, children: [
          /* @__PURE__ */ jsx("div", { className: "modal-box text-white h-auto pb-48", children: /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Shipping" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "shippingModal",
                  type: "checkbox",
                  className: "toggle",
                  onChange: () => {
                    setShipping(!shipping);
                  }
                }
              )
            ] }),
            shipping && /* @__PURE__ */ jsx(
              GooglePlacesAutocomplete,
              {
                selectProps: {
                  styles: {
                    input: (provided) => ({
                      ...provided,
                      color: "black"
                    }),
                    option: (provided) => ({
                      ...provided,
                      color: "black"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "black"
                    })
                  },
                  onChange: (e) => {
                    if (e !== null)
                      setGoogleAddress(e);
                  }
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                className: `text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded absolute bottom-4 right-4 ${shipping && !shippable && "btn-disabled"}  
                      `,
                href: `../api/checkout?id=${id}&quantity=${quantity}&shipping=${shipping}`,
                children: "Buy Now"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("form", { method: "dialog", className: "modal-backdrop", children: /* @__PURE__ */ jsx("button", { children: "close" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "ecommerce",
        className: "lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded",
        src: imageUrl
      }
    )
  ] }) }) });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$item = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$item;
  const date = /* @__PURE__ */ new Date();
  const client = await new Client({
    accessToken: "EAAAF2y_qo6mTkW0SVC2jq-_ItQOrfSPMlLoR8u2m5ijEK0XagGuUqSKAuaEVCrj",
    environment: Environment.Production
  });
  const getItem = async () => {
    try {
      if (Astro2.params.item?.includes("svg"))
        return new Response("No Item", { status: 404 });
      if (Astro2.params.item === void 0)
        return new Response("No Item", { status: 404 });
      const response = await client.catalogApi.retrieveCatalogObject(
        Astro2.params.item
      );
      return response;
    } catch (error) {
      console.error(error);
      return new Response(error, { status: 500 });
    }
  };
  const getImageUrl = async (imageId) => {
    try {
      const fetchImage = await client.catalogApi.retrieveCatalogObject(imageId);
      return fetchImage.result.object?.imageData?.url;
    } catch (err) {
      console.log(err);
      return new Response(err, { status: 500 });
    }
  };
  const getInventoryCount = async (variationId) => {
    try {
      const inventoryCount2 = await client.inventoryApi.retrieveInventoryCount(
        variationId,
        "LT6VCG48B673C"
      );
      if (!inventoryCount2.result.counts)
        return 0;
      return inventoryCount2.result.counts[0].quantity;
    } catch (err) {
      console.log(err);
      return new Response(err, { status: 500 });
    }
  };
  const getCategory = async (categoryId) => {
    try {
      const category2 = await client.catalogApi.retrieveCatalogObject(categoryId);
      return category2.result.object?.categoryData?.name;
    } catch (err) {
      console.log(err);
      return new Response(err, { status: 500 });
    }
  };
  if (Astro2.params.item?.includes("svg"))
    return Astro2.redirect("/shop");
  if (Astro2.params.item === void 0)
    return Astro2.redirect("/shop");
  const item = await getItem();
  if (!item.result)
    return Astro2.redirect("/shop");
  const imageUrl = await getImageUrl(item.result.object.itemData.imageIds[0]);
  const inventoryCount = await getInventoryCount(
    item.result.object.itemData.variations[0].id
  );
  const category = await getCategory(item.result.object.itemData.categoryId);
  if (item.result.object.customAttributeValues === void 0)
    return new Response("No Custom Attributes Found", { status: 500 });
  const customAttributes = Object.values(
    item.result.object.customAttributeValues
  );
  if (!item.result.object.itemData.variations)
    return new Response("Missing Item Variations eg. Price, Inventory Amount", {
      status: 500
    });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "R&L Packaging" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["", '<header class="sticky top-0 z-50">', '</header><main class="min-h-screen">', '<!-- <h1 class="text-3xl text-center">\n      {response.object?.itemData.name}\n    </h1>\n    <div class="flex flex-wrap">\n      <img src={imageUrl} alt="Product Image" />\n      <p>\n        Stock: {\n          inventoryCount.result.counts &&\n            inventoryCount.result.counts[0]?.quantity\n        }\n      </p>\n      <a\n        href={`../checkout?id=${response.object.id}&quantity=1`}\n        class="btn"\n        id="buyLink">Buy Now</a\n      >\n      <label for="quantity">How Many?</label>\n      <input\n        type="number"\n        name="quantity"\n        id="quantity"\n        class="h-min w-10"\n        value="1"\n      />\n    </div> --></main><footer class="footer footer-center p-10 bg-base-200 text-base-content rounded"><div class="grid grid-flow-col gap-4"><a class="link link-hover home-scroll">Home</a><a class="link link-hover about-scroll">About</a><a class="link link-hover history-scroll">History</a><a class="link link-hover contact-scroll">Contact</a></div><div><p>\nCopyright \xA9 ', ' - All right reserved by R&L Packaging\n</p><p class="text-xs">\nWebsite designed by <a href="https://jedborseth.com">Jed Borseth</a></p></div></footer><script defer>\n    const input = document.getElementById("quantity");\n    const link = document.getElementById("buyLink");\n    if (link && input)\n      input.addEventListener("change", () => {\n        link.href = link.href.split("&")[0];\n        link.href =\n          link.href + `&quantity=${input.value === "" ? 0 : input.value}`;\n      });\n  <\/script><script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBINBUPEQ-HAJN0JyrUl6lzk7BA2sPMyM&libraries=places"><\/script>'], ["", '<header class="sticky top-0 z-50">', '</header><main class="min-h-screen">', '<!-- <h1 class="text-3xl text-center">\n      {response.object?.itemData.name}\n    </h1>\n    <div class="flex flex-wrap">\n      <img src={imageUrl} alt="Product Image" />\n      <p>\n        Stock: {\n          inventoryCount.result.counts &&\n            inventoryCount.result.counts[0]?.quantity\n        }\n      </p>\n      <a\n        href={\\`../checkout?id=\\${response.object.id}&quantity=1\\`}\n        class="btn"\n        id="buyLink">Buy Now</a\n      >\n      <label for="quantity">How Many?</label>\n      <input\n        type="number"\n        name="quantity"\n        id="quantity"\n        class="h-min w-10"\n        value="1"\n      />\n    </div> --></main><footer class="footer footer-center p-10 bg-base-200 text-base-content rounded"><div class="grid grid-flow-col gap-4"><a class="link link-hover home-scroll">Home</a><a class="link link-hover about-scroll">About</a><a class="link link-hover history-scroll">History</a><a class="link link-hover contact-scroll">Contact</a></div><div><p>\nCopyright \xA9 ', ' - All right reserved by R&L Packaging\n</p><p class="text-xs">\nWebsite designed by <a href="https://jedborseth.com">Jed Borseth</a></p></div></footer><script defer>\n    const input = document.getElementById("quantity");\n    const link = document.getElementById("buyLink");\n    if (link && input)\n      input.addEventListener("change", () => {\n        link.href = link.href.split("&")[0];\n        link.href =\n          link.href + \\`&quantity=\\${input.value === "" ? 0 : input.value}\\`;\n      });\n  <\/script><script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBINBUPEQ-HAJN0JyrUl6lzk7BA2sPMyM&libraries=places"><\/script>'])), maybeRenderHead(), renderComponent($$result2, "Navbar", $$Navbar, {}), imageUrl && typeof inventoryCount && category && item.object ? "Loading..." : renderTemplate`${renderComponent($$result2, "SingleShopItem", SingleShopItem, { "client:load": true, "name": item.result.object.itemData.name, "imageUrl": imageUrl, "inventoryCount": inventoryCount, "price": (Number(
    item.result.object.itemData.variations[0].itemVariationData.priceMoney.amount
  ) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "CAD"
  }), "id": item.result.object.id, "description": item.result.object.itemData.description, "category": category, "attr1": {
    name: customAttributes[0].name,
    value: customAttributes[0].stringValue
  }, "client:component-hydration": "load", "client:component-path": "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/SingleShopItem", "client:component-export": "default" })}`, date.getFullYear()) })}`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/shop/[item].astro", void 0);

const $$file = "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/shop/[item].astro";
const $$url = "/shop/[item]";

export { $$item as default, $$file as file, $$url as url };
