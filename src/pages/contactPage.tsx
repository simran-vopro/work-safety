import React, { useState } from "react";
import images from "../components/imagesPath";
import {
  Mail,
  Phone,
  User,
  MapPin,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import SectionHeading from "../components/SectionHeading";

// Define form field types
type FormField =
  | "name"
  | "address1"
  | "address2"
  | "email"
  | "phone"
  | "message";

type FormData = {
  [key in FormField]: string;
};

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address1: "",
    address2: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as FormField]: value,
    }));
  };

  return (
    <div className="container-padding section-space px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden lg:flex min-h-[700px]">
        {/* Left Image Background Section */}
        <div
          className="w-full lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${images.full_width_1})` }}
        ></div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
          <div className="text-left">
            <SectionHeading
              className="mb-10 md:mb:30 flex flex-col items-center text-left"
              tAlign="text-left"
              heading={
                <>
                  Send a — <span className="span-word">Quote.</span>
                </>
              }
              description="We are here to help you with your project. Fill out the form below and we will get back to you as soon as possible."
            />

            {/* Contact Info */}
            <div className="mb-6 space-y-2 text-sm text-gray-600">
              <div>
                <strong>Address:</strong> 2713 Lowe Haven
              </div>
              <div>
                <strong>Email:</strong> hi@studio.com
              </div>
              <div>
                <strong>Phone:</strong> 071-246-3165
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {[
                { name: "name", placeholder: "Full Name", icon: <User /> },
                {
                  name: "address1",
                  placeholder: "Address 1",
                  icon: <MapPin />,
                },
                {
                  name: "address2",
                  placeholder: "Address 2 (Optional)",
                  icon: <MapPin />,
                },
                { name: "email", placeholder: "Email", icon: <Mail /> },
                { name: "phone", placeholder: "Phone", icon: <Phone /> },
              ].map(({ name, placeholder, icon }) => (
                <div
                  key={name}
                  className="relative border-b border-gray-300 focus-within:border-orange-500 transition-colors"
                >
                  <input
                    type="text"
                    name={name}
                    value={formData[name as FormField]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={name !== "address2"}
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10 placeholder-gray-400"
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
                    {icon}
                  </span>
                </div>
              ))}
              {/* Message Input */}
              <div className="relative border-b border-gray-300 focus-within:border-orange-500 transition-colors">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={3}
                  required
                  className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10 placeholder-gray-400 resize-none"
                />
                <MessageSquare className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
              </div>

              <div className="flex justify-center">
                <OrangeOutlineButton
                  className="mt-10"
                  label="Send Quote"
                  icon={<ArrowRight className="w-4 h-4" />}
                />
              </div>
            </form>
          </div>

          {/* Social Links */}
          <div className="mt-8 text-sm text-gray-500 space-y-1">
            <p className="font-semibold">Follow us</p>
            <div className="flex flex-wrap gap-4">
              <span>Facebook /studio</span>
              <span>Twitter /studio</span>
              <span>Instagram /studio</span>
              <span>LinkedIn /studio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
