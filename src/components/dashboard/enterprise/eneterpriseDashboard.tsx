"use client";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement, ArcElement, Tooltip, Legend);

const revenueExpenseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
        { label: 'Revenue', data: [10000, 12000, 15000, 13000], borderColor: '#28a745', fill: false },
        { label: 'Expense', data: [7000, 8000, 10000, 9000], borderColor: '#dc3545', fill: false }
    ]
};

const cashFlowData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
        { label: 'Inflow', data: [15000, 17000, 20000], backgroundColor: '#007bff' },
        { label: 'Outflow', data: [10000, 12000, 14000], backgroundColor: '#ffc107' }
    ]
};

const expenseBreakdownData = {
    labels: ['Salaries', 'Taxes', 'Loans', 'Assets'],
    datasets: [{ data: [5000, 2500, 2000, 3000], backgroundColor: ['#8884d8', '#82ca9d', '#ffc658', '#d84f4f'] }]
};

const transactions = [
    { type: "Income", amount: "$5,000", paymentMethod: "Credit Card", date: "2025-02-10", description: "Client Payment", category: "Sales" },
    { type: "Expense", amount: "$1,000", paymentMethod: "Cash", date: "2025-02-09", description: "Office Supplies", category: "Operations" },
    { type: "Expense", amount: "$2,000", paymentMethod: "Credit Card", date: "2025-02-08", description: "Marketing", category: "Marketing" },
    { type: "Income", amount: "$7,000", paymentMethod: "Bank Transfer", date: "2025-02-07", description: "Investment Returns", category: "Investments" },
    { type: "Expense", amount: "$500", paymentMethod: "Credit Card", date: "2025-02-06", description: "Travel Expenses", category: "Travel" },
];

interface CardProps {
    title: string;
    value: string;
    change: string;
    color: string;
    icon: string;
}

const financialTips = [
    {
        tip: "Track your cash flow regularly to avoid overspending.",
        description: "Monitor your income and expenses to identify areas where you can save money."
    },
    {
        tip: "Set a budget for each category to control expenses.",
        description: "Allocate funds for different spending categories to stay within your financial limits."
    },
    {
        tip: "Review your financial statements monthly to identify trends.",
        description: "Analyze your income statement and balance sheet to spot patterns and make informed decisions."
    },
];

const businessGrowthInsights = [
    { title: "Loan Eligibility", value: "85%", description: "You qualify for a small business loan." },
    { title: "Funding Opportunities", value: "3", description: "Explore available grants and funding programs." },
];

const complianceAlerts = [
    "Your quarterly tax filing is due in 10 days.",
    "Annual audit requirements must be completed by March 31st.",
];

const aiInsights = [
    "Your marketing expenses are 20% higher than last month.",
    "Consider renegotiating office rent to reduce costs.",
];

export default function EnterpriseDashboardComponent() {
    const [threshold, setThreshold] = useState(3000);
    const [alerts, setAlerts] = useState<string[]>([]);
    const [grossMarginTrend, setGrossMarginTrend] = useState(5);
    const [customerAcquisitionCost, setCustomerAcquisitionCost] = useState(200);
    const [roi, setRoi] = useState(15);
    const [revenueForecast, setRevenueForecast] = useState(14000);
    const [riskLevel, setRiskLevel] = useState("Low");
    const [marketBenchmarkingScore, setMarketBenchmarkingScore] = useState(75);
    const [cashFlowPrediction, setCashFlowPrediction] = useState(100000);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [regionalPerformance, setRegionalPerformance] = useState({
        NorthAmerica: 500000,
        Europe: 400000,
        Asia: 600000
    });
    const [filterType, setFilterType] = useState("All");
    const [sortBy, setSortBy] = useState("date");
    const [financialHealth, setFinancialHealth] = useState("Good"); // Financial health indicator

    useEffect(() => {
        // Basic AI insights (static)
        const revenueGrowth = ((revenueExpenseData.datasets[0].data[3] - revenueExpenseData.datasets[0].data[2]) / revenueExpenseData.datasets[0].data[2]) * 100;
        const newAlerts: string[] = [`Revenue grew ${revenueGrowth.toFixed(1)}% compared to last month`];

        // Manual threshold alerts for overspending
        const overspending = transactions.filter(t => t.type === "Expense" && parseFloat(t.amount.replace('$', '')) > threshold);
        if (overspending.length > 0) {
            newAlerts.push(`Overspending detected: ${overspending.length} transactions exceed $${threshold}`);
        }

        // AI-generated alerts for optimization opportunities (example)
        if (roi < 10) {
            newAlerts.push("Reduce marketing spend in X area for better ROI");
        }

        // Real-time risk detection (example)
        if (riskLevel === "High") {
            newAlerts.push("High risk detected. Recommended mitigation strategies available.");
        }

        // Financial health assessment (example)
        if (grossMarginTrend < 0) {
            setFinancialHealth("Poor");
            newAlerts.push("Financial health is declining. Review cost structure.");
        }

        // Loan eligibility assessment (example)
        if (financialHealth === "Good" && riskLevel === "Low") {
            newAlerts.push("Excellent loan eligibility. Explore funding options.");
        }

        setAlerts(newAlerts);
    }, [threshold, roi, riskLevel, grossMarginTrend, financialHealth]);

    const simulateSalesIncrease = () => {
        setRevenueForecast(prev => prev * 1.1);
    };

    const simulateMarketDip = () => {
        setRevenueForecast(prev => prev * 0.95);
    };

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value);
    };

    const filteredTransactions = transactions
        .filter(tx => filterType === "All" || tx.type === filterType)
        .sort((a, b) => {
            if (sortBy === "date") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortBy === "amount") {
                return parseFloat(a.amount.replace('$', '')) - parseFloat(b.amount.replace('$', ''));
            }
            return 0;
        });

    const chartOptions = { // Options for smaller charts
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: {
            y: { ticks: { font: { size: 8 } } },
            x: { ticks: { font: { size: 8 } } }
        },
        height: 200, // Specify the height
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 rounded-md">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Adjusted grid layout */}

                {/* Summary Cards */}
                {[
                    { title: "Revenue", value: "$25,000", change: "+10%", color: "text-green-500", icon: "💰" },
                    { title: "Expenses", value: "$18,000", change: "+5%", color: "text-red-500", icon: "💸" },
                    { title: "Net Profit", value: "$7,000", change: "+15%", color: "text-blue-500", icon: "📈" },
                    { title: "Cash Flow", value: "$5,000", change: "+8%", color: "text-purple-500", icon: "💵" },
                    { title: "Gross Margin Trend", value: `${grossMarginTrend}%`, change: "+2%", color: "text-green-500", icon: "📊" },
                    { title: "Customer Acquisition Cost", value: `$${customerAcquisitionCost}`, change: "-3%", color: "text-red-500", icon: "👥" },
                    { title: "ROI", value: `${roi}%`, change: "+1%", color: "text-blue-500", icon: "🚀" },
                    { title: "Risk Level", value: riskLevel, change: "", color: riskLevel === "High" ? "text-red-500" : "text-green-500", icon: "🚨" },
                    { title: "Market Benchmarking", value: `${marketBenchmarkingScore}%`, change: "", color: "text-blue-500", icon: "🏢" },
                    { title: "Cash Flow Prediction", value: `$${cashFlowPrediction}`, change: "", color: "text-purple-500", icon: "🏦" },
                    { title: "Financial Health", value: financialHealth, change: "", color: financialHealth === "Good" ? "text-green-500" : "text-red-500", icon: "❤️" }, // Financial health card
                ].map((card: CardProps, index) => (
                    <div key={index} className="bg-white shadow-sm rounded-md p-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-700 text-xs font-bold">{card.title.toUpperCase()}</h3>
                                <p className="text-gray-800 text-md font-bold">{card.value}</p>
                                <p className={`${card.color} text-[0.7rem]`}>{card.change}</p>
                            </div>
                            <div className={`text-3xl ${card.color}`}>{card.icon}</div>
                        </div>
                    </div>
                ))}

                {/* Financial Trend Charts */}
                <div className="md:col-span-2 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-xs font-bold mb-1 p-2 rounded bg-gray-200">REVENUE vs EXPENSE</h3>
                    <Line data={revenueExpenseData} options={chartOptions} /> {/* Apply smaller chart options */}
                </div>

                <div className="md:col-span-2 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-xs font-bold mb-1 p-2 rounded bg-gray-200">FINANCIAL TIPS</h3>
                    {financialTips.map((item, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-xs text-gray-700 font-semibold">{item.tip}</p>
                            <p className="text-xs text-gray-600">{item.description}</p>
                            <a href="#" className="text-blue-500 text-xs underline hover:no-underline">Read more</a>
                        </div>
                    ))}
                </div>

                <div className="md:col-span-2 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-xs font-bold mb-1 p-2 rounded bg-gray-200">BUSINESS GROWTH INSIGHTS</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {businessGrowthInsights.map((insight, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded">
                                <h4 className="text-xs font-semibold text-gray-700">{insight.title}</h4>
                                <p className="text-xs text-gray-600">{insight.description}</p>
                                <p className="text-xs text-gray-800 font-bold">{insight.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-xs font-bold mb-1 p-2 rounded bg-gray-200">COMPLIANCE ALERTS</h3>
                    <ul className="list-disc list-inside text-xs text-gray-700">
                        {complianceAlerts.map((alert, index) => (
                            <li key={index}>⚠️ {alert}</li>
                        ))}
                    </ul>
                </div>

                {/* Regional Performance Breakdown */}
                <div className="md:col-span-1 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-xs font-bold mb-1">REGIONAL PERFORMANCE</h3>
                    <div style={{ height: '200px' }}> {/* Added a fixed height */}
                        <Pie data={{
                            labels: Object.keys(regionalPerformance),
                            datasets: [{
                                data: Object.values(regionalPerformance),
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                            }]
                        }} options={chartOptions} /> {/* Apply smaller chart options */}
                    </div>
                </div>

                {/* Alerts & Quick Actions */}
                <div className="md:col-span-1 space-y-3">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-md p-2">
                        <h3 className="text-yellow-700 text-xs font-bold">ALERTS & NOTIFICATIONS </h3>
                        {alerts.map((alert, index) => (
                            <p key={index} className="text-gray-700 text-[0.8rem]">⚠️ {alert}</p>
                        ))}
                        {aiInsights.map((insight, index) => (
                            <p key={index} className="text-gray-700 text-[0.8rem]">💡 {insight}</p>
                        ))}
                        <div className="mt-2">
                            <label htmlFor="threshold" className="block text-gray-700 text-xs font-semibold">Overspending Threshold:</label>
                            <input
                                type="number"
                                id="threshold"
                                className="border rounded px-2 py-1 text-xs w-20"
                                value={threshold}
                                onChange={e => setThreshold(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div className='w-full col-span-2'>
                    <div className='flex gap-2'>
                        {/* Risk Analysis */}
                        <div className="w-full bg-white shadow-sm rounded-md p-3">
                            <h3 className="text-gray-700 text-xs font-bold mb-1">RISK ANALYSIS</h3>
                            <p className="text-gray-800 text-sm font-bold">Current Risk Level: {riskLevel}</p>
                            <button onClick={simulateMarketDip} className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded">
                                Simulate 5% Market Dip
                            </button>
                        </div>

                        {/* Currency Selection */}
                        <div className="w-full bg-white shadow-sm rounded-md p-3">
                            <h3 className="text-gray-700 text-xs font-bold mb-1">CURRENCY SELECTION</h3>
                            <select value={selectedCurrency} onChange={handleCurrencyChange} className="border rounded p-2 text-sm">
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                {/* Add more currencies as needed */}
                            </select>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col md:flex-row gap-2 items-center mt-3">
                        <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-[4px] p-2 flex items-center">
                            <span className="mr-1">📄</span> Generate Report
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-[4px] p-2 flex items-center">
                            <span className="mr-1">➕</span> Add Record
                        </button>
                        <button className="bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-[4px] p-2 flex items-center">
                            <span className="mr-1">💡</span> Optimize Expenses
                        </button>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="md:col-span-4 bg-white shadow-sm rounded-md p-3">
                    <h3 className="text-gray-700 text-xs font-bold mb-1 border-b-[1px] border-b-gray-200 p-2 bg-gray-200 rounded">RECENT TRANSACTIONS</h3>
                    <div className="flex justify-between items-center mb-2">
                        <select
                            className="border rounded px-2 py-1 text-xs"
                            value={filterType}
                            onChange={e => setFilterType(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                        <select
                            className="border rounded px-2 py-1 text-xs"
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                        >
                            <option value="date">Sort by Date</option>
                            <option value="amount">Sort by Amount</option>
                        </select>
                    </div>
                    <div className="bg-white shadow rounded-md overflow-hidden mt-2">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm border border-gray-300 overflow-hidden">
                                <thead className="bg-gray-50">
                                    <tr className="text-xs font-semibold">
                                        <th className="px-2 py-1 text-left text-gray-600 uppercase border-r border-gray-300 first:rounded-tl-lg">Type</th>
                                        <th className="px-2 py-1 text-left text-gray-600 uppercase border-r border-gray-300">Amount</th>
                                        <th className="px-2 py-1 text-left text-gray-600 uppercase border-r border-gray-300">Payment Method</th>
                                        <th className="px-2 py-1 text-left text-gray-600 uppercase border-r border-gray-300">Date</th>
                                        <th className="px-2 py-1 text-left text-gray-600 uppercase border-r border-gray-300">Description</th>
                                        <th className="px-2 py-1 text-left text-gray-600 uppercase first:rounded-tr-lg">Category</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-xs">
                                    {filteredTransactions.map((transaction, index, arr) => (
                                        <tr key={index} className={`${index % 2 === 1 ? "bg-gray-100" : ""} ${index === arr.length - 1 ? "last:rounded-b-lg" : ""}`}>
                                            <td className="px-2 py-1 border-r border-gray-300">{transaction.type}</td>
                                            <td className="px-2 py-1 border-r border-gray-300">{transaction.amount}</td>
                                            <td className="px-2 py-1 border-r border-gray-300">{transaction.paymentMethod}</td>
                                            <td className="px-2 py-1 border-r border-gray-300">{transaction.date}</td>
                                            <td className="px-2 py-1 border-r border-gray-300">{transaction.description}</td>
                                            <td className="px-2 py-1">{transaction.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}