import React from "react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import images from "../components/imagesPath";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Fifa 19",
      code: "PS4-001",
      image: images.eye,
      quantity: 2,
    },
    {
      id: 2,
      name: "Glacier White 500GB",
      code: "PS4-002",
      image: images.head,
      quantity: 1,
    },
    {
      id: 3,
      name: "Platinum Headset",
      code: "PS4-003",
      image: images.hand,
      quantity: 1,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="container-padding section-space">
      <div className="bg-white overflow-hidden flex flex-col lg:flex-row border border-gray-200">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 p-6">
          <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border border-gray-200 rounded-lg p-4 mb-4 gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-800">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">Code: {item.code}</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">Qty:</label>
                <input
                  type="number"
                  min="1"
                  defaultValue={item.quantity}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}

          <div className="mt-4">
            <div onClick={() => {
                navigate("/shop")
            }} className="text-indigo-600 hover:underline text-sm curson-pointer">
              ← Continue Shopping
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 border-t lg:border-l lg:border-t-0 border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="flex justify-between text-gray-700 text-lg mb-4 font-medium">
            <span>Total Products</span>
            <span className="text-indigo-600 font-bold">3 </span>
          </div>
          <div className="flex justify-between text-gray-700 text-lg mb-4 font-medium">
            <span>Total Items Quantity</span>
            <span className="text-indigo-600 font-bold">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>

          <OrangeOutlineButton onClick={() => {
            navigate("/contact")
          }} className="mt-10" label="Send a Quote" />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
