"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { saveAs } from 'file-saver';

interface Transaction {
    type: string;
    amount: string;
    method: string;
    date: string;
    description: string;
    category: string;
    currency?: string;
}

interface FinancialTerms {
    Revenue: string;
    Expenses: string;
}

const financialTerms: FinancialTerms = {
    Revenue: "Money In",
    Expenses: "Money Out",
};

const getSimpleTerm = (term: string): string => {
    return financialTerms[term as keyof FinancialTerms] || term;
};

interface ExchangeRates {
    USD: number;
    EUR: number;
    GBP: number;
}

export default function StartupRecordsComponent() {
    const [transactions, setTransactions] = useState<Transaction[]>([
        { type: "Income", amount: "$5,000", method: "Bank Transfer", date: "2025-02-10", description: "Client Payment", category: "Revenue", currency: "USD" },
        { type: "Expense", amount: "$2,000", method: "Credit Card", date: "2025-02-09", description: "Office Supplies", category: "Operations", currency: "USD" },
        { type: "Income", amount: "$2,500", method: "PayPal", date: "2025-02-15", description: "Online Sales", category: "Revenue", currency: "USD" },
        { type: "Expense", amount: "$1,200", method: "Bank Transfer", date: "2025-02-12", description: "Rent", category: "Operations", currency: "USD" },
        { type: "Expense", amount: "$800", method: "Credit Card", date: "2025-02-18", description: "Marketing Campaign", category: "Marketing", currency: "USD" },
    ]);

    const [sortBy, setSortBy] = useState("amount");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [budgets, setBudgets] = useState<{ [category: string]: number }>({});
    const [currency, setCurrency] = useState("USD");
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ USD: 1, EUR: 1.1, GBP: 1.3 }); // Example rates
    const [showGlossary, setShowGlossary] = useState(false);
    const [anomalies, setAnomalies] = useState<string[]>([]);

    useEffect(() => {
        detectAnomalies();
        // Fetch exchange rates from API (example)
    }, [transactions]);

    const detectAnomalies = () => {
        const unusualTransactions = transactions.filter(tx => Number(tx.amount.replace(/[^0-9.-]+/g, "")) > 10000);
        if (unusualTransactions.length > 0) {
            setAnomalies(unusualTransactions.map(tx => `Unusually high transaction: ${tx.description} - ${tx.amount}`));
        } else {
            setAnomalies([]);
        }
    };

    const handleSortChange = (sortOption: string) => {
        setSortBy(sortOption);
    };

    const handleAddTransaction = () => {
        const newTransaction: Transaction = { type: "Income", amount: "$1,000", method: "Cash", date: "2025-02-11", description: "Freelance Work", category: "Revenue", currency: currency };
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

    const handleSetBudget = (category: string, amount: number) => {
        setBudgets({ ...budgets, [category]: amount });
    };

    const convertedTransactions = transactions.map(transaction => {
        const rate = exchangeRates[currency as keyof ExchangeRates] || 1;
        const amountInUSD = Number(transaction.amount.replace(/[^0-9.-]+/g, "")) / rate;
        return { ...transaction, amountInUSD };
    });

    const filteredTransactions = [...convertedTransactions].filter(transaction =>
        (filterCategory === "" || transaction.category === filterCategory) &&
        (filterDate === "" || transaction.date === filterDate)
    ).sort((a, b) => {
        if (sortBy === "amount") {
            return a.amountInUSD - b.amountInUSD;
        } else if (sortBy === "date") {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
            return 0;
        }
    });

    const monthlyRevenue = filteredTransactions
        .filter(transaction => transaction.type === "Income")
        .reduce((sum, transaction) => sum + transaction.amountInUSD, 0);

    const monthlyExpenses = filteredTransactions
        .filter(transaction => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + transaction.amountInUSD, 0);

    const financialHealthScore = Math.max(0, Math.min(100, (monthlyRevenue - monthlyExpenses) / monthlyRevenue * 100));

    const toggleGlossary = () => {
        setShowGlossary(!showGlossary);
    };

    // Placeholder forecast data
    const forecastData = {
        "March": 3000,
        "April": 3500,
        "May": 4000
    };

    // Placeholder outstanding invoices data
    const outstandingInvoices = {
        "Overdue": 5,
        "Total Amount": 1500
    };

    // Placeholder data for new cards
    const netProfitMargin = 15.0;
    const customerAcquisitionCost = 500;
    const burnRate = 10000;

    return (
        <div className="bg-gray-100 min-h-screen p-6 rounded-md">
            <div className="container mx-auto">

                {/* Financial Health Score, Cash Flow Forecast, and Outstanding Invoices */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Financial Health Score */}
                    <div className="bg-gradient-to-r from-white to-gray-200 shadow rounded-md p-4 border border-gray-300">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">FINANCIAL HEALTH SCORE</h3>
                        <p className="text-sm text-gray-800">Your financial health score is: {financialHealthScore.toFixed(2)} / 100</p>
                        {financialHealthScore < 50 && (
                            <p className="text-xs text-red-700"><span className='font-bold'>Recommendation:</span> Reduce expenses in the Operations category.</p>
                        )}
                    </div>

{/* Cash Flow Forecast */}
<div className="bg-gradient-to-r from-white to-gray-200 shadow rounded-md p-4 border border-gray-300">
    <h3 className="text-xs font-bold text-gray-800 mb-2">CASH FLOW FORECAST (3 MONTHS)</h3>
    <div className="flex flex-col">
        {Object.entries(forecastData).map(([month, amount]) => (
            <div key={month} className="flex justify-between items-center py-1 border-b border-gray-800">
                <span className="text-xs font-bold uppercase">{month}:</span>
                <span className="text-sm font-semibold">${amount}</span>
            </div>
        ))}
    </div>
</div>
                </div>

                {/* New Financial Records */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Net Profit Margin */}
                    <div className="bg-white shadow rounded-md p-4 border border-gray-200">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">NET PROFIT MARGIN</h3>
                        <p className="text-sm text-gray-800">{netProfitMargin.toFixed(2)}%</p>
                    </div>

                    {/* Customer Acquisition Cost (CAC) */}
                    <div className="bg-white shadow rounded-md p-4 border border-gray-200">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">CUSTOMER ACQUISITION COST (CAC)</h3>
                        <p className="text-sm text-gray-800">${customerAcquisitionCost}</p>
                    </div>

                    {/* Burn Rate */}
                    <div className="bg-white shadow rounded-md p-4 border border-gray-200">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">BURN RATE</h3>
                        <p className="text-sm text-gray-800">${burnRate}</p>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="bg-white shadow rounded-md overflow-hidden">
                    <div className="overflow-x-auto" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <table className="min-w-full divide-y divide-gray-200 text-sm border border-gray-300">
                            <thead className="bg-gray-800 sticky top-0">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Type</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Amount</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Payment Method</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Date</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Description</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Category</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTransactions.map((tx, index) => (
                                    <tr key={index} className={index % 2 === 1 ? "bg-gray-100 text-xs" : "text-xs"}>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.type}</td>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.amount} {tx.currency}</td>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.method}</td>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.date}</td>
                                        <td className="px-3 py-1 text-gray-700 border-r border-gray-300">{tx.description}</td>
                                        <td className="px-3 py-1 whitespace-nowrap text-gray-700">{getSimpleTerm(tx.category)}</td>
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
                <div className="mt-4 bg-white shadow rounded-md p-4 flex items-center justify-between">
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
                <div className="mt-4 bg-white shadow rounded-md p-4">
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

                 {/* Budgeting, Multi-Currency Support, and Analytics & Insights */}
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Budgeting and Expense Tracking */}
                    <div className="bg-white shadow rounded-md p-4">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">BUDGETING</h3>
                        {Object.keys(budgets).map(category => (
                            <div key={category} className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">{category} Budget:</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                                        value={budgets[category]}
                                        onChange={(e) => handleSetBudget(category, Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => handleSetBudget("Marketing", 1000)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200">Set Marketing Budget</button>
                    </div>

                    {/* Multi-Currency Support */}
                    <div className="bg-white shadow rounded-md p-4">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">MULTI-CURRENCY SUPPORT</h3>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Base Currency:</label>
                        <select
                            className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>

                    {/* Analytics & Insights */}
                    <div className="bg-white shadow rounded-md p-4">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">ANALYTICS & INSIGHTS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-md p-3">
                                <h4 className="text-xs font-semibold text-gray-700">Monthly {getSimpleTerm("Revenue")}</h4>
                                <p className="text-sm text-gray-800">${monthlyRevenue.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-50 rounded-md p-3">
                                <h4 className="text-xs font-semibold text-gray-700">Monthly {getSimpleTerm("Expenses")}</h4>
                                <p className="text-sm text-gray-800">${monthlyExpenses.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}