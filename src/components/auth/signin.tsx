"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        // Redirect if already signed in
        if (session?.user) {
            router.push('/dashboard/home');
        }
    }, [session, router]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null); // Clear any previous errors

        const result = await signIn('credentials', {
            redirect: false, // Do not redirect on successful sign-in
            email: email,
            password: password,
            callbackUrl: '/dashboard/home', // Specify the page to redirect to after successful sign-in
        });

        if (result?.error) {
            console.log("There is an error!");
            console.error("Sign-in error:", result.error);
            setError("Invalid credentials. Please check your email and password.");
        } else {
            // Sign-in was successful
            console.log("Sign-in successful!");
            // No need to redirect here, it's handled by the callbackUrl
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-md flex overflow-hidden">
                {/* Left Section */}
                <div className="w-1/2 bg-gray-300 flex items-center justify-center relative overflow-hidden">
                    <Image src="/images/bg6.jpg" fill style={{ objectFit: 'cover', objectPosition: 'center' }} alt="Sign In" />
                </div>

                {/* Right Section */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <Image src="/icons/glob.svg" alt="icon" width={30} height={30} className="block m-auto mb-2"></Image>
                    <h1 className="text-xl font-bold text-gray-800 text-center mb-2">Welcome to <span className="text-blue-700">Thynance</span></h1>
                    <p className="text-xs text-gray-500 text-center mb-6">Sign in to manage your finances with AI-powered insights.</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-[13px] text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSignIn}>
                        <div>
                            <label className="text-xs text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        <button type="submit" className="w-full bg-gray-700 text-white p-2 rounded text-sm font-bold hover:bg-gray-800">
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