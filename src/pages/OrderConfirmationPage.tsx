import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { API_PATHS } from "../utils/config";
import { getSessionId } from "./products/details";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";

interface Product {
  _id: string;
  productId: string;
  code: string;
  description: string;
  image: string;
  quantity: number;
  unitPrice: number;
}

interface OrderData {
  _id: string;
  orderId: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  postcode: string;
  company: string;
  sessionId: string;
  message: string;
  products: Product[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const sessionId = getSessionId();
  const navigate = useNavigate();

  const url = `${API_PATHS.GET_ORDER}/${orderId}`;
  const { data, loading } = useFetch<OrderData>(url, { sessionId });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    postcode: "",
    invoiceAddress: "",
    deliveryInstructions: "",
    poNumber: "",
    message: "",
  });

  const [termsChecked, setTermsChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1); // New: step control

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        company: data.company || "",
        email: data.email || "",
        phone: (data as any).phone || "",
        address: data.address || "",
        address2: data.address2 || "",
        city: data.city || "",
        postcode: data.postcode || "",
        message: data.message || "",
      }));
    }
  }, [data]);

  const subtotal =
    data?.products?.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0
    ) ?? 0;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };

  const copyBillingToInvoice = () => {
    setFormData((prev) => ({ ...prev, invoiceAddress: prev.address }));
  };

  // Step 1 button
  const handleConfirmClick = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  // Final submit
  const handleFinalSubmit = async () => {
    if (!termsChecked) {
      alert("Please agree to the Terms & Conditions before placing order.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        status: "Confirmed",
        sessionId,
      };
      const editOrder = `${API_PATHS.EDIT_ORDER}/${orderId}`;
      await axios.put(editOrder, payload);
      toast.success("Order confirmed successfully!");
      navigate(`/`);
    } catch (error: any) {
      console.error("Error confirming order:", error);
      alert(
        error?.response?.data?.error ||
        "Failed to confirm order. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-padding section-space">
        Loading order details...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container-padding section-space">Order not found.</div>
    );
  }

  return (
    <div className="container-padding section-space">
      <div className="text-sm text-gray-600 mb-4">
        <strong className="text-gray-800">Order ID:</strong> {orderId}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left: Order Summary */}
        <div className="w-full lg:w-2/3 p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
          <h2 className="text-xl font-bold mb-4">Your Order</h2>

          {data.products.length ? (
            data.products.map((item) => (
              <div
                onClick={() => navigate(`/projectDetails/${item.productId}`)}
                key={item.productId}
                className="flex items-center gap-4 mb-4 border-b pb-4 cursor-pointer hover:bg-gray-100 transition"
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.description}</h4>
                  <p className="text-xs text-gray-500">Code: {item.code}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right text-sm font-medium text-gray-800">
                  ₹{(item.unitPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <p>No products found in this order.</p>
          )}

          <hr className="my-6" />
          <div className="space-y-2 text-sm text-gray-700 font-medium">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 mt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right: Form Steps */}
        <div className="w-full lg:w-2/3 p-6">
          {step === 1 ? (
            <>
             <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Confirm Your Details
          </h2>
          <form className="space-y-4" onSubmit={handleConfirmClick}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full border p-2 rounded"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full border p-2 rounded"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full border p-2 rounded"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>


            <div className="grid grid-cols-2 gap-4">

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border p-2 rounded"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full border p-2 rounded"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Billing Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full border p-2 rounded"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="address2"
                className="block text-sm font-medium mb-1"
              >
                Billing Address 2 (Optional)
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                className="w-full border p-2 rounded"
                value={formData.address2}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full border p-2 rounded"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="postcode"
                  className="block text-sm font-medium mb-1"
                >
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  className="w-full border p-2 rounded"
                  value={formData.postcode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="invoiceAddress"
                className="block text-sm font-medium mb-1 flex items-center justify-between"
              >
                Invoice Address
                <button
                  type="button"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                  onClick={copyBillingToInvoice}
                >
                  <Copy size={16} /> Copy from Billing
                </button>
              </label>
              <input
                type="text"
                id="invoiceAddress"
                name="invoiceAddress"
                className="w-full border p-2 rounded"
                value={formData.invoiceAddress}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="poNumber"
                className="block text-sm font-medium mb-1"
              >
                PO Number (Optional)
              </label>
              <input
                type="text"
                id="poNumber"
                name="poNumber"
                className="w-full border p-2 rounded"
                value={formData.poNumber}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="deliveryInstructions"
                className="block text-sm font-medium mb-1"
              >
                Delivery Instructions
              </label>
              <textarea
                id="deliveryInstructions"
                name="deliveryInstructions"
                rows={3}
                className="w-full border p-2 rounded"
                value={formData.deliveryInstructions}
                onChange={handleInputChange}
              />
            </div>

           

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded text-white transition ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? "Confirming..." : "Confirm Order"}
            </button>
          </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Review & Place Order
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                By placing this order, you agree to our{" "}
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => navigate("/terms")}
                >
                  Terms & Conditions
                </span>
                . Please review your information carefully before proceeding.
              </p>

              <div className="flex items-start text-sm mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 mr-2"
                  checked={termsChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="terms">
                  I agree to the Terms & Conditions.
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 py-3 rounded text-gray-600 bg-gray-200 hover:bg-gray-300 transition"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className={`flex-1 py-3 rounded text-white transition ${
                    submitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
