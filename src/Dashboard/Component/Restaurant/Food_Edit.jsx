import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../../../Public/Hook/useAxiosPublic';
import Loading from '../../../CustomeLoading/Loading';
import Select from "react-select";
import { GiCircularSawblade } from "react-icons/gi";
import { Bounce, toast } from 'react-toastify';

const Food_Edit = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [categorys, setCategory] = useState(null);
    const [image, setimage] = useState(null)
    const [availability, setAvailability] = useState(null);
    const [loading, setloading] = useState(false)

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

    const { data: food_item,isPending } = useQuery({
        queryKey: ['food_item', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/restaurant/single_food_item/${id}`);
            return res.data;
        }
    })
    if (isPending) {
        return (
            <Loading></Loading>
        )
    }
    const { id: food_id, res_id, category, food_name, price, food_image, available, description } = food_item || {}
    const handle_Edit_Food_Item = (e) => {
        e.preventDefault();
        setloading(true)

        const formData = new FormData();
        formData.append('food_name', e.target.food_name.value);
        formData.append('price', e.target.price.value);
        formData.append('category', categorys)
        formData.append('available', availability);
        if (image) {
            formData.append('food_image', e.target.food_image.files[0])
        } else {
            formData.append('food_image', food_image)
        }
        formData.append('description', e.target.description.value)

        axiosPublic.put(`/api/restaurant/single_food_item/edit/${food_id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
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
        })



    }
    return (
        <div>
            <form onSubmit={handle_Edit_Food_Item} className="space-y-4">
                {/* Food Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Food Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Chicken Burger"
                        name="food_name"
                        defaultValue={food_name}
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
                        defaultValue={price}
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
                        onChange={(categoryOptions) => setCategory(categoryOptions.value)}
                        placeholder="Select category"
                        className="text-black"
                        required
                    />
                </div>

                {/* Availability using React-Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Availability
                    </label>
                    <Select
                        options={availabilityOptions}
                        onChange={(availabilityOptions) => setAvailability(availabilityOptions.value)}
                        placeholder="Select availability"
                        className="text-black"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Food Image
                    </label>
                    <input type="file" name="food_image" onChange={(e) => setimage(URL.createObjectURL(e.target.files[0]))} className="w-full mt-1" />
                    {food_image && <img src={food_image} className="w-20 h-20 "></img>}
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
                        defaultValue={description}
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
                            Submit
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

export default Food_Edit;