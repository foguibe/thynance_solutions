"use client";
import { useState } from 'react';
import Image from 'next/image';

interface Transaction {
    type: string;
    amount: string;
    method: string;
    date: string;
    description: string;
    category: string;
}

export default function RecordsComponent() {
    const [transactions, setTransactions] = useState<Transaction[]>([
        { type: "Income", amount: "$5,000", method: "Bank Transfer", date: "2025-02-10", description: "Client Payment", category: "Revenue" },
        { type: "Expense", amount: "$2,000", method: "Credit Card", date: "2025-02-09", description: "Office Supplies", category: "Operations" },
    ]);

    const [sortBy, setSortBy] = useState("amount");

    const handleSortChange = (sortOption: string) => {
        setSortBy(sortOption);
        // Add sorting logic here
        console.log(`Sorting by: ${sortOption}`);
    };

    const handleAddTransaction = () => {
        const newTransaction: Transaction = { type: "Income", amount: "$1,000", method: "Cash", date: "2025-02-11", description: "Freelance Work", category: "Revenue" };
        setTransactions([...transactions, newTransaction]);
        console.log("Added transaction:", newTransaction);
    };

    const handleUploadTransactions = (uploadedTransactions: Transaction[]) => {
        setTransactions([...transactions, ...uploadedTransactions]);
        console.log("Uploaded transactions:", uploadedTransactions);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6 rounded-md">
            <div className="container mx-auto">
                <div className='flex items-center gap-2 mb-4 border-b-[1px] border-b-gray-200 bg-gray-300 p-2 rounded'>
                    <Image src="/icons/invoices.svg" alt="Icon" width={20} height={20}></Image>
                    <h2 className="text-md font-semibold text-gray-800">Financial Records</h2>
                </div>

                {/* Transaction List */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 sm:px-6">
                        <h3 className="text-sm font-semibold text-gray-700">Transaction List</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map((tx, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700">{tx.type}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700">{tx.amount}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700">{tx.method}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700">{tx.date}</td>
                                        <td className="px-3 py-2  text-gray-700">{tx.description}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700">{tx.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bulk Upload & Manual Entry */}
                <div className="mt-4 bg-white shadow rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Bulk Upload and Manual Entry</h3>
                        <div className="flex space-x-2">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200"
                                onClick={() => handleUploadTransactions([{ type: "Expense", amount: "$3,000", method: "Credit Card", date: "2025-02-12", description: "Marketing", category: "Operations" }])}
                            >
                                ⬆️ Upload CSV/Excel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200"
                                onClick={handleAddTransaction}
                            >
                                ➕ Add Transaction
                            </button>
                        </div>
                    </div>
                    <div>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200">
                            📄 Download Report
                        </button>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="mt-4 bg-white shadow rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Search and Filters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Date:</label>
                            <input type="date" className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Sort By:</label>
                            <div className="flex space-x-2">
                                <button
                                    className={`px-3 py-2 rounded text-xs font-semibold ${sortBy === "amount" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        } transition-colors duration-200`}
                                    onClick={() => handleSortChange("amount")}
                                >
                                    Amount
                                </button>
                                <button
                                    className={`px-3 py-2 rounded text-xs font-semibold ${sortBy === "date" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        } transition-colors duration-200`}
                                    onClick={() => handleSortChange("date")}
                                >
                                    Date
                                </button>
                                <button
                                    className={`px-3 py-2 rounded text-xs font-semibold ${sortBy === "type" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        } transition-colors duration-200`}
                                    onClick={() => handleSortChange("type")}
                                >
                                    Type
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Features */}
                <div className="mt-4 bg-white shadow rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Advanced Features</h3>
                    <div className="flex space-x-2">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200">
                            ⚠️ Detect Duplicate Transactions
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200">
                            🔁 Manage Recurring Transactions
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200">
                            ✔️ Approve Pending Transactions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}