import React from "react";
import { ShoppingCart, Heart } from "lucide-react";

type Product = {
    id: number;
    category: string;
    title: string;
    image: string;
};

type ProductGridProps = {
    products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map(({ id, category, title, image }) => (
                <div key={id} className="flex flex-col cursor-pointer mb-5 group">
                    {/* Added group class here for hover states */}
                    <div className="relative bg-[#f5f5f5] h-72 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-101">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-40 object-contain"
                        />
                        {/* Icons container */}
                        <div className="absolute top-0 right-5 h-full flex flex-col items-center justify-center gap-6 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ShoppingCart className="text-gray-900 text-3xl cursor-pointer hover:text-orange-500" />
                            <Heart className="text-gray-900 text-3xl cursor-pointer hover:text-red-500" />
                        </div>
                    </div>

                    <p className="app-text h-auto mt-2">{category}</p>
                    <h3 className="text-sm text-gray-700 group-hover:text-orange-500 font-semibold mt-1">{title}</h3>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
