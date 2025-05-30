import React from "react";

interface OrangeOutlineButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const OrangeOutlineButton: React.FC<OrangeOutlineButtonProps> = ({
  label,
  icon,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden flex items-center gap-2 border border-primary text-primary px-4 py-2 font-semibold w-fit group ${className}`}
    >
      <span
        className="absolute inset-0 bg-primary transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
        aria-hidden="true"
      ></span>

      <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
        {label}
        {icon}
      </span>
    </button>
  );
};

export default OrangeOutlineButton;
