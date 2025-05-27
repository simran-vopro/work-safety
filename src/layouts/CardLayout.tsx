import React, { useRef } from "react";
import type { FC } from "react";
import { splitCategory } from "../utils/splitText";

type CardContent = {
    category: string;
    totalPrducts: number;
    tagLine: string;
    image: string;
};

type CardProps = {
    cardContent: CardContent[];
};

const CardLayout: FC<CardProps> = ({ cardContent }) => {
    const mainCards = cardContent.slice(0, 3);
    const extraCards = cardContent.slice(3);

    // Refs to store animation frames & elements
    const animationFrames = useRef<{ [key: string]: number }>({});
    const imageRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});

    // Handle mouse move with requestAnimationFrame to update transform directly
    const handleMouseMove = (key: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!imageRefs.current[key]) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15; // max 15px translation left/right
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15; // max 15px translation up/down

        if (animationFrames.current[key]) {
            cancelAnimationFrame(animationFrames.current[key]);
        }

        animationFrames.current[key] = requestAnimationFrame(() => {
            if (imageRefs.current[key]) {
                imageRefs.current[key]!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }
        });
    };

    // Reset transform on mouse leave
    const handleMouseLeave = (key: string) => {
        if (animationFrames.current[key]) {
            cancelAnimationFrame(animationFrames.current[key]);
        }
        if (imageRefs.current[key]) {
            imageRefs.current[key]!.style.transform = "translate3d(0, 0, 0)";
        }
    };

    return (
        <div className="space-y-8">
            {/* First 3 Styled Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mainCards.map((item, index) => {
                    const isCenterCard = index === 1;
                    const key = `main-${index}`;

                    return (
                        <div
                            key={key}
                            className={`cursor-pointer flex flex-row ${isCenterCard
                                ? "bg-gradient-to-r from-gray-100 via-gray-200 via-white text-gray-700"
                                : "text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
                                } rounded-2xl shadow-lg overflow-hidden py-6`}
                            onMouseMove={(e) => handleMouseMove(key, e)}
                            onMouseLeave={() => handleMouseLeave(key)}
                        >
                            <div className="p-6 flex-1 flex flex-col justify-center">
                                <p className="text-orange-400 app-text">{item.tagLine}</p>
                                <p className="text-2xl md:text-3xl font-extrabold mt-2">{splitCategory(item.category)}</p>
                                <div className="mt-4">
                                    <p className={`app-text nav-link ${isCenterCard ? "text-gray-700" : "text-gray-300"}`}>
                                        {item.totalPrducts} Products
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-center overflow-hidden">
                                <img
                                    ref={(el) => {
                                        imageRefs.current[key] = el;
                                    }}
                                    src={item.image}
                                    alt={item.category}
                                    className="w-full h-auto object-contain max-h-[300px] transition-transform duration-300"
                                    style={{ transform: "translate3d(0,0,0)" }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Extra cards with same hover effect */}
            {extraCards.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {extraCards.map((item, index) => {
                        const key = `extra-${index}`;
                        return (
                            <div
                                key={key}
                                className="cursor-pointer flex flex-col justify-between items-center bg-gradient-to-b from-gray-100 via-gray-200 via-white text-gray-700 rounded-2xl shadow-lg overflow-hidden h-72"
                                onMouseMove={(e) => handleMouseMove(key, e)}
                                onMouseLeave={() => handleMouseLeave(key)}
                            >
                                <div className="flex-1 flex items-center justify-center w-full px-4 overflow-hidden">
                                    <img
                                        ref={(el) => {
                                            imageRefs.current[key] = el;
                                        }}
                                        src={item.image}
                                        alt={item.category}
                                        className="max-h-32 object-contain transition-transform duration-300"
                                        style={{ transform: "translate3d(0,0,0)" }}
                                    />
                                </div>
                                <div className="w-full py-4 text-center">
                                    <p className="text-sm font-semibold">{item.category}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CardLayout;
