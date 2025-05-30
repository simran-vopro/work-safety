// src/pages/CategoriesPage.tsx
import { ArrowRight, ChevronLeft, ChevronRight, Headset, Truck, Undo2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import images from "../components/imagesPath";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import { splitCategory } from "../utils/splitText";


const cardContent = [
    {
        category: "Hand Protection",
        totalPrducts: 35,
        tagLine: "Grip with confidence",
        image: images.hand,
    },
    {
        category: "Head Protection",
        totalPrducts: 15,
        tagLine: "Think. Shield. Secure.",
        image: images.head,
    },
    {
        category: "Footwear Protection",
        totalPrducts: 20,
        tagLine: "Step into safety",
        image: images.feet,
    },
    {
        category: "Respiratory Protection",
        totalPrducts: 35,
        tagLine: "Breathe. Filter. Live.",
        image: images.respiratory,
    },
    {
        category: "Eye/Face Protection",
        totalPrducts: 35,
        tagLine: "See. Shield. Protect.",
        image: images.eye,
    },
    {
        category: "Hi-Vis Jackets",
        totalPrducts: 15,
        tagLine: "Bright. Bold. Visible.",
        image: images.jackets,
    },
    {
        category: "Customised Clothing",
        totalPrducts: 15,
        tagLine: "Fit. Style. Safety.",
        image: images.cloths,
    },
    {
        category: "Customised Clothing",
        totalPrducts: 15,
        tagLine: "Fit. Style. Safety.",
        image: images.cloths,
    },
]

const mainCards = cardContent.slice(0, 3);
const extraCards = cardContent.slice(3);

const CategoriesPage = () => {
    return (
        <div className="w-full relative bg-white">
            <div className="mt-24 px-6 md:px-0 container-padding-mid">
                <div
                    className="container-padding relative h-[500px] md:h-[500px] p-0 bg-cover bg-center "
                    style={{ backgroundImage: `url(${images.new_arrivals})` }}>


                    <div className="bg-gradient-to-r from-gray-900 h-full w-full px-10 text-gray-100 flex flex-col justify-center">
                        <p className="text-3xl md:text-5xl font-extrabold mt-2 uppercase">
                            New <br></br> <span className="span-word">Arrivals</span>
                        </p>
                        <OrangeOutlineButton
                            label="Shop Now"
                            icon={<ArrowRight className="w-4 h-4" />}
                            onClick={() => console.log("Button clicked!")}
                        />

                    </div>



                </div>
            </div>

            <div className="container-padding md:p-0 container-padding-mid py-10">
                {/* Card Layout */}
                <div>
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
                                            ? "text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
                                            : "bg-gradient-to-r from-gray-100 via-gray-200 via-white text-gray-700"
                                            }  shadow-lg overflow-hidden py-6`}

                                    >
                                        <div className="p-6 flex-1 flex flex-col justify-center">
                                            <p className="text-primary app-text">{item.tagLine}</p>
                                            <p className="text-2xl md:text-3xl font-extrabold mt-2">{splitCategory(item.category)}</p>
                                            <div className="mt-4">
                                                <p className={`app-text nav-link ${isCenterCard ? "text-gray-300" : "text-gray-700"}`}>
                                                    {item.totalPrducts} Products
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                                            <img

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
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                {extraCards.map((item, index) => {
                                    const key = `extra-${index}`;
                                    return (
                                        <div
                                            key={key}
                                            className="cursor-pointer flex flex-col justify-between items-center bg-gradient-to-b from-gray-100 via-gray-200 via-white text-gray-700  shadow-lg overflow-hidden h-72"

                                        >
                                            <div className="flex-1 flex items-center justify-center w-full px-4 overflow-hidden">
                                                <img

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
                </div>
            </div>



            <div className="container-padding md:px-0 container-padding-mid section-space">
                <div className="relative">
                    {/* Heading */}
                    <h2 className="font-bold text-lg mb-10 text-gray-700">
                        You may also like:
                    </h2>

                    {/* Navigation arrows */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-15 z-50 swiper-button-prev text-black hover:text-orange-500">
                        <ChevronLeft size={24} />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-15 z-10 swiper-button-next text-black hover:text-orange-500">
                        <ChevronRight size={24} />
                    </div>

                    {/* Swiper itself */}
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        spaceBetween={40}
                        loop={true}

                        breakpoints={{
                            0: { slidesPerView: 2 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {cardContent.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col cursor-pointer mb-5 group">
                                    <div className="relative bg-[#f5f5f5] h-72 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-101">
                                        <img
                                            src={item.image}
                                            alt={item.category}
                                            className="w-full h-40 object-contain"
                                        />
                                    </div>
                                    <p className="app-text h-auto mt-2">Category</p>
                                    <h3 className="text-sm text-gray-700 group-hover:text-orange-500 font-semibold mt-1">{item.category}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>




            <div className="border-y border-gray-200 py:0 md:py-10 mb-20">
                <div className="container-padding px-4 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-left">

                    {/* Column 1 */}
                    <div className="flex flex-row-reverse md:flex-row items-center justify-around md:justify-center py-10 px-6 gap-4 h-full">
                        <Truck className="text-primary" size={50} />
                        <div>
                            <h4 className="font-semibold text-gray-800 uppercase">Free Shipping</h4>
                            <p className="text-sm text-gray-600 mt-1">On all orders of $150</p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-row-reverse md:flex-row items-center justify-around md:justify-center py-10 px-6 gap-4 h-full">
                        <Headset className="text-primary" size={50} />
                        <div>
                            <h4 className="font-semibold text-gray-800 uppercase">24/7 Support</h4>
                            <p className="text-sm text-gray-600 mt-1">Get help when you need it</p>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-row-reverse md:flex-row items-center justify-around md:justify-center py-10 px-6 gap-4 h-full">
                        <Undo2 className="text-primary" size={50} />
                        <div>
                            <h4 className="font-semibold text-gray-800 uppercase">100% Money Back</h4>
                            <p className="text-sm text-gray-600 mt-1">30 day money back guarantee</p>
                        </div>
                    </div>

                </div>
            </div>


            <div className="bg-[#f5f5f5] py-16 md:py-30 relative overflow-hidden col-aligned-center">
                <div className="container-padding">
                    <div className="md:max-w-[64%] mx-auto flex flex-col items-center justify-center text-center">
                        <p className="text-gray-700 text-sm md:text-base font-semibold uppercase">
                            Your Trusted Workwear
                        </p>

                        <p className="site-heading mt-3 uppercase">
                            We’re Here to Help
                        </p>

                        <div className="w-20 h-2 bg-primary rounded-sm my-5 mx-auto"></div>

                        <p className="app-text">
                            At Work Safety, we value open communication and are always eager to assist you with any inquiries or concerns you may have. Whether you need more information about our products, have a question about an order, or simply want to share feedback, our team is ready to help.
                        </p>


                        <OrangeOutlineButton
                            label="Contact Us"
                            icon={<ArrowRight className="w-4 h-4" />}
                            onClick={() => console.log("Button clicked!")}
                        />


                    </div>
                </div>


            </div>






        </div>
    );
};

export default CategoriesPage;
