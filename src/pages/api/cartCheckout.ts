import type { CatalogObject, RetrieveCatalogObjectResponse } from "square";
import { Client, Environment } from "square";
import type { APIRoute } from "astro";
import type { APIContext } from "astro";

export const GET: APIRoute = async ({ request, redirect }) => {
  if (import.meta.env.SQUARE_ACCESS_TOKEN === undefined) {
    console.log("No Square Access Token");
    return new Response("No Square Access Token", { status: 500 });
  }
  const client = await new Client({
    accessToken: import.meta.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
  });
  const queryParams = new URL(request.url).searchParams;
  const ids = queryParams.get("ids");
  const amounts = queryParams.get("amounts");
  if (!ids || !amounts)
    return new Response("Missing required fields", { status: 400 });
  const idArr = ids.split(",");
  const amountArr = amounts.split(",");
  const getItemObj = async (id: string) => {
    try {
      const response = await client.catalogApi.retrieveCatalogObject(id);
      return response.result;
    } catch (error: any) {
      console.log(error);
      redirect("/shop");
    }
  };
  const itemArr: any[] = [];
  for (let i = 0; i < idArr.length; i++) {
    const item = await getItemObj(idArr[i]);
    if (item?.object?.id !== idArr[i]) return redirect("/shop");
    itemArr.push({ ...item, quantity: amountArr[i] });
  }

  const generatePaymentUrl = async () => {
    const shippingOptions = () => {
      if (queryParams.get("shipping") === "true")
        return {
          name: "Shipping Fee",
          charge: {
            amount: BigInt(5000),
            currency: "CAD",
          },
        };
      else {
        return undefined;
      }
    };
    const lineItems = () => {
      const arr = [];
      for (let i = 0; i < itemArr.length; i++) {
        arr.push({
          quantity: itemArr[i].quantity,
          catalogObjectId: itemArr[i].object.itemData.variations[0].id,
        });
      }
      return arr;
    };
    try {
      const response = await client.checkoutApi.createPaymentLink({
        order: {
          locationId: "LT6VCG48B673C",
          lineItems: lineItems(),
        },
        checkoutOptions: {
          redirectUrl: "https://rlpackaging.ca/api/cleanupCheckoutUrls",
          merchantSupportEmail: "orders@rlpackaging.ca",
          askForShippingAddress: true,
          shippingFee: shippingOptions(),
        },
      });
      return response.result.paymentLink;
    } catch (err) {
      console.log("Url Gen Error: ", err);
    }
  };
  const link = await generatePaymentUrl();
  if (!link) return redirect("/shop");
  return redirect(link.longUrl ?? "/shop");
};
