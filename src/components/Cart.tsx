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
                  </a>
                  <button
                    className="btn"
                    onClick={() => {
                      clearCart();
                      toast.success("Cleared cart");
                    }}
                  >
                    Clear All
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
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
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
