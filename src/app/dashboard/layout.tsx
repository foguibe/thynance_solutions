import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Arima } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arima = Arima({
  variable: "--font-arima",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Customer and Invoice Dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full">
      <body className={`${arima.variable} antialiased h-full m-6`}>
        <div className="h-full">
          <Navbar />
          <div className="p-5 ml-[230px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

