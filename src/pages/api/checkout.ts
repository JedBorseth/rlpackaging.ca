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
  const id = queryParams.get("id");
  const quantity = queryParams.get("quantity");
  if (!id || !quantity)
    return new Response("Missing required fields", { status: 400 });

  const createUrl = async () => {
    try {
      const response = await client.catalogApi.retrieveCatalogObject(id);
      return response.result;
    } catch (error: any) {
      console.log(error);
      redirect("/shop");
    }
  };

  const item = await createUrl();
  if (item?.object?.id !== id) return redirect("/shop");

  const generatePaymentUrl = async () => {
    try {
      const response = await client.checkoutApi.createPaymentLink({
        order: {
          locationId: "LT6VCG48B673C",
          lineItems: [
            {
              quantity: quantity,
              catalogObjectId: item?.object?.itemData?.variations?.[0]?.id,
            },
          ],
        },
        checkoutOptions: {
          redirectUrl: "https://rlpackaing.ca/api/cleanupCheckoutUrls",
          merchantSupportEmail: "orders@rlpackaging.ca",
          askForShippingAddress: true,
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
