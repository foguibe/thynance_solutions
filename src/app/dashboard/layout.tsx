import type { Metadata } from "next";
import { Arima } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import AuthProvider from "@/components/AuthProvider"; // Import the AuthProvider

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
      <body className={`${arima.variable} antialiased h-full m-6 bg-gray-200`}>
        <AuthProvider>
          <div className="h-full">
            <Navbar />
            <div className="p-5 ml-[260px]">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
