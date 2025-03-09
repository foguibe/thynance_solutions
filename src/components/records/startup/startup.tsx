"use client";
import { useState } from 'react';
import Image from 'next/image';
import { saveAs } from 'file-saver';

interface Transaction {
    type: string;
    amount: string;
    method: string;
    date: string;
    description: string;
    category: string;
}

export default function StartupRecordsComponent() {
    const [transactions, setTransactions] = useState<Transaction[]>([
        { type: "Income", amount: "$5,000", method: "Bank Transfer", date: "2025-02-10", description: "Client Payment", category: "Revenue" },
        { type: "Expense", amount: "$2,000", method: "Credit Card", date: "2025-02-09", description: "Office Supplies", category: "Operations" },
    ]);

    const [sortBy, setSortBy] = useState("amount");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const handleSortChange = (sortOption: string) => {
        setSortBy(sortOption);
    };

    const handleAddTransaction = () => {
        const newTransaction: Transaction = { type: "Income", amount: "$1,000", method: "Cash", date: "2025-02-11", description: "Freelance Work", category: "Revenue" };
        setTransactions([...transactions, newTransaction]);
    };

    const handleUploadTransactions = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target?.result as string;
                const lines = csvData.split('\n');
                const headers = lines[0].split(',');
                const newTransactions: Transaction[] = [];

                for (let i = 1; i < lines.length; i++) {
                    const data = lines[i].split(',');
                    if (data.length === headers.length) {
                        const transaction: any = {};
                        for (let j = 0; j < headers.length; j++) {
                            transaction[headers[j].trim()] = data[j].trim();
                        }
                        newTransactions.push(transaction as Transaction);
                    }
                }
                setTransactions([...transactions, ...newTransactions]);
            };
            reader.readAsText(file);
        }
    };

    const handleDownloadReport = (type: string) => {
        let reportContent = "";
        if (type === "csv") {
            const headers = Object.keys(transactions[0]).join(",");
            const rows = transactions.map(transaction => Object.values(transaction).join(",")).join("\n");
            reportContent = `${headers}\n${rows}`;
            const blob = new Blob([reportContent], { type: "text/csv;charset=utf-8;" });
            saveAs(blob, "transactions.csv");
        } else if (type === "pdf") {
            alert("PDF download is not implemented in this version.");
        }
    };

    const handleDeleteTransaction = (index: number) => {
        const updatedTransactions = [...transactions];
        updatedTransactions.splice(index, 1);
        setTransactions(updatedTransactions);
    };

    const filteredTransactions = [...transactions].filter(transaction =>
        (filterCategory === "" || transaction.category === filterCategory) &&
        (filterDate === "" || transaction.date === filterDate)
    ).sort((a, b) => {
        if (sortBy === "amount") {
            return Number(a.amount.replace(/[^0-9.-]+/g, "")) - Number(b.amount.replace(/[^0-9.-]+/g, ""));
        } else if (sortBy === "date") {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
            return 0;
        }
    });

    const monthlyRevenue = transactions
        .filter(transaction => transaction.type === "Income")
        .reduce((sum, transaction) => sum + Number(transaction.amount.replace(/[^0-9.-]+/g, "")), 0);

    const monthlyExpenses = transactions
        .filter(transaction => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + Number(transaction.amount.replace(/[^0-9.-]+/g, "")), 0);

    return (
        <div className="bg-gray-100 min-h-screen p-6 rounded-md">
            <div className="container mx-auto">
                <div className='flex items-center gap-2 mb-4 border-b-[1px] border-b-gray-200 bg-gray-300 p-2 rounded'>
                    <Image src="/icons/invoices.svg" alt="Icon" width={20} height={20}></Image>
                    <h2 className="text-sm font-bold text-gray-800">FINANCIAL RECORDS</h2>
                </div>

                {/* Transaction List */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm border border-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Type</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Amount</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Payment Method</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Date</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Description</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Category</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTransactions.map((tx, index) => (
                                    <tr key={index} className={index % 2 === 1 ? "bg-gray-100 text-xs" : "text-xs"}>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.type}</td>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.amount}</td>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.method}</td>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.date}</td>
                                        <td className="px-3 py-1 text-gray-700 border-r border-gray-300">{tx.description}</td>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700">{tx.category}</td>
                                        <td className="px-3 py-1 whitespace-nowrap border-l border-gray-300">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDeleteTransaction(index)}
                                            >
                                                Delete
                                            </button>
                                        </td>
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
                            <label htmlFor="upload-csv" className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200 cursor-pointer">
                                ⬆️ Upload CSV
                            </label>
                            <input
                                type="file"
                                id="upload-csv"
                                accept=".csv"
                                className="hidden"
                                onChange={handleUploadTransactions}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200"
                                onClick={handleAddTransaction}
                            >
                                ➕ Add Transaction
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200"
                            onClick={() => handleDownloadReport("csv")}
                        >
                            📄 Download CSV
                        </button>
                        <button
                            className="bg-purple-500 hover:bg-purple-60 ml-2 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200"
                            onClick={() => handleDownloadReport("pdf")}
                        >
                            📄 Download PDF
                        </button>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="mt-4 bg-white shadow rounded-lg p-4">
                    <h3 className="text-xs font-bold text-gray-700 mb-2 p-2 bg-gray-200 rounded">SEARCH AND FILTERS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Date:</label>
                            <input
                                type="date"
                                className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Category:</label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Revenue">Revenue</option>
                                <option value="Operations">Operations</option>
                                <option value="Technology">Technology</option>
                                <option value="Investments">Investments</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Sort by:</label>
                            <div className="flex space-x-2">
                                <button
                                    className={`px-3 py-1 rounded text-xs font-semibold ${sortBy === "amount" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        } transition-colors duration-200`}
                                    onClick={() => handleSortChange("amount")}
                                >
                                    Amount
                                </button>
                                <button
                                    className={`px-3 py-1 rounded text-xs font-semibold ${sortBy === "date" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        } transition-colors duration-200`}
                                    onClick={() => handleSortChange("date")}
                                >
                                    Date
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics & Insights */}
                <div className="mt-4 bg-white shadow rounded-lg p-4">
                    <h3 className="text-xs font-bold text-gray-700 mb-2">ANALYTICS & INSIGHTS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-md p-3">
                            <h4 className="text-xs font-semibold text-gray-700">Monthly Revenue</h4>
                            <p className="text-sm text-gray-800">${monthlyRevenue.toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-md p-3">
                            <h4 className="text-xs font-semibold text-gray-700">Monthly Expenses</h4>
                            <p className="text-sm text-gray-800">${monthlyExpenses.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}