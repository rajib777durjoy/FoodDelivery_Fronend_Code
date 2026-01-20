import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Bounce, toast } from 'react-toastify';
import useAxiosSecure from '../../../Public/Hook/useAxiosSecure';

const SelectDVHero = () => {
    const userData = useSelector(state => state.user.user);
    const { id: order_id } = useParams()
    console.log('order_id::', order_id)
    const axiosPublic = useAxiosSecure();
 

    const { data: deliverMan = [], isPending, refetch } = useQuery({
        queryKey: ['deliverMan', userData?.id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/deliveryHero/deliver_man/${userData?.email}`);
            return res.data;
        },
        
    });
    const handleSelectDeliver = (id) => { // id = is deliver_hero id //
        axiosPublic.patch(`/api/deliveryHero/deliver_man/update/${id}`, { order_id })
            .then(res => {
                console.log('update message::', res.data.message);
                if (res.data.message === 'Booking Successfull !') {
                    refetch()
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
                console.log('error', err);
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
    }


    //     {
    //     user_id: 15,
    //     fullname: 'Yash Das',
    //     email: 'yash123das@gmail.com',
    //     profile: 'https://res.cloudinary.com/dwmkakht7/image/upload/v1767368824/eavqrbuug7puwszdcoe8.jpg',
    //     email: 'yash123das@gmail.com',
    //     profile: 'https://res.cloudinary.com/dwmkakht7/image/upload/v1767368824/eavqrbuug7puwsz    email: 'yash123das@gmail.com',
    //     email: 'yash123das@gmail.com',
    //     profile: 'https://res.cloudinary.com/dwmkakht7/image/upload/v1767368824/eavqrbuug7puwszdcoe8.jpg',
    //     deliverHero_id: 3,
    //     socket: '-PT80UqgcIsPvZ_iAAAH',
    //     phone: '01733757561',
    //     location: 'bangladesh,sylhet',
    //     ride: 'cycle',
    //     description: 'Deliver Hero is a dedicated delivery partner who ensures fast, reliable, and safe delivery of orders from restaurants, e-commerce stores, or service providers to customers. Each Deliver Hero is verified, trained, and assigned tasks based on availability and location, ensuring timely delivery and excellent customer experience.',
    //     active: true
    //   }
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                🚚 Select Delivery Partner
            </h2>

            {isPending && (
                <p className="text-center py-6 text-gray-500">Loading delivery partners...</p>
            )}

            {!isPending && deliverMan.length === 0 && (
                <p className="text-gray-500">No delivery partner found.</p>
            )}

            {!isPending && deliverMan.length > 0 && (
                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-100">
                            <tr>

                                <th className="px-4 py-3 text-left text-sm font-semibold">Profile</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Area</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Active</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Select_hero</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliverMan.map((dv, index) => (
                                <tr
                                    key={index}
                                    className={`border-b `}
                                >


                                    <td className="px-4 py-3 ">
                                        <img
                                            src={dv?.profile || 'https://i.ibb.co/5GzXkwq/user.png'}
                                            alt="profile"
                                            className="w-10 h-10  rounded-full object-cover"
                                        />

                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {dv.fullname}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {dv.phone}
                                    </td>

                                    <td className="px-4 py-3 text-sm" title={dv.location}>
                                        {(dv.location.slice(0, 7)) + "..." || 'N/A'}
                                    </td>

                                    <td className={`px-4 text-sm  ${dv.socket.length > 5 ? ' text-green-700' : ' text-red-700'} `}>
                                        {dv.socket.length > 5 ? "Online" : "Offline"}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${dv.status
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {dv.status ? 'Available' : 'Busy'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleSelectDeliver(dv?.deliverHero_id)} disabled={!dv.status} className={`rounded-md text-black px-2 py-1 ${dv.status ? 'px-4 bg-green-700 text-white' : "text-red-700"}`}> {dv.status? "Select" : "On_the_way"}</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SelectDVHero;

