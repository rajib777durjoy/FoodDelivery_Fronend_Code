import React from "react";

const Delivery_History = () => {
    // Sample data
    const orders = [
        {
            id: "ORD1234",
            customer: "John Doe",
            deliverMan:"534396324",
            amount: 350,
            date: "2025-12-20",
            status: "Delivered",
        },
        {
            id: "ORD1235",
            customer: "Jane Smith",
            deliverMan:"534396324",
            amount: 450,
            date: "2025-12-21",
            status: "Pending",
        },
        {
            id: "ORD1236",
            customer: "Michael Johnson",
            deliverMan:"534396324",
            amount: 220,
            date: "2025-12-22",
            status: "Cancelled",
        },
    ];

    // Status color mapping
    const statusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "text-green-600";
            case "Pending":
                return "text-yellow-600";
            case "Cancelled":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">
                Delivery History
            </h1>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-sm text-gray-600">Order ID</th>
                            <th className="p-3 text-sm text-gray-600">Customer</th>
                            <th className="p-3 text-sm text-gray-600">Delivery Man</th>
                            <th className="p-3 text-sm text-gray-600">Amount </th>
                            <th className="p-3 text-sm text-gray-600">Date</th>
                            <th className="p-3 text-sm text-gray-600">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.customer}</td>
                                <td className="p-3">{order.deliverMan}</td>
                                <td className="p-3">{order.amount}</td>
                                <td className="p-3">{order.date}</td>
                                <td className={`p-3 font-medium ${statusColor(order.status)}`}>
                                    {order.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Delivery_History;
