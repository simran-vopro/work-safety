import React, { useState } from "react";
import OrangeOutlineButton from "../../components/Button/OrangeOutlineButton";
import { ArrowRight } from "lucide-react";
import BrandLayout from "../../layouts/BrandLayout";
import { useNavigate, useParams } from "react-router-dom";
import NoResults from "../../components/NoResults";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/styles.min.css';
import axios from "axios";
import { API_PATHS } from "../../utils/config";
import type { ProductType } from "../HomePage";
import useFetch from "../../hooks/useFetch";
// import toast from "react-hot-toast";


// Generate or retrieve the session ID
export function getSessionId() {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID(); // Built-in in modern browsers
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}




interface ProductDetailsPageProps {
  refreshCart: () => void;
}

const ProjectDetails = ({ refreshCart }: ProductDetailsPageProps) => {
  const [activeTab, setActiveTab] = useState<"description" | "technical">(
    "description"
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value)); // Prevent values less than 1
    setQuantity(value);
  };

  const { productId } = useParams();

  const url = `${API_PATHS.GET_PRODUCT}/${productId}`;
  const { data } = useFetch<ProductType>(url);
  const product = data;

  console.log("product details ==> ", product);

  const navigate = useNavigate();

  // Add product to cart (send to backend)
  async function handleAddToCart() {
    const sessionId = getSessionId();

    try {
      const response = await axios.post(API_PATHS.ADD_TO_CART, {
        sessionId,
        productId: product?._id,
        quantity
      });

      if (response) {
        navigate("/cart");
      }

      await refreshCart();
    } catch (error) {
      console.log("Cart error:", error);
    }
  }


  return (
    <div>
      {!product ? (
        <div className="container-padding section-space">
          <NoResults />
        </div>
      ) : (
        <>
          <div className="container-padding section-space grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              {/* Zoomable main image */}
              <InnerImageZoom
                src={product?.["Image Ref"]}
                zoomSrc={product?.["Image Ref"]} // High-res image if different; same here
                // alt={product?.Description}
                zoomType="hover"
                zoomScale={1.5}
                className="w-full h-auto object-contain"
              />

              {/* Thumbnail */}
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
                <div className="w-6 h-6 border-2 border-black bg-pink-600 mt-1"></div>
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
                  className="mt-1 ml-3 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>

              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 font-medium ${activeTab === "description"
                    ? "border-b-2 border-pink-500 text-pink-500"
                    : ""
                    }`}
                >
                  Description & Features
                </button>
                <button
                  onClick={() => setActiveTab("technical")}
                  className={`px-4 py-2 font-medium ${activeTab === "technical"
                    ? "border-b-2 border-pink-500 text-pink-500"
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
                  {/* <p>
                    <strong>RRP:</strong> £{product?.rrp?.toFixed(2)}
                  </p> */}
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
                onClick={() => handleAddToCart()}
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
