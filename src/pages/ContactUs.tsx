import React, { useState } from "react";
import {
    Mail, Phone, User, MapPin, MessageSquare,
    ArrowRight, Smile, PartyPopper, Building,
     UserCheck, Paperclip
} from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import SectionHeading from "../components/SectionHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PATHS } from "../utils/config";
import toast from "react-hot-toast";
import images from "../components/imagesPath";
import NoResults from "../components/NoResults";
import { getUserId } from "../utils/createGuestUserId";

type FormField =
    | "firstName"
    | "lastName"
    | "address1"
    | "city"
    | "company"
    | "email"
    | "phone"
    | "message";

type FormDataType = {
    [key in FormField]: string;
};

const ContactUs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState<FormDataType>({
        firstName: "",
        lastName: "",
        address1: "",
        city: "",
        company: "",
        email: "",
        phone: "",
        message: "",
    });

    const [documentFile, setDocumentFile] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name as FormField]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDocumentFile(file);
        }
    };

    const sendQuery = async () => {
        const requiredFields = [
            "firstName",
            "lastName",
            "address1",
            "city",
            "company",
            "email",
            "phone",
            "message",
        ];

        const missing = requiredFields.filter((f) => !formData[f as FormField]?.trim());
        if (missing.length) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const formPayload = new FormData();
        formPayload.append("firstName", formData.firstName);
        formPayload.append("lastName", formData.lastName);
        formPayload.append("address", formData.address1);
        formPayload.append("city", formData.city);
        formPayload.append("company", formData.company);
        formPayload.append("email", formData.email);
        formPayload.append("phone", formData.phone);
        formPayload.append("message", formData.message);
        formPayload.append("userId", getUserId());

        if (documentFile) {
            formPayload.append("document", documentFile);
        }

        setLoading(true);
        setIsSubmitted(false);

        try {
            const res = await axios.post(API_PATHS.SEND_QUERY, formPayload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success(res.data?.message || "Query sent!");
            setIsSubmitted(true);
        } catch (error: any) {
            console.error("sendQuery error:", error);

            if (error.response?.data?.errors) {
                // If backend returns validation errors in a specific structure
                const errors = error.response.data.errors;
                const fieldMessages = Object.entries(errors)
                    .map(([field, message]) => `${field}: ${message}`)
                    .join("\n");
                toast.error(`Validation Error:\n${fieldMessages}`);
            } else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to send query.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container-padding section-space px-4 sm:px-6 lg:px-8 py-12">
            {loading ? (
                <div className="flex items-center h-[500px] justify-center bg-white bg-opacity-75 group">
                    <NoResults
                        message="Just a Moment..."
                        description="We're processing your request. Hang tight while we prepare your quote!"
                        icon={
                            <Smile className="w-10 h-10 text-pink-500 animate-bounce" />
                        }
                    />
                </div>
            ) : isSubmitted ? (
                <div className="flex flex-col items-center h-[500px] justify-center bg-white bg-opacity-75 group">
                    <NoResults
                        message="Thank You For Your Query"
                        description="Your query has been submitted successfully. Our team will get back to you shortly."
                        icon={
                            <PartyPopper className="w-10 h-10 text-pink-500 animate-pulse" />
                        }
                    />
                    <div className="mt-4">
                        <div
                            onClick={() => navigate("/")}
                            className="text-indigo-600 hover:underline text-sm cursor-pointer"
                        >
                            ← Back to Home
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden lg:flex min-h-[700px]">
                    {/* Left Image */}
                    <div
                        className="w-full lg:w-1/2 bg-cover bg-center"
                        style={{ backgroundImage: `url(${images.query})` }}
                    ></div>

                    {/* Form Section */}
                    <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            <SectionHeading
                                className="mb-10"
                                heading={
                                    <>
                                        Send a — <span className="span-word">Query.</span>
                                    </>
                                }
                                description="Have a question or need assistance? Fill out the form below and our team will get back to you shortly."
                            />

                            <form className="space-y-6">
                                {[
                                    { name: "firstName", placeholder: "First Name", icon: <User /> },
                                    { name: "lastName", placeholder: "Last Name", icon: <User /> },
                                    { name: "address1", placeholder: "Address", icon: <MapPin /> },
                                    { name: "city", placeholder: "City", icon: <Building /> },
                                    { name: "company", placeholder: "Company", icon: <UserCheck /> },
                                    { name: "email", placeholder: "Email", icon: <Mail /> },
                                    { name: "phone", placeholder: "Phone", icon: <Phone /> },
                                ].map(({ name, placeholder, icon }) => (
                                    <div key={name}>
                                        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                                            {placeholder} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative border-b border-gray-300 focus-within:border-pink-500">
                                            <input
                                                id={name}
                                                type="text"
                                                name={name}
                                                value={formData[name as FormField]}
                                                onChange={handleChange}
                                                className="w-full bg-transparent focus:outline-none py-2 pr-10 text-gray-700"
                                                required
                                            />
                                            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                                                {icon}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative border-b border-gray-300 focus-within:border-pink-500">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={3}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-transparent focus:outline-none py-2 pr-10 text-gray-700 resize-none"
                                            required
                                        />
                                        <MessageSquare className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
                                    </div>
                                </div>

                                {/* Document Upload */}
                                <div>
                                    <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                                        Attach Document (Optional)
                                    </label>
                                    <div className="relative border-b border-gray-300 focus-within:border-pink-500">
                                        <input
                                            type="file"
                                            id="document"
                                            name="document"
                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                            onChange={handleFileChange}
                                            className="w-full text-sm text-gray-700 py-2"
                                        />
                                        <Paperclip className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <OrangeOutlineButton
                                        onClick={sendQuery}
                                        className="mt-10"
                                        label="Send Quote"
                                        icon={<ArrowRight className="w-4 h-4" />}
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Socials */}
                        {/* <div className="mt-8 text-sm text-gray-500 space-y-1">
                            <p className="font-semibold">Follow us</p>
                            <div className="flex flex-wrap gap-4">
                                <span>Facebook /studio</span>
                                <span>Twitter /studio</span>
                                <span>Instagram /studio</span>
                                <span>LinkedIn /studio</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;
