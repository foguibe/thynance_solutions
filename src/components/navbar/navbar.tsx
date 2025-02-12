"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <div className="w-[230px] h-[780px] bg-white shadow-lg rounded-r-2xl p-3 flex flex-col justify-between fixed">
            <div>
                {/* Logo and Branding */}
                <div className="bg-blue-50 rounded-2xl p-2 mb-4">
                    <div className="flex items-center space-x-2">
                        <Image src="/icons/glob.svg" width={28} height={28} alt="Globe icon" />
                        <h2 className="text-md font-semibold text-blue-900">Thynance</h2>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">AI Financial Assistant</p>
                </div>

                {/* Navigation Links */}
                <nav className="mt-2">
                    <ul className="space-y-1">
                        <li>
                            <Link href="/dashboard/home" className={`navlink ${pathname === "/dashboard/home" ? "navlink-active" : ""}`}>
                                <Image src="/icons/dashboard.svg" width={18} height={18} alt="Dashboard icon" />
                                <span className="navlink_text text-sm">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/records" className={`navlink ${pathname === "/dashboard/records" ? "navlink-active" : ""}`}>
                                <Image src="/icons/invoices.svg" width={18} height={18} alt="Invoices icon" />
                                <span className="navlink_text text-sm">Financial Records</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/customers" className={`navlink ${pathname === "/dashboard/customers" ? "navlink-active" : ""}`}>
                                <Image src="/icons/customers.svg" width={18} height={18} alt="Customers icon" />
                                <span className="navlink_text text-sm">Customers</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/insights" className={`navlink ${pathname === "/dashboard/insights" ? "navlink-active" : ""}`}>
                                <Image src="/icons/chart.svg" width={18} height={18} alt="Chart icon" />
                                <span className="navlink_text text-sm">Performance Insights</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Chat with Tina */}
            <div className="bg-blue-50 rounded-2xl p-2 mb-3 hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                <div className="flex items-center space-x-2">
                    <Image src="/icons/bot.svg" width={20} height={20} alt="Chat icon" />
                    <h3 className="text-sm font-medium text-blue-900">Chat with Tina</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">Get instant AI-powered financial advice.</p>
            </div>

            {/* Sign Out */}
            <div className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-2xl flex items-center space-x-2 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <Image src="/icons/logout.svg" width={18} height={18} alt="Logout icon" />
                <button className="font-semibold text-xs">Sign Out</button>
            </div>
        </div>
    );
}