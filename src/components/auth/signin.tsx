"use client";
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

export default function SignInComponent() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <Image src="/icons/glob.svg" width={30} height={30} alt="Globe icon" />
                    <h1 className="heading2 text-2xl font-bold ml-2">
                        Sign In to <span className="text-blue-800">Thynance</span>
                    </h1>
                </div>
                <p className="text-gray-600 mb-6 text-center">
                    Access your account and manage your finances with AI-driven insights.
                </p>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type={showPassword ? "text" : "password"} id="password" name="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-12 right-3 flex items-center text-gray-500">
                            {showPassword ? (
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 0 12 0s10 4.477 10 10a9.96 9.96 0 01-1.875 5.825M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c1.657 0 3.22.423 4.583 1.167M21.542 12C20.268 16.057 16.477 19 12 19c-1.657 0-3.22-.423-4.583-1.167M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 0 12 0s10 4.477 10 10a9.96 9.96 0 01-1.875 5.825M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c1.657 0 3.22.423 4.583 1.167M21.542 12C20.268 16.057 16.477 19 12 19c-1.657 0-3.22-.423-4.583-1.167M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>
                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</Link>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900">Sign In</button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Don't have an account? <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}