import React, { useState } from "react";
import Select from "react-select";
import useAxiosPublic from "../../../Public/Hook/useAxiosPublic";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { GiCircularSawblade } from "react-icons/gi";

const AddFood = () => {
    const [category, setCategory] = useState(null);
    const [availability, setAvailability] = useState(null);
    const [image, setimage] = useState()
    const axiosPublic = useAxiosPublic();
    const user = useSelector(state => state.user.user);
    const [loading, setloading] = useState(false);

    // Options for react-select
    const categoryOptions = [
        { value: "Fast Food", label: "Fast Food" },
        { value: "Chinese", label: "Chinese" },
        { value: "Vegetarian", label: "Vegetarian" },
        { value: "Biryani", label: "Biryani" },
        { value: "Pizza", label: "Pizza" },
        { value: "Sandwich", label: "Sandwich" },
        { value: "Desserts", label: "Desserts" },
        { value: "Burger", label: "Burger" },
    ];

    const availabilityOptions = [
        { value: "available", label: "Available" },
        { value: "out_of_stock", label: "Out of Stock" },
    ];

    const handleAddFood = (e) => {
        e.preventDefault();
        setloading(true)
        const data = e.target;
        const formData = new FormData();
        formData.append('food_name', data.food_name.value)
        formData.append('price', data.price.value)
        formData.append('category', category)
        formData.append('food_image', e.target.food_image.files[0])
        formData.append('available', availability)
        formData.append('description', data.description.value)

        axiosPublic.post(`/api/restaurant/add_food/${user?.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => {
            console.log('response::', res.data?.message)
            if (res.data?.message) {
                setloading(false)
                toast.success(res.data?.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
          
        }).catch(err => {
            setloading(false)
            console.log('error', err?.message)
        })
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">
                Add New Food Item
            </h1>

            <form onSubmit={handleAddFood} className="space-y-4">
                {/* Food Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Food Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Chicken Burger"
                        name="food_name"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        placeholder="Price"
                        name='price'
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* Category using React-Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <Select
                        options={categoryOptions}
                        defaultValue={category}
                        onChange={(categoryOptions) => setCategory(categoryOptions.value)}
                        placeholder="Select category"
                        className="text-black"
                    />
                </div>

                {/* Availability using React-Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Availability
                    </label>
                    <Select
                        options={availabilityOptions}
                        defaultValue={availability}
                        onChange={(availabilityOptions) => setAvailability(availabilityOptions.value)}
                        placeholder="Select availability"
                        className="text-black"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Food Image
                    </label>
                    <input type="file" name="food_image" onChange={(e) => setimage(URL.createObjectURL(e.target.files[0]))} className="w-full mt-1" />
                    {image && <img src={image} className="w-20 h-20 "></img>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Short description of the food"
                        name="description"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    {
                        loading ? <button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold "><GiCircularSawblade className="text-2xl text-white animate-spin" /></button> : <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
                        >
                            Add Food
                        </button>
                    }


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

