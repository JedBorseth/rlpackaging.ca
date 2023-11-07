import { useEffect, useState } from "react";
import { cart } from "../store";

const CartBtn = () => {
  const [cartItems, setCartItems] = useState<
    { name: string; quantity: number; id: string }[]
  >([]);

  useEffect(() => {
    cart.subscribe(() => {
      setCartItems(cart.get());
    });
  }, []);

  return (
    <li className="rounded">
      <details className="dropdown">
        <summary className="flex">
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
        <ul className="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box sm:w-52 w-64 right-2 top-11 border">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="w-full hover:bg-red-500 transition-all p-2"
            >
              <a href={`../shop/${item}`}>
                {item.name} ({item.quantity})
              </a>
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
