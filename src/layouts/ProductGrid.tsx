import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Category = {
  _id: string;
  image?: string;
  icon?: string;
  Category1?: string;
  Category2?: string;
  Category1Id?: string;
  Category2Id?: string;
  "Image Ref"?: string;
};

type Product = {
  _id: string;
  Code: string;
  Description: string;
  Pack: number;
  rrp: number;
  GrpSupplier: string;
  GrpSupplierCode: string;
  Manufacturer: string;
  ManufacturerCode: string;
  ISPCCombined: number;
  VATCode: number;
  Brand: string;
  ExtendedCharacterDesc: string;
  CatalogueCopy: string;
  "Image Ref": string;
  Style: string;

  Category1: Category;
  Category2: Category;
  Category3: Category;
};

type ProductGridProps = {
  products: Product[];
  gridCols?:number
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, gridCols }) => {
  const navigate = useNavigate();

  return (
    <div className="container-padding">
      <div className={`grid grid-cols-2 md:grid-cols-${gridCols} gap-6`}>
        {products.map((item) => (
          <div
            key={item._id}
            className="flex flex-col cursor-pointer mb-5 group"
          >
            {/* Added group class here for hover states */}
            <div
              onClick={() => {
                navigate("/projectDetails", {
                  state: item,
                });
              }}
              className="relative border border-gray-200 h-72 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-101"
            >
              <img
                src={item["Image Ref"]}
                alt={item.ExtendedCharacterDesc}
                className="w-full h-40 object-contain"
              />
              {/* Icons container */}
              <div className="absolute top-0 right-5 h-full flex flex-col items-center justify-center gap-6 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ShoppingCart className="text-gray-900 text-3xl cursor-pointer hover-item" />
                <Heart className="text-gray-900 text-3xl cursor-pointer hover-item" />
              </div>
            </div>

            <p className="app-text h-auto mt-2">
              {item.Category1?.Category1 || "No Category"}
            </p>

            <h3 className="text-sm text-gray-700 group-hover:text-orange-500 font-semibold mt-1">
              {item.ExtendedCharacterDesc}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
