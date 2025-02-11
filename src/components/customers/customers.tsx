"use client";
import { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Customer {
    name: string;
    totalRevenue: string;
    pendingPayments: string;
    lastPaymentDate: string;
}

interface Transaction {
    date: string;
    amount: string;
    type: string;
}

const customersData: Customer[] = [
    { name: "John Doe", totalRevenue: "$10,000", pendingPayments: "$1,000", lastPaymentDate: "2025-02-10" },
    { name: "Jane Smith", totalRevenue: "$8,000", pendingPayments: "$500", lastPaymentDate: "2025-02-09" },
    { name: "Alice Johnson", totalRevenue: "$12,000", pendingPayments: "$2,000", lastPaymentDate: "2025-02-08" },
    { name: "Bob Brown", totalRevenue: "$7,000", pendingPayments: "$1,500", lastPaymentDate: "2025-02-07" },
    { name: "Charlie Davis", totalRevenue: "$9,000", pendingPayments: "$750", lastPaymentDate: "2025-02-06" },
];

const transactionsData: Transaction[] = [
    { date: "2025-02-10", amount: "$1,000", type: "Payment" },
    { date: "2025-02-09", amount: "$500", type: "Refund" },
];

const revenueData = {
    labels: ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"],
    datasets: [
        { 
            label: 'Revenue', 
            data: [10000, 8000, 12000, 7000, 9000], 
            backgroundColor: '#007bff',
            borderRadius: 6 // Add this line to round the edges
        }
    ]
};

export default function CustomersComponent() {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [filter, setFilter] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("");

    const handleViewTransactions = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handleCloseTransactions = () => {
        setSelectedCustomer(null);
    };

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    const sortedCustomers = [...customersData].sort((a, b) => {
        if (sortOption === "highestRevenue") {
            return parseFloat(b.totalRevenue.replace(/[^0-9.-]+/g, "")) - parseFloat(a.totalRevenue.replace(/[^0-9.-]+/g, ""));
        } else if (sortOption === "lowestRevenue") {
            return parseFloat(a.totalRevenue.replace(/[^0-9.-]+/g, "")) - parseFloat(b.totalRevenue.replace(/[^0-9.-]+/g, ""));
        } else if (sortOption === "date") {
            return new Date(b.lastPaymentDate).getTime() - new Date(a.lastPaymentDate).getTime();
        }
        return 0;
    });

    const filteredCustomers = sortedCustomers.filter(customer =>
        customer.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="heading1">Customers</h2>

            {/* Filter and Sort Customers */}
            <div className="mt-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Filter customers by name..."
                    className="p-2 rounded w-[400px] mb-4"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div className="flex space-x-2 mb-4">
                    <button className={`px-4 py-2 rounded ${sortOption === "highestRevenue" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => handleSortChange("highestRevenue")}>Sort by Highest Revenue</button>
                    <button className={`px-4 py-2 rounded ${sortOption === "lowestRevenue" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => handleSortChange("lowestRevenue")}>Sort by Lowest Revenue</button>
                    <button className={`px-4 py-2 rounded ${sortOption === "date" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => handleSortChange("date")}>Sort by Date</button>
                </div>
            </div>

            {/* Customer List */}
            <div className="p-6 bg-white shadow rounded-xl mt-6">
                <h3 className="text-lg font-semibold mb-2">Customer List</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-md">
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Total Revenue</th>
                            <th className="border p-2 text-left">Pending Payments</th>
                            <th className="border p-2 text-left">Last Payment Date</th>
                            <th className="border p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer, index) => (
                            <tr key={index} className="border">
                                <td className="border p-2 text-md">{customer.name}</td>
                                <td className="border p-2">{customer.totalRevenue}</td>
                                <td className="border p-2">{customer.pendingPayments}</td>
                                <td className="border p-2">{customer.lastPaymentDate}</td>
                                <td className="border p-2">
                                    <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={() => handleViewTransactions(customer)}>View Transactions</button>
                                    <button className="px-2 py-1 bg-yellow-600 text-white rounded ml-2">Send Reminder</button>
                                    <button className="px-2 py-1 bg-green-600 text-white rounded ml-2">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Customer Financial Summary */}
            {selectedCustomer && (
                <div className="p-6 bg-white shadow rounded-xl mt-6 relative">
                    <button className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded" onClick={handleCloseTransactions}>Close</button>
                    <h3 className="text-lg font-semibold mb-2">Customer Financial Summary</h3>
                    <p><strong>Name:</strong> {selectedCustomer.name}</p>
                    <p><strong>Total Revenue:</strong> {selectedCustomer.totalRevenue}</p>
                    <p><strong>Pending Payments:</strong> {selectedCustomer.pendingPayments}</p>
                    <h4 className="text-md font-semibold mt-4">Recent Transactions</h4>
                    <table className="w-full border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr className="bg-gray-200 text-md">
                                <th className="border p-2 text-left">Date</th>
                                <th className="border p-2 text-left">Amount</th>
                                <th className="border p-2 text-left">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsData.map((tx, index) => (
                                <tr key={index} className="border">
                                    <td className="border p-2 text-md">{tx.date}</td>
                                    <td className="border p-2">{tx.amount}</td>
                                    <td className="border p-2">{tx.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Customer-wise Revenue & Expense Trends */}
            <div className="p-6 bg-white shadow rounded-md mt-6">
                <h3 className="text-lg font-semibold mb-2">Customer-wise Revenue & Expense Trends</h3>
                <div className="w-full h-64">
                    <Bar data={revenueData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
}