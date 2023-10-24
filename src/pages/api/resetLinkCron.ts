import client from "square";

export async function GET({ params, request }) {
  return new Response(JSON.stringify({ message: "Links Cleared" }));

  const clearLinks = async () => {
    try {
      const allLinks = await client.checkoutApi.listPaymentLinks();
      if (!allLinks.result.paymentLinks) return console.log("No Links");
      allLinks.result.paymentLinks.forEach(async (link: { id: string }) => {
        await client.checkoutApi.deletePaymentLink(link.id);
      });
      return new Response(JSON.stringify({ message: "Links Cleared" }));
    } catch (error) {
      console.log(error);
    }
  };

  clearLinks();
}
