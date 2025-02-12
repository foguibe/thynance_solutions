"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function HomeComponent() {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  useEffect(() => {
    const typedHeading = new Typed(headingRef.current, {
      strings: ['Welcome to <span class="text-blue-200">Thynance</span> - Think Finance!'],
      typeSpeed: 50,
      backSpeed: 0,
      loop: false,
    });

    const typedSubHeading = new Typed(subHeadingRef.current, {
      strings: ['Empowering your financial decisions with AI-driven insights.'],
      typeSpeed: 30,
      backSpeed: 0,
      startDelay: 500,
      loop: false,
    });

    return () => {
      typedHeading.destroy();
      typedSubHeading.destroy();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero bg-cover bg-center py-24 relative" style={{ backgroundImage: "url('/images/bg2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="heading1 text-4xl font-bold text-white mb-3" ref={headingRef}>
          </h1>
          <h2 className="heading2 text-lg text-gray-200 mb-6" ref={subHeadingRef}>
          </h2>
          <div className="flex justify-center items-center gap-3 mt-3">
            <Link href="/signin" target='_blank' className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-6 rounded transition-colors duration-300 text-[15px]">
              Sign In
            </Link>
            <Link href="/signup" target='_blank' className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-2 px-6 rounded transition-colors duration-300 text-[15px]">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about bg-white py-12 w-full border-b-[1px] border-b-gray-200">
        <div className="container mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full">
            {/* Text Content */}
            <div className="text-center md:text-left w-full">
              <h2 className="text-2xl font-bold mb-3">About Us</h2>
              <p className="text-gray-600 mb-4 text-[15px]">
                Thynance is a comprehensive financial management solution designed to help businesses streamline their financial operations and make informed decisions. Our dashboard provides real-time insights and powerful tools to manage your finances effectively.
              </p>
              <p className="text-gray-600 text-[15px]">
                We empower you to take control of your finances with AI-driven insights and intuitive tools.
              </p>
            </div>

            {/* Image */}
            <div className="mx-auto rounded-lg shadow-md h-56 relative overflow-hidden w-full">
              <Image
                src="/images/abt1.jpg"
                alt="Financial Management"
                fill
                style={{ objectFit: 'cover' }} // Maintain aspect ratio and cover the area
                className="transition-transform duration-500 hover:scale-110" // Add a subtle zoom on hover
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Financial Insights</h3>
              <p className="text-gray-600 text-[15px]">Thynance shows financial insights providing expense optimization, predictive analysis, fraud detection in financial records.</p>
              <div className="mt-3 rounded-md shadow-lg h-40 relative overflow-hidden">
                <Image src="/images/img1.png" alt="Image" fill style={{ objectFit: 'cover', objectPosition: 'center' }} className="transition-transform duration-500 hover:scale-110"></Image>
              </div>
            </div>
            <div className="feature bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Transaction Management</h3>
              <p className="text-gray-600 text-[15px]">Store, manage, and track all your financial transactions in one place.</p>
              <div className="mt-3 rounded-md shadow-lg h-40 relative overflow-hidden">
                <Image src="/images/img2.png" alt="Image" fill style={{ objectFit: 'cover', objectPosition: 'center' }} className="transition-transform duration-500 hover:scale-110"></Image>
              </div>
            </div>
            <div className="feature bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Customer Management</h3>
              <p className="text-gray-600 text-[15px]">Track financial interactions with customers and manage payments efficiently.</p>
              <div className="mt-3 rounded-md shadow-lg h-40 relative overflow-hidden">
                <Image src="/images/img3.png" alt="Image" fill style={{ objectFit: 'cover', objectPosition: 'center' }} className="transition-transform duration-500 hover:scale-110"></Image>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works bg-white py-16 border-t-[1px] border-t-gray-200">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Effortless Financial Management in Three Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step One */}
            <div className="step flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="step-icon bg-blue-100 text-blue-600 rounded-full h-12 w-12 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Your Account</h3>
              <p className="text-gray-600 text-center text-[15px]">Sign up and connect your financial accounts securely to get started.</p>
            </div>

            {/* Step Two */}
            <div className="step flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="step-icon bg-green-100 text-green-600 rounded-full h-12 w-12 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 4.03 4 9 4a9 9 0 009-9c0-2.209-4.03-4-9-4a9 9 0 00-9 9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Manage & Analyze Records</h3>
              <p className="text-gray-600 text-center text-[15px]">Effortlessly manage and analyze your financial records for deeper insights.</p>
            </div>

            {/* Step Three */}
            <div className="step flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="step-icon bg-purple-100 text-purple-600 rounded-full h-12 w-12 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-3m3 3v-6m3 6v-9m3 3h-9a2 2 0 00-2 2v1a2 2 0 002 2h10m-1-14v-1a2 2 0 00-2-2H6a2 2 0 00-2 2v1m2 3h12m-9-5a2 2 0 012-2h2a2 2 0 012 2m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Optimize and Grow</h3>
              <p className="text-gray-600 text-center text-[15px]">Optimize your finances with AI-driven recommendations and detailed reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial One */}
            <div className="testimonial bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold text-[15px]">JD</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-gray-500 text-[15px]">CEO, Company</p>
                </div>
              </div>
              <p className="text-gray-700 text-[15px]">"Thynance has truly transformed our financial management processes. The insights and tools are invaluable, and we highly recommend it!"</p>
            </div>

            {/* Testimonial Two */}
            <div className="testimonial bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-[15px]">JS</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Jane Smith</h3>
                  <p className="text-gray-500 text-[15px]">CFO, Another Company</p>
                </div>
              </div>
              <p className="text-gray-700 text-[15px]">"The best financial dashboard we've ever used. It's a game-changer for our team, providing real-time data and actionable insights."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact bg-gray-100 py-16 border-t-[1px] border-t-gray-200">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="text-gray-600 text-[15px]">We're here to help! Choose your preferred contact method.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chat Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10v8m0 0l4-4m-4 4l4 4m-4-8h4m-4 4H4m16 10v-1a7 7 0 10-2.106-12.584M18 7v3m0 4v3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 text-center mb-3 text-[15px]">Chat with our support team in real-time.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline text-[13px]">
                Start Chat
              </button>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.224 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Send Email</h3>
              <p className="text-gray-600 text-center mb-3 text-[15px]">Send us an email, and we'll get back to you promptly.</p>
              <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline text-[13px]">
                Send Email
              </button>
            </div>

            {/* FAQ Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Read FAQ</h3>
              <p className="text-gray-600 text-center mb-3 text-[15px]">Find answers to common questions in our FAQ section.</p>
              <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline text-[13px]">
                Find answers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer bg-gray-800 text-white py-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-xs mb-3 md:mb-0">&copy; 2025 Thynance. All rights reserved.</p>

            {/* Social Links */}
            <div className="flex space-x-3">
              <Link href="https://twitter.com" className="hover:text-gray-300 transition-colors duration-200" target="_blank">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                  {/* Twitter Icon */}
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.682-1.49 2.028-2.54-..rest of the twitter icon path.."></path>
                </svg>
              </Link>
              <Link href="https://facebook.com" className="hover:text-gray-300 transition-colors duration-200" target="_blank">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                  {/* Facebook Icon */}
                  <path d="M24 12.073c0-6.627-5.373-12-12-12-6.627 0-12 5.373-12 12 0 5.97 4.388 10.952 10.129 11.852v-8.384H5.111v-3.469h3.156V9.783c0-3.069 2.526-5.596 5.596-5.596 1.635 0 3.022.121 3.442.179v3.605h-2.352c-.948 0-1.126.475-1.126 1.546v3.23h3.458l-.563 3.469h-2.895v8.384c5.741-.9 10.129-5.879 10.129-11.852z"></path>
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="hover:text-gray-300 transition-colors duration-200" target="_blank">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                  {/* LinkedIn Icon */}
                  <path d="M19 0h-14c-2.762 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.762-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764 0-.977.79-1.764 1.75-1.764.966 0 1.75.787 1.75 1.764 0 .974-.79 1.764-1.75 1.764zm13.737 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.545c0 0 3.737-4.107 4-3.737v-.808h3v11z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}