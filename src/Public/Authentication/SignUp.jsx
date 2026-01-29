import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { auth } from "../../../firebase.config";
import { Bounce, toast } from "react-toastify";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";
import { GiCircularSawblade } from "react-icons/gi";

const SignUp = () => {
    const { CreateNewUser, GoogleSingIn } = useContext(AuthContext)
    const [profileImage, setProfileImage] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()

    // State for show/hide password //
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [loading,setLoading]=useState(false)
    const password = watch('password')
    const onSubmit = async (data) => {
        const file = data?.profile[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "imageUpload");
        const res = await axios.post("https://api.cloudinary.com/v1_1/dwmkakht7/image/upload",
            formData
        );
        const imageUrl = res?.data?.secure_url
        // console.log('imageurl', imageUrl)
        CreateNewUser(data?.email, password)
            .then(res => {
                setLoading(true)
                console.log(res.user)
                if (res?.user && imageUrl) {
                    updateProfile(auth.currentUser, {
                        displayName: data?.fullname, photoURL: imageUrl
                    }).then(() => {
                        axiosPublic.post('/api/user/user_data', {
                            fullname: data?.fullname,
                            email: data?.email,
                            profile: imageUrl
                        }).then(res => {
                            if (res.data) {
                                setLoading(false)
                                toast.success('SingUp successfull', {
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
                                return navigate('/')
                            }
                        })


                    }).catch((err) => {
                        setLoading(false)
                        toast.error(err?.message, {
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
                        console.log('signUp error', err?.message)
                    })
                }
            }).catch(err => {
                setLoading(false)
                 
                toast.error(err?.message, {
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

            })
    };
    const handleGoogleSignIn = () => {
        setLoading(true)
        GoogleSingIn()
            .then((res) => {
                if (res.user) {
                    axiosPublic.post('/api/user/user_data', {
                        fullname: res.user?.displayName,
                        email: res.user?.email,
                        profile: res.user?.photoURL
                    }).then(res => {
                        if (res.data) {
                            setLoading(false)
                            return navigate('/')
                        }
                    });
                }

            }).catch(err => {
                setLoading(false)
                console.log('err', err)
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-green-700">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 mt-2">
                    Join us and order your favorite food
                </p>

                {/* Google Button (UI only) */}
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
                    {/* Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-400 outline-none"
                            {...register("fullname", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fullname.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-400 outline-none"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-gray-700 text-sm">Upload Your Profile</legend>
                        <input type="file" {...register("profile", { required: "Proflie is required" })} accept="image/*" className="file-input rounded-lg w-full text-gray-700 bg-transparent border-green-300" />
                    </fieldset>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create password"
                                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-400 outline-none"
                                {...register("password", {
                                    required: "Password is required",
                                    // minLength: {
                                    //     value: 6,
                                    //     message: "Minimum 6 characters",
                                    // },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-4 text-gray-600"
                            >
                                {showPassword ? <IoMdEye className="text-xl" /> : <IoIosEyeOff className="text-xl" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-400 outline-none"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: value =>
                                        value === password || "Passwords do not match",
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-4 text-gray-600"
                            >
                                {showConfirmPassword ? <IoMdEye className="text-xl" /> : <IoIosEyeOff className="text-xl" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    {loading?<button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold "><GiCircularSawblade className="text-2xl text-white animate-spin" /></button>:<button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Sign Up
                    </button>}
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to={'/SignIn'} className="text-green-700 font-medium cursor-pointer hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;




