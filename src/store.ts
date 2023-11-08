import { persistentAtom } from "@nanostores/persistent";

export const cart = persistentAtom<CartTypes>("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export type CartTypes = {
  name: string;
  id: string;
  quantity: number;
  details: {
    attr1: { name: string; value: string };
    price: string;
    imageUrl: string | Response;
    category: string | Response;
    inventoryCount: string | Response;
    description: string;
  };
}[];
