// components/Navbar.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import AuthDropdown from './AuthDropdown'; // Import the AuthDropdown component
import { useState, useEffect } from 'react';
import { Product } from '@/types';
const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [favoritesCount, setFavoritesCount] = useState(0); // State to manage the number of favorites

  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    setFavorites(favorites);
    setFavoritesCount(favorites.length);
  }, []);


  return (
    <header className="w-full bg-white shadow-md">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />
          <p className="nav-logo">
            Afford<span className='text-primary'>Co</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            <div key={icon.alt} className="relative">
              <Image 
                src={icon.src}
                alt={icon.alt}
                width={28}
                height={28}
                className="object-contain cursor-pointer"
                onClick={icon.alt === 'user' ? toggleDropdown : undefined} // Toggle dropdown on user icon click
              />
              {icon.alt === 'heart' && favoritesCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {favoritesCount}
                </span>
              )}
            </div>
          ))}
        </div>
      </nav>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
          <h3 className="p-2 font-semibold">Account</h3>
          <Link href="/login">
            <div className="dropdown-item w-full text-left p-2 hover:bg-gray-200">
              Login
            </div>
          </Link>
          <Link href="/signup">
            <div className="dropdown-item w-full text-left p-2 hover:bg-gray-200">
              Signup
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;