import { useEffect, useState } from "react";
import { cart } from "../store";
import type { CartTypes } from "../store";

const CartBtn = () => {
  const [cartItems, setCartItems] = useState<CartTypes>([]);
  const [secret, setSecret] = useState<number>(0);

  useEffect(() => {
    cart.subscribe(() => {
      setCartItems(cart.get());
    });
  }, []);

  const clearItem = (id: string) => {
    cart.set(cartItems.filter((item) => item.id !== id));
  };
  useEffect(() => {
    if (secret >= 10)
      setTimeout(() => {
        setSecret(0);
      }, 2500);
  }, [secret]);

  return (
    <li
      className={`rounded ${secret > 10 ? "animate-spin" : ""}`}
      onDoubleClick={() => {
        if (secret < 10) setSecret(secret + 1);
      }}
    >
      <details className="dropdown">
        <summary className="flex p-5 px-10 md:py-[8px] md:px-[16px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart-dash"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </summary>
        <ul className="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box sm:w-52 w-64 md:right-2 right-4 md:top-11 top-14 border">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="w-full hover:bg-red-500 transition-all p-2"
            >
              <div>
                <a href={`../shop/${item.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                    <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                  </svg>
                </a>
                {item.name} ({item.quantity})
                <button
                  onClick={() => {
                    clearItem(item.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
          {cartItems.length === 0 ? (
            <li className="w-full p-2 text-sm text-center">
              Your cart is empty...
            </li>
          ) : (
            <li className="border-t mt-5 pt-2 w-full flex flex-row">
              <a className="w-1/2 text-center" href="../cart">
                View Cart
              </a>
              <button className="w-1/2 text-center p-2" onClick={() => {}}>
                Buy Now
              </button>
            </li>
          )}
        </ul>
      </details>
    </li>
  );
};

export default CartBtn;
