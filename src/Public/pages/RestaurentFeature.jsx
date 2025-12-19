import React from "react";
import { Link } from "react-router";

const RestaurentFeature = () => {
    return (
        <section className="w-full bg-gray-50 py-12 mt-10">
            <span className="block text-center text-lg font-semibold text-green-600 uppercase ">
                Featured Restaurants
            </span>

            <h1 className="text-3xl  flex justify-center items-center lg:text-4xl font-bold text-gray-900 mb-10">
                EatNow Restaurants <br />
                <span className="text-green-600">Quality You Can Trust</span>
            </h1>
            <div className=" mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">

                {/* Image Section */}
                <div className="w-full h-full">
                    <img
                        src="/restaurant_banner_imge.png"
                        alt="EatNow Featured Restaurants"
                        className="w-full h-80 lg:h-105 object-cover rounded-xl shadow-lg"
                    />
                </div>

                {/* Content Section */}
                <div className="space-y-5">

                    <p className="text-gray-600 leading-relaxed">
                        At <span className="font-semibold text-gray-900">EatNow</span>, we
                        partner with carefully selected restaurants to bring you fresh,
                        delicious, and hygienically prepared meals right to your doorstep.
                        Every restaurant on our platform is verified to ensure quality
                        ingredients, consistent taste, and reliable service.
                    </p>

                    <p className="text-gray-600 leading-relaxed">
                        Whether you're craving a quick bite or a full meal, EatNow
                        restaurants focus on fast preparation, safe packaging, and on-time
                        delivery. With real customer ratings and transparent information,
                        you always know what you're ordering and who you're ordering from.
                    </p>

                   
                    <div className="flex flex-wrap gap-4 pt-2">
                        <div className="px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700">
                             Verified Restaurants
                        </div>
                        <div className="px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700">
                             Real Customer Reviews
                        </div>
                        <div className="px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700">
                             Fast & Safe Delivery
                        </div>
                    </div>

                    
                    <div className="pt-4">
                        <Link to={'/All_restaurant'}><button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                            Explore Restaurants
                        </button></Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RestaurentFeature;
