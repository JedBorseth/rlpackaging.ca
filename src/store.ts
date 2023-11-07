import { persistentAtom } from "@nanostores/persistent";

export const cart = persistentAtom<
  { name: string; id: string; quantity: number }[]
>("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
