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
                    { title: "Revenue", value: "$25,000", change: "+10%", color: "text-green-600", icon: "💰" },
                    { title: "Expenses", value: "$18,000", change: "+5%", color: "text-red-600", icon: "💸" },
                    { title: "Net Profit", value: "$7,000", change: "+15%", color: "text-blue-600", icon: "📈" },
                    { title: "Cash Flow", value: "$5,000", change: "+8%", color: "text-purple-600", icon: "💵" },
                ].map((card, index) => (
                    <div key={index} className="p-4 bg-white shadow rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{card.title}</h3>
                                <p className="text-2xl font-semibold">{card.value}</p>
                                <p className={`text-sm ${card.color}`}>{card.change}</p>
                            </div>
                            <div className={`text-4xl ${card.color}`}>{card.icon}</div>
                        </div>
                    </div>
                ))}

                {/* Financial Trend Charts */}
                <div className="col-span-2 bg-white p-4 shadow rounded-xl">
                    <h3 className="text-md font-semibold mb-2">Revenue vs. Expense Over Time</h3>
                    <Line data={revenueExpenseData} options={{ plugins: { legend: { display: true }, tooltip: { enabled: true } } }} />
                </div>
                <div className="col-span-1 bg-white p-4 shadow rounded-xl">
                    <h3 className="text-md font-semibold mb-2">Cash Flow Trend</h3>
                    <Bar data={cashFlowData} options={{ plugins: { legend: { display: true }, tooltip: { enabled: true } } }} />
                </div>
                <div className="col-span-1 bg-white p-4 shadow rounded-xl">
                    <h3 className="text-md font-semibold mb-2">Expense Breakdown</h3>
                    <Pie data={expenseBreakdownData} options={{ plugins: { legend: { display: true }, tooltip: { enabled: true } } }} />
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

                {/* Recent Transactions */}
                <div className="col-span-4 bg-white p-4 shadow rounded-xl mt-6">
                    <h3 className="text-md font-semibold mb-2">Recent Transactions</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-md">
                                <th className="border p-2 text-left">Date</th>
                                <th className="border p-2 text-left">Description</th>
                                <th className="border p-2 text-left">Amount</th>
                                <th className="border p-2 text-left">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { date: "2025-02-10", description: "Client Payment", amount: "$5,000", type: "Income" },
                                { date: "2025-02-09", description: "Office Supplies", amount: "$1,000", type: "Expense" },
                                { date: "2025-02-08", description: "Marketing", amount: "$2,000", type: "Expense" },
                            ].map((transaction, index) => (
                                <tr key={index} className="border">
                                    <td className="border p-2 text-md">{transaction.date}</td>
                                    <td className="border p-2">{transaction.description}</td>
                                    <td className="border p-2">{transaction.amount}</td>
                                    <td className="border p-2">{transaction.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}