import React, { useContext } from "react";
import { useSelector } from "react-redux";


const Profile = () => {
    const userData= useSelector(state=>state.user.user);

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading text-black loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-4xl mx-auto">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow p-8">

                    {/* Top Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                        <img
                            src={userData.profile}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                        />

                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {userData.fullname}
                            </h2>
                            <p className="text-gray-500">{userData.email}</p>

                            <span className="inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                                {userData.role}
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t mb-6"></div>

                    {/* Info Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">

                        <Info label="user ID" value={userData.id} />
                        <Info label="Full Name" value={userData.fullname} />
                        <Info label="Email Address" value={userData.email} />
                        <Info label="Role" value={userData.role} />

                    </div>

                    {/* Actions */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <button className="btn btn-outline bg-green-600 w-full sm:w-auto">
                            Edit Profile
                        </button>
                        <button className="btn btn-outline bg-red-600 w-full sm:w-auto">
                            Change Password
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

const Info = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-800">{value}</span>
    </div>
);

export default Profile;
