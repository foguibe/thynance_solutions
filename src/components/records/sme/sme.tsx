"use client";
import { useState } from 'react';
import Image from 'next/image';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface Transaction {
    type: string;
    amount: string;
    method: string;
    date: string;
    description: string;
    category: string;
    vendor?: string;
    client?: string;
    paymentType?: string;
    region?: string;
}

export default function SMERecordsComponent() {
    const [transactions, setTransactions] = useState<Transaction[]>([
        { type: "Income", amount: "$5,000", method: "Bank Transfer", date: "2025-02-10", description: "Client Payment", category: "Revenue", client: "ABC Corp", vendor: "Eagle Labs", paymentType: "Invoice" },
        { type: "Expense", amount: "$2,000", method: "Credit Card", date: "2025-02-09", description: "Office Supplies", category: "Operations", vendor: "Staples", client: "Talent Inc.", paymentType: "Card" },
        { type: "Expense", amount: "$7,000", method: "Credit Card", date: "2025-02-08", description: "New Equipment", category: "Technology", vendor: "Apple", client: "Tech Solutions", paymentType: "Card" },
    ]);

    const [sortBy, setSortBy] = useState("amount");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterVendor, setFilterVendor] = useState("");
    const [filterClient, setFilterClient] = useState("");
    const [filterPaymentType, setFilterPaymentType] = useState("");
    const [filterRegion, setFilterRegion] = useState("");
    const [viewType, setViewType] = useState("table");
    const [auditLogs, setAuditLogs] = useState<string[]>([]);
    const [budgets, setBudgets] = useState<{ [category: string]: number }>({});

    // New state variables
    const [financialHealthScore, setFinancialHealthScore] = useState(75); // Initial value
    const [marketingBudget, setMarketingBudget] = useState(2000);
    const [currency, setCurrency] = useState("USD");
    const [exchangeRates, setExchangeRates] = useState({
        USD: 1, EUR: 0.85, GBP: 0.75, CAD: 1.25, AUD: 1.35, JPY: 110
    });

    const handleSortChange = (sortOption: string) => {
        setSortBy(sortOption);
    };

    const handleSetBudget = (category: string, amount: number) => {
        setBudgets({ ...budgets, [category]: amount });
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
                const fileData = e.target?.result;
                if (file.name.endsWith('.csv')) {
                    const csvData = fileData as string;
                    const lines = csvData.split('\n');
                    const headers = lines[0].split(',').map(header => header.trim());
                    const newTransactions: Transaction[] = [];

                    for (let i = 1; i < lines.length; i++) {
                        const data = lines[i].split(',').map(item => item.trim());
                        if (data.length === headers.length) {
                            const transaction: any = {};
                            for (let j = 0; j < headers.length; j++) {
                                transaction[headers[j]] = data[j];
                            }
                            newTransactions.push(transaction as Transaction);
                        }
                    }
                    setTransactions([...transactions, ...newTransactions]);
                } else if (file.name.endsWith('.xlsx')) {
                    const workbook = XLSX.read(fileData, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    const headers = excelData[0] as string[];
                    const newTransactions: Transaction[] = [];

                    for (let i = 1; i < excelData.length; i++) {
                        const data = excelData[i] as string[];
                        if (data.length === headers.length) {
                            const transaction: any = {};
                            for (let j = 0; j < headers.length; j++) {
                                transaction[headers[j]] = data[j];
                            }
                            newTransactions.push(transaction as Transaction);
                        }
                    }
                    setTransactions([...transactions, ...newTransactions]);
                }
            };
            if (file.name.endsWith('.csv')) {
                reader.readAsText(file);
            } else if (file.name.endsWith('.xlsx')) {
                reader.readAsBinaryString(file);
            }
        }
    };

    const handleDownloadReport = (type: string, comparativePeriod: string = "none") => {
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
        const transactionToDelete = transactions[index];
        const updatedTransactions = [...transactions];
        updatedTransactions.splice(index, 1);
        setTransactions(updatedTransactions);

        const logMessage = `Transaction deleted: Type=${transactionToDelete.type}, Amount=${transactionToDelete.amount}, Date=${transactionToDelete.date}`;
        setAuditLogs([...auditLogs, logMessage]);
    };

    const handleAnomalyDetection = () => {
        alert("Anomaly detection is not implemented in this version.");
    };

    const filteredTransactions = [...transactions].filter(transaction =>
        (filterCategory === "" || transaction.category === filterCategory) &&
        (filterDate === "" || transaction.date === filterDate) &&
        (filterVendor === "" || transaction.vendor === filterVendor) &&
        (filterClient === "" || transaction.client === filterClient) &&
        (filterPaymentType === "" || transaction.paymentType === filterPaymentType) &&
        (filterRegion === "" || transaction.region === filterRegion)
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

    const profitMargin = ((monthlyRevenue - monthlyExpenses) / monthlyRevenue) * 100;

    const handleSetMarketingBudget = (amount: number) => {
        setMarketingBudget(amount);
    };

    // Placeholder forecast data
    const forecastData = {
        "March": 3000,
        "April": 3500,
        "May": 4000,
        "June": 3200,
        "July": 3600,
        "August": 4200
    };

    // Placeholder outstanding invoices data
    const outstandingInvoices = {
        "Overdue": 5,
        "Total Amount": 1500
    };

    // Function to combine forecast data into a limited number of rows
    const combineForecastData = (data: any, maxRows: number) => {
        const months = Object.keys(data);
        const combinedData: any[] = [];

        for (let i = 0; i < maxRows; i++) {
            if (months.length > 0) {
                const month1 = months.shift();
                let rowLabel = month1;
                let rowAmount = month1 ? data[month1] : 0;

                if (months.length > 0 && i < maxRows - 1) {
                    const month2 = months.shift();
                    rowLabel += ` & ${month2}`;
                    // Check if month2 is defined before accessing data[month2]
                    if (month2 && data[month2]) {
                        rowAmount += data[month2];
                    }
                }

                combinedData.push({ label: rowLabel, amount: rowAmount });
            }
        }

        return combinedData;
    };

    const forecastRows = combineForecastData(forecastData, 3);

    return (
        <div className="bg-gray-100 min-h-screen p-6 rounded-md">
            <div className="container mx-auto">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Financial Health Score */}
                    <div className="bg-gradient-to-r from-white to-gray-200 shadow rounded-lg p-4 border border-gray-300">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">FINANCIAL HEALTH SCORE</h3>
                        <p className="text-sm text-gray-800">Your financial health score is: {financialHealthScore.toFixed(2)} / 100</p>
                        {financialHealthScore < 50 ? (
                            <p className="text-xs text-red-600"><span className='font-bold'>Recommendation:</span> Reduce expenses in the Operations category.</p>
                        ) : (
                            <p className="text-xs text-green-700"><span className='font-bold'>Recommendation:</span> Focus on increasing revenue streams.</p>
                        )}
                    </div>
                    {/* Cash Flow Forecast */}
                    <div className="bg-gradient-to-r from-white to-gray-200 shadow rounded-lg p-4 border border-gray-300">
                        <h3 className="text-xs font-bold text-gray-800 mb-2">CASH FLOW FORECAST (6 MONTHS)</h3>
                        <div className="flex flex-col">
                            {forecastRows.map((row, index) => (
                                <div key={index} className="flex justify-between items-center py-1 border-b border-gray-800">
                                    <span className="text-xs font-bold uppercase">{row.label}:</span>
                                    <span className="text-sm font-semibold">${row.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                 {/* Budgeting and Currency Support */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Budgeting and Expense Tracking */}
                    <div className="bg-white shadow rounded-md p-4">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">BUDGETING</h3>
                        {Object.keys(budgets).map(category => (
                            <div key={category} className="mb-2">
                                <div className='flex items-center gap-2'>
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
                            </div>
                        ))}
                        <button onClick={() => handleSetBudget("Marketing", 1000)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200">Set Marketing Budget</button>
                    </div>

                    {/* Multi-Currency Support */}
                    <div className="bg-white shadow rounded-md p-4">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">MULTI-CURRENCY SUPPORT</h3>
                        <label className="text-xs font-medium text-gray-700 mb-1">Base Currency:</label>
                        <select
                            className="border border-gray-300 rounded-md ml-2 px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                </div>

                {/* Views */}
                <div className="mb-4">
                    <label className="text-xs font-medium text-gray-700 mb-1 mr-3">View:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={viewType}
                        onChange={(e) => setViewType(e.target.value)}
                    >
                        <option value="table">Table</option>
                        <option value="summary">Summary Cards</option>
                        <option value="charts">Charts</option>
                    </select>
                </div>

                {/* Transaction List */}
                {viewType === "table" && (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="overflow-x-auto" style={{ maxHeight: '200px' }}>
                            <table className="min-w-full divide-y divide-gray-200 text-sm border border-gray-300">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Type</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Amount</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Payment Method</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Date</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Description</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Category</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Vendor</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Client</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Payment Type</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
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
                                            <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.category}</td>
                                            <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.vendor}</td>
                                            <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.client}</td>
                                            <td className="px-3 py-1 whitespace-nowrap text-gray-700 border-r border-gray-300">{tx.paymentType}</td>
                                            <td className="px-3 py-1 whitespace-nowrap">
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
                )}

                {/* Summary Cards View */}
                {viewType === "summary" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h4 className="text-xs font-semibold text-gray-700">Monthly Revenue</h4>
                            <p className="text-sm text-gray-800">${monthlyRevenue.toFixed(2)}</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4">
                            <h4 className="text-xs font-semibold text-gray-700">Monthly Expenses</h4>
                            <p className="text-sm text-gray-800">${monthlyExpenses.toFixed(2)}</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4">
                            <h4 className="text-xs font-semibold text-gray-700">Profit Margin</h4>
                            <p className="text-sm text-gray-800">{profitMargin.toFixed(2)}%</p>
                        </div>
                    </div>
                )}

                {/* Charts View */}
                {viewType === "charts" && (
                    <div className="bg-white shadow rounded-lg p-4 text-[12px]">
                        <p>Charts are not implemented in this version.</p>
                    </div>
                )}

                {/* Bulk Upload & Manual Entry */}
                <div className="mt-4 bg-white shadow rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Bulk Upload and Manual Entry</h3>
                        <div className="flex space-x-2">
                            <label htmlFor="upload-csv" className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200 cursor-pointer">
                                ⬆️ Upload CSV/Excel
                            </label>
                            <input
                                type="file"
                                id="upload-csv"
                                accept=".csv, .xlsx"
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
                            className="bg-purple-500 hover:bg-purple-600 ml-2 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200"
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
                            <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Vendor:</label>
                            <input
                                type="text"
                                placeholder="Vendor"
                                className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={filterVendor}
                                onChange={(e) => setFilterVendor(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Client:</label>
                            <input
                                type="text"
                                placeholder="Client"
                                className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={filterClient}
                                onChange={(e) => setFilterClient(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Payment Type:</label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={filterPaymentType}
                                onChange={(e) => setFilterPaymentType(e.target.value)}
                            >
                                <option value="">All Payment Types</option>
                                <option value="Card">Card</option>
                                <option value="Invoice">Invoice</option>
                                <option value="Cash">Cash</option>
                                <option value="Transfer">Transfer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Region:</label>
                            <input
                                type="text"
                                placeholder="Region"
                                className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={filterRegion}
                                onChange={(e) => setFilterRegion(e.target.value)}
                            />
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

                {/* Audit Logs and Anomaly Detection */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Audit Logs */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">AUDIT LOGS</h3>
                        <ul>
                            {auditLogs.map((log, index) => (
                                <li key={index} className="text-xs text-gray-600">{log}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Anomaly Detection */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-xs font-bold text-gray-700 mb-2">ANOMALY DETECTION</h3>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold rounded px-3 py-2 transition-colors duration-200"
                            onClick={handleAnomalyDetection}
                        >
                            ⚠️ Detect Unusual Transactions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}