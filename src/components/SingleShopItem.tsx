import { useEffect, useState } from "react";

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
  useEffect(() => {}, [tab]);
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
                  type="number"
                  max={inventoryCount}
                  min={0}
                  defaultValue={1}
                  className="w-10 dark:text-white px-2 rounded"
                />
              </div>
              <a
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                href={`../api/checkout?id=${id}&quantity=${quantity}`}
              >
                Buy Now
              </a>
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
