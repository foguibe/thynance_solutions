"use client";
import { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement);

const spendingData = {
    labels: ['Office Rent', 'Software Licenses', 'Utilities', 'Marketing'],
    datasets: [
        { label: 'Current Month', data: [3000, 1500, 800, 2000], backgroundColor: '#3b82f6', borderRadius: 4 },
        { label: 'Previous Month', data: [2800, 1400, 750, 1800], backgroundColor: '#9ca3af', borderRadius: 4 }
    ]
};

const fraudDetectionData = {
    labels: ['Abnormal Vendor Payments', 'Frequent Reversals', 'Unusual Activities'],
    datasets: [{ data: [5, 3, 7], backgroundColor: ['#ef4444', '#f97316', '#84cc16'], borderRadius: 4 }]
};

const revenueForecastData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        { label: 'Revenue', data: [10000, 12000, 15000, 13000, 14000, 16000], borderColor: '#16a34a', backgroundColor: '#dcfce7', fill: true, tension: 0.3 },
        { label: 'Expenses', data: [7000, 8000, 10000, 9000, 9500, 11000], borderColor: '#dc2626', backgroundColor: '#fee2e2', fill: true, tension: 0.3 }
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

export default function EnterprisePerformanceOptimizationComponent() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [kpiCashFlow, setKpiCashFlow] = useState(50000);
    const [kpiRevenueGrowth, setKpiRevenueGrowth] = useState(0.15);
    const [kpiExpenseRatio, setKpiExpenseRatio] = useState(0.6);
    const [budgetAllocation, setBudgetAllocation] = useState({
        marketing: 5000,
        development: 7000,
        sales: 3000
    });
    const [budgetThreshold, setBudgetThreshold] = useState(5000);
    const [alerts, setAlerts] = useState([]);

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

    const handleCostCuttingScenario = () => {
        alert("Simulating cost-cutting scenario...");
    };

    const handleInvestmentImpact = () => {
        alert("Analyzing investment impact...");
    };

    const handleScheduleReport = () => {
        alert("Automated performance reports scheduled for delivery.");
    };

    const handleBudgetAllocationChange = (department: string, amount: number) => {
        setBudgetAllocation(prev => ({ ...prev, [department]: amount }));
    };

    const handleSetBudget = () => {
        alert(`Budget threshold set to $${budgetThreshold}`);
    };

    const outOfRangeTransactions = recentTransactions.filter(transaction => parseFloat(transaction.amount.replace('$', '')) > budgetThreshold);

    const topExpenseCategories = spendingData.labels.map((label, index) => ({
        category: label,
        amount: spendingData.datasets[0].data[index]
    })).sort((a, b) => b.amount - a.amount).slice(0, 5);

    const handleRealTimeAnalysis = () => {
        alert("Performing real-time analysis...");
    };

    const handleSimulateMultiScenario = () => {
        alert("Simulating multi-scenario...");
    };

    const handleAutomatedInvestmentAnalysis = () => {
        alert("Performing automated investment analysis...");
    };

    const handleGetActionableInsights = () => {
        alert("Getting actionable insights...");
    };

    return (
        <div className="bg-gray-100 rounded-md p-4">
            <div className='flex items-center gap-2 mb-4 border-b-[1px] border-b-gray-200 bg-gray-300 p-2 rounded'>
                <Image src="/icons/chart.svg" alt="Icon" width={20} height={20}></Image>
                <h2 className="text-sm font-bold text-gray-800">PERFORMANCE INSIGHTS</h2>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="yearPicker" className="text-[13px] font-medium text-gray-700">FILTER BY YEAR:</label>
                    <DatePicker
                        id="yearPicker"
                        selected={new Date(selectedYear, 0, 1)}
                        onChange={handleYearChange}
                        showYearPicker
                        dateFormat="yyyy"
                        className="border rounded px-3 py-2 text-sm"
                    />
                </div>
                <button
                    onClick={handleDownloadReport}
                    className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                    <span className="mr-1">📄</span> Download Analysis
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                {/* Fraud Detection */}
                <div className="bg-white p-4 shadow rounded-md">
                    <h3 className="text-xs font-bold text-gray-700 mb-2 p-2 bg-gray-200 rounded">FRAUD DETECTION</h3>
                    <Bar data={fraudDetectionData}
                        options={{
                            plugins: {
                                legend: { display: false },
                                tooltip: { enabled: true }
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        font: {
                                            size: 10
                                        }
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: {
                                            size: 10
                                        }
                                    }
                                }
                            }
                        }} />
                    <div className="mt-3">
                        <h4 className="text-xs font-semibold text-gray-700">ALERTS</h4>
                        <ul className="list-disc list-inside mt-1 text-xs text-gray-600">
                            <li>Abnormal Vendor Payments: 5</li>
                            <li>Frequent Reversals: 3</li>
                            <li>Unusual Activities: 7</li>
                            <li>
                                Out-of-Range Transactions: {outOfRangeTransactions.length}
                                {outOfRangeTransactions.length > 0 && (
                                    <ul>
                                        {outOfRangeTransactions.map((tx, index) => (
                                            <li key={index}>{tx.description} ({tx.amount})</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        </ul>
                        <button
                            onClick={handleRealTimeAnalysis}
                            className="mt-2 px-3 py-2 bg-yellow-500 text-white rounded text-xs font-semibold hover:bg-yellow-600 transition-colors"
                        >
                            Perform Real-Time Analysis
                        </button>
                        <div className="mt-2">
                            <label htmlFor="budgetThreshold" className="block text-xs font-medium text-gray-700">Set Budget Threshold:</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    id="budgetThreshold"
                                    className="border rounded px-2 py-1 text-xs w-20"
                                    value={budgetThreshold}
                                    onChange={(e) => setBudgetThreshold(parseInt(e.target.value))}
                                />
                                <button
                                    onClick={handleSetBudget}
                                    className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 text-xs"
                                >
                                    Set
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Predictive Analysis */}
                <div className="bg-white p-4 shadow rounded-md">
                    <h3 className="text-xs font-bold text-gray-700 mb-2 p-2 bg-gray-200 rounded">PREDICTIVE ANALYSIS</h3>
                    <Line data={revenueForecastData}
                        options={{
                            plugins: {
                                legend: { display: true, labels: { font: { size: 10 } } },
                                tooltip: { enabled: true }
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        font: {
                                            size: 10
                                        }
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: {
                                            size: 10
                                        }
                                    }
                                }
                            }
                        }} />
                    <div className="mt-3">
                        <h4 className="text-xs font-bold text-gray-700">FORECASTING</h4>
                        <ul className="list-disc list-inside mt-1 text-xs text-gray-600">
                            <li>Predict future revenue.</li>
                            <li>Estimate upcoming costs.</li>
                            <li>
                                KPI Tracking:
                                <ul>
                                    <li>Cash Flow: ${kpiCashFlow}</li>
                                    <li>Revenue Growth: {(kpiRevenueGrowth * 100).toFixed(2)}%</li>
                                    <li>Expense Ratio: {(kpiExpenseRatio * 100).toFixed(2)}%</li>
                                </ul>
                            </li>
                        </ul>
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={handleCostCuttingScenario}
                                className="px-3 py-2 bg-blue-500 text-white rounded text-xs font-semibold hover:bg-blue-600 transition-colors"
                            >
                                Cost-Cutting Impact
                            </button>
                            <button
                                onClick={handleInvestmentImpact}
                                className="px-3 py-2 bg-green-500 text-white rounded text-xs font-semibold hover:bg-green-600 transition-colors"
                            >
                                Investment Impact
                            </button>
                        </div>
                        <button
                            onClick={handleSimulateMultiScenario}
                            className="mt-2 px-3 py-2 bg-purple-500 text-white rounded text-xs font-semibold hover:bg-purple-600 transition-colors"
                        >
                            Simulate Multi-Scenario
                        </button>
                        <button
                            onClick={handleDownloadReport}
                            className="mt-2 px-3 py-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                        >
                            <span className="mr-1">📄</span> Download Projection Report
                        </button>
                    </div>
                </div>

                {/* Expense Optimization and Additional Features */}
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Expense Optimization */}
                    <div className="bg-white p-4 shadow rounded-md">
                        <h3 className="text-xs font-bold text-gray-700 mb-2 p-2 bg-gray-200 rounded">EXPENSE OPTIMIZATION</h3>
                        <Bar data={spendingData}
                            options={{
                                plugins: {
                                    legend: { display: true, labels: { font: { size: 10 } } },
                                    tooltip: { enabled: true }
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            font: {
                                                size: 10
                                            }
                                        }
                                    },
                                    x: {
                                        ticks: {
                                            font: {
                                                size: 10
                                            }
                                        }
                                    }
                                }
                            }} />
                        <div className="mt-3">
                            <h4 className="text-xs font-semibold text-gray-700">TOP 5 EXPENSE CATEGORIES</h4>
                            <ul className="list-disc list-inside mt-1 text-xs text-gray-600">
                                {topExpenseCategories.map((item, index) => (
                                    <li key={index}>
                                        {item.category}: ${item.amount}
                                    </li>
                                ))}
                            </ul>
                            <h4 className="text-xs font-semibold text-gray-700 mt-2">RECOMMENDATIONS</h4>
                            <ul className="list-disc list-inside mt-1 text-xs text-gray-600">
                                <li>Real-time AI insights into operational inefficiencies.</li>
                                <li>Dynamic benchmarking against industry data for expense patterns.</li>
                            </ul>
                            <h4 className="text-xs font-semibold text-gray-700 mt-2">BUDGET ALLOCATION</h4>
                            <div>
                                {Object.entries(budgetAllocation).map(([department, amount]) => (
                                    <div key={department} className="flex items-center justify-between text-xs">
                                        <span>{department}:</span>
                                        <input
                                            type="number"
                                            className="border rounded px-2 py-1 text-xs w-20"
                                            value={amount}
                                            onChange={(e) => handleBudgetAllocationChange(department, parseInt(e.target.value))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={handleAutomatedInvestmentAnalysis}
                            className="mt-2 px-3 py-2 bg-green-500 text-white rounded text-xs font-semibold hover:bg-green-600 transition-colors"
                        >
                            Automated Investment Analysis
                        </button>
                    </div>

                    {/* Additional Features */}
                    <div className="bg-white p-4 shadow rounded-md">
                        <h3 className="text-xs font-bold text-gray-700 mb-2 p-2 bg-gray-200 rounded">ADDITIONAL FEATURES</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="overflow-hidden rounded border border-gray-300">
                                <h4 className="text-xs font-semibold text-gray-700 px-3 py-2 bg-gray-50 border-b border-gray-200">TOP CATEGORIES</h4>
                                <table className="min-w-full bg-white divide-y divide-gray-200">
                                    <thead className="bg-gray-50 text-xs">
                                        <tr className="text-left text-gray-500">
                                            <th className="py-2 px-3 border-r border-gray-300 first:rounded-tl-lg">Category</th>
                                            <th className="py-2 px-3 first:rounded-tr-lg">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topPerformingCategories.map((item, index) => (
                                            <tr key={index} className={`${index % 2 === 1 ? "bg-gray-100 text-xs" : "text-xs"} hover:bg-gray-50`}>
                                                <td className="py-1 px-3 border-r border-gray-300 text-xs">{item.category}</td>
                                                <td className="py-1 px-3 text-xs">{item.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-2 text-xs text-gray-500 px-3 py-2 bg-gray-50 rounded-b-lg">Top-performing business areas.</p>
                            </div>

                            <div className="overflow-hidden rounded border border-gray-300">
                                <h4 className="text-xs font-semibold text-gray-700 px-3 py-2 bg-gray-50 border-b border-gray-200">
                                    RECENT TRANSACTIONS
                                </h4>
                                <table className="min-w-full bg-white divide-y divide-gray-200">
                                    <thead className="bg-gray-50 text-xs">
                                        <tr className="text-left text-gray-500">
                                            <th className="py-2 px-3 border-r border-gray-300 first:rounded-tl-lg">Description</th>
                                            <th className="py-2 px-3 first:rounded-tr-lg">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentTransactions.map((item, index) => (
                                            <tr key={index} className={`${index % 2 === 1 ? "bg-gray-100" : ""} hover:bg-gray-50`}>
                                                <td className="py-1 px-3 border-r border-gray-300 text-xs">{item.description}</td>
                                                <td className="py-1 px-3 text-xs">{item.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-2 text-xs text-gray-500 px-3 py-2 bg-gray-50 rounded-b-lg">
                                    Most recent financial activities.
                                </p>
                            </div>
                            <button
                                onClick={handleScheduleReport}
                                className="mt-2 px-3 py-2 bg-purple-500 text-white rounded text-xs font-semibold hover:bg-purple-600 transition-colors"
                            >
                                Schedule Automated Report
                            </button>
                            <button
                                onClick={handleGetActionableInsights}
                                className="mt-2 px-3 py-2 bg-blue-500 text-white rounded text-xs font-semibold hover:bg-blue-600 transition-colors"
                            >
                                Get Actionable Insights
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}