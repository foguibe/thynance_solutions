"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


interface SessionUser {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    role: string; // Role is now required
}

export default function Navbar() {
    const pathname = usePathname();
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, `User: ${newMessage}`]);
            // Simulate AI response
            setTimeout(() => {
                const aiResponse = generateAIResponse(newMessage);
                setMessages(prevMessages => [...prevMessages, `Tina: ${aiResponse}`]);
            }, 500); // Simulate a delay for AI processing
            setNewMessage("");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    const generateAIResponse = (userMessage: string): string => {
        // Basic keyword-based responses
        userMessage = userMessage.toLowerCase();

        if (userMessage.includes("analysis") || userMessage.includes("financial record")) {
            return "I am still under development and you will be alerted as soon as I am able to provide detailed information regarding the analysis of your financial records.";
        } else if (userMessage.includes("risk level")) {
            return "A 'Low' risk level typically indicates stable financial metrics. It suggests that your business operations are predictable.";
        } else if (userMessage.includes("revenue") && userMessage.includes("expenses")) {
            return "Analyzing revenue and expenses is crucial for understanding profitability and identifying areas for improvement.";
        } else if (userMessage.includes("financial advice")) {
            return "I can provide insights based on your data, but always consult with a qualified financial advisor for personalized advice.";
        } else if (userMessage.includes("what is your name")) {
            return "My name is Tina, your AI Financial Assistant.";
        }
        else {
            return "I'm still learning, can you please be more specific?";
        }
    };

    const handleSignOut = async () => {
        await signOut({ redirect: false }); // Prevents automatic NextAuth redirection
        router.push("/signin"); // Redirect manually after sign-out
    };

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

                {/* User Info */}
                {session?.user && (
                    <div className="mb-4">
                        <p className="text-xs text-gray-700">Hello, {session.user.name}</p>
                        <p className="text-xs text-gray-500">Role: {(session.user as SessionUser).role}</p>
                    </div>
                )}

                {/* Navigation Links */}
                <nav className="mt-2">
                    <ul className="space-y-1">
                        <li>
                            <Link href="/dashboard/home" className={`navlink ${pathname === "/dashboard/home" ? "navlink-active" : ""}`}>
                                <Image src="/icons/dashboard.svg" width={18} height={18} alt="Dashboard icon" />
                                <span className="navlink_text text-xs">DASHBOARD</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/records" className={`navlink ${pathname === "/dashboard/records" ? "navlink-active" : ""}`}>
                                <Image src="/icons/invoices.svg" width={18} height={18} alt="Invoices icon" />
                                <span className="navlink_text text-xs">FINANCIAL RECORDS</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/customers" className={`navlink ${pathname === "/dashboard/customers" ? "navlink-active" : ""}`}>
                                <Image src="/icons/customers.svg" width={18} height={18} alt="Customers icon" />
                                <span className="navlink_text text-xs">CUSTOMERS</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/insights" className={`navlink ${pathname === "/dashboard/insights" ? "navlink-active" : ""}`}>
                                <Image src="/icons/chart.svg" width={18} height={18} alt="Chart icon" />
                                <span className="navlink_text text-xs">PERFORMACE INSIGHTS</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Chat with Tina */}
            <div
                className="bg-blue-50 rounded-2xl p-2 mb-3 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                onClick={toggleChatbot}
            >
                <div className="flex items-center space-x-2">
                    <Image src="/icons/bot.svg" width={20} height={20} alt="Chat icon" />
                    <h3 className="text-[13px] font-semibold text-blue-900">Chat with Tina</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">Get instant AI-powered financial advice.</p>
            </div>

            {/* Chatbot Window */}
            {isChatbotOpen && (
                <div className="bg-blue-50 rounded-2xl p-3 mb-3">
                    {/* Chatbot Header with Close Button */}
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-semibold text-blue-900">Chat with Tina</h4>
                        <button
                            className="text-gray-600 hover:text-gray-800 focus:outline-none"
                            onClick={toggleChatbot}
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="h-32 overflow-y-auto mb-2">
                        {messages.map((message, index) => (
                            <p key={index} className="text-xs text-gray-700">{message}</p>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="border rounded-md px-2 py-1 text-xs w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={handleInputChange}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded px-3 py-1 ml-2 transition-colors duration-200"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* Sign Out */}
            <div className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-2xl flex items-center space-x-2 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={handleSignOut}
            >
                <Image src="/icons/logout.svg" width={18} height={18} alt="Logout icon" />
                <button className="font-semibold text-xs">Sign Out</button>
            </div>
        </div>
    );
}