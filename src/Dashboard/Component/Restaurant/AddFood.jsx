import React, { useState } from "react";
import Select from "react-select";

const AddFood = () => {
    const [category, setCategory] = useState(null);
    const [availability, setAvailability] = useState(null);

    // Options for react-select
    const categoryOptions = [
        { value: "burger", label: "Burger" },
        { value: "pizza", label: "Pizza" },
        { value: "drinks", label: "Drinks" },
        { value: "dessert", label: "Dessert" },
    ];

    const availabilityOptions = [
        { value: "available", label: "Available" },
        { value: "out_of_stock", label: "Out of Stock" },
    ];

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">
                Add New Food Item
            </h1>

            <form className="space-y-4">
                {/* Food Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Food Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Chicken Burger"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div className="flex justify-between">
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    {/* Quantity */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Quantity
                    </label>
                    <input
                        type="number"
                        placeholder="Quantity"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                </div>
                

                {/* Category using React-Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <Select
                        options={categoryOptions}
                        value={category}
                        onChange={setCategory}
                        placeholder="Select category"
                    />
                </div>

                {/* Availability using React-Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Availability
                    </label>
                    <Select
                        options={availabilityOptions}
                        value={availability}
                        onChange={setAvailability}
                        placeholder="Select availability"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Food Image
                    </label>
                    <input type="file" className="w-full mt-1" />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Short description of the food"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
                    >
                        Add Food
                    </button>

                    <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFood;

