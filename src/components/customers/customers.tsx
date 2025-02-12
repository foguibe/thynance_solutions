"use client";
import { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Papa, { ParseResult } from 'papaparse';
import Image from 'next/image';

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

const initialCustomersData: Customer[] = [
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
            backgroundColor: '#3b82f6',
            borderRadius: 5
        }
    ]
};

export default function CustomersComponent() {
    const [customersData, setCustomersData] = useState<Customer[]>(initialCustomersData);
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

    const handleClearFilter = () => {
        setFilter("");
    };

    const handleAddCustomer = () => {
        const newCustomer: Customer = { name: "New Customer", totalRevenue: "$0", pendingPayments: "$0", lastPaymentDate: "2025-02-01" };
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
        customer.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen p-4 rounded-md">
            <div className='flex items-center gap-2 mb-4 border-b-[1px] border-b-gray-200 bg-gray-300 p-2 rounded'>
                <Image src="/icons/customers.svg" alt="Icon" width={20} height={20}></Image>
                <h2 className="text-md font-semibold text-gray-800">Customer Management</h2>
            </div>

            {/* Filter and Sort Customers */}
            <div className="mt-2 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Filter customers by name..."
                    className="p-2 rounded w-1/3 mb-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div className="flex space-x-2 mb-3">
                    <button className={`px-3 py-1 rounded text-xs ${sortOption === "highestRevenue" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("highestRevenue")}>Highest Revenue</button>
                    <button className={`px-3 py-1 rounded text-xs ${sortOption === "lowestRevenue" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("lowestRevenue")}>Lowest Revenue</button>
                    <button className={`px-3 py-1 rounded text-xs ${sortOption === "date" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("date")}>By Date</button>
                    <button className="px-3 py-1 rounded text-xs bg-red-500 text-white hover:bg-red-600" onClick={handleClearFilter}>Clear</button>
                </div>
            </div>

            {/* Add and Upload Customers */}
            <div className="flex space-x-2 mb-3">
                <button className="px-3 py-1 rounded text-xs bg-green-600 text-white hover:bg-green-700 foont-semibold flex items-center" onClick={handleAddCustomer}>
                    <span className="mr-1">➕</span>Add Customer
                </button>
                <label htmlFor="upload-csv" className="px-3 py-1 rounded text-xs bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer flex items-center">
                    <span className="mr-1">⬆️</span> Upload CSV
                </label>
                <input 
                    type="file" 
                    accept=".csv" 
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
                <h3 className="text-sm font-semibold bg-gray-100 px-4 py-2">Customer List</h3>
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-xs">
                        <tr>
                            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Last Date</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {filteredCustomers.map((customer, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-3 py-2 whitespace-nowrap">{customer.name}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{customer.totalRevenue}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{customer.pendingPayments}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{customer.lastPaymentDate}</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <button className="px-4 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700" onClick={() => handleViewTransactions(customer)}>View</button>
                                    <button className="px-2 py-1 bg-yellow-600 text-white rounded text-xs font-medium hover:bg-yellow-700 ml-1">Reminder</button>
                                    <button className="px-4 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 ml-1">Edit</button>
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
                    <h3 className="text-sm font-semibold mb-2">Financial Summary</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <p className="text-sm"><strong>Name:</strong> {selectedCustomer.name}</p>
                            <p className="text-sm"><strong>Total Revenue:</strong> {selectedCustomer.totalRevenue}</p>
                            <p className="text-sm"><strong>Pending Payments:</strong> {selectedCustomer.pendingPayments}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-2">Recent Transactions</h4>
                            <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 text-xs">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {transactionsData.map((tx, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-3 py-2 whitespace-nowrap">{tx.date}</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{tx.amount}</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{tx.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer-wise Revenue & Expense Trends */}
            <div className="bg-white shadow rounded-md mt-4 p-4">
                <h3 className="text-sm font-semibold mb-2">Revenue & Expense Trends</h3>
                <div className="w-full h-64">
                    <Bar data={revenueData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
}