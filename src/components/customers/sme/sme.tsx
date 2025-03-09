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
    const [revenueData, setRevenueData] = useState<{ labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; borderRadius: number; }[] }>({ labels: [], datasets: [{ label: '', data: [], backgroundColor: '', borderRadius: 0 }] });
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
    const [segmentationCriteria, setSegmentationCriteria] = useState<string>('segmentationTag'); // Default criteria
    const [customerDetails, setCustomerDetails] = useState<Customer[]>([]);

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

        // Identify top customers
        const sortedCustomers = [...customersData].sort((a, b) => parseFloat(b.totalRevenue.replace(/[^0-9.-]+/g, "")) - parseFloat(a.totalRevenue.replace(/[^0-9.-]+/g, "")));
        setTopCustomers(sortedCustomers.slice(0, 3));

        // Identify at-risk customers (example: churnRisk === "High")
        const riskCustomers = customersData.filter(customer => customer.churnRisk === "High");
        setAtRiskCustomers(riskCustomers);

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
                    className="p-2 rounded w-full md:w-1/3 mb-3 text-[12.5px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div className="flex flex-wrap space-x-2 mb-3">
                    <select
                        className="p-2 rounded text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                <button className="px-3 py-2 rounded text-xs font-bold bg-green-600 text-white hover:bg-green-700 foont-semibold flex items-center" onClick={handleAddCustomer}>
                    <span className="mr-1">➕</span>Add Customer
                </button>
                <label htmlFor="upload-csv" className="px-3 py-2 font-bold rounded text-xs bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer flex items-center">
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
                                        <button className="px-2 py-1 bg-yellow-600 text-white rounded font-semibold text-xs hover:bg-yellow-700 ml-1">Reminder</button>
                                        <button className="px-4 py-1 bg-green-600 text-white rounded font-semibold text-xs hover:bg-green-700 ml-1">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer Segmentation Chart */}
            <div className="bg-white shadow rounded-md mt-4 p-4">
                <h3 className="text-xs font-bold mb-2 bg-gray-200 p-2 rounded">CUSTOMER SEGMENTATION</h3>

                {/* Dropdown for selecting segmentation criteria */}
                <select
                    className="p-2 rounded text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
                    value={segmentationCriteria}
                    onChange={handleCriteriaChange}
                >
                    <option value="segmentationTag">Segmentation Tag</option>
                    <option value="financialHealthScore">Financial Health Score</option>
                    <option value="ltv">LTV</option>
                    <option value="churnRisk">Churn Risk</option>
                    <option value="geography">Geography</option>
                </select>

                <div className="w-full h-64">
                    <Pie
                        data={segmentationChartData}
                        options={{
                            maintainAspectRatio: false,
                            onClick: handleSegmentClick,
                            plugins: {
                                title: {
                                    display: true,
                                    text: `Customer Segmentation by ${segmentationCriteria}`,
                                    font: {
                                        size: 14
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
        </div>
    );
}