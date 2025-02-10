"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="heading1">Hello there. Introducing <span className='text-blue-800'>Thynance </span>Dashboard!</h1>
      <h2 className='heading2'><span className='text-blue-800'>Thynance</span> - Think Finance...</h2>
      <div className='flex items-center gap-3 mt-2'>
        <Link href="/signin" target='_blank' className='btn'>Sign In</Link>
        <Link href="/signup" target='_blank' className='btn'>Sign Up</Link>
      </div>
    </>
  );
}