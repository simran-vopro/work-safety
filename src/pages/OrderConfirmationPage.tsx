import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { API_PATHS } from "../utils/config";
import { getSessionId } from "./products/details";
import toast from "react-hot-toast";

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
    fullName: string;
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

    const url = `${API_PATHS.GET_ORDER}/${orderId}`;
    const { data, loading } = useFetch<OrderData>(url, { sessionId });

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        company: "",
        email: "",
        address: "",
        address2: "",
        city: "",
        postcode: "",
        message: "",
    });

    const [termsChecked, setTermsChecked] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                fullName: data.fullName || "",
                company: data.company || "",
                email: data.email || "",
                address: data.address || "",
                address2: data.address2 || "",
                city: data.city || "",
                postcode: data.postcode || "",
                message: data.message || "",
            });
        }
    }, [data]);

    const subtotal =
        data?.products?.reduce(
            (acc: number, item: Product) => acc + item.unitPrice * item.quantity,
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsChecked) {
            alert("Please agree to the Terms & Conditions before confirming.");
            return;
        }

        setSubmitting(true);

        try {
            // Prepare payload - update formData and status
            const payload = {
                ...formData,
                status: "Confirmed",
                sessionId,
            };

            // Call the API to update order
            const editOrder = `${API_PATHS.EDIT_ORDER}/${orderId}`;
            await axios.put(editOrder, payload);

            toast.success("Order confirmed successfully!");
            // Optionally navigate to another page or refresh
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
        return <div className="container-padding section-space">Loading order details...</div>;
    }

    if (!data) {
        return <div className="container-padding section-space">Order not found.</div>;
    }

    return (
        <div className="container-padding section-space">
            {/* Order Info Top */}
            <div className="text-sm text-gray-600 mb-4">
                <strong className="text-gray-800">Order ID:</strong> {orderId}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col lg:flex-row">
                {/* Left - Product Summary */}
                <div className="w-full lg:w-2/3 p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Your Order</h2>

                    {data.products && data.products.length > 0 ? (
                        data.products.map((item: Product) => (
                            <div
                                onClick={() => navigate(`/projectDetails/${item.productId}`)}
                                key={item.productId}
                                className="flex items-center gap-4 mb-4 border-b pb-4"
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

                {/* Right - Full Form */}
                <div className="w-full lg:w-1/3 p-6">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                        Confirm Your Details
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            className="w-full border border-gray-300 rounded p-2"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            className="w-full border border-gray-300 rounded p-2"
                            value={formData.company}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full border border-gray-300 rounded p-2"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="w-full border border-gray-300 rounded p-2"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="address2"
                            placeholder="Address Line 2 (Optional)"
                            className="w-full border border-gray-300 rounded p-2"
                            value={formData.address2}
                            onChange={handleInputChange}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                className="w-full border border-gray-300 rounded p-2"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="postcode"
                                placeholder="Postcode"
                                className="w-full border border-gray-300 rounded p-2"
                                value={formData.postcode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <textarea
                            name="message"
                            placeholder="Message or Note"
                            className="w-full border border-gray-300 rounded p-2"
                            rows={3}
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                        <div className="flex items-start text-sm">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 mr-2"
                                checked={termsChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="terms">
                                I agree to the{" "}
                                <span
                                    onClick={() => navigate("/terms")}
                                    className="text-blue-600 underline cursor-pointer"
                                >
                                    Terms & Conditions
                                </span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-3 rounded text-white transition ${submitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {submitting ? "Confirming..." : "Confirm Order"}
                        </button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default OrderConfirmationPage;
