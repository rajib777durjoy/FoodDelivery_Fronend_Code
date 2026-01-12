import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis
} from 'recharts';

 const dummyOrders = [
  {
    id: 1,
    owner_id: 101,
    cus_id: 201,
    food_id: 301,
    delivery_id: 401,
    delivery_location: "Dhaka",
    payment: 150.50,
    dueAmount: 0,
    customer_phone: "01712345678",
    quantity: 2,
    payment_method: "Card",
    payment_tran_id: "TRX001",
    payment_status: true,
    deliveryTime: "2026-01-05T12:00:00Z",
    status: "completed",
    OTP: 1234,
    created_at: "2026-01-05T10:00:00Z"
  },
  {
    id: 2,
    owner_id: 101,
    cus_id: 202,
    food_id: 302,
    delivery_id: 402,
    delivery_location: "Chittagong",
    payment: 80.00,
    dueAmount: 0,
    customer_phone: "01898765432",
    quantity: 1,
    payment_method: "Cash",
    payment_tran_id: "",
    payment_status: false,
    deliveryTime: "2026-01-06T14:30:00Z",
    status: "panding",
    OTP: 5678,
    created_at: "2026-01-06T13:30:00Z"
  },
  {
    id: 3,
    owner_id: 101,
    cus_id: 203,
    food_id: 303,
    delivery_id: 403,
    delivery_location: "Dhaka",
    payment: 120.75,
    dueAmount: 0,
    customer_phone: "01911223344",
    quantity: 3,
    payment_method: "Online",
    payment_tran_id: "TRX002",
    payment_status: true,
    deliveryTime: "2026-01-07T16:00:00Z",
    status: "completed",
    OTP: 4321,
    created_at: "2026-01-07T15:00:00Z"
  },
  {
    id: 4,
    owner_id: 101,
    cus_id: 204,
    food_id: 304,
    delivery_id: 404,
    delivery_location: "Sylhet",
    payment: 95.00,
    dueAmount: 0,
    customer_phone: "01677889900",
    quantity: 2,
    payment_method: "Card",
    payment_tran_id: "TRX003",
    payment_status: true,
    deliveryTime: "2026-01-08T18:30:00Z",
    status: "completed",
    OTP: 8765,
    created_at: "2026-01-08T17:30:00Z"
  },
  {
    id: 5,
    owner_id: 101,
    cus_id: 205,
    food_id: 305,
    delivery_id: 405,
    delivery_location: "Dhaka",
    payment: 60.00,
    dueAmount: 0,
    customer_phone: "01566778899",
    quantity: 1,
    payment_method: "Cash",
    payment_tran_id: "",
    payment_status: false,
    deliveryTime: "2026-01-09T20:00:00Z",
    status: "panding",
    OTP: 1357,
    created_at: "2026-01-09T19:00:00Z"
  },
];

export default function EarningsPage() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  
  useEffect(() => {
    // 1️⃣ Summary cards
    const totalPay = dummyOrders.reduce((acc, o) => acc + parseFloat(o.payment), 0);
    const totalOrd = dummyOrders.reduce((acc, o) => acc + (o.quantity || 1), 0);
    const pendingOrd = dummyOrders.filter(o => o.status === 'panding').length;
    setTotalPayment(totalPay);
    setTotalOrders(totalOrd);
    setPendingOrders(pendingOrd);

    // 2️⃣ Monthly Data
    const monthly = {};
    dummyOrders.forEach(o => {
      const month = new Date(o.created_at).toLocaleString('default', { month: 'short' });
      if (!monthly[month]) monthly[month] = { month, totalPayment: 0, totalOrders: 0 };
      monthly[month].totalPayment += parseFloat(o.payment);
      monthly[month].totalOrders += o.quantity || 1;
    });
    setMonthlyData(Object.values(monthly));

    // 3️⃣ Payment Method Pie
    const paymentMethods = {};
    dummyOrders.forEach(o => {
      if (!paymentMethods[o.payment_method]) paymentMethods[o.payment_method] = 0;
      paymentMethods[o.payment_method] += 1;
    });
    setPaymentMethodData(
      Object.keys(paymentMethods).map(k => ({ name: k || 'Unknown', value: paymentMethods[k] }))
    );

    // 4️⃣ Order Status Pie
    const orderStatus = {};
    dummyOrders.forEach(o => {
      if (!orderStatus[o.status]) orderStatus[o.status] = 0;
      orderStatus[o.status] += 1;
    });
    setOrderStatusData(
      Object.keys(orderStatus).map(k => ({ name: k, value: orderStatus[k] }))
    );

  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div style={{ padding: '30px', background: '#f5f6fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>Earnings Dashboard</h1>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
        <Card title="Total Payment" value={`$${totalPayment.toFixed(2)}`} color="#007bff" />
        <Card title="Total Orders" value={totalOrders} color="#28a745" />
        <Card title="Pending Orders" value={pendingOrders} color="#ff6347" />
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {/* Bar Chart: Total Payment */}
        <ChartCard title="Total Payment ($)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalPayment" fill="#007bff" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line Chart: Total Orders */}
        <ChartCard title="Total Orders">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalOrders" stroke="#28a745" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart: Payment Methods */}
        <ChartCard title="Payment Method Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={paymentMethodData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {paymentMethodData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart: Order Status */}
        <ChartCard title="Order Status Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={orderStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {orderStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// Small card component
const Card = ({ title, value, color }) => (
  <div style={{
    flex: '1 1 200px', background: '#fff', padding: '20px',
    borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }}>
    <h4>{title}</h4>
    <p style={{ fontSize: '24px', fontWeight: 'bold', color }}>{value}</p>
  </div>
);

// Small card wrapper for charts
const ChartCard = ({ title, children }) => (
  <div style={{
    flex: '1 1 400px', background: '#fff', padding: '20px',
    borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>{title}</h3>
    {children}
  </div>
);




