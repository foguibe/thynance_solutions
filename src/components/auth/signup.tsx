"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Line, Bar } from "react-chartjs-2";
import Image from "next/image";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface SignUpForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUpComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpForm>();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const onSubmit = (data: SignUpForm) => {
        console.log("Form Submitted", data);
        // Handle API call for signup here
    };

    const lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Revenue",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
            {
                label: "Expenses",
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const barChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Cash Flow",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 1,
            },
        ],
    };

    const lineChartOptions = {
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                display: false, // Hide X-axis labels
            },
        },
    };

    const barChartOptions = {
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                display: false, // Hide X-axis labels
            },
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
                {/* Left Side */}
                <div className="md:w-1/2 flex flex-col justify-center items-center p-4">
                <div className="flex items-center justify-center mb-4">
                    <Image src="/icons/glob.svg" width={30} height={30} alt="Globe icon" />
                    <h1 className="heading2 text-2xl font-bold ml-2">
                        Sign Up for <span className="text-blue-800">Thynance</span>
                    </h1>
                </div>
                    <p className="text-gray-600 mb-6 text-center">
                        Join us and start managing your finances with AI-driven insights.
                    </p>
                    <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                {...register("name", { required: "Full Name is required" })}
                                type="text"
                                id="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
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
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watch("password") || "Passwords do not match"
                                })}
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-12 right-3 flex items-center text-gray-500">
                                {showConfirmPassword ? (
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
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button type="submit" className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 transition">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    {/* Login & Home Links */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Side (Charts) */}
                <div className="md:w-1/2 flex flex-col justify-center items-center p-4 border-l-[1px] border-l-gray-300">
                    <div className="bg-gray-100 rounded-md w-full h-80 flex flex-col items-center justify-center mb-4 p-4">
                        <h3 className="text-lg font-semibold mb-2">Revenue vs Expenses</h3>
                        <Line data={lineChartData} options={lineChartOptions} />
                        <p className="text-sm text-gray-600 mt-2">This chart shows the revenue and expenses over the past months.</p>
                    </div>
                    <div className="bg-gray-100 rounded-md w-full h-80 flex flex-col items-center justify-center p-4">
                        <h3 className="text-lg font-semibold mb-2">Cash Flow</h3>
                        <Bar data={barChartData} options={barChartOptions} />
                        <p className="text-sm text-gray-600 mt-2">This chart shows the cash flow over the past months.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}