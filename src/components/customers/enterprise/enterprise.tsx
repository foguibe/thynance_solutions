"use client";
import { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, PieController, ArcElement, LineElement, PointElement, LineController, BarController, ChartEvent, Title, TimeScale } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Papa, { ParseResult } from 'papaparse';
import Image from 'next/image';
import { ActiveElement } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, PieController, ArcElement, LineElement, PointElement, LineController, BarController, Title, TimeScale);

interface Customer {
    name: string;
    totalRevenue: string;
    pendingPayments: string;
    lastPaymentDate: string;
    purchaseFrequency: string;
    averageTransactionSize: string;
    segmentationTag: string;
    financialHealthScore: string;
    riskProfile: string;
    paymentPreferences: string;
}

interface Transaction {
    date: string;
    amount: string;
    type: string;
}

const initialCustomersData: Customer[] = [
    { name: "John Doe", totalRevenue: "$10,000", pendingPayments: "$1,000", lastPaymentDate: "2025-02-10", purchaseFrequency: "Monthly", averageTransactionSize: "$500", segmentationTag: "High-Value", financialHealthScore: "85", riskProfile: "Low", paymentPreferences: "Credit Card" },
    { name: "Jane Smith", totalRevenue: "$8,000", pendingPayments: "$500", lastPaymentDate: "2025-02-09", purchaseFrequency: "Weekly", averageTransactionSize: "$200", segmentationTag: "Returning", financialHealthScore: "78", riskProfile: "Medium", paymentPreferences: "Bank Transfer" },
    { name: "Alice Johnson", totalRevenue: "$12,000", pendingPayments: "$2,000", lastPaymentDate: "2025-02-08", purchaseFrequency: "Bimonthly", averageTransactionSize: "$600", segmentationTag: "High-Value", financialHealthScore: "92", riskProfile: "Low", paymentPreferences: "Credit Card" },
    { name: "Bob Brown", totalRevenue: "$7,000", pendingPayments: "$1,500", lastPaymentDate: "2025-02-07", purchaseFrequency: "Monthly", averageTransactionSize: "$350", segmentationTag: "New", financialHealthScore: "65", riskProfile: "High", paymentPreferences: "Cash" },
    { name: "Charlie Davis", totalRevenue: "$9,000", pendingPayments: "$750", lastPaymentDate: "2025-02-06", purchaseFrequency: "Weekly", averageTransactionSize: "$450", segmentationTag: "Returning", financialHealthScore: "80", riskProfile: "Medium", paymentPreferences: "Paypal" },
];

const transactionsData: Transaction[] = [
    { date: "2025-02-10", amount: "$1,000", type: "Payment" },
    { date: "2025-02-09", amount: "$500", type: "Refund" },
];

export default function EnterpriseCustomersComponent() {
    const [customersData, setCustomersData] = useState<Customer[]>(initialCustomersData);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [filter, setFilter] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("");
    const [transactionVolumeFilter, setTransactionVolumeFilter] = useState<string>("");
    const [dateRangeFilter, setDateRangeFilter] = useState<string>("");
    const [customerCategoryFilter, setCustomerCategoryFilter] = useState<string>("");
    const [fraudRiskScoreFilter, setFraudRiskScoreFilter] = useState<string>("");
    const [paymentPreferencesFilter, setPaymentPreferencesFilter] = useState<string>("");
    const [savedFilters, setSavedFilters] = useState<string[]>([]);
    const [selectedSavedFilter, setSelectedSavedFilter] = useState<string>("");
    const [segmentationChartData, setSegmentationChartData] = useState<{ labels: string[]; datasets: { data: number[]; backgroundColor: string[]; }[] }>({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
    const [revenueData, setRevenueData] = useState<{ labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; borderRadius: number; }[] }>({ labels: [], datasets: [{ label: '', data: [], backgroundColor: '', borderRadius: 0 }] });
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
    const [segmentationCriteria, setSegmentationCriteria] = useState<string>('segmentationTag'); // Default criteria
    const [customerDetails, setCustomerDetails] = useState<Customer[]>([]);
    const [selectedCustomerForTrends, setSelectedCustomerForTrends] = useState<string | null>(null);
    const [trendData, setTrendData] = useState<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });

    // Function to generate dynamic colors
    const generateDynamicColors = (numColors: number) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = Math.floor(i * (360 / numColors));
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
    };

    useEffect(() => {
        // Calculate segmentation data based on selected criteria
        const segmentationCounts: { [key: string]: number } = {};
        customersData.forEach(customer => {
            const criteriaValue = customer[segmentationCriteria as keyof Customer] as string;
            segmentationCounts[criteriaValue] = (segmentationCounts[criteriaValue] || 0) + 1;
        });

        const labels = Object.keys(segmentationCounts);
        const data = Object.values(segmentationCounts);
        const backgroundColor = generateDynamicColors(labels.length);

        setSegmentationChartData({
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor,
            }]
        });

    }, [customersData, segmentationCriteria]);

    useEffect(() => {
        // Generate revenue data
        const customerNames = customersData.map(customer => customer.name);
        const revenueValues = customersData.map(customer => parseFloat(customer.totalRevenue.replace(/[^0-9.-]+/g, "")));
        setRevenueData({
            labels: customerNames,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenueValues,
                    backgroundColor: '#3b82f6',
                    borderRadius: 5
                }
            ]
        });

    }, [customersData]);

    useEffect(() => {
        // Generate trend data
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2025-03-01');
        const months = getMonthsBetween(startDate, endDate);

        const datasets: any[] = [];

        if (selectedCustomerForTrends) {
            const customer = customersData.find(c => c.name === selectedCustomerForTrends);
            if (customer) {
                const revenueData = generateMonthlyData(months.length, parseFloat(customer.totalRevenue.replace(/[^0-9.-]+/g, "")));
                const expenseData = generateMonthlyData(months.length, parseFloat(customer.totalRevenue.replace(/[^0-9.-]+/g, "")) * 0.6); // Simulate expenses

                datasets.push({
                    label: 'Revenue',
                    data: revenueData,
                    backgroundColor: '#3b82f6',
                });

                datasets.push({
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: '#ef4444',
                });

                // Calculate profit
                const profitData = revenueData.map((revenue, index) => revenue - expenseData[index]);
                datasets.push({
                    label: 'Profit',
                    data: profitData,
                    backgroundColor: '#16a34a',
                });
            }
        }

        setTrendData({
            labels: months.map(month => month.toLocaleDateString('default', { month: 'short', year: 'numeric' })),
            datasets: datasets
        });

    }, [customersData, selectedCustomerForTrends]);

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
        const newCustomer: Customer = { name: "New Customer", totalRevenue: "$0", pendingPayments: "$0", lastPaymentDate: "2025-02-01", purchaseFrequency: "", averageTransactionSize: "", segmentationTag: "", financialHealthScore: "", riskProfile: "", paymentPreferences: "" };
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

    const handleSaveFilter = () => {
        if (filter && !savedFilters.includes(filter)) {
            setSavedFilters([...savedFilters, filter]);
        }
    };

    const handleLoadFilter = () => {
        if (selectedSavedFilter) {
            setFilter(selectedSavedFilter);
        }
    };

    const filteredCustomers = [...customersData].filter(customer =>
        customer.name.toLowerCase().includes(filter.toLowerCase()) &&
        (transactionVolumeFilter === "" || /* Add logic to filter by transaction volume */ true) &&
        (dateRangeFilter === "" || /* Add logic to filter by date range */ true) &&
        (customerCategoryFilter === "" || customer.segmentationTag === customerCategoryFilter) &&
        (fraudRiskScoreFilter === "" || customer.riskProfile === fraudRiskScoreFilter) &&
        (paymentPreferencesFilter === "" || customer.paymentPreferences === paymentPreferencesFilter)
    ).sort((a, b) => {
        if (sortOption === "highestRevenue") {
            return parseFloat(b.totalRevenue.replace(/[^0-9.-]+/g, "")) - parseFloat(a.totalRevenue.replace(/[^0-9.-]+/g, ""));
        } else if (sortOption === "lowestRevenue") {
            return parseFloat(a.totalRevenue.replace(/[^0-9.-]+/g, "")) - parseFloat(b.totalRevenue.replace(/[^0-9.-]+/g, ""));
        } else if (sortOption === "date") {
            return new Date(b.lastPaymentDate).getTime() - new Date(a.lastPaymentDate).getTime();
        }
        return 0;
    });

    const topCustomers = [...customersData]
        .sort((a, b) => parseFloat(b.totalRevenue.replace(/[^0-9.-]+/g, "")) - parseFloat(a.totalRevenue.replace(/[^0-9.-]+/g, "")))
        .slice(0, 3);

    const handleSegmentClick = (event: ChartEvent, elements: ActiveElement[]) => {
        if (elements.length > 0) {
            const segmentIndex = elements[0].index;
            const segmentLabel = segmentationChartData.labels[segmentIndex] as string;
            // Filter customers based on the selected segment
            const selectedCustomers = customersData.filter(customer => customer[segmentationCriteria as keyof Customer] === segmentLabel);
            setCustomerDetails(selectedCustomers);
        } else {
            setCustomerDetails([]); // Clear customer details if no segment is selected
        }
    };

    const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSegmentationCriteria(e.target.value);
    };

    const handleCustomerTrendChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCustomerForTrends(e.target.value);
    };

    // Helper function to generate monthly data
    const generateMonthlyData = (numMonths: number, baseValue: number) => {
        const data = [];
        for (let i = 0; i < numMonths; i++) {
            const fluctuation = Math.random() * 0.2 - 0.1; // Random fluctuation between -10% and +10%
            const value = baseValue * (1 + fluctuation);
            data.push(value);
        }
        return data;
    };

    // Helper function to get months between two dates
    const getMonthsBetween = (startDate: Date, endDate: Date) => {
        const months = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            months.push(new Date(currentDate));
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return months;
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 rounded-md">
            <div className='flex items-center gap-2 mb-4 border-b-[1px] border-b-gray-200 bg-gray-300 p-2 rounded'>
                <Image src="/icons/customers.svg" alt="Icon" width={20} height={20}></Image>
                <h2 className="text-sm font-bold text-gray-800">CUSTOMER MANAGEMENT</h2>
            </div>

            {/* Filter and Sort Customers */}
            <div className="mt-2 flex flex-col md:flex-row justify-between items-center flex-wrap">
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
                    <select
                        className="p-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={fraudRiskScoreFilter}
                        onChange={(e) => setFraudRiskScoreFilter(e.target.value)}
                    >
                        <option value="">All Risk Profiles</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <select
                        className="p-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={paymentPreferencesFilter}
                        onChange={(e) => setPaymentPreferencesFilter(e.target.value)}
                    >
                        <option value="">All Payment Preferences</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                        <option value="Paypal">Paypal</option>
                    </select>
                    <button className={`px-3 py-1 rounded text-xs font-semibold ${sortOption === "highestRevenue" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("highestRevenue")}>Highest Revenue</button>
                    <button className={`px-3 py-1 rounded text-xs font-semibold ${sortOption === "lowestRevenue" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("lowestRevenue")}>Lowest Revenue</button>
                    <button className={`px-3 py-1 rounded text-xs font-semibold ${sortOption === "date" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => handleSortChange("date")}>By Date</button>
                    <button className="px-3 py-1 rounded text-xs font-semibold bg-red-500 text-white hover:bg-red-600" onClick={handleClearFilter}>Clear</button>
                </div>
            </div>

            {/* Saved Filters */}
            <div className="flex space-x-2 mb-3">
                <select
                    className="p-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={selectedSavedFilter}
                    onChange={(e) => setSelectedSavedFilter(e.target.value)}
                >
                    <option value="">Select Saved Filter</option>
                    {savedFilters.map((savedFilter, index) => (
                        <option key={index} value={savedFilter}>{savedFilter}</option>
                    ))}
                </select>
                <button className="px-3 py-1 rounded text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700" onClick={handleLoadFilter}>Load Filter</button>
                <button className="px-3 py-1 rounded text-xs font-semibold bg-green-600 text-white hover:bg-green-700" onClick={handleSaveFilter}>Save Filter</button>
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
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Health Score</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Risk Profile</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Payment Pref.</th>
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
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.riskProfile}</td>
                                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.paymentPreferences}</td>
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
                            <p className="text-sm"><strong>Risk Profile:</strong> {selectedCustomer.riskProfile}</p>
                            <p className="text-sm"><strong>Payment Preferences:</strong> {selectedCustomer.paymentPreferences}</p>
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

                {/* Dropdown for selecting segmentation criteria */}
                <select
                    className="p-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
                    value={segmentationCriteria}
                    onChange={handleCriteriaChange}
                >
                    <option value="segmentationTag">Segmentation Tag</option>
                    <option value="financialHealthScore">Financial Health Score</option>
                    <option value="riskProfile">Risk Profile</option>
                    <option value="paymentPreferences">Payment Preferences</option>
                </select>

                <div className="w-full h-64">
                    <Pie
                        data={segmentationChartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'right',
                                    align: 'center'
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            const label = context.label || '';
                                            const value = context.formattedValue || '';
                                            return `${label}: ${value}`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {customerDetails.length > 0 && (
                <div className="bg-white shadow rounded-md mt-4 p-4">
                    <h4 className="text-xs font-bold mb-2">Customer Details</h4>
                    <ul>
                        {customerDetails.map(customer => (
                            <li key={customer.name} className="text-xs">{customer.name} - {customer.totalRevenue} - {customer.segmentationTag}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Customer-wise Revenue & Expense Trends */}
            <div className="bg-white shadow rounded-md mt-4 p-4">
                <h3 className="text-xs font-bold mb-2 bg-gray-200 p-2 rounded">REVENUE & EXPENSE TRENDS</h3>

                {/* Dropdown for selecting customer */}
                <select
                    className="p-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
                    value={selectedCustomerForTrends || ''}
                    onChange={handleCustomerTrendChange}
                >
                    <option value="">Select a Customer</option>
                    {customersData.map(customer => (
                        <option key={customer.name} value={customer.name}>{customer.name}</option>
                    ))}
                </select>

                <div className="w-full h-64">
                    <Bar
                        data={trendData}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    type: 'category', // Use category scale for actual dates
                                    labels: trendData.labels, // Pass the date labels
                                    ticks: {
                                        autoSkip: false, // Prevent skipping labels
                                        maxRotation: 50,    // Adjust rotation for readability
                                        minRotation: 30
                                    }
                                },
                                y: {
                                    beginAtZero: true
                                }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        title: (context) => {
                                            return context[0].label; // Display the date in tooltip
                                        },
                                         label: (context) => {
                                            let label = context.dataset.label || '';

                                            if (label) {
                                                label += ': ';
                                            }
                                            if (context.parsed.y !== null) {
                                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                            }
                                            return label;
                                        }
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}