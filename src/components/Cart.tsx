import { useState, useEffect } from "react";
import { cart } from "../store";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState<
    { name: string; quantity: number; id: string }[]
  >([]);
  const clearCart = () => {
    cart.set([]);
  };
  const removeItem = (id: string) => {
    cart.set(cartItems.filter((item) => item.id !== id));
  };
  const changeQuantity = (id: string, quantity: number) => {
    cart.set(
      cartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    cart.subscribe(() => {
      setCartItems(cart.get());
    });
  }, []);
  return (
    <div className="min-h-screen w-full flex justify-center items-center text-gray-900 bg-neutral-300 transition-all">
      <div>
        <h1 className="text-3xl text-center underline underline-offset-2 font-semibold">
          Your Cart
        </h1>
        {cartItems.length >= 0
          ? cartItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="lg:w-1/4 md:w-1/2 p-8 w-full md:tooltip relative"
                  data-tip={"No Description For Product"}
                >
                  <a
                    className="block relative rounded overflow-hidden w-full"
                    href={`./shop/${item.id}`}
                  >
                    <img
                      alt="image of item"
                      className="object-cover object-center w-full h-24 block"
                      src="https://dummyimage.com/420x260"
                    />
                  </a>
                  <h3 className="text-red-600 absolute top-5 right-5 font-bold">
                    x{item.quantity}
                  </h3>
                  <div className="flex flex-wrap items-center gap-5">
                    <h2 className="text-gray-900 title-font text-lg font-medium w-full">
                      {item.name}
                    </h2>
                    <form
                      className="flex-1 flex gap-2 justify-between"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const quantity = parseInt(
                          e.currentTarget.quantity.value
                        );
                        changeQuantity(item.id, quantity);
                      }}
                    >
                      <div>
                        <button
                          onClick={() => {
                            removeItem(item.id);
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
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          defaultValue={item.quantity}
                          className="w-24 text-white p-1 rounded"
                        />
                      </div>

                      <button type="submit" className="btn btn-sm btn-neutral">
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              );
            })
          : null}
        {cartItems.length !== 0 ? (
          <div className="flex justify-between w-full p-20">
            <button
              className="btn"
              onClick={() => {
                clearCart();
              }}
            >
              Clear All
            </button>
            <button className="btn btn-primary ml-auto bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
              Buy All
            </button>
          </div>
        ) : (
          <>
            <p className="h-48 text-center">No items in cart</p>
            <a href="../shop" className="btn">
              Return to shop
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default CartComponent;
