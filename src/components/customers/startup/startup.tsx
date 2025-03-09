"use client";
import { useState } from 'react';
import { saveAs } from 'file-saver';
import Papa, { ParseResult } from 'papaparse';
import Image from 'next/image';

interface Customer {
    name: string;
    contactInfo: string;
    associatedTransactions: string;
    totalRevenue?: number;
    averageTransactionSize?: number;
}

const initialCustomersData: Customer[] = [
    { name: "John Doe", contactInfo: "john.doe@example.com", associatedTransactions: "3", totalRevenue: 1500, averageTransactionSize: 500 },
    { name: "Jane Smith", contactInfo: "jane.smith@example.com", associatedTransactions: "5", totalRevenue: 2500, averageTransactionSize: 500 },
    { name: "Alice Johnson", contactInfo: "alice.johnson@example.com", associatedTransactions: "2", totalRevenue: 1000, averageTransactionSize: 500 },
    { name: "Bob Brown", contactInfo: "bob.brown@example.com", associatedTransactions: "7", totalRevenue: 3500, averageTransactionSize: 500 },
    { name: "Charlie Davis", contactInfo: "charlie.davis@example.com", associatedTransactions: "4", totalRevenue: 2000, averageTransactionSize: 500 },
];

export default function StartupCustomersComponent() {
    const [customersData, setCustomersData] = useState<Customer[]>(initialCustomersData);
    const [filter, setFilter] = useState<string>("");
    const [editCustomerIndex, setEditCustomerIndex] = useState<number | null>(null);
    const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
    const [sortColumn, setSortColumn] = useState<keyof Customer | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleClearFilter = () => {
        setFilter("");
    };

    const handleAddCustomer = () => {
        const newCustomer: Customer = { name: "New Customer", contactInfo: "", associatedTransactions: "0" };
        setCustomersData([...customersData, newCustomer]);
    };

    const handleEditCustomer = (index: number) => {
        setEditCustomerIndex(index);
        setEditedCustomer({ ...customersData[index] });
    };

    const handleCancelEdit = () => {
        setEditCustomerIndex(null);
        setEditedCustomer(null);
    };

    const handleSaveEdit = (index: number) => {
        if (editedCustomer) {
            const updatedCustomers = [...customersData];
            updatedCustomers[index] = editedCustomer;
            setCustomersData(updatedCustomers);
            setEditCustomerIndex(null);
            setEditedCustomer(null);
        }
    };

    const handleDeleteCustomer = (index: number) => {
        const updatedCustomers = [...customersData];
        updatedCustomers.splice(index, 1);
        setCustomersData(updatedCustomers);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Customer) => {
        if (editedCustomer) {
            setEditedCustomer({ ...editedCustomer, [field]: e.target.value });
        }
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

    const handleSort = (column: keyof Customer) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedCustomers = [...customersData].sort((a, b) => {
        if (sortColumn) {
            const valueA = a[sortColumn] || '';
            const valueB = b[sortColumn] || '';

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return (valueA - valueB) * (sortOrder === 'asc' ? 1 : -1);
            } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                return valueA.localeCompare(valueB) * (sortOrder === 'asc' ? 1 : -1);
            }
            return 0;
        }
        return 0;
    });

    const filteredCustomers = sortedCustomers.filter(customer =>
        customer.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen p-4 rounded-md">
            <div className='flex items-center gap-2 mb-4 border-b-[1px] border-b-gray-200 bg-gray-300 p-2 rounded'>
                <Image src="/icons/customers.svg" alt="Icon" width={20} height={20}></Image>
                <h2 className="text-sm font-bold text-gray-800">CUSTOMER MANAGEMENT</h2>
            </div>

            {/* Filter Customers */}
            <div className="mt-2 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Filter customers by name..."
                    className="p-2 rounded w-1/3 mb-3 text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div className="flex space-x-2 mb-3">
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
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 text-xs">
                            <tr>
                                <th
                                    className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 first:rounded-tl-lg cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    Name
                                    {sortColumn === 'name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th
                                    className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 cursor-pointer"
                                    onClick={() => handleSort('contactInfo')}
                                >
                                    Contact Info
                                    {sortColumn === 'contactInfo' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th
                                    className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 cursor-pointer"
                                    onClick={() => handleSort('associatedTransactions')}
                                >
                                    Transactions
                                    {sortColumn === 'associatedTransactions' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th
                                    className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 cursor-pointer"
                                    onClick={() => handleSort('totalRevenue')}
                                >
                                    Total Revenue
                                    {sortColumn === 'totalRevenue' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th
                                    className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer first:rounded-tr-lg"
                                    onClick={() => handleSort('averageTransactionSize')}
                                >
                                    Avg. Transaction
                                    {sortColumn === 'averageTransactionSize' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-xs">
                            {filteredCustomers.map((customer, index, arr) => (
                                <tr key={index} className={`${index % 2 === 1 ? "bg-gray-100" : ""} ${index === arr.length - 1 ? "last:rounded-b-lg" : ""} hover:bg-gray-50`}>
                                    {editCustomerIndex === index ? (
                                        <>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">
                                                <input type="text" className="p-1 text-xs rounded border border-gray-300" value={editedCustomer?.name || ""} onChange={(e) => handleInputChange(e, 'name')} />
                                            </td>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">
                                                <input type="text" className="p-1 text-xs rounded border border-gray-300" value={editedCustomer?.contactInfo || ""} onChange={(e) => handleInputChange(e, 'contactInfo')} />
                                            </td>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">
                                                <input type="text" className="p-1 text-xs rounded border border-gray-300" value={editedCustomer?.associatedTransactions || ""} onChange={(e) => handleInputChange(e, 'associatedTransactions')} />
                                            </td>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">
                                                <input type="text" className="p-1 text-xs rounded border border-gray-300" value={editedCustomer?.totalRevenue || ""} onChange={(e) => handleInputChange(e, 'totalRevenue')} />
                                            </td>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">
                                                <input type="text" className="p-1 text-xs rounded border border-gray-300" value={editedCustomer?.averageTransactionSize || ""} onChange={(e) => handleInputChange(e, 'averageTransactionSize')} />
                                            </td>
                                            <td className="px-3 py-1 whitespace-nowrap">
                                                <button className="px-2 py-1 bg-green-600 text-white rounded font-semibold text-xs hover:bg-green-700" onClick={() => handleSaveEdit(index)}>Save</button>
                                                <button className="px-2 py-1 bg-gray-400 text-white rounded font-semibold text-xs hover:bg-gray-500 ml-1" onClick={handleCancelEdit}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.name}</td>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.contactInfo}</td>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">{customer.associatedTransactions}</td>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">${customer.totalRevenue}</td>
                                            <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">${customer.averageTransactionSize}</td>
                                            <td className="px-3 py-1 whitespace-nowrap">
                                                <button className="px-2 py-1 bg-blue-600 text-white rounded font-semibold text-xs hover:bg-blue-700" onClick={() => handleEditCustomer(index)}>Edit</button>
                                                <button className="px-2 py-1 bg-red-600 text-white rounded font-semibold text-xs hover:bg-red-700 ml-1" onClick={() => handleDeleteCustomer(index)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}