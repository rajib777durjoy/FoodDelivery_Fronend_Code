import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { GiCircularSawblade } from "react-icons/gi";

const BecomePartner = () => {
    const { register, handleSubmit, reset } = useForm();
    const [logoPreview, setLogoPreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [loading, setloadign] = useState(false);
    const axiosPublic = useAxiosPublic()
    const user = useSelector(state => state.user.user);
    //   console.log('user',user)
    const onSubmit = async (data) => {
        setloadign(true)
        try {
            const formData = new FormData();
            formData.append('user_id', user?.id)
            formData.append("restaurant_name", data.restaurantName);
            formData.append("ownerName", data.ownerName);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("address", data.address);
            formData.append('description', data.description)
            // File fields (logo, cover)
            if (data.logo && data.logo[0]) {
                formData.append("logo", data.logo[0]);
            }
            if (data.cover && data.cover[0]) {
                formData.append("cover", data.cover[0]);
            }

            // Axios POST
            const res = await axiosPublic.post(
                "/api/restaurant/restaurant_partner",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Server Response:", res.data?.message);
            if (res.data?.message) {
                setloadign(false)
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
                reset();
            }

        } catch (error) {
            setloadign(false)
            console.error("Upload Error:", error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">
                        List Your Restaurant on EatNow
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Reach millions of hungry customers and grow your business with EatNow
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >

                    {/* Restaurant Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Restaurant Name
                        </label>
                        <input
                            {...register("restaurantName", { required: true })}
                            type="text"
                            placeholder="e.g. Foodi Biryani House"
                            className="mt-1 w-full border text-black rounded-lg px-4 py-2 border-green-500 outline-none"
                        />
                    </div>

                    {/* Owner Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Owner Name
                        </label>
                        <input
                            {...register("ownerName", { required: true })}
                            type="text"
                            placeholder="Owner Full Name"
                            defaultValue={user?.fullname}
                            readOnly
                            className="mt-1 w-full border text-black rounded-lg px-4 py-2 border-green-500 outline-none"
                        />
                    </div>

                    {/* Restaurant Logo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Restaurant Logo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("logo", { required: true })}
                            onChange={(e) =>
                                setLogoPreview(URL.createObjectURL(e.target.files[0]))
                            }
                            className="mt-1 w-full text-black"
                        />
                        {logoPreview && (
                            <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="mt-3 h-20 w-20 rounded-full object-cover border"
                            />
                        )}
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Cover Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("cover", { required: true })}
                            onChange={(e) =>
                                setCoverPreview(URL.createObjectURL(e.target.files[0]))
                            }
                            className="mt-1 w-full text-black"
                        />
                        {coverPreview && (
                            <img
                                src={coverPreview}
                                alt="Cover Preview"
                                className="mt-3 h-20 w-full rounded-lg object-cover border"
                            />
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="example@email.com"
                            defaultValue={user?.email}
                            className="mt-1 w-full border text-black rounded-lg px-4 py-2 border-green-500 outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            {...register("phone", { required: true })}
                            type="tel"
                            placeholder="+880 1XXXXXXXXX"
                            className="mt-1 w-full border text-black rounded-lg px-4 py-2 border-green-500 outline-none"
                        />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Restaurant Address
                        </label>
                        <textarea
                            {...register("address", { required: true })}
                            rows="3"
                            placeholder="Full address with area"
                            className="mt-1 w-full border text-black rounded-lg px-4 py-2 border-green-500 outline-none"
                        ></textarea>
                    </div>
                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Restaurant Description
                        </label>
                        <textarea
                            {...register("description", { required: true })}
                            rows="3"
                            placeholder="Write a description about your restaurant"
                            className="mt-1 w-full border text-black rounded-lg px-4 py-2 border-green-500 outline-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 text-center mt-6">
                        {
                            loading && <button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold "><GiCircularSawblade className="text-2xl text-white animate-spin" /></button> || <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                        >
                          Submit Restaurant Information
                        </button>
                        }
                        
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BecomePartner;


