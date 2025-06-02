import React, { useState } from "react";
import OrangeOutlineButton from "../../components/Button/OrangeOutlineButton";
import { ArrowRight } from "lucide-react";
import BrandLayout from "../../layouts/BrandLayout";
import { useLocation } from "react-router-dom";
import NoResults from "../../components/NoResults";

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState<"description" | "technical">(
    "description"
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value)); // Prevent values less than 1
    setQuantity(value);
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} item(s) to cart`);
  };

  const location = useLocation();
  const product = location.state;

  console.log("product ==> ", product);

  return (
    <div>
      {!product ? (
        <div className="container-padding section-space">
          <NoResults />
        </div>
      ) : (
        <>
          <div className="container-padding section-space grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Section - Image */}
            <div>
              <img
                src={product?.["Image Ref"]}
                alt={product?.Description}
                className="w-full h-auto object-contain"
              />
              <div className="mt-4">
                <img
                  src={product?.["Image Ref"]}
                  alt="Thumbnail"
                  className="w-24 h-24 object-contain border p-1 mt-4"
                />
              </div>
            </div>

            {/* Right Section - Details */}
            <div>
              <h1 className="text-2xl font-semibold">
                {product?.Style ? `${product.Style} - ` : ""}
                {product?.Description}
              </h1>
              <p className="text-gray-600 mb-4">{product?.Brand}</p>

              <div className="mb-4">
                <p className="font-semibold text-sm">SELECT COLOUR:</p>
                <div className="w-6 h-6 border-2 border-black bg-orange-600 mt-1"></div>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-sm">SIZE RANGE:</p>
                <p className="text-gray-700">37 - 48</p>
              </div>

              <div className="mb-6 flex items-center">
                <p className="font-semibold text-sm uppercase">Quantity:</p>

                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={handleQuantityChange}
                  className="mt-1 ml-3 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>

              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "description"
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : ""
                  }`}
                >
                  Description & Features
                </button>
                <button
                  onClick={() => setActiveTab("technical")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "technical"
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : ""
                  }`}
                >
                  Technical Info
                </button>
              </div>

              {activeTab === "description" && (
                <div className="mb-5">
                  <div
                    className="app-text-normal"
                    dangerouslySetInnerHTML={{ __html: product?.CatalogueCopy }}
                  />
                </div>
              )}

              {activeTab === "technical" && (
                <div className="app-text-normal">
                  <p className="font-semibold mt-4">Technical Details</p>
                  <p>
                    <strong>Brand:</strong> {product?.Brand}
                  </p>
                  <p>
                    <strong>Manufacturer:</strong> {product?.Manufacturer}
                  </p>
                  <p>
                    <strong>Manufacturer Code:</strong>{" "}
                    {product?.ManufacturerCode}
                  </p>
                  <p>
                    <strong>RRP:</strong> £{product?.rrp?.toFixed(2)}
                  </p>
                  <p>
                    <strong>Pack Size:</strong> {product?.Pack}
                  </p>
                  <p>
                    <strong>Category:</strong> {product?.Category1?.Category1} /{" "}
                    {product?.Category2?.Category2}
                  </p>
                </div>
              )}

              <OrangeOutlineButton
                className="mt-10"
                label="Add to Cart"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={handleAddToCart}
              />
            </div>
          </div>
          <BrandLayout />
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
