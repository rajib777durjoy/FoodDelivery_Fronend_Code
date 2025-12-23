import React, { useState } from "react";
import Select from "react-select";

const OrdersPage = () => {
  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: "ORD1234",
      customer: "John Doe",
      customerId: "CUST001",
      amount: 350,
      date: "2025-12-20",
      status: "Pending",
      assignedDelivery: null,
    },
    {
      id: "ORD1235",
      customer: "Jane Smith",
      customerId: "CUST002",
      amount: 450,
      date: "2025-12-21",
      status: "Assigned",
      assignedDelivery: "DM001",
    },
    {
      id: "ORD1236",
      customer: "Michael Johnson",
      customerId: "CUST003",
      amount: 220,
      date: "2025-12-22",
      status: "Delivered",
      assignedDelivery: "DM002",
    },
  ]);

  // Sample delivery men options
  const deliveryMenOptions = [
    { value: "DM001", label: "Rony" },
    { value: "DM002", label: "Sabbir" },
    { value: "DM003", label: "Rashed" },
  ];

  // Assign delivery man handler
  const handleAssignDelivery = (orderId, selectedDelivery) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, assignedDelivery: selectedDelivery.value, status: "Assigned" }
          : order
      )
    );
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Assigned":
        return "text-blue-600";
      case "Delivered":
        return "text-green-600";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-sm text-gray-600">Order ID</th>
              <th className="p-3 text-sm text-gray-600">Customer</th>
              <th className="p-3 text-sm text-gray-600">Customer ID</th>
              <th className="p-3 text-sm text-gray-600">Amount </th>
              <th className="p-3 text-sm text-gray-600">Date</th>
              <th className="p-3 text-sm text-gray-600">Status</th>
              <th className="p-3 text-sm text-gray-600">Assign Delivery</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.customerId}</td>
                <td className="p-3">{order.amount}</td>
                <td className="p-3">{order.date}</td>
                <td className={`p-3 font-medium ${statusColor(order.status)}`}>
                  {order.status}
                </td>
                <td className="p-3">
                  {order.status === "Pending" ? (
                    <Select
                      options={deliveryMenOptions}
                      placeholder="Select Delivery Man"
                      onChange={(selectedOption) =>
                        handleAssignDelivery(order.id, selectedOption)
                      }
                    />
                  ) : (
                    <span className="text-gray-600">
                      {order.assignedDelivery
                        ? deliveryMenOptions.find(
                            (d) => d.value === order.assignedDelivery
                          )?.label
                        : "-"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
