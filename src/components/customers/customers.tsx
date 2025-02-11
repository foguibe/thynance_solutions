"use client";
import { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Papa, { ParseResult } from 'papaparse';

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
            backgroundColor: '#1d4ed8',
            borderRadius: 6 // Add this line to round the edges
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
                    <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={handleClearFilter}>Clear Filter</button>
                </div>
            </div>

            {/* Add and Upload Customers */}
            <div className="flex space-x-2 mb-4">
                <button className="px-4 py-2 rounded bg-green-600 text-white" onClick={handleAddCustomer}>Add Customer</button>
                <input type="file" accept=".csv" onChange={handleUploadCSV} className="px-4 py-2 rounded bg-gray-200 text-gray-800" />
                <button className="px-4 py-2 rounded bg-purple-600 text-white" onClick={handleDownloadCSV}>Download Customer List</button>
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
                    <div className='grid grid-cols-2 items-center'>
                    <div>
                        <p><strong>Name:</strong> {selectedCustomer.name}</p>
                        <p><strong>Total Revenue:</strong> {selectedCustomer.totalRevenue}</p>
                        <p><strong>Pending Payments:</strong> {selectedCustomer.pendingPayments}</p>
                    </div>
                    <div>
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
                    </div>
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