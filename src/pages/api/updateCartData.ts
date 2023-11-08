import type { CatalogObject, RetrieveCatalogObjectResponse } from "square";
import { Client, Environment } from "square";
import type { APIRoute } from "astro";
import type { APIContext } from "astro";

// This endpoint should take in a cart array and return the same array with updated inventory and price data
export const POST: APIRoute = async ({ request, redirect }) => {
  if (import.meta.env.SQUARE_ACCESS_TOKEN === undefined) {
    console.log("No Square Access Token");
    return new Response("No Square Access Token", { status: 500 });
  }
  const client = await new Client({
    accessToken: import.meta.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
  });
  const cart = await request.json();
  const getItem = async (id: string) => {
    try {
      const response = await client.catalogApi.retrieveCatalogObject(id);
      return response.result;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };
  const getCategory = async (catId: string) => {
    try {
      const category = await client.catalogApi.retrieveCatalogObject(catId);
      return category.result.object?.categoryData?.name;
    } catch (err: any) {
      console.log(err);
      return new Response(err, { status: 500 });
    }
  };
  const getImgUrl = async (imgId: string) => {
    try {
      const fetchImage = await client.catalogApi.retrieveCatalogObject(imgId);
      return fetchImage.result.object?.imageData?.url;
    } catch (err: any) {
      console.log(err);
      return new Response(err, { status: 500 });
    }
  };
  const getInventory = async (variationId: string) => {
    try {
      const inventoryCount = await client.inventoryApi.retrieveInventoryCount(
        variationId,
        "LT6VCG48B673C"
      );

      if (!inventoryCount.result.counts) return "0";
      return inventoryCount.result.counts[0].quantity;
    } catch (err: any) {
      console.log(err);
      return new Response(err, { status: 500 });
    }
  };
  const newCart = [];
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const newItemData = await getItem(item.id);
    const price = (
      Number(
        newItemData.object?.itemData?.variations?.[0]?.itemVariationData
          ?.priceMoney?.amount ?? 0
      ) / 100
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "CAD",
    });
    const customAttr = Object.values(
      newItemData.object?.customAttributeValues ?? ""
    );
    const inventory = await getInventory(
      newItemData?.object?.itemData?.variations?.[0]?.id ?? ""
    );

    const category = await getCategory(
      newItemData.object?.itemData?.categoryId ?? ""
    );
    const imageUrl = await getImgUrl(
      newItemData.object?.itemData?.imageIds?.[0] ?? ""
    );
    const newCartItem = {
      name: newItemData.object?.itemData?.name,
      id: newItemData.object?.id,
      quantity: item.quantity,
      details: {
        attr1: { name: customAttr[0].name, value: customAttr[0].stringValue },
        price: price,
        category: category,
        description: newItemData.object?.itemData?.description,
        imageUrl: imageUrl,
        inventoryCount: inventory,
      },
    };
    newCart.push(newCartItem);
  }
  return new Response(JSON.stringify(newCart), { status: 200 });
};
