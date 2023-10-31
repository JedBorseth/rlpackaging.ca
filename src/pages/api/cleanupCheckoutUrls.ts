import { Client, Environment } from "square";
import type { APIRoute } from "astro";
import { Debug } from "astro:components";

export const GET: APIRoute = async ({ request, redirect, params }) => {
  if (import.meta.env.SQUARE_ACCESS_TOKEN === undefined) {
    console.log("No Square Access Token");
    return new Response("No Square Access Token", { status: 500 });
  }
  const client = await new Client({
    accessToken: import.meta.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
  });

  const getAllUrls = async () => {
    try {
      const response = await client.checkoutApi.listPaymentLinks();
      //   console.log(response.result.paymentLinks);
      return response.result.paymentLinks;
    } catch (error) {
      console.log(error);
    }
  };

  const urlsArr = await getAllUrls();
  console.log(request);
  return new Response(JSON.stringify(request), { status: 500 });
};
