// components/AuthDropdown.tsx
import React from 'react';
import Link from 'next/link';

const AuthDropdown: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
      <Link href="/login">
        <button className="dropdown-item w-full text-left p-2 hover:bg-gray-200">Login</button>
      </Link>
      <Link href="/signup">
        <button className="dropdown-item w-full text-left p-2 hover:bg-gray-200">Signup</button>
      </Link>
    </div>
  );
};

export default AuthDropdown;