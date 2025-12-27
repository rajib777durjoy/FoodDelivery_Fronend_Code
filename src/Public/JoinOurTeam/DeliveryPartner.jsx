import React from "react";
import { useForm } from "react-hook-form";

const DeliveryPartner = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Delivery Partner Data:", data);
    reset();
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full lg:w-[60%] rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Become a Delivery Partner
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-black font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full mt-1 text-black px-3 py-2 border rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-black font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 text-black px-3 py-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-black font-medium">Address</label>
            <input
              type="text"
              placeholder="Your address"
              {...register("address", { required: "Address is required" })}
              className="w-full mt-1 text-black px-3 py-2 border rounded-md"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-black font-medium">Current Location</label>
            <input
              type="text"
              placeholder="City / Area"
              {...register("location", { required: "Location is required" })}
              className="w-full mt-1 px-3 text-black py-2 border rounded-md"
            />
          </div>

          {/* Delivery System */}
          <div>
            <label className="block text-black font-medium">Ride System</label>
            <select
              {...register("ride", {
                required: "Select delivery system",
              })}
              className="w-full mt-1 text-black px-3 py-2 border rounded-md"
            >
              <option value="">Select one</option>
              <option value="cycle">Cycle</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>
            {errors.deliverySystem && (
              <p className="text-red-500 text-sm">
                {errors.deliverySystem.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-black">Description</label>
            <textarea
              rows="3"
              placeholder="Tell us about yourself"
              {...register("description")}
              className="w-full mt-1 text-black px-3 py-2 border rounded-md"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-black py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryPartner;
