// app/signup/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up with:', { firstName, lastName, email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex w-5/5 max-w-2xl h-4/5 rounded-lg overflow-hidden shadow-lg">
        <div className="flex-1 relative">
          <Image
            alt="A scenic view of a mountain under a purple sky"
            height={800}
            src="https://storage.googleapis.com/a1aa/image/GWJUgtnXf6WezE3pENKUuvs1CRDQTWKOr8TuS1CF3AeARo9nA.jpg"
            width={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col justify-center p-10">
          <h2 className="text-2xl text-white mb-2">Create an account</h2>
          <p className="text-gray-400 mb-4">Already have an account? <Link href="/login" className="text-purple-400">Log in</Link></p>
          <form action="/user/register" id="signup_form" method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fName"
              id="first_name"
              placeholder="First name"
              required
 value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="text"
              name="lName"
              id="last_name"
              placeholder="Last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="email"
              name="email"
              id="user_email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              name="password"
              id="user_password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-500 transition">Sign up</button>
          </form>
          <div className="my-4 text-center text-gray-400">or</div>
          <div className="flex justify-between">
            <button className="flex-1 p-3 bg-gray-700 text-white rounded mr-2">Sign up with Google</button>
            <button className="flex-1 p-3 bg-gray-700 text-white rounded ml-2">Sign up with Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;