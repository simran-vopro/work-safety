import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Truck,
  Phone,
  CreditCard,
  Info,
  Bubbles,
  Star,
  ArrowRight,
  Flag,
  LeafIcon,
  BellElectric,
  X,
} from "lucide-react";

import clsx from "clsx";
import OrangeOutlineButton from "./Button/OrangeOutlineButton";
import useCategories from "../hooks/useCat";
import useProducts from "../hooks/useProduct";
import images from "./imagesPath";
import type { CartItem } from "../pages/cartPage";

interface HeaderProps {
  cartItems: CartItem[];
  refreshCart: () => void;
}


const Header = ({ cartItems }: HeaderProps) => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

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

  const { categories, categoryLoading } = useCategories();
  const { products, productLoading } = useProducts({ search });



  // Detect clicks outside the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      {/* Header */}
      <header className="w-full z-50 bg-white shadow">
        {/* Top Header */}
        <div className="border-b border-gray-200 py-2 px-4 md:px-8 flex items-center justify-between gap-4 flex-wrap container-padding">
          {/* Logo */}
          <Link to="/" className="font-bold text-xxl md:text-2xl text-gray-800">
            <img src={images.logo} className="w-[170px] h-auto" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl w-full" ref={searchRef}>
            <div className="flex items-center relative border-2 border-pink-400 focus-within:border-pink-500 transition-colors px-4 rounded-full">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/projectDetails/${products[0]._id}`);
                    setSearch("");
                  }
                }}
                type="text"
                placeholder="Search products, product style codes..."
                className="flex flex-1 w-full bg-transparent focus:outline-none text-gray-500 text-lg md:text-sm py-2 pr-10 placeholder-gray-300 "
              />

              {/* icons */}
              {search ? (
                <X
                  onClick={() => {
                    setSearch("");
                  }}
                  className=" text-gray-500 w-4 h-4 cursor-pointer"
                />
              ) : (
                <Search className=" text-gray-500 w-4 h-4" />
              )}


              {search && productLoading && (
                <div className="absolute top-10 left-0 bg-white border border-gray-300 w-full z-50 shadow-md mt-1 rounded-md p-2 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 animate-pulse">
                      <div className="w-8 h-8 bg-gray-300 rounded-full" />
                      <div className="flex-1">
                        <div className="w-3/4 h-3 bg-gray-300 mb-1 rounded" />
                        <div className="w-1/2 h-3 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )}


              {search && products.length > 0 && (
                <div className="absolute top-10 left-0 bg-white border border-gray-300 w-full z-50 shadow-md mt-1 rounded-md max-h-[300px] overflow-y-scroll">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate(`/projectDetails/${product._id}`);
                        setSearch("");
                      }}
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
            <div
              onClick={() => navigate("/cart")}
              className="flex items-center gap-1 cursor-pointer pr-4 text-gray-600 text-[13px]"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-pink-500" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <p>Saved</p>
            </div>

            <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-gray-600 text-[13px]">
              <Bubbles className="w-4 h-4 text-pink-500" />
              <p>Help & Information</p>
            </div>
            <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-gray-600 text-[13px]">
              <User className="w-4 h-4 text-pink-500" />
              <p>Your Account</p>
            </div>

          </div>
        </div>

        {/* Feature Icons Row */}
        <div className="bg-[#d3d3d3] ">
          <div className="container-padding text-black px-4 md:px-8 py-2 flex flex-wrap justify-between text-[13px]">
            <div className="flex items-center">
              <div onClick={() => navigate("/categories", {
                state: { category: "allCategories" }
              })} className="flex items-center gap-1 space-x-1 cursor-pointer pr-4">
                <Star className="w-4 h-4" />
                <p>Shop By Categories</p>
              </div>
              <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4">
                <Phone className="w-4 h-4" />
                <p>Call Mon - Fri 8am to 5pm on 0000 2222 5555 6666</p>
              </div>
            </div>
            <div className="flex items-center">

              <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4">
                <Truck className="w-4 h-4" />
                <p>Next Day Delivery Available</p>
              </div>
              <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4">
                <LeafIcon className="w-4 h-4" />
                <p>Environment  Friendly</p>
              </div>
              <OrangeOutlineButton
                className="mt-0"
                label="Shop Now"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate("/shop")}
              />
            </div>
          </div>

        </div>
      </header>

      {/* Category Navigation */}
      <div className=" bg-gray-800 relative">
        <div className="container-padding flex flex-wrap justify-between gap-8 text-xs md:text-sm text-white ">
          {
            categoryLoading ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center space-y-2 py-4 px-2 animate-pulse"
              >
                <div className="w-10 h-10 bg-gray-600 rounded-full" />
                <div className="w-16 h-3 bg-gray-600" />
              </div>
            ))
              : categories && categories.map((cat) => {
                return (
                  <div
                    key={cat.Category1}
                    className="group flex flex-col items-center space-y-1 text-[13px] text-center cursor-pointer py-2 px-2 hover:bg-[#fff] category-item"
                  >
                    <div
                      onClick={() => {
                        if (cat?.Categories2?.length > 0) {
                          navigate("/categories", {
                            state: { category: cat }
                          });
                        } else {
                          navigate("/shop", {
                            state: { category1: cat._id }
                          })
                        }
                      }} className="flex flex-row items-center">
                      {/* <img src={cat.image} className="w-10 h-10 mb-2 rounded-full" alt="" /> */}

                      <p className="font-semibold text-[13x] group-hover:text-pink-500 transition-colors duration-200 uppercase tracking-wide">
                        {cat.Category1}</p>
                      <ChevronDown className="group-hover:text-pink-500 pl-2"/>
                    </div>

                    {cat?.Categories2?.length > 0 && (
                      <div
                        className={`absolute top-full w-[70%] mt-0 group-hover:flex bg-[#fff] left-1/2 -translate-x-1/2 shadow-lg overflow-auto p-4 opacity-0 z-50 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto`}
                      >

                        <div className="w-full p-3 max-h-[500px] overflow-y-auto">
                          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4">


                            {cat?.Categories2.map((cat2, index) => (
                              <div key={index} className="break-inside-avoid mb-5">
                                <p
                                  onClick={() => {
                                    if (cat2?.Categories3?.length > 0) {
                                      navigate("/categories", {
                                        state: {
                                          category: cat,
                                          activeSubCategory: cat2,
                                        },
                                      });
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    } else {
                                      navigate("/shop", {
                                        state: { category1: cat._id, category2: cat2._id },
                                      });
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }
                                  }}
                                  className="text-[13px] font-semibold uppercase mb-2 text-left nav-link h-auto"
                                >
                                  {cat2.label}
                                </p>

                                <ul>
                                  {cat2.Categories3?.map((item) => (
                                    <li
                                      onClick={() => {
                                        navigate("/shop", {
                                          state: {
                                            category1: cat?._id,
                                            category2: cat2?._id,
                                            category3: item._id,
                                          },
                                        });
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                      }}
                                      key={item._id}
                                      className="nav-link text-[13px] font-normal mb-1"
                                    >
                                      {item.Category3}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>


                      </div>
                    )}
                  </div>
                );
              })
          }</div>
      </div>

      {/* Bottom Info Bar */}
      < div className="bg-blue-50 py-3 px-4 md:px-8 flex flex-wrap justify-center gap-6 text-sm text-gray-700" >
        <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[13px]">
          <CreditCard className="w-4 h-4 text-pink-500" />
          <p className="uppercase font-semibold text-sm">Credit Accounts</p>
        </div>

        <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[13px]">
          <Flag className="w-4 h-4 text-pink-500" />
          <p className="uppercase font-semibold text-sm">Certified Products</p>
        </div>
        <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[13px]">
          <LeafIcon className="w-4 h-4 text-pink-500" />
          <p className="uppercase font-semibold text-sm">1400+ Style</p>
        </div>
        <div className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[13px]">
          <BellElectric className="w-4 h-4 text-pink-500" />
          <p className="uppercase font-semibold text-sm">Fast & Reliable</p>
        </div>
        <div
          onClick={() => {
            navigate("about");
          }}
          className="flex items-center gap-1 space-x-1 cursor-pointer px-4 text-[13px]"
        >
          <Info className="w-4 h-4 text-pink-500" />
          <p className="uppercase font-semibold text-sm">About Us</p>
        </div>
      </div >

      {/* Sidebar Menu (Mobile) */}
      < div
        className={
          clsx(
            "fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )
        }
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col h-full p-6 space-y-6">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold text-white"
            >
              WorkSafety
              <span className="w-1 h-1 bg-primary inline-block"></span>
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
                                to={`/shop/${label
                                  .toLowerCase()
                                  .replace(/ & /g, "-")
                                  .replace(/\s+/g, "-")}`}
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
      </div >

      {/* Overlay */}
      {
        menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-opacity-40 z-40"
          />
        )
      }
    </>
  );
};

export default Header;
