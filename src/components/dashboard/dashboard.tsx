"use client";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement, ArcElement, Tooltip, Legend);

const revenueExpenseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
        { label: 'Revenue', data: [10000, 12000, 15000, 13000], borderColor: '#28a745', fill: false },
        { label: 'Expense', data: [7000, 8000, 10000, 9000], borderColor: '#dc3545', fill: false }
    ]
};

const cashFlowData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
        { label: 'Inflow', data: [15000, 17000, 20000], backgroundColor: '#007bff' },
        { label: 'Outflow', data: [10000, 12000, 14000], backgroundColor: '#ffc107' }
    ]
};

const expenseBreakdownData = {
    labels: ['Salaries', 'Taxes', 'Loans', 'Assets'],
    datasets: [{ data: [5000, 2500, 2000, 3000], backgroundColor: ['#8884d8', '#82ca9d', '#ffc658', '#d84f4f'] }]
};

export default function DashboardComponent() {
    return (
        <div className="bg-gray-100 rounded-md p-4">
            <h2 className="heading1">Dashboard</h2>
            <div className="grid grid-cols-4 gap-6 p-4 w-full">
                {/* Summary Cards */}
                {[
                    { title: "Revenue", value: "$25,000", color: "text-green-600" },
                    { title: "Expenses", value: "$18,000", color: "text-red-600" },
                    { title: "Net Profit", value: "$7,000", color: "text-blue-600" },
                    { title: "Cash Flow", value: "$5,000", color: "text-purple-600" },
                ].map((card, index) => (
                    <div key={index} className={`p-4 bg-white shadow rounded-xl ${card.color}`}>
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p className="text-2xl font-semibold">{card.value}</p>
                    </div>
                ))}

                {/* Financial Trend Charts */}
                <div className="col-span-2 bg-white p-4 shadow rounded-xl">
                    <h3 className="text-md font-semibold mb-2">Revenue vs. Expense Over Time</h3>
                    <Line data={revenueExpenseData} />
                </div>
                <div className="col-span-1 bg-white p-4 shadow rounded-xl">
                    <h3 className="text-md font-semibold mb-2">Cash Flow Trend</h3>
                    <Bar data={cashFlowData} />
                </div>
                <div className="col-span-1 bg-white p-4 shadow rounded-xl">
                    <h3 className="text-md font-semibold mb-2">Expense Breakdown</h3>
                    <Pie data={expenseBreakdownData} />
                </div>

                {/* Alerts & Quick Actions */}
                <div className="col-span-2 space-y-4">
                    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                        <h3 className="text-yellow-600 font-semibold">Alerts & Notifications</h3>
                        <p>⚠️ Possible fraud detected in recent transactions.</p>
                        <p>📅 Upcoming tax payment due in 5 days.</p>
                    </div>
                </div>
                <div className="col-span-2 flex gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded flex items-center">📥 Generate Report</button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded flex items-center">➕ Add Record</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded flex items-center">⚙ Optimize Expenses</button>
                </div>
            </div>
        </div>
    );
}
