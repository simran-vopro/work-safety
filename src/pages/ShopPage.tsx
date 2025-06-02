import { useState } from "react";
import { Checkbox } from "../components/checkbox";
import useProducts from "../hooks/useProduct";
import ProductGrid from "../layouts/ProductGrid";
import useCategories from "../hooks/useCat";

const ShopPage = () => {
  const [page, setPage] = useState(1);
  const limit = 9;

  const { products, productLoading, totalPages } = useProducts({ page, limit });
  const { categories, loading } = useCategories();

  return (
    <div className="container-padding px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Sidebar Filters */}
      <aside className="space-y-8">
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">CATEGORIES</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {loading
              ? "loading"
              : categories.map((cat) => (
                  <div
                    key={cat.Category1}
                    className="flex items-center gap-2 pb-2"
                  >
                    <Checkbox id={cat.Category1} />
                    <label className="text-gray-700" htmlFor={cat.Category1}>
                      {cat.Category1}
                    </label>
                  </div>
                ))}
          </div>
        </div>

        {/* sub Categories */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">SUB CATEGORIES</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {[
              "Furniture",
              "Lighting",
              "Decoration",
              "Bedding",
              "Bath & Shower",
              "Curtains",
              "Toys",
            ].map((cat) => (
              <div key={cat} className="flex items-center gap-2 pb-2">
                <Checkbox id={cat} />
                <label className="text-gray-700" htmlFor={cat}>
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        {/* <div>
                    <h3 className="font-semibold text-gray-800 mb-4">PRICE</h3>
                    <div className="text-sm text-gray-600 mb-2">Price Range: $0 - $1500</div>
                    <Slider defaultValue={[150]} max={1500} step={5} className="w-full" />
                </div> */}

        {/* Brands */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">BRANDS</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {["Platform", "Roche Bobois", "Ekea", "Kare"].map((brand) => (
              <div key={brand} className="flex items-center gap-2 pb-2">
                <Checkbox id={brand} />
                <label className="text-gray-700" htmlFor={brand}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">AVAILABILITY</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {["On Stock", "Out of Stock"].map((option) => (
              <div key={option} className="flex items-center gap-2 pb-2">
                <Checkbox id={option} />
                <label className="text-gray-700" htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="md:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600">
            Showing Page <span className="span-word">{page}</span> of
            <span className="span-word"> {totalPages}</span>
          </span>
          <div className="flex items-center">
            <span className="text-sm pr-5 text-gray-600">Sort By: </span>
            <select className="border border-gray-300 text-sm p-4 text-gray-700">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {productLoading ? (
          "loading"
        ) : (
          <>
            <ProductGrid products={products ?? []} gridCols={3} />

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
