"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignUpComponent() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-md flex overflow-hidden">
                {/* Left Section */}
                <div className="w-1/2 bg-gray-300 flex items-center justify-center relative overflow-hidden">
                    <Image src="/images/bg6.jpg" fill style={{ objectFit: 'cover', objectPosition: 'center' }} alt="Sign Up" />
                </div>

                {/* Right Section */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <Image src="/icons/glob.svg" alt="icon" width={30} height={30} className="block m-auto mb-2" />
                    <h1 className="text-lg font-bold text-gray-800 text-center mb-2">Create Your <span className="text-blue-700">Thynance</span> Account</h1>
                    <p className="text-xs text-gray-500 text-center mb-6">Sign up to gain access to AI-powered financial insights.</p>

                    <form className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-700">Full Name</label>
                            <input type="text" className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-700">Email</label>
                            <input type="email" className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 text-gray-500 text-xs"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        <button className="w-full bg-gray-700 text-white p-2 rounded text-sm font-bold hover:bg-gray-800">
                            Sign Up
                        </button>
                    </form>
                    <div className="mt-4 text-center text-xs">
                        <p>Already have an account? <Link href="/signin" className="text-blue-600 hover:underline">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}