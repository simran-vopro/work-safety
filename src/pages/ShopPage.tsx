import { Checkbox } from '../components/checkbox';

const ShopPage = () => {
    return (
        <div className="container-padding px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Sidebar Filters */}
            <aside className="space-y-8">
                {/* Categories */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">CATEGORIES</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        {['Furniture', 'Lighting', 'Decoration', 'Bedding', 'Bath & Shower', 'Curtains', 'Toys'].map(cat => (
                            <div key={cat} className="flex items-center gap-2 pb-2">
                                <Checkbox id={cat} />
                                <label className='text-gray-700' htmlFor={cat}>{cat}</label>
                            </div>
                        ))}
                    </div>
                </div>


                {/* sub Categories */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">SUB CATEGORIES</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        {['Furniture', 'Lighting', 'Decoration', 'Bedding', 'Bath & Shower', 'Curtains', 'Toys'].map(cat => (
                            <div key={cat} className="flex items-center gap-2 pb-2">
                                <Checkbox id={cat} />
                                <label className='text-gray-700' htmlFor={cat}>{cat}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price */}
                {/* <div>
                    <h3 className="font-semibold text-gray-800 mb-4">PRICE</h3>
                    <div className="text-sm text-gray-600 mb-2">Price Range: $0 - $1500</div>
                    <Slider defaultValue={[150]} max={1500} step={5} className="w-full" />
                </div> */}

                {/* Brands */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">BRANDS</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        {['Platform', 'Roche Bobois', 'Ekea', 'Kare'].map(brand => (
                            <div key={brand} className="flex items-center gap-2 pb-2">
                                <Checkbox id={brand} />
                                <label className='text-gray-700' htmlFor={brand}>{brand}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Availability */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">AVAILABILITY</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        {['On Stock', 'Out of Stock'].map(option => (
                            <div key={option} className="flex items-center gap-2 pb-2">
                                <Checkbox id={option} />
                                <label className='text-gray-700' htmlFor={option}>{option}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <main className="md:col-span-3">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-600">Showing <span className='span-word'>9</span> of <span className='span-word'>15</span> Products</span>
                    <div className='flex items-center'>
                        <span className="text-sm pr-5 text-gray-600">Sort By: </span>
                        <select className="border border-gray-300 text-sm p-4 text-gray-700">
                            <option>Most Popular</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {[
                        { name: 'Awesome Lamp', category: 'Lighting', price: '$40', image: '/lamp.png' },
                        { name: 'Cool Flower', category: 'Decoration', price: '$20', image: '/flower.png' },
                        { name: 'Cozy Sofa', category: 'Furniture', price: '$150', image: '/sofa.png' },
                        { name: 'Awesome Candle', category: 'Lighting', price: '$15', image: '/candle.png' },
                        { name: 'Fancy Chair', category: 'Furniture', price: '$70', image: '/chair.png' },
                        { name: 'Chinese Teapot', category: 'Decoration', price: '$50', image: '/teapot.png' },
                        { name: 'Soft Pillow', category: 'Bedding', price: '$30', image: '/pillow.png' },
                        { name: 'Wooden Casket', category: 'Decoration', price: '$20', image: '/casket.png' },
                        { name: 'Awesome Armchair', category: 'Furniture', price: '$90', image: '/armchair.png' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 p-4 text-center">
                            <img src={item.image} alt={item.name} className="h-40 w-full object-contain mb-4" />
                            <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                            <h3 className="text-sm font-semibold text-gray-800 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-700">{item.price}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ShopPage;
