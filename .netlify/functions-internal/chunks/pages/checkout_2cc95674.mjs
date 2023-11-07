import { Client, Environment } from 'square';

const GET = async ({ request, redirect }) => {
  const client = await new Client({
    accessToken: "EAAAF2y_qo6mTkW0SVC2jq-_ItQOrfSPMlLoR8u2m5ijEK0XagGuUqSKAuaEVCrj",
    environment: Environment.Production
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
    } catch (error) {
      console.log(error);
      redirect("/shop");
    }
  };
  const item = await createUrl();
  if (item?.object?.id !== id)
    return redirect("/shop");
  const generatePaymentUrl = async () => {
    const shippingOptions = () => {
      if (queryParams.get("shipping") === "true")
        return {
          name: "Shipping Fee",
          charge: {
            amount: BigInt(5e3),
            currency: "CAD"
          }
        };
      else {
        return void 0;
      }
    };
    try {
      const response = await client.checkoutApi.createPaymentLink({
        order: {
          locationId: "LT6VCG48B673C",
          lineItems: [
            {
              quantity,
              catalogObjectId: item?.object?.itemData?.variations?.[0]?.id
            }
          ]
        },
        checkoutOptions: {
          redirectUrl: "https://rlpackaging.ca/api/cleanupCheckoutUrls",
          merchantSupportEmail: "orders@rlpackaging.ca",
          askForShippingAddress: true,
          shippingFee: shippingOptions()
        }
      });
      return response.result.paymentLink;
    } catch (err) {
      console.log("Url Gen Error: ", err);
    }
  };
  const link = await generatePaymentUrl();
  if (!link)
    return redirect("/shop");
  return redirect(link.longUrl ?? "/shop");
};

export { GET };
