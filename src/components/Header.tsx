import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Heart,
  Truck,
  Phone,
  CreditCard,
  Info,
  Bubbles,
  Star,
  ArrowRight,
  Flag,
  LeafIcon,
  BellElectric
} from "lucide-react";

import clsx from "clsx";
import OrangeOutlineButton from "./Button/OrangeOutlineButton";
import useCategories from "../hooks/useCat";
import useProducts from "../hooks/useProduct";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Shop",
      dropdown: true,
      subItems: [
        "PPE & Clothing",
        "Paper",
        "Janitorial",
        "Files Pockets Binders",
        "Computer Hardware",
        "Catering",
        "Adhesives & Tapes",
      ],
    },
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/contact" },
  ];

  const { categories, loading } = useCategories();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dropdownAlignments, setDropdownAlignments] = useState<Record<number, "left" | "center" | "right">>({});
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);


  const [search, setSearch] = useState("");

  const { products, productLoading } = useProducts({ search });


  console.log("search products ==>", products);

  useEffect(() => {
    if (!containerRef.current) return;
    const newAlignments: Record<number, "left" | "center" | "right"> = {};
    // Loop through each child category item
    const items = containerRef.current.querySelectorAll(".category-item");
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      if (rect.left < 500) {
        newAlignments[index] = "left";
      } else if (rect.right > screenWidth - 500) {
        newAlignments[index] = "right";
      } else {
        newAlignments[index] = "center";
      }
    });

    setDropdownAlignments(newAlignments);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="w-full z-50 bg-white shadow">
        {/* Top Header */}
        <div className="border-b border-gray-200 py-2 px-4 md:px-8 flex items-center justify-between gap-4 flex-wrap">

          {/* Logo */}
          <Link to="/" className="font-bold text-xxl md:text-2xl text-gray-800">
            WorkSafety<span className="w-1 h-1 bg-primary inline-block" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl w-full">
            <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search Your Favourite Product..."
                className="w-full bg-transparent focus:outline-none text-gray-500 text-lg md:text-sm py-2 pr-10 placeholder-gray-300 "
              />

              <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

              {search && products.length > 0 && (
                <div className="absolute bg-white border border-gray-300 w-full z-50 shadow-md mt-1 rounded-md">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate("/projectDetails", { state: product })}
                    >
                      <img
                        src={product["Image Ref"]}
                        alt={product.Description}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700">
                        {product.Style ? `${product.Style} - ` : ""}
                        {product.Description}
                      </span>
                    </div>
                  ))}
                </div>
              )}



            </div>
          </div>


          {/* Icons */}
          <div className="flex items-center text-sm text-gray-700 divide-x divide-gray-300">
            <div className="flex items-center gap-1 space-x-1 cursor-pointer pr-4 text-gray-600 text-[12px]">
              <Heart className="w-4 h-4" />
              <p>Saved</p>
            </div>
            <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-gray-600 text-[12px]">
              <Bubbles className="w-4 h-4" />
              <p>Help & Information</p>
            </div>
            <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-gray-600 text-[12px]">
              <User className="w-4 h-4" />
              <p>Your Account</p>
            </div>
            <div className="flex items-center gap-1 space-x-1 cursor-pointer pl-4 text-gray-600 text-[12px]">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Feature Icons Row */}
        <div className="bg-gray-800 text-white px-4 md:px-8 py-2 flex flex-wrap justify-between text-[12px]">

          <div className="flex items-center">
            <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4">
              <Star className="w-4 h-4" />
              <p>Shop Brands</p>
            </div>
            <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4">
              <Phone className="w-4 h-4" />
              <p>
                Call Mon - Fri 8am to 5pm on 0000 2222 5555 6666</p>
            </div>
          </div>
          <div className="flex items-center">
            <OrangeOutlineButton className="mt-0" label="Shop Now" icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => console.log("Button clicked!")} />
            <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4">
              <Truck className="w-4 h-4" />
              <p>Next Day Delivery Available</p>
            </div>
            <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4">
              <Phone className="w-4 h-4" />
              <p>
                Call Mon - Fri 8am to 5pm on 0000 2222 5555 6666</p>
            </div>
          </div>

        </div>
      </header>

      {/* Category Navigation */}
      <div
        ref={containerRef}
        className="bg-[#d3d3d3] border-t border-b border-gray-200 flex flex-wrap justify-center gap-8 text-xs md:text-sm text-gray-700">

        {
          loading ? // Skeleton loader
            Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2 py-4 px-2 animate-pulse">
                <div className="w-10 h-10 bg-gray-600 rounded-full" />
                <div className="w-16 h-3 bg-gray-600" />
              </div>
            )) : categories && categories.map((cat, index) => {
              const alignment = dropdownAlignments[index] || "center";

              let dropdownClasses = "absolute top-full mt-0 hidden group-hover:flex bg-white border border-gray-300 shadow-lg z-10 w-[90vw] max-w-[1100px] h-[600px] overflow-scroll p-4";

              if (alignment === "left") {
                dropdownClasses += " left-0";
              } else if (alignment === "right") {
                dropdownClasses += " right-0";
              } else {
                dropdownClasses += " left-1/2 -translate-x-1/2";
              }

              return (
                <div
                  key={cat.Category1}
                  className="relative group flex flex-col items-center space-y-1 text-[12px] text-center cursor-pointer py-4 px-2 hover:bg-white category-item"
                >

                  <img
                    src={cat.icon}
                    className="w-10 h-10 mb-2"
                    alt=""
                  />

                  {/* <span className="mb-2"></span> */}
                  <p>{cat.Category1}</p>

                  {/* Dropdown */}
                  <div className={`${dropdownClasses} opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto`}>
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <div className="col-span-2 text-left">
                        <div className="bg-gray-50 border border-gray-400 p-3 px-10">
                          <h4 className="font-semibold text-sm mb-5">Key Categories</h4>
                          <ul className="grid grid-cols-4 gap-2">
                            {cat?.Categories2.map((item, index) => (
                              <li
                                onMouseEnter={() => { setSubCategories(item.Categories3), setHoveredSubCategory(item.label) }}
                                onMouseLeave={() => { setSubCategories([]), setHoveredSubCategory("") }}
                                key={index}
                                className="nav-link text-[12px]">
                                {item.label}
                              </li>
                            ))}
                          </ul>
                        </div>



                        {
                          ((cat.allCategories3 && cat.allCategories3.length > 0) || (subCategories && subCategories.length > 0)) && <div className="bg-gray-50 border border-t-0 border-gray-400 p-3 px-10">
                            {
                              subCategories.length > 0 ?
                                <>
                                  <h4 className="font-semibold text-sm mb-5">{hoveredSubCategory}</h4>
                                  <ul className="grid grid-cols-4 gap-2">
                                    {subCategories?.map((item) => (
                                      <li key={item} className="nav-link text-[12px]">
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </> :
                                <>
                                  <h4 className="font-semibold text-sm mb-5">All Products</h4>
                                  <ul className="grid grid-cols-4 gap-2">
                                    {cat?.allCategories3.map((item) => (
                                      <li key={item} className="nav-link text-[12px]">
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                            }

                          </div>
                        }

                      </div>

                      <div className="col-span-1">
                        <img
                          src={cat.image}
                          alt={cat.Category1}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        }

      </div>


      {/* Bottom Info Bar */}
      <div className="bg-blue-50 py-3 px-4 md:px-8 flex flex-wrap justify-center gap-6 text-sm text-gray-700">

        <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[12px]">
          <CreditCard className="w-4 h-4" />
          <p>Instant Credit</p>
        </div>

        <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[12px]">
          <Flag className="w-4 h-4" />
          <p>Shop UK Made</p>
        </div>
        <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[12px]">
          <LeafIcon className="w-4 h-4" />
          <p>Shop Environmentally Responsible</p>
        </div>
        <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[12px]">
          <BellElectric className="w-4 h-4" />
          <p>Shop Energy Saving</p>
        </div>
        <div onClick={() => {
          navigate("aboutus")
        }} className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[12px]">
          <Info className="w-4 h-4" />
          <p>About Us</p>
        </div>


      </div>



      {/* Sidebar Menu (Mobile) */}
      <div
        className={clsx("fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300", menuOpen ? "translate-x-0" : "-translate-x-full")}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col h-full p-6 space-y-6">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold text-white"
            >
              WorkSafety<span className="w-1 h-1 bg-primary inline-block"></span>
            </Link>

            {/* Navigation Items */}
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map(({ name, path, dropdown, subItems }) => {
                const isActive = pathname === path;

                if (dropdown) {
                  return (
                    <div key={name} className="flex flex-col">
                      <button
                        onClick={() => setShopOpen(!shopOpen)}
                        className="flex justify-between items-center text-left w-full text-base text-white/80 hover:text-white"
                      >
                        {name}
                        <ChevronDown
                          className={clsx(
                            "w-4 h-4 transition-transform",
                            shopOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {shopOpen && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {subItems?.map((label) => (
                            <li key={label} className="my-5">
                              <Link
                                to={`/shop/${label.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                                onClick={() => setMenuOpen(false)}
                                className="block text-sm text-white/70 hover:text-white"
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }

                return path ? (
                  <Link
                    key={name}
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "transition-all",
                      isActive
                        ? "text-xl font-semibold"
                        : "text-base text-sm text-white/80 hover:text-white"
                    )}
                  >
                    {name}
                  </Link>
                ) : null;
              })}
            </nav>
          </div>

          {/* My Account at bottom */}
          <Link
            to="/account"
            onClick={() => setMenuOpen(false)}
            className="mt-auto w-full bg-black text-white py-4 px-6 text-center cursor-pointer block"
          >
            My Account
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-opacity-40 z-40"
        />
      )}
    </>
  );
};

export default Header;
