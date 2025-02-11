import type { Metadata } from "next";
import { Arima } from "next/font/google";
import '../globals.css';

const arima = Arima({
  variable: "--font-arima",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Customer and Invoice Dashboard",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${arima.variable} antialiased` }
      >
        {children}
      </body>
    </html>
  );
}
