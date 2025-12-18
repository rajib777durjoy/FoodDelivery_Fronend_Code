import React from "react";

const DeliveryManFeature = () => {
    return (
        <section className="w-full bg-white py-12 mt-10">
            <span className="block text-center text-lg font-semibold text-green-600 uppercase ">
                Trusted Delivery Partners
            </span>

            <h1 className="text-3xl flex justify-center mb-10 lg:text-4xl font-bold text-gray-900 ">
                Fast & Reliable <br />
                <span className="text-green-600">Delivery You Can Trust</span>
            </h1>
            <div className=" mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">

                {/* Content Section */}
                <div className="space-y-5">


                    <p className="text-gray-600 leading-relaxed">
                        <span className="text-gray-900 font-semibold">EatNow</span> delivery partners are trained, verified, and committed to
                        delivering your food safely and on time. From restaurant pickup to
                        your doorstep, every order is handled with care and responsibility.
                    </p>

                    <p className="text-gray-600 leading-relaxed">
                        Our delivery team follows strict hygiene practices, uses secure
                        packaging, and ensures smooth communication so you can track your
                        order in real time and enjoy peace of mind.
                    </p>


                    <div className="flex flex-wrap gap-4 pt-2">
                        <div className="px-4 py-2 bg-gray-50 rounded-lg shadow text-sm font-medium text-gray-700">
                            Verified Delivery Partners
                        </div>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg shadow text-sm font-medium text-gray-700">
                            Hygiene & Safety Trained
                        </div>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg shadow text-sm font-medium text-gray-700">
                            Live Order Tracking
                        </div>
                    </div>


                    <div className="pt-4">
                        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                            Track Your Order
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div className=" h-full">
                    <img
                        src="/Delivery_banner_image.jpg"
                        alt="EatNow Delivery Partner"
                        className="w-full h-80 lg:h-105 object-cover rounded-xl shadow-lg"
                    />
                </div>

            </div>
        </section>
    );
};

export default DeliveryManFeature;
