import React from "react";
import { restaurantCategories } from "../../DemoDB/Db";
import { useNavigate } from "react-router";
 // adjust path if needed

const Category = () => {
    const navigate= useNavigate()
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Page Title */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    Explore Categories
                </h1>
                <p className="text-gray-600 mt-2">
                    Choose your favorite food category
                </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {restaurantCategories?.map((category) => (
                    <div
                        key={category.id}
                        onClick={()=>navigate(`/FoodByCategory/${category?.name}`)}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer group"
                    >
                        {/* Image */}
                        <div
                            className="h-32 rounded-t-xl bg-center bg-cover"
                            style={{
                                backgroundImage: `url(${category.image})`,
                            }}
                        ></div>

                        {/* Content */}
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition">
                                {category.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
