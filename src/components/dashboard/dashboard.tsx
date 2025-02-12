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
        <div className="bg-gray-50 min-h-screen p-6 rounded-md">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Summary Cards */}
                {[
                    { title: "Revenue", value: "$25,000", change: "+10%", color: "text-green-500", icon: "💰" },
                    { title: "Expenses", value: "$18,000", change: "+5%", color: "text-red-500", icon: "💸" },
                    { title: "Net Profit", value: "$7,000", change: "+15%", color: "text-blue-500", icon: "📈" },
                    { title: "Cash Flow", value: "$5,000", change: "+8%", color: "text-purple-500", icon: "💵" },
                ].map((card, index) => (
                    <div key={index} className="bg-white shadow-sm rounded-md p-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-700 text-sm font-semibold">{card.title}</h3>
                                <p className="text-gray-800 text-md font-bold">{card.value}</p>
                                <p className={`${card.color} text-[0.7rem]`}>{card.change}</p>
                            </div>
                            <div className={`text-3xl ${card.color}`}>{card.icon}</div>
                        </div>
                    </div>
                ))}

                {/* Financial Trend Charts */}
                <div className="md:col-span-2 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-sm font-semibold mb-1">Revenue vs. Expense</h3>
                    <Line data={revenueExpenseData} options={{
                        plugins: { legend: { display: false }, tooltip: { enabled: true } },
                        scales: { y: { ticks: { font: { size: 9 } } }, x: { ticks: { font: { size: 9 } } } }
                    }} />
                </div>

                <div className="md:col-span-1 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-sm font-semibold mb-1">Cash Flow Trend</h3>
                    <Bar data={cashFlowData} options={{
                        plugins: { legend: { display: false }, tooltip: { enabled: true } },
                        scales: { y: { ticks: { font: { size: 9 } } }, x: { ticks: { font: { size: 9 } } } }
                    }} />
                </div>

                <div className="md:col-span-1 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-sm font-semibold mb-1">Expense Breakdown</h3>
                    <Pie data={expenseBreakdownData} options={{
                        plugins: { legend: { display: false }, tooltip: { enabled: true } },
                        scales: { y: { ticks: { font: { size: 9 } } }, x: { ticks: { font: { size: 9 } } } }
                    }} />
                </div>

                {/* Alerts & Quick Actions */}
                <div className="md:col-span-2 space-y-3">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-md p-2">
                        <h3 className="text-yellow-700 text-sm font-semibold">Alerts & Notifications</h3>
                        <p className="text-gray-700 text-[0.8rem]">⚠️ Possible fraud detected.</p>
                        <p className="text-gray-700 text-[0.8rem]">📅 Tax payment due in 5 days.</p>
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row gap-2 items-center">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-[4px] p-2 flex items-center">
                        <span className="mr-1">📄</span> Generate Report
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-[4px] p-2 flex items-center">
                        <span className="mr-1">➕</span> Add Record
                    </button>
                    <button className="bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-[4px] p-2 flex items-center">
                        <span className="mr-1">💡</span> Optimize Expenses
                    </button>
                </div>

                {/* Recent Transactions */}
                <div className="md:col-span-4 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-sm font-semibold mb-1">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead>
                                <tr>
                                    <th className="px-2 py-1 text-left text-gray-600">Type</th>
                                    <th className="px-2 py-1 text-left text-gray-600">Amount</th>
                                    <th className="px-2 py-1 text-left text-gray-600">Payment Method</th>
                                    <th className="px-2 py-1 text-left text-gray-600">Date</th>
                                    <th className="px-2 py-1 text-left text-gray-600">Description</th>
                                    <th className="px-2 py-1 text-left text-gray-600">Category</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[
                                    { type: "Income", amount: "$5,000", paymentMethod: "Credit Card", date: "2025-02-10", description: "Client Payment", category: "Sales" },
                                    { type: "Expense", amount: "$1,000", paymentMethod: "Cash", date: "2025-02-09", description: "Office Supplies", category: "Operations" },
                                    { type: "Expense", amount: "$2,000", paymentMethod: "Credit Card", date: "2025-02-08", description: "Marketing", category: "Marketing" },
                                ].map((transaction, index) => (
                                    <tr key={index}>
                                        <td className="px-2 py-1">{transaction.type}</td>
                                        <td className="px-2 py-1">{transaction.amount}</td>
                                        <td className="px-2 py-1">{transaction.paymentMethod}</td>
                                        <td className="px-2 py-1">{transaction.date}</td>
                                        <td className="px-2 py-1">{transaction.description}</td>
                                        <td className="px-2 py-1">{transaction.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}