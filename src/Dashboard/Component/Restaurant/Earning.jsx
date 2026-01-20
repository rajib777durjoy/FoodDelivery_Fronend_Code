import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, Legend, Cell,
  ResponsiveContainer, CartesianGrid, XAxis, YAxis
} from 'recharts';
import useAxiosSecure from '../../../Public/Hook/useAxiosSecure';
import { useSelector } from 'react-redux';

export default function EarningsPage() {
  const [orderData, setOrderData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  const axiosSecure = useAxiosSecure();
  const userData = useSelector(state => state.user.user);

  useEffect(() => {
    if (!userData?.id) return;

    axiosSecure
      .get(`/api/restaurant/earnigs_data/${userData.id}`)
      .then(res => {
        const orders = res.data || [];
        console.log('earning data',orders)
        setOrderData(orders);

        /* 1️⃣ Summary */
        setTotalPayment(
          orders.reduce((sum, o) => sum + Number(o.payment || 0), 0)
        );
        setTotalOrders(
          orders.reduce((sum, o) => sum + Number(o.quantity || 1), 0)
        );
        setPendingOrders(
          orders.filter(o => o.status === 'panding').length
        );

        /* 2️⃣ Monthly */
        const monthly = {};
        orders.forEach(o => {
          const month = new Date(o.created_at).toLocaleString('default', { month: 'short' });
          if (!monthly[month]) monthly[month] = { month, totalPayment: 0, totalOrders: 0 };
          monthly[month].totalPayment += Number(o.payment || 0);
          monthly[month].totalOrders += Number(o.quantity || 1);
        });
        setMonthlyData(Object.values(monthly));

        /* 3️⃣ Payment Method */
        const payMethod = {};
        orders.forEach(o => {
          payMethod[o.payment_method] = (payMethod[o.payment_method] || 0) + 1;
        });
        setPaymentMethodData(
          Object.entries(payMethod).map(([name, value]) => ({ name, value }))
        );

        /* 4️⃣ Order Status */
        const status = {};
        orders.forEach(o => {
          status[o.status] = (status[o.status] || 0) + 1;
        });
        setOrderStatusData(
          Object.entries(status).map(([name, value]) => ({ name, value }))
        );
      })
      .catch(() => console.log('fetch error'));
  }, [userData?.id]);

  const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444'];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Earnings Dashboard</h1>

      {/* Summary */}
      <div style={styles.summaryGrid}>
        <Card title="Total Payment" value={`৳ ${totalPayment.toFixed(2)}`} color="#4f46e5" />
        <Card title="Total Orders" value={totalOrders} color="#22c55e" />
        <Card title="Pending Orders" value={pendingOrders} color="#ef4444" />
      </div>

      {/* Charts */}
      <div style={styles.chartGrid}>
        <ChartCard title="Monthly Earnings">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalPayment" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Orders">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="totalOrders" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Methods">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={paymentMethodData} dataKey="value" nameKey="name" outerRadius={90} label>
                {paymentMethodData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Order Status">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={orderStatusData} dataKey="value" nameKey="name" outerRadius={90} label>
                {orderStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ---------------- UI Components ---------------- */

const Card = ({ title, value, color }) => (
  <div style={styles.card}>
    <p style={styles.cardTitle}>{title}</p>
    <h2 style={{ ...styles.cardValue, color }}>{value}</h2>
  </div>
);


const ChartCard = ({ title, children }) => (
  <div style={styles.chartCard}>
    <h3 style={styles.chartTitle}>{title}</h3>
    {children}
  </div>
);

/* ---------------- Styles ---------------- */

const styles = {
  page: {
    padding: '20px',
    background: '#f9fafb',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '700',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    background: '#fff',
    borderRadius: '14px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '14px',
    color: '#6b7280',
  },
  cardValue: {
    marginTop: '10px',
    fontSize: '26px',
    fontWeight: '700',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  chartCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: '600',
  },
};





