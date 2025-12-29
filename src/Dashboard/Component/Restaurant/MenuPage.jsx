import React from "react";
import { useNavigate } from "react-router";
import {
    useQuery
} from '@tanstack/react-query'
import { useSelector } from "react-redux";
import useAxiosPublic from "../../../Public/Hook/useAxiosPublic";
import Loading from "../../../CustomeLoading/Loading";
import Swal from 'sweetalert2'


const MenuPage = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const axiosPublic = useAxiosPublic();

    const { data: food_item, refetch, isPending } = useQuery({
        queryKey: ['food_item', user?.id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/restaurant/food_item/${user?.id}`)
            console.log(res.data);
            return res.data
        }
    })



    // delete food item //

    const handleDelete_Food_item = (food_id) => {
        const id = food_id;
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this food item !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/api/restaurant/food_item_delete/${id}`)
                if (res.data?.message) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text:res.data?.message,
                        icon: "success"
                    });
                }
            }
        });

    }

    // loading style ///
    if (isPending) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Menu Management
                </h1>

                <button onClick={() => navigate('/restaurant_Dashboard/AddFood')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
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
                        {
                            food_item?.map((item, index) => <tr key={index} className="border-t">
                                <td className="p-3">
                                    <img src={item?.food_image} className="w-12 h-12 bg-gray-300 rounded" />
                                </td>
                                <td className="p-3">{item?.food_name}</td>
                                <td className="p-3">৳ {item?.price}</td>
                                <td className="p-3">
                                    <span className={`${item?.available === true && 'text-green-500' || 'text-red-500'} text-sm font-medium`}>
                                        {item?.available === true ? "Available" : "out of stock"}
                                    </span>
                                </td>
                                <td className="p-3">
                                    details
                                </td>
                                <td className="p-3 space-x-2">
                                    <button onClick={()=>navigate(`/restaurant_Dashboard/Food_Edit/${item?.id}`)} className="text-blue-600 hover:underline">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete_Food_item(item?.id)} className="text-red-600 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuPage;
