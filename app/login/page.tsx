// app/login/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex w-4/5 h-4/5 rounded-lg overflow-hidden shadow-lg">
        <div className="flex-1 relative">
          <Image
            alt="A beautiful desert landscape with a gradient sky"
            height={800}
            src="https://storage.googleapis.com/a1aa/image/OaDjwIhzzILfVSPYMcvUBM7FJ36ZiLgkRMgyBexey2lf8B8PB.jpg"
            width={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col justify-center p-10">
          <form id="login_form" onSubmit={handleSubmit}>
            <h2 className="text-2xl text-white mb-2">Welcome Back!</h2>
            <p className="text-gray-400 mb-4">Enter your email and password</p>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-300">Email address</label>
              <input
                type="email"
                name="email"
                id="user_mail_id"
                placeholder="Enter Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <Link href="#" className="text-purple-400 text-sm mb-4 block">Forgot Password?</Link>
            <button type="submit" className="w-full p-3 bg-black text-white rounded hover:bg-gray-800 transition">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;