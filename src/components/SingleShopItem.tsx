import dist from "@astrojs/react";
import { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { cart } from "../store";
import type { CartTypes } from "../store";
import { haversineDistance } from "../utils";
import toast, { Toaster } from "react-hot-toast";

// This is possibly the yuckiest code I've ever written, but it works
type SingleShopItemProps = {
  name: string;
  imageUrl: string | Response;
  inventoryCount: string | Response;
  description: string;
  price: string;
  id: string;
  category: string | Response;
  attr1: { name: string; value: string };
  attr2: { name: string; value: string };
};
type tabOptions = "description" | "rating" | "details";
const SingleShopItem = ({
  name,
  imageUrl,
  inventoryCount,
  description,
  price,
  id,
  category,
  attr1,
  attr2,
}: SingleShopItemProps) => {
  const [tab, setTab] = useState<tabOptions>("description");
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState(false);
  const [googleAddress, setGoogleAddress] = useState<any>(null);
  const [shippable, setShippable] = useState(false);

  // Shipping Location Stuff
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

  // Make sure quantity cannot go over inventory count
  useEffect(() => {
    if (quantity >= Number(inventoryCount)) setQuantity(Number(inventoryCount));
  }, [quantity]);

  // Cart Stuff
  const addItemToCart = ({
    name,
    id,
    quantity,
    details,
  }: CartTypes[number]) => {
    const cartItems = cart.get();
    let exists = false;
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        exists = true;
        return { ...item, quantity: Number(item.quantity) + quantity, details };
      }
      return item;
    });
    if (!exists) {
      cart.set([...cartItems, { name, id, quantity, details }]);
    } else {
      cart.set(newCartItems);
    }
  };
  const clearCart = () => {
    cart.set([]);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-neutral-300">
      <Toaster />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 relative">
            <a
              className="btn btn-circle btn-ghost absolute -top-8 -left-4 p-4 hover:border-gray-200"
              href="../shop"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
                />
              </svg>
            </a>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {category.toString()}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              {name}
            </h1>
            <div className="flex mb-4">
              <a
                onClick={() => {
                  setTab("description");
                }}
                className={`flex-grow border-b-2 py-2 text-lg px-1 border-gray-300 cursor-pointer ${
                  tab === "description" && "border-red-500 text-red-500"
                }`}
              >
                Description
              </a>
              <a
                onClick={() => {
                  setTab("rating");
                }}
                className={`flex-grow border-b-2 py-2 text-lg px-1 border-gray-300 cursor-pointer ${
                  tab === "rating" && "border-red-500 text-red-500"
                }`}
              >
                Ratings
              </a>
              <a
                className={`flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 cursor-pointer ${
                  tab === "details" && "border-red-500 text-red-500"
                }`}
                onClick={() => {
                  setTab("details");
                }}
              >
                Details
              </a>
            </div>
            <div className="p-2 min-h-16">
              {tab === "description" && (
                <p className="leading-relaxed mb-4">{description}</p>
              )}
              {tab === "details" && (
                <>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Stock</span>
                    <span className="ml-auto text-gray-900">
                      {inventoryCount.toString()}
                    </span>
                  </div>
                  {attr1.name && attr1.value && (
                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">{attr1.name}</span>
                      <span className="ml-auto text-gray-900">
                        {attr1.value}
                      </span>
                    </div>
                  )}

                  {attr2.name && attr2.value && (
                    <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                      <span className="text-gray-500">{attr2.name}</span>
                      <span className="ml-auto text-gray-900">
                        {attr2.value}
                      </span>
                    </div>
                  )}
                </>
              )}
              {tab === "rating" && (
                <div className="flex gap-2">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <span className="text-gray-600">(3) Reviews</span>
                  {/* These are fake reviews! :) */}
                </div>
              )}
            </div>

            <div className="flex justify-evenly flex-wrap gap-4">
              <div className="flex gap-2">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {price}
                </span>
                <input
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                  }}
                  name="quantity"
                  value={quantity}
                  type="number"
                  max={inventoryCount.toString()}
                  min={0}
                  className="text-white px-2 rounded h-10"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <button
                  className="btn btn-primary ml-auto bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  onClick={() => {
                    addItemToCart({
                      name,
                      id,
                      quantity,
                      details: {
                        attr1,
                        price,
                        category,
                        description,
                        imageUrl,
                        inventoryCount,
                      },
                    });
                    toast.success("Added Item");
                  }}
                >
                  Add to cart
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
                </button>
                <button
                  className="btn btn-neutral border-0 py-2 px-6 focus:outline-none rounded"
                  onClick={() => {
                    modal.current?.showModal();
                  }}
                >
                  Buy now
                </button>
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
                        href={`../api/checkout?id=${id}&quantity=${quantity}&shipping=${shipping}`}
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
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={imageUrl.toString()}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleShopItem;

const Star = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="text-yellow-500"
      viewBox="0 0 16 16"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
};
