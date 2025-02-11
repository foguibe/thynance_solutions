"use client";
import { useState } from 'react';

export default function RecordsComponent() {
    const [transactions, setTransactions] = useState([
        { type: "Income", amount: "$5,000", method: "Bank Transfer", date: "2025-02-10", description: "Client Payment", category: "Revenue" },
        { type: "Expense", amount: "$2,000", method: "Credit Card", date: "2025-02-09", description: "Office Supplies", category: "Operations" },
    ]);

    const [sortBy, setSortBy] = useState("amount");

    const handleSortChange = (sortOption:any) => {
        setSortBy(sortOption);
        // Add sorting logic here
    };

    return (
        <div className="bg-gray-100 rounded-md p-4">
            <h2 className="heading1">Financial Records</h2>
            
            {/* Transaction List */}
            <div className="p-6 bg-white shadow rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Transaction List</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-md">
                            <th className="border p-2 text-left">Type</th>
                            <th className="border p-2 text-left">Amount</th>
                            <th className="border p-2 text-left">Payment Method</th>
                            <th className="border p-2 text-left">Date</th>
                            <th className="border p-2 text-left">Description</th>
                            <th className="border p-2 text-left">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, index) => (
                            <tr key={index} className="border">
                                <td className="border p-2 text-md">{tx.type}</td>
                                <td className="border p-2">{tx.amount}</td>
                                <td className="border p-2">{tx.method}</td>
                                <td className="border p-2">{tx.date}</td>
                                <td className="border p-2">{tx.description}</td>
                                <td className="border p-2">{tx.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bulk Upload & Manual Entry */}
            <div className="mt-6 p-6 bg-white shadow rounded-xl w-full flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Bulk Upload and Manual Entry</h3>
                    <button className="px-4 py-2 bg-green-600 text-white rounded">⬆️ Upload CSV/Excel</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded ml-4">➕ Add Transaction</button>
                </div>

                {/* Report Generation */}
                <div className="">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded">📄 Download Report</button>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="mt-6 p-6 bg-white shadow rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Search and Filters</h3>
                <div className='w-full grid grid-cols-3 gap-4'>
                    <input type="text" placeholder="Search transactions..." className="border p-2 rounded w-full mb-4" />
                    <div className='w-full'>
                        <label className="block mb-2 font-semibold">Filter by Date:</label>
                        <input type="date" className="border p-2 rounded w-full mb-4" />
                    </div>
                    <div className='w-full'>
                        <label className="block mb-2 font-semibold">Sort By:</label>
                        <div className="flex space-x-2">
                            <button
                                className={`px-4 py-2 rounded ${sortBy === "amount" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                                onClick={() => handleSortChange("amount")}
                            >
                                Amount
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${sortBy === "date" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                                onClick={() => handleSortChange("date")}
                            >
                                Date
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${sortBy === "type" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                                onClick={() => handleSortChange("type")}
                            >
                                Type
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Features */}
            <div className="mt-6 p-6 bg-white shadow rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Advanced Features</h3>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded mb-2">⚠️ Detect Duplicate Transactions</button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded ml-4">🔁 Manage Recurring Transactions</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded ml-4">✔️ Approve Pending Transactions</button>
            </div>
        </div>
    );
}