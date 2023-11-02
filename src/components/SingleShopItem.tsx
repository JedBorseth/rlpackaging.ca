import { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

// This is possibly the yuckiest code I've ever written, but it works
type SingleShopItemProps = {
  name: string;
  imageUrl: any;
  inventoryCount: any;
  description: string;
  price: string;
  id: string;
  category: any;
  attr1: { name: string; value: string };
};
type tabOptions = "description" | "reviews" | "details";
const SingleShopItem = ({
  name,
  imageUrl,
  inventoryCount,
  description,
  price,
  id,
  category,
  attr1,
}: SingleShopItemProps) => {
  const [tab, setTab] = useState<tabOptions>("description");
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState(false);
  const [googleAddress, setGoogleAddress] = useState<any>(null);
  const [shippable, setShippable] = useState(false);

  function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const toRadians = (degrees: number) => {
      return degrees * (Math.PI / 180);
    };

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  useEffect(() => {
    if (quantity >= inventoryCount) {
      setQuantity(inventoryCount);
    }
  }, [quantity]);

  const RLCOORDS = {
    lat: 49.04453454773623,
    lng: -122.36579867346927,
  };
  useEffect(() => {
    if (googleAddress === null) return;
    geocodeByAddress(googleAddress.label)
      .then((results) => {
        results[0].address_components.forEach((component: any) => {
          if (component.types.includes("country")) {
            if (component.short_name === "CA") {
              setShippable(true);
            } else {
              setShippable(false);
              return;
            }
          }
        });
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        const distance: number = haversineDistance(
          RLCOORDS.lat,
          RLCOORDS.lng,
          lat,
          lng
        );
        if (distance < 50) {
          setShippable(true);
        }
      });
  }, [googleAddress]);

  const modal = useRef<any>(null);

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-neutral-300">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {category}
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
                className={`flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 cursor-pointer ${
                  tab === "reviews" && "border-red-500 text-red-500"
                }`}
                onClick={() => {
                  setTab("reviews");
                }}
              >
                Reviews
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
            {tab === "description" && (
              <p className="leading-relaxed mb-4">{description}</p>
            )}

            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Stock</span>
              <span className="ml-auto text-gray-900">{inventoryCount}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">{attr1.name}</span>
              <span className="ml-auto text-gray-900">{attr1.value}</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">Quantity</span>
              <span className="ml-auto text-gray-900">{inventoryCount}</span>
            </div>
            <div className="flex">
              <div className="flex gap-2">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {price}
                </span>
                <input
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                  }}
                  value={quantity}
                  type="number"
                  max={inventoryCount}
                  min={0}
                  className="dark:text-white px-2 rounded"
                />
              </div>
              <button
                className="btn btn-primary ml-auto bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                onClick={() => {
                  modal.current?.showModal();
                }}
              >
                Buy
              </button>
              <dialog id="my_modal_2" className="modal" ref={modal}>
                <div className="modal-box text-white h-auto pb-48">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Shipping</span>
                      <input
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
                    <a
                      className={`text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded absolute bottom-4 right-4 ${
                        shipping && !shippable && "btn-disabled"
                      }  
                      `}
                      href={`../api/checkout?id=${id}&quantity=${quantity}&shipping=${shipping}`}
                    >
                      Buy Now
                    </a>
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
            src={imageUrl}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleShopItem;
