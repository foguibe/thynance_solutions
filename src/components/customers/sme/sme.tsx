"use client";
import { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, PieController, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Papa, { ParseResult } from 'papaparse';
import Image from 'next/image';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, PieController, ArcElement);

interface Customer {
    name: string;
    totalRevenue: string;
    pendingPayments: string;
    lastPaymentDate: string;
    purchaseFrequency: string;
    averageTransactionSize: string;
    segmentationTag: string;
    financialHealthScore?: number;
    ltv?: number;
    churnRisk?: string;
    geography?: string;
}

interface Transaction {
    date: string;
    amount: string;
    type: string;
}

const initialCustomersData: Customer[] = [
    { name: "John Doe", totalRevenue: "$10,000", pendingPayments: "$1,000", lastPaymentDate: "2025-02-10", purchaseFrequency: "Monthly", averageTransactionSize: "$500", segmentationTag: "High-Value", financialHealthScore: 85, ltv: 5000, churnRisk: "Low", geography: "North America" },
    { name: "Jane Smith", totalRevenue: "$8,000", pendingPayments: "$500", lastPaymentDate: "2025-02-09", purchaseFrequency: "Weekly", averageTransactionSize: "$200", segmentationTag: "Returning", financialHealthScore: 70, ltv: 3000, churnRisk: "Medium", geography: "Europe" },
    { name: "Alice Johnson", totalRevenue: "$12,000", pendingPayments: "$2,000", lastPaymentDate: "2025-02-08", purchaseFrequency: "Bimonthly", averageTransactionSize: "$600", segmentationTag: "High-Value", financialHealthScore: 90, ltv: 6000, churnRisk: "Low", geography: "Asia" },
    { name: "Bob Brown", totalRevenue: "$7,000", pendingPayments: "$1,500", lastPaymentDate: "2025-02-07", purchaseFrequency: "Monthly", averageTransactionSize: "$350", segmentationTag: "New", financialHealthScore: 60, ltv: 2000, churnRisk: "High", geography: "North America" },
    { name: "Charlie Davis", totalRevenue: "$9,000", pendingPayments: "$750", lastPaymentDate: "2025-02-06", purchaseFrequency: "Weekly", averageTransactionSize: "$450", segmentationTag: "Returning", financialHealthScore: 75, ltv: 3500, churnRisk: "Medium", geography: "Europe" },
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
            backgroundColor: '#3b82f6',
            borderRadius: 5
        }
    ]
};

export default function SMECustomersComponent() {
    const [customersData, setCustomersData] = useState<Customer[]>(initialCustomersData);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [filter, setFilter] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("");
    const [transactionVolumeFilter, setTransactionVolumeFilter] = useState<string>("");
    const [dateRangeFilter, setDateRangeFilter] = useState<string>("");
    const [customerCategoryFilter, setCustomerCategoryFilter] = useState<string>("");
    const [segmentationChartData, setSegmentationChartData] = useState<{ labels: string[]; datasets: { data: number[]; backgroundColor: string[]; }[] }>({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
    const [topCustomers, setTopCustomers] = useState<Customer[]>([]);
    const [atRiskCustomers, setAtRiskCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        // Calculate segmentation data
        const segmentationCounts: { [key: string]: number } = {};
        customersData.forEach(customer => {
            segmentationCounts[customer.segmentationTag] = (segmentationCounts[customer.segmentationTag] || 0) + 1;
        });

        const labels = Object.keys(segmentationCounts);
        const data = Object.values(segmentationCounts);
        const backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']; // Add more colors if needed

        setSegmentationChartData({
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor,
            }]
        });

        // Identify top customers
        const sortedCustomers = [...customersData].sort((a, b) => parseFloat(b.totalRevenue.replace(/[^0-9.-]+/g, "")) - parseFloat(a.totalRevenue.replace(/[^0-9.-]+/g, "")));
        setTopCustomers(sortedCustomers.slice(0, 3));

        // Identify at-risk customers (example: churnRisk === "High")
        const riskCustomers = customersData.filter(customer => customer.churnRisk === "High");
        setAtRiskCustomers(riskCustomers);

    }, [customersData]);

    const handleViewTransactions = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handleCloseTransactions = () => {
        setSelectedCustomer(null);
    };

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    const handleClearFilter = () => {
        setFilter("");
    };

    const handleAddCustomer = () => {
        const newCustomer: Customer = { name: "New Customer", totalRevenue: "$0", pendingPayments: "$0", lastPaymentDate: "2025-02-01", purchaseFrequency: "", averageTransactionSize: "", segmentationTag: "" };
        setCustomersData([...customersData, newCustomer]);
    };

    const handleUploadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results: ParseResult<Customer>) => {
                    const newCustomers = results.data as Customer[];
                    setCustomersData([...customersData, ...newCustomers]);
                }
            });
        }
    };

    const handleDownloadCSV = () => {
        const csv = Papa.unparse(customersData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'customers.csv');
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
        customer.name.toLowerCase().includes(filter.toLowerCase()) &&
        (transactionVolumeFilter === "" || /* Add logic to filter by transaction volume */ true) &&
        (dateRangeFilter === "" || /* Add logic to filter by date range */ true) &&
        (customerCategoryFilter === "" || customer.segmentationTag === customerCategoryFilter)
    );

    return (
        <div className="bg-gray-100 min-h-screen p-4 rounded-md">
            <div className='flex items-center gap-2 mb-4 border-b-[1px] border-b-gray-200 bg-gray-300 p-2 rounded'>
                <Image src="/icons/customers.svg" alt="Icon" width={20} height={20}></Image>
                <h2 className="text-sm font-bold text-gray-800">CUSTOMER MANAGEMENT</h2>
            </div>

            {/* Filter and Sort Customers */}
            <div className="mt-2 flex flex-col md:flex-row justify-between items-center">
                <input
                    type="text"
                    placeholder="Filter customers by name..."
                    className="p-2 rounded w-full md:w-1/3 mb-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div className="flex flex-wrap space-x-2 mb-3">
                    <select
                        className="p-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={customerCategoryFilter}
                        onChange={(e) => setCustomerCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="High-Value">High-Value</option>
                        <option value="New">New</option>
                        <option value="Returning">Returning</option>
                    </select>
                    <button className={`px-3 py-1 rounded text-xs font-semibold ${sortOption === "highestRevenue" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("highestRevenue")}>Highest Revenue</button>
                    <button className={`px-3 py-1 rounded text-xs font-semibold ${sortOption === "lowestRevenue" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("lowestRevenue")}>Lowest Revenue</button>
                    <button className={`px-3 py-1 rounded text-xs font-semibold ${sortOption === "date" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("date")}>By Date</button>
                    <button className="px-3 py-1 rounded text-xs font-semibold bg-red-500 text-white hover:bg-red-600" onClick={handleClearFilter}>Clear</button>
                </div>
            </div>

            {/* Add and Upload Customers */}
            <div className="flex space-x-2 mb-3">
                <button className="px-3 py-1 rounded text-xs font-bold bg-green-600 text-white hover:bg-green-700 foont-semibold flex items-center" onClick={handleAddCustomer}>
                    <span className="mr-1">➕</span>Add Customer
                </button>
                <label htmlFor="upload-csv" className="px-3 py-1 font-bold rounded text-xs bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer flex items-center">
                    <span className="mr-1">⬆️</span> Upload CSV
                </label>
                <input
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={handleUploadCSV}
                    className="hidden"
                    id="upload-csv"
                />
                <button className="px-3 py-1 rounded text-xs bg-purple-600 font-semibold text-white hover:bg-purple-700 flex items-center" onClick={handleDownloadCSV}>
                    <span className="mr-1">📄</span>Download List
                </button>
            </div>

            {/* Customer List */}
            <div className="bg-white shadow rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 text-xs">
                            <tr>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 first:rounded-tl-lg">Name</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Revenue</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Pending</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Last Date</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Frequency</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Avg. Size</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Tag</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Health</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">LTV</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Risk</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase first:rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-xs">
                            {filteredCustomers.map((customer, index, arr) => (
                                <tr key={index} className={`${index % 2 === 1 ? "bg-gray-100" : ""} ${index === arr.length - 1 ? "last:rounded-b-lg" : ""} hover:bg-gray-50`}>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.name}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.totalRevenue}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.pendingPayments}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.lastPaymentDate}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.purchaseFrequency}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.averageTransactionSize}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.segmentationTag}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.financialHealthScore}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.ltv}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.churnRisk}</td>
                                    <td className="px-3 py-1 whitespace-nowrap">
                                        <button className="px-4 py-1 bg-blue-600 text-white font-semibold rounded text-xs hover:bg-blue-700" onClick={() => handleViewTransactions(customer)}>View</button>
                                        <button className="px-2 py-1 bg-yellow-600 text-white rounded font-semibold text-xs hover:bg-yellow-700 ml-1">Reminder</button>
                                        <button className="px-4 py-1 bg-green-600 text-white rounded font-semibold text-xs hover:bg-green-700 ml-1">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer Financial Summary */}
            {selectedCustomer && (
                <div className="bg-white shadow rounded-md mt-4 p-4 relative">
                    <button className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600" onClick={handleCloseTransactions}>Close</button>
                    <h3 className="text-xs font-bold mb-2 p-2 rounded bg-gray-200">FINANCIAL SUMMARY</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <p className="text-sm"><strong>Name:</strong> {selectedCustomer.name}</p>
                            <p className="text-sm"><strong>Total Revenue:</strong> {selectedCustomer.totalRevenue}</p>
                            <p className="text-sm"><strong>Pending Payments:</strong> {selectedCustomer.pendingPayments}</p>
                            <p className="text-sm"><strong>Purchase Frequency:</strong> {selectedCustomer.purchaseFrequency}</p>
                            <p className="text-sm"><strong>Average Transaction Size:</strong> {selectedCustomer.averageTransactionSize}</p>
                            <p className="text-sm"><strong>Segmentation Tag:</strong> {selectedCustomer.segmentationTag}</p>
                            <p className="text-sm"><strong>Financial Health Score:</strong> {selectedCustomer.financialHealthScore}</p>
                            <p className="text-sm"><strong>Lifetime Value (LTV):</strong> {selectedCustomer.ltv}</p>
                            <p className="text-sm"><strong>Churn Risk:</strong> {selectedCustomer.churnRisk}</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold mb-2">RECENT TRANSACTIONS</h4>
                            <div className="bg-white rounded-md overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                                        <thead className="bg-gray-50 text-xs">
                                            <tr>
                                                <th className="px-3 py-1 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 first:rounded-tl-lg">Date</th>
                                                <th className="px-3 py-1 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Amount</th>
                                                <th className="px-3 py-1 text-left font-medium text-gray-500 uppercase tracking-wider first:rounded-tr-lg">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs">
                                            {transactionsData.map((tx, index, arr) => (
                                                <tr key={index} className={`${index % 2 === 1 ? "bg-gray-100" : ""} ${index === arr.length - 1 ? "last:rounded-b-lg" : ""} hover:bg-gray-50`}>
                                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{tx.date}</td>
                                                    <td className="px-3 py- whitespace-nowrap border-r border-gray-300">{tx.amount}</td>
                                                    <td className="px-3 py-1 whitespace-nowrap">{tx.type}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Segmentation Chart */}
            <div className="bg-white shadow rounded-md mt-4 p-4">
                <h3 className="text-xs font-bold mb-2 bg-gray-200 p-2 rounded">CUSTOMER SEGMENTATION</h3>
                <div className="w-full h-64">
                    <Pie data={segmentationChartData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white shadow rounded-md mt-4 p-4">
                <h3 className="text-xs font-bold mb-2 bg-gray-200 p-2 rounded">TOP CUSTOMERS</h3>
                <ul>
                    {topCustomers.map((customer, index) => (
                        <li key={index} className="text-sm">{customer.name} - {customer.totalRevenue}</li>
                    ))}
                </ul>
            </div>

            {/* At-Risk Customers */}
            <div className="bg-white shadow rounded-md mt-4 p-4">
                <h3 className="text-xs font-bold mb-2 bg-gray-200 p-2 rounded">AT-RISK CUSTOMERS</h3>
                <ul>
                    {atRiskCustomers.map((customer, index) => (
                        <li key={index} className="text-sm">{customer.name} - {customer.churnRisk}</li>
                    ))}
                </ul>
            </div>

            {/* Customer-wise Revenue & Expense Trends */}
            <div className="bg-white shadow rounded-md mt-4 p-4">
                <h3 className="text-xs font-bold mb-2 bg-gray-200 p-2 rounded">REVENUE & EXPENSE TRENDS</h3>
                <div className="w-full h-64">
                    <Bar data={revenueData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
}