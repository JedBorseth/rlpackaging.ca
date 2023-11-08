import { useState, useEffect, useRef } from "react";
import { cart } from "../store";
import type { CartTypes } from "../store";
import toast, { Toaster } from "react-hot-toast";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { haversineDistance } from "../utils";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState<CartTypes | null>(null);
  const [total, setTotal] = useState<number>(0);
  const clearCart = () => {
    cart.set([]);
  };
  const removeItem = (id: string) => {
    if (cartItems !== null)
      cart.set(cartItems.filter((item) => item.id !== id));
  };
  const changeQuantity = (id: string, quantity: number) => {
    if (cartItems !== null) {
      const savedInvCount = Number(
        cartItems.filter((item) => item.id === id)[0].details.inventoryCount
      );
      if (savedInvCount <= quantity) {
        toast.error("Not enough stock, max: " + savedInvCount);
        return;
      }
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
    }
  };

  useEffect(() => {
    cart.subscribe(() => {
      setCartItems(cart.get());
    });
    const updateCartData = async () => {
      // This ensures that the cart data is up to date with the server
      const currentCart = cart.get();
      const res = await fetch("../api/updateCartData", {
        method: "POST",
        body: JSON.stringify(currentCart),
      });
      const data = await res.json();
      console.log(data, currentCart);
      cart.set(data);
    };
    updateCartData();
  }, []);

  useEffect(() => {
    if (cartItems === null) return;
    let total = 0;
    cart.get()?.forEach((item) => {
      total += Number(item.details.price.replace("CA$", "")) * item.quantity;
    });
    setTotal(total);
  }, [cartItems]);
  const createCartItemString = () => {
    if (cartItems === null) return "../404";
    const id = cartItems.map((item) => item.id).join(",");
    const quantity = cartItems.map((item) => item.quantity).join(",");
    return `../api/cartCheckout?ids=${id}&amounts=${quantity}&shipping=${shipping}`;
  };

  // Shipping Stuff
  const [shipping, setShipping] = useState(false);
  const [googleAddress, setGoogleAddress] = useState<any>(null);
  const [shippable, setShippable] = useState(false);

  const RLCOORDS = {
    lat: 49.04453454773623,
    lng: -122.36579867346927,
  };
  useEffect(() => {
    if (googleAddress === null) return;
    geocodeByAddress(googleAddress.label)
      .then(async (results) => {
        let canada = false;
        results[0].address_components.forEach((component) => {
          if (component.types.includes("country")) {
            canada = component.short_name === "CA";
          }
        });
        const latLng = await getLatLng(results[0]);
        return { ...latLng, inCanada: canada };
      })
      .then(({ lat, lng, inCanada }) => {
        const distance: number = haversineDistance(
          RLCOORDS.lat,
          RLCOORDS.lng,
          lat,
          lng
        );
        console.log(distance);
        if (distance < 50 && inCanada) {
          setShippable(true);
        } else {
          setShippable(false);
        }
      });
  }, [googleAddress]);

  const modal = useRef<any>(null);

  return (
    <>
      <Toaster />
      <div className="min-h-screen w-full flex justify-center items-center text-gray-900 bg-neutral-300 transition-all flex-wrap">
        <h1 className="text-3xl text-center underline underline-offset-2 font-semibold w-full">
          Your Cart
        </h1>
        <div className="grid grid-cols-1 w-2/3 py-5 gap-5 pt-8">
          {cartItems !== null && cartItems.length >= 0 ? (
            cartItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex gap-5 flex-wrap lg:flex-nowrap"
                >
                  <a className="" href={`./shop/${item.id}`}>
                    <img
                      alt="image of item"
                      className="h-24 w-32 object-cover rounded"
                      src={
                        item?.details?.imageUrl.toString() ??
                        "https://via.placeholder.com/150"
                      }
                    />
                  </a>
                  <div className="">
                    <h2 className="">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      {item.details.description.slice(0, 40)} [...]
                    </p>
                  </div>
                  <div className="grid lg:grid-cols-3 grid-cols-1 w-full">
                    <h2 className="hidden lg:block">
                      Each: <br />
                      {item.details.price}
                    </h2>
                    <form
                      className="flex h-min flex-row-reverse md:flex-row gap-1"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const quantity = parseInt(
                          e.currentTarget.quantity.value
                        );
                        changeQuantity(item.id, quantity);
                      }}
                    >
                      <div className="flex flex-wrap">
                        <label
                          htmlFor={`quantity-${item.id}`}
                          className="w-full"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          id={`quantity-${item.id}`}
                          defaultValue={item.quantity}
                          className="w-24 text-white p-1 rounded"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-sm btn-neutral self-end"
                      >
                        Update
                      </button>
                    </form>
                    <h2 className="text-right">
                      Total: <br />
                      {(
                        Number(item.details.price.replace("CA$", "")) *
                        item.quantity
                      ).toLocaleString("en-us", {
                        style: "currency",
                        currency: "CAD",
                      })}
                    </h2>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-16 h-16 border-4 border-red-400 border-solid rounded-full animate-spin self-center justify-self-center">
              .
            </div>
          )}
          <div className="flex justify-between w-full lg:p-20 flex-wrap lg:gap-y-10">
            {cartItems !== null && cartItems.length !== 0 ? (
              <>
                <div className="w-full pt-10 border-t border-black flex justify-between font-bold pb-4">
                  <span className="">{cartItems.length} Items</span>
                  <span>
                    {total.toLocaleString("en-us", {
                      style: "currency",
                      currency: "CAD",
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap w-min gap-2">
                  <a className="btn btn-warning" href="../shop">
                    Continue Shopping
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </a>
                  <button
                    className="btn"
                    onClick={() => {
                      clearCart();
                      toast.success("Cleared cart");
                    }}
                  >
                    Clear All
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                    </svg>
                  </button>
                </div>
                <button
                  className="btn btn-primary ml-auto bg-red-500 border-0 py-2 lg:px-6 xs:px-2 px-0 focus:outline-none hover:bg-red-600 rounded"
                  onClick={() => {
                    modal.current?.showModal();
                  }}
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="w-full flex justify-center flex-wrap">
                <p className="py-10 w-full text-center">No items in cart</p>
                <a href="../shop" className="btn">
                  Return to shop
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal" ref={modal}>
        <div className="modal-box text-white h-auto pb-48">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Shipping</span>
              <input
                name="shippingModal"
                type="checkbox"
                className="toggle"
                onChange={() => {
                  setShipping(!shipping);
                }}
              />
            </label>
            {shipping && (
              <GooglePlacesAutocomplete
                selectProps={{
                  styles: {
                    input: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                    option: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                  },
                  onChange: (e) => {
                    if (e !== null) setGoogleAddress(e);
                  },
                }}
              />
            )}
            {shipping && !shippable ? (
              <a className="text-white border-0 py-2 px-6 rounded absolute bottom-4 right-4 btn-disabled btn">
                Cannot Ship to Location
              </a>
            ) : (
              <a
                className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded absolute bottom-4 right-4"
                href={createCartItemString()}
              >
                Buy Now
              </a>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CartComponent;
