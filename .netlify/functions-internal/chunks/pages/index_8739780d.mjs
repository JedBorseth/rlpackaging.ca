/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, j as renderComponent, i as addAttribute } from '../astro_923132a5.mjs';
import 'clsx';
import { $ as $$Navbar, a as $$Layout } from './404_02ed58ba.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState } from 'react';
import { Client, Environment } from 'square';

const $$Astro$4 = createAstro();
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Hero;
  const { title, subtitle } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero min-h-screen bg-base-200"><div class="hero-content flex-col sm:flex-row-reverse row-span-2"><img src="./logo.svg" class="max-w-sm rounded-lg shadow-2xl"><div><h1 class="text-5xl font-bold">${title}</h1><h2 class="text-xs italic">Abbotsford Packaging Company</h2><p class="py-6">${subtitle}</p><button class="btn btn-primary" id="learn-more" aria-label="Scroll to values section">Learn More</button></div></div><div class="flex justify-center row-start-3"><img src="./arrow-down-circle-fill.svg" alt="down" class="p-10 cursor-pointer fill-white" id="down-arrow"></div></section>`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/Hero.astro", void 0);

const $$Astro$3 = createAstro();
const $$Services = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Services;
  const { title, item1, item2, item3 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="min-h-screen grid justify-items-center" id="about"><div class="sm:col-span-3 self-center py-10 md:py-0"><h2 class="text-4xl flex justify-center">${title}</h2></div><article class="card bg-primary text-primary-content mx-5 h-min"><div class="card-body"><h2 class="card-title">${item1.title}</h2><p>${item1.description}</p><div class="card-actions justify-end"></div></div></article><article class="card bg-primary text-primary-content mx-5 h-min"><div class="card-body"><h2 class="card-title">${item2.title}</h2><p>${item2.description}</p><div class="card-actions justify-end"></div></div></article><article class="card bg-primary text-primary-content mx-5 h-min"><div class="card-body"><h2 class="card-title">${item3.title}</h2><p>${item3.description}</p><div class="card-actions justify-end"></div></div></article></section>`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/Services.astro", void 0);

const History = ({ title }) => {
  const ref = useRef();
  const [value, setValue] = useState("Humbly Confident");
  const historyItems = [
    {
      key: 1,
      title: "Humbly Confident",
      description: "We believe in embracing challenges, learning from every experience, and always seeking ways to enhance what we offer you. Our confidence stems from a deep understanding of our capabilities, but it is rooted in a humility that reminds us there is always room to grow. We are not immune to mistakes, rather our dedication to your satisfaction drives us to innovate and adapt while maintaining a steadfast commitment to quality. It's our way of showing you that we're passionate about what we do and dedicated to delivering the best possible results. Rest assured, we approach every task with a sense of responsibility and respect for your trust in us. We listen, we learn, and we evolve, always with your best interests in mind."
    },
    {
      key: 2,
      title: "Team Player",
      description: "At our core, we believe in the power of collaboration and partnership. We're dedicated to fostering close working relationships with our clients, taking the time to truly understand their objectives, and customizing our solutions to suit their individual needs. Your success is our shared goal, and we're committed to working hand-in-hand with you every step of the way to achieve it."
    },
    {
      key: 3,
      title: "Invested",
      description: "Investment in your vision is our driving force. We're deeply committed to understanding your goals and aligning our resources and expertise to support your unique vision. Your success is our investment, and we're dedicated to partnering with you, providing the insights and resources needed to help your ideas grow and thrive."
    },
    {
      key: 4,
      title: "Attention to Detail",
      description: "Details are the building blocks of excellence, and we understand their importance. We approach your project with a keen eye for detail, thoroughly examining every component to guarantee that the final outcome is nothing short of excellence."
    },
    {
      key: 5,
      title: "Solutions Focused",
      description: "At our core, we're driven by the pursuit of solutions. We approach challenges with a forward-thinking mindset, seeking innovative paths to overcome obstacles and deliver results. Our dedication to being solution-focused means we're always ready to tackle your unique challenges head-on, providing you with effective answers and strategies to propel your goals forward."
    }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "min-h-screen grid grid-rows-3 bg-base-200 place-items-center",
      id: "history",
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-center mt-5", children: /* @__PURE__ */ jsx("h2", { className: "text-5xl", children: title }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-3/4 h-fit justify-self-center row-start-3 border rounded shadow-lg",
            ref,
            children: /* @__PURE__ */ jsx("div", { className: "h-full flex justify-evenly flex-wrap", children: historyItems.map((item) => {
              return /* @__PURE__ */ jsx(
                HistoryItem,
                {
                  title: item.title,
                  setValue
                },
                item.key
              );
            }) })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-center w-2/3 justify-self-center sm:p-5", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl", children: value }),
          historyItems.map((item) => {
            if (item.title === value) {
              return /* @__PURE__ */ jsx("p", { children: item.description }, item.key);
            }
          })
        ] })
      ]
    }
  );
};
const HistoryItem = ({ title, setValue }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `w-28 h-28 rounded-full flex justify-center items-center cursor-pointer border shadow-xl z-10 text-center bg-primary-focus hover:bg-primary m-1`,
      onClick: () => {
        setValue(title);
        document.querySelector("#history")?.scrollIntoView({ block: "center" });
      },
      children: /* @__PURE__ */ jsx("h2", { children: title })
    }
  );
};

function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if (data.sent) {
      setResponseMessage(
        "Thank you for the message! We'll get back to you as soon as possible."
      );
      setTimeout(() => {
        setResponseMessage("");
        e.target.reset();
      }, 5e3);
    }
    if (data.message) {
      setResponseMessage(data.message);
    }
  }
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        submit(e);
      },
      className: "flex col-span-2 flex-col gap-5 sm:col-start-2 row-span-2 text-left",
      children: [
        /* @__PURE__ */ jsxs("label", { className: " p-1 m-2 flex flex-col", children: [
          "Name",
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "name",
              name: "name",
              required: true,
              placeholder: "Enter your name...",
              className: "input input-bordered input-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: " p-1 m-2 flex flex-col", children: [
          "Email",
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              id: "email",
              name: "email",
              required: true,
              placeholder: "sample@example.com",
              className: "input input-bordered input-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: " p-1 m-2 flex flex-col", children: [
          "Message",
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "message",
              name: "message",
              placeholder: "Type your message here...",
              className: "textarea textarea-primary min-h-[10rem]"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-primary rounded place-self-center hover:-translate-y-2 transition-all",
            "data-sitekey": "6LcMH7QnAAAAADn39cJqVnr9wFqZCKhVBO2Ll1RW",
            "data-callback": "onSubmit",
            "data-action": "submit",
            children: "Send"
          }
        ),
        responseMessage && /* @__PURE__ */ jsx("p", { children: responseMessage })
      ]
    }
  );
}

const $$Astro$2 = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${maybeRenderHead()}<section class="min-h-screen grid grid-cols-2 pt-5" id="contact"><div class="col-span-2 self-end pb-5 text-center"><h2 class="text-4xl">Contact Us!</h2><h3>Want to get in touch? Feel free to contact us using any of the methods below.</h3></div>${renderComponent($$result, "Form", Form, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/Form", "client:component-export": "default" })}<div class="row-start-2 flex flex-col justify-center text-center col-span-2 sm:col-auto text-xl" id="contact-info"><h2 class="p-4">Email us at <span class="text-primary">orders@rlpackaging.ca</span></h2><h2 class="p-4">Call us at <span class="text-primary">604-758-6040</span></h2><h2 class="p-4">Visit us at <span class="text-primary">30945 Wheel Avenue, Abbotsford, B.C.</span></h2><h2 class="p-4">Or fill out our online form!</h2></div></section>`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/Contact.astro", void 0);

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const date = /* @__PURE__ */ new Date();
  const service1 = {
    title: "Assembling and Manual Labour Services",
    description: "Wine partitions, box separators and intricate die cut items can be difficult to handle when it comes to small volume. Our team of assemblers and general labours can handle orders of any size. From 1 box to a 1 truck load."
  };
  const service2 = {
    title: "Custom Die Cutting",
    description: "From regular flat bed to mini rotary and large rotary die cutting. We have the capability of handling almost all types of material and sizes."
  };
  const service3 = {
    title: "Small to medium Volume boxes",
    description: "Is your Stock box not quite right? All sorts of shapes and sizes with no minimum requirement and 4 Color printing capability."
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "R&L Packaging" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50">${renderComponent($$result2, "Navbar", $$Navbar, {})}</header><main class="">${renderComponent($$result2, "Hero", $$Hero, { "title": "R&L Packaging", "subtitle": "Solution Focused on difficult projects for your packaging needs. We do our best to help in areas where no one else can. With no minimums and a support mentality, we are the partner to the small business, distributor, and packaging manufacturer." })}${renderComponent($$result2, "Services", $$Services, { "title": "Our Unique Abilities", "item1": service1, "item2": service2, "item3": service3 })}${renderComponent($$result2, "History", History, { "title": "Our Values", "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/components/History", "client:component-export": "default" })}${renderComponent($$result2, "Contact", $$Contact, {})}</main><footer class="footer footer-center p-10 bg-base-200 text-base-content rounded"><div class="grid grid-flow-col gap-4"><a class="link link-hover home-scroll">Home</a><a class="link link-hover about-scroll">About</a><a class="link link-hover history-scroll">History</a><a class="link link-hover contact-scroll">Contact</a><a class="link link-hover" href="/shop">Shop</a></div><div><p>
Copyright © ${date.getFullYear()} - All right reserved by R&L Packaging
</p><p class="text-xs">
Website designed by <a href="https://jedborseth.com">Jed Borseth</a></p></div></footer>` })}`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/index.astro", void 0);

const $$file$1 = "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/index.astro";
const $$url$1 = "";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const date = /* @__PURE__ */ new Date();
  const client = await new Client({
    accessToken: "EAAAF2y_qo6mTkW0SVC2jq-_ItQOrfSPMlLoR8u2m5ijEK0XagGuUqSKAuaEVCrj",
    environment: Environment.Production
  });
  const getCatalogItems = async () => {
    try {
      const response = await client.catalogApi.searchCatalogItems({
        limit: 50
      });
      return response.result.items;
    } catch (error) {
      console.error(error);
    }
  };
  const items = await getCatalogItems();
  const fetchInventory = async (item) => {
    try {
      const response = await client.inventoryApi.retrieveInventoryCount(
        item.itemData?.variations[0].id,
        "LT6VCG48B673C"
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchImageUrls = async (item) => {
    try {
      const response = await client.catalogApi.retrieveCatalogObject(
        item.itemData?.imageIds[0]
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategory = async (item) => {
    try {
      const response = await client.catalogApi.retrieveCatalogObject(
        item.itemData?.categoryId
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const success = Astro2.url.searchParams.get("success");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "R&L Packaging" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50">${renderComponent($$result2, "Navbar", $$Navbar, {})}</header><main>${success && renderTemplate`<div class="alert alert-success"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Your purchase has been confirmed!</span></div>`}<section class="text-gray-600 body-font bg-neutral-300 min-h-screen"><div class="container px-5 py-24 mx-auto"><div class="flex flex-wrap -m-4">${items ? items.map(async (item) => {
    const price = item?.itemData?.variations && item?.itemData.variations[0].itemVariationData?.priceMoney?.amount;
    const inventory = await fetchInventory(item);
    const imgUrl = await fetchImageUrls(item);
    const category = await fetchCategory(item);
    return renderTemplate`<div class="lg:w-1/4 md:w-1/2 p-4 w-full md:tooltip"${addAttribute(
      item.itemData?.description ? item.itemData.description : "No Description For Product",
      "data-tip"
    )}><a class="block relative h-48 rounded overflow-hidden"${addAttribute(`./shop/${item.id}`, "href")}><img alt="ecommerce" class="object-cover object-center w-full h-full block"${addAttribute(imgUrl?.result?.object?.imageData?.url, "src")}></a><div class="mt-4"><h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">${category?.result.object?.categoryData?.name}</h3><h2 class="text-gray-900 title-font text-lg font-medium">${item.itemData?.name}</h2><p class="mt-1">${(Number(price) / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "CAD"
    })}
- Stock:
${inventory && inventory.result?.counts && inventory.result.counts[0].quantity}</p></div></div>`;
  }) : "Loading"}</div></div></section></main><footer class="footer footer-center p-10 bg-base-200 text-base-content rounded"><div class="grid grid-flow-col gap-4"><a class="link link-hover home-scroll">Home</a><a class="link link-hover about-scroll">About</a><a class="link link-hover history-scroll">History</a><a class="link link-hover contact-scroll">Contact</a></div><div><p>
Copyright © ${date.getFullYear()} - All right reserved by R&L Packaging
</p><p class="text-xs">
Website designed by <a href="https://jedborseth.com">Jed Borseth</a></p></div></footer>` })}`;
}, "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/shop/index.astro", void 0);

const $$file = "/Users/jedborseth/Documents/2023/rlpackaging.ca/src/pages/shop/index.astro";
const $$url = "/shop";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
