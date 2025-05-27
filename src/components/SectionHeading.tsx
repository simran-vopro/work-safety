import React from "react";

interface SectionHeadingProps {
    heading: React.ReactNode;
    description: string;
    className?: string;
    uppercase?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
    heading,
    description,
    className,
    uppercase = false,
}) => {
    return (
        <div className={className ?? "mb-30 flex flex-col items-center text-center px-4 sm:px-6"}>
            <h2 className={`site-heading pb-10 ${uppercase ? "uppercase" : ""}`}>
                {heading}
            </h2>
            <p className="app-text max-w-4xl">{description}</p>
        </div>
    );
};

export default SectionHeading;
