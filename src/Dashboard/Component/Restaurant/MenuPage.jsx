import React from "react";
import { useNavigate } from "react-router";

const MenuPage = () => {
    const navigate= useNavigate()
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Menu Management
                </h1>

                <button onClick={()=>navigate('/restaurant_Dashboard/AddFood')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                    + Add Food
                </button>
            </div>

            {/* Menu table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-sm text-gray-600">Image</th>
                            <th className="p-3 text-sm text-gray-600">Food Name</th>
                            <th className="p-3 text-sm text-gray-600">Price</th>
                            <th className="p-3 text-sm text-gray-600">Status</th>
                            <th className="p-3 text-sm  text-gray-600">View</th>
                            <th className="p-3 text-sm text-gray-600">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Row 1 */}
                        <tr className="border-t">
                            <td className="p-3">
                                <div className="w-12 h-12 bg-gray-300 rounded"></div>
                            </td>
                            <td className="p-3">Chicken Burger</td>
                            <td className="p-3">৳ 250</td>
                            <td className="p-3">
                                <span className="text-green-600 text-sm font-medium">
                                    Available
                                </span>
                            </td>
                            <td className="p-3">
                                details
                            </td>
                            <td className="p-3 space-x-2">
                                <button className="text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>

                        {/* Row 2 */}
                        <tr className="border-t">
                            <td className="p-3">
                                <div className="w-12 h-12 bg-gray-300 rounded"></div>
                            </td>
                            <td className="p-3">Chicken Pizza</td>
                            <td className="p-3">৳ 650</td>
                            <td className="p-3">
                                <span className="text-red-600 text-sm font-medium">
                                    Out of Stock
                                </span>
                            </td>
                            <td className="p-3"> details</td>
                            <td className="p-3 space-x-2">
                                <button className="text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuPage;
