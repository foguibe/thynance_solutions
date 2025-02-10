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

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full overflow-x-hidden">
      <body
        className={`${arima.variable} antialiased w-full h-full flex m-6 gap-5` }
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
