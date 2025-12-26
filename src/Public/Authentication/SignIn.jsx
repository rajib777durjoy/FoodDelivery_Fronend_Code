import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { Bounce, toast } from "react-toastify";

const SignIn = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { SignInUser, GoogleSingIn } = useContext(AuthContext)
  const axiosPublic =useAxiosPublic();
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log("Sign In Data:", data.email);
    SignInUser(data?.email, data?.password)
      .then(res => {
        console.log(res?.user)
        toast.success('SingIn successfull', {
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
      }).catch(err => {
        console.log('error', err?.message)
      })
  };

   const handleGoogleSignIn = () => {
        GoogleSingIn()
            .then((res) => {
                if (res.user) {
                    console.log('user api call form google')
                    axiosPublic.post('/api/user/user_data', {
                        fullname: res.user?.displayName,
                        email: res.user?.email,
                        profile: res.user?.photoURL
                    }).then(res => {  
                        return navigate('/')
                    });

                }

            }).catch(err => {
                console.log('err', err)
            })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-green-700">SignIn Your Account</h2>
        <p className="text-center text-gray-500 mt-2">Welcome back! Please SingIn to continue.</p>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full mt-6 border border-green-500 py-2 rounded-lg flex items-center justify-center gap-2 text-green-700 hover:bg-green-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-400 outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-400  outline-none"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white"
              >
                {showPassword ? <IoIosEyeOff className="text-xl" /> : <IoMdEye className="text-xl" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <p className="text-right text-sm text-green-700 hover:underline cursor-pointer">
            Forgot Password?
          </p>

          {/* Submit */}
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to={'/SignUp'} className="text-green-700 font-medium cursor-pointer hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
