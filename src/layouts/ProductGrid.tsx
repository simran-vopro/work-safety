import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ProductType } from "../hooks/useProduct";

type ProductGridProps = {
  products: ProductType[];
  gridCols?: number;
  loading?: boolean;
};

const SkeletonCard = () => (
  <div className="flex flex-col mb-5 animate-pulse">
    <div className="relative border border-gray-200 h-72 overflow-hidden flex items-center justify-center bg-gray-300 rounded">
      {/* Skeleton Image */}
      <div className="w-full h-40 bg-gray-400"></div>
    </div>
    {/* Skeleton text */}
    <div className="mt-2 h-4 bg-gray-300 rounded w-1/3"></div>
    <div className="mt-1 h-5 bg-gray-300 rounded w-2/3"></div>
  </div>
);


const ProductGrid: React.FC<ProductGridProps> = ({ products, gridCols, loading }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={`grid grid-cols-2 md:grid-cols-${gridCols} gap-6`}>
        {loading
          ? // Show 8 skeleton cards or any number you prefer
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((item) => (
            <div
              key={item._id}
              className="flex flex-col cursor-pointer mb-5 group"
            >
              {/* Added group class here for hover states */}
              <div
                onClick={() => {
                  navigate(`/projectDetails/${item._id}`);
                }}
                className="relative border border-gray-200 h-72 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-101"
              >
                <img
                  src={item["Image Ref"]}
                  alt={item.ExtendedCharacterDesc}
                  className="w-full h-40 object-contain"
                />
                {/* Icons container */}
                <div className="absolute top-5 right-5 h-full flex flex-col items-center justify-start gap-6 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ShoppingCart className="text-gray-900 text-sm cursor-pointer group-hover:text-white " />
                  {/* <Heart className="text-gray-900 text-3xl cursor-pointer group-hover:text-pink-500" /> */}
                </div>
              </div>

              <p className="app-text h-auto mt-2">
                {item.Category1?.Category1 || "No Category"}
              </p>

              <h3 className="text-sm text-gray-700 group-hover:text-pink-500 font-semibold mt-1">
                {item.ExtendedCharacterDesc}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
