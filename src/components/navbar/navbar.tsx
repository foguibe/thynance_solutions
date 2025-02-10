"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <div className="w-[230px] h-full bg-gray-100 rounded-md p-3 flex flex-col justify-between relative">
            <div className="w-full">
                <div className="bg-blue-950 h-[200px] w-full rounded-md p-2 relative">
                    <div className="absolute bottom-0 left-0 flex items-center space-x-2 p-2">
                        <Image src="/icons/globe.svg" width={30} height={30} alt="Globe icon" />
                        <h2 className="text-[28px] font-extrabold text-white">Thynance</h2>
                    </div>
                </div>
                <div className="w-full mt-5 flex flex-col space-y-3">
                    <Link href="/dashboard/home" className={`navlink ${pathname === "/dashboard/home" ? "navlink-active" : ""}`}>
                        <Image src="/icons/dashboard.svg" width={20} height={20} alt="Dashboard icon" />
                        <span className="navlink_text">Dashboard</span>
                    </Link>
                    <Link href="/dashboard/records" className={`navlink ${pathname === "/dashboard/records" ? "navlink-active" : ""}`}>
                        <Image src="/icons/invoices.svg" width={20} height={20} alt="Invoices icon" />
                        <span className="navlink_text">Financial records</span>
                    </Link>
                    <Link href="/dashboard/customers" className={`navlink ${pathname === "/dashboard/customers" ? "navlink-active" : ""}`}>
                        <Image src="/icons/customers.svg" width={20} height={20} alt="Customers icon" />
                        <span className="navlink_text">Customers</span>
                    </Link>
                    <Link href="/dashboard/insights" className={`navlink ${pathname === "/dashboard/insights" ? "navlink-active" : ""}`}>
                        <Image src="/icons/chart.svg" width={20} height={20} alt="Chart icon" />
                        <span className="navlink_text">Performance Insights</span>
                    </Link>
                </div>
            </div>
            <div className="w-full bg-white px-2 py-3 rounded-md flex items-center space-x-3 hover:shadow-sm cursor-pointer active:shadow-none">
                <Image src="/icons/logout.svg" width={20} height={20} alt="Logout icon" />
                <button className="font-extrabold text-[18px]">Sign Out</button>
            </div>
        </div>
    )
}