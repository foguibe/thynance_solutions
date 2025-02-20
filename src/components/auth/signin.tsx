"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignInComponent() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden">
                {/* Left Section */}
                <div className="w-1/2 bg-gray-300 flex items-center justify-center relative overflow-hidden">
                    <Image src="/images/bg6.jpg" fill style={{objectFit: 'cover', objectPosition: 'center'}} alt="Sign In" />
                </div>
                
                {/* Right Section */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <Image src="/icons/glob.svg" alt="icon" width={30} height={30} className="block m-auto mb-2"></Image>
                    <h1 className="text-xl font-bold text-gray-800 text-center mb-2">Welcome to <span className="text-blue-700">Thynance</span></h1>
                    <p className="text-xs text-gray-500 text-center mb-6">Sign in to manage your finances with AI-powered insights.</p>
                    
                    <form className="space-y-4">
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
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-1" />
                                <label className="text-gray-700">Remember me</label>
                            </div>
                            <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
                        </div>
                        <button className="w-full bg-blue-900 text-white p-2 rounded text-sm font-bold hover:bg-blue-900">
                            Sign In
                        </button>
                    </form>
                    <div className="mt-4 text-center text-xs">
                        <p>Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
