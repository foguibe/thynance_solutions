"use client";

import Link from 'next/link';

export default function HomeComponent() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h1 className="heading1 text-4xl font-bold mb-4">Hello there. Introducing <span className='text-blue-800'>Thynance</span> Dashboard!</h1>
          <h2 className='heading2 text-2xl mb-6'><span className='text-blue-800'>Thynance</span> - Think Finance...</h2>
          <div className='flex justify-center items-center gap-3 mt-2'>
            <Link href="/signin" target='_blank' className='btn bg-blue-600 text-white px-4 py-2 rounded'>Sign In</Link>
            <Link href="/signup" target='_blank' className='btn bg-blue-600 text-white px-4 py-2 rounded'>Sign Up</Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about bg-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-gray-600 mb-6">Thynance is a comprehensive financial management solution designed to help businesses streamline their financial operations and make informed decisions. Our dashboard provides real-time insights and powerful tools to manage your finances effectively.</p>
          <div className="mx-auto rounded-lg shadow-lg bg-gray-100 h-64"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>
              <p className="text-gray-600">Get a real-time snapshot of your financial health with key insights.</p>
              <div className="mt-4 rounded-lg shadow-lg bg-gray-100 h-48"></div>
            </div>
            <div className="feature bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Transaction Management</h3>
              <p className="text-gray-600">Store, manage, and track all your financial transactions in one place.</p>
              <div className="mt-4 rounded-lg shadow-lg bg-gray-100 h-48"></div>
            </div>
            <div className="feature bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Customer Management</h3>
              <p className="text-gray-600">Track financial interactions with customers and manage payments efficiently.</p>
              <div className="mt-4 rounded-lg shadow-lg bg-gray-100 h-48"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="step bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Step One</h3>
              <p className="text-gray-600">Sign up and connect your financial accounts to get started.</p>
              <div className="mt-4 rounded-lg shadow-lg bg-gray-100 h-48"></div>
            </div>
            <div className="step bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Step Two</h3>
              <p className="text-gray-600">Monitor your financial health with real-time insights and alerts.</p>
              <div className="mt-4 rounded-lg shadow-lg bg-gray-100 h-48"></div>
            </div>
            <div className="step bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Step Three</h3>
              <p className="text-gray-600">Optimize your finances with AI-driven recommendations and reports.</p>
              <div className="mt-4 rounded-lg shadow-lg bg-gray-100 h-48"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="testimonial bg-gray-100 p-6 shadow rounded-lg">
              <p className="text-gray-600 mb-4">"Thynance has transformed our financial management. Highly recommended!"</p>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-500">CEO, Company</p>
            </div>
            <div className="testimonial bg-gray-100 p-6 shadow rounded-lg">
              <p className="text-gray-600 mb-4">"The best financial dashboard we've ever used. It's a game-changer."</p>
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-500">CFO, Another Company</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="text-gray-600 mb-6">Have questions or need assistance? Reach out to our support team.</p>
          <Link href="/contact" className="btn bg-blue-600 text-white px-4 py-2 rounded">Contact Us</Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer bg-blue-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Thynance. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}