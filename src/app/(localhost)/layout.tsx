import React from 'react';
import type { Metadata } from "next";
import { Arima } from "next/font/google";
import "../globals.css";

const arima = Arima({
  variable: "--font-arima",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Customer and Invoice Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full bg-white">
      <body
        className={`${arima.variable} antialiased w-full h-full bg-white` }
      >
        {children}
      </body>
    </html>
  );
}
