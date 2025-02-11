"use client";
import { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement);

const spendingData = {
    labels: ['Office Rent', 'Software Licenses', 'Utilities', 'Marketing'],
    datasets: [
        { label: 'Current Month', data: [3000, 1500, 800, 2000], backgroundColor: '#007bff', borderRadius: 4 },
        { label: 'Previous Month', data: [2800, 1400, 750, 1800], backgroundColor: '#ffc107', borderRadius: 4 }
    ]
};

const fraudDetectionData = {
    labels: ['Duplicate Transactions', 'Suspicious Refunds', 'Unusual Spikes'],
    datasets: [{ data: [5, 3, 7], backgroundColor: ['#dc3545', '#ffc107', '#28a745'], borderRadius: 4 }]
};

const revenueForecastData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        { label: 'Revenue', data: [10000, 12000, 15000, 13000, 14000, 16000], borderColor: '#28a745', fill: false },
        { label: 'Expenses', data: [7000, 8000, 10000, 9000, 9500, 11000], borderColor: '#dc3545', fill: false }
    ]
};

const topPerformingCategories = [
    { category: 'Marketing', amount: '$20,000' },
    { category: 'Product Development', amount: '$15,000' },
    { category: 'Customer Support', amount: '$10,000' }
];

const recentTransactions = [
    { description: 'Client Payment', amount: '$5,000' },
    { description: 'Office Supplies', amount: '$1,000' },
    { description: 'Marketing', amount: '$2,000' }
];

export default function PerformanceOptimizationComponent() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleDownloadReport = () => {
        const data = [
            { section: 'Top Performing Categories', ...topPerformingCategories },
            { section: 'Recent Transactions', ...recentTransactions }
        ];
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'report.csv');
    };

    const handleYearChange = (date: Date | null) => {
        if (date) {
            setSelectedYear(date.getFullYear());
            // Filter data based on the selected year
            // This is a placeholder for the actual filtering logic
        }
    };

    return (
        <div className="bg-gray-100 rounded-md p-6">
            <h2 className="heading1 mb-6">Performance Optimization</h2>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold">Filter by Year:</h3>
                    <DatePicker
                        selected={new Date(selectedYear, 0, 1)}
                        onChange={handleYearChange}
                        showYearPicker
                        dateFormat="yyyy"
                        className="border rounded px-4 py-2"
                    />
                </div>
                <button
                    onClick={handleDownloadReport}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Download Report
                </button>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full">

                {/* Fraud Detection */}
                <div className="col-span-1 bg-white p-6 shadow rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Fraud Detection</h3>
                    <Bar data={fraudDetectionData} options={{ plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />
                    <div className="mt-6">
                        <h4 className="text-md font-semibold">Automated Fraud Alerts</h4>
                        <ul className="list-disc list-inside mt-2">
                            <li>Duplicate Transactions detected: 5</li>
                            <li>Suspicious Refund Patterns detected: 3</li>
                            <li>Unusual Spikes in Expenses detected: 7</li>
                        </ul>
                    </div>
                </div>

                {/* Predictive Analysis */}
                <div className="col-span-1 bg-white p-6 shadow rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Predictive Analysis</h3>
                    <Line data={revenueForecastData} options={{ plugins: { legend: { display: true }, tooltip: { enabled: true } } }} />
                    <div className="mt-6">
                        <h4 className="text-md font-semibold">AI-driven Financial Forecasting</h4>
                        <ul className="list-disc list-inside mt-2">
                            <li>Predict future revenue based on historical trends.</li>
                            <li>Estimate upcoming costs based on previous spending.</li>
                            <li>Ensure liquidity planning with cash flow projections.</li>
                        </ul>
                    </div>
                </div>

                {/* Expense Optimization and Additional Features */}
                <div className="col-span-2 grid grid-cols-2 gap-6">
                    {/* Expense Optimization */}
                    <div className="bg-white p-6 shadow rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Expense Optimization</h3>
                        <Bar data={spendingData} options={{ plugins: { legend: { display: true }, tooltip: { enabled: true } } }} />
                        <div className="mt-6">
                            <h4 className="text-md font-semibold">AI-Powered Recommendations</h4>
                            <ul className="list-disc list-inside mt-2">
                                <li>Consider switching to cheaper office rent options.</li>
                                <li>Explore bulk purchase benefits for software licenses.</li>
                                <li>Optimize payroll vs. revenue ratio to avoid overstaffing risks.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Additional Features */}
                    <div className="bg-white p-6 shadow rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Additional Features</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <h4 className="text-md font-semibold">Top Performing Categories</h4>
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left bg-gray-100 border">Category</th>
                                            <th className="py-2 px-4 border-b text-left bg-gray-100 border">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topPerformingCategories.map((item, index) => (
                                            <tr key={index}>
                                                <td className="py-2 px-4 border-b border">{item.category}</td>
                                                <td className="py-2 px-4 border-b border">{item.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-4 text-sm text-gray-600">These categories represent the top-performing areas of the business based on the selected year.</p>
                            </div>
                            <div>
                                <h4 className="text-md font-semibold">Recent Transactions</h4>
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left bg-gray-100 border">Description</th>
                                            <th className="py-2 px-4 border-b text-left bg-gray-100 border">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentTransactions.map((item, index) => (
                                            <tr key={index}>
                                                <td className="py-2 px-4 border-b border">{item.description}</td>
                                                <td className="py-2 px-4 border-b border">{item.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-4 text-sm text-gray-600">These transactions are the most recent financial activities recorded for the selected year.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}