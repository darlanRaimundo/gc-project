'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  showLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showLogout }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/');
  };

  return (
    <header className="w-full bg-purple-700 text-white flex justify-between items-center px-8 py-4 shadow">
      <button
        onClick={() => router.push('/dashboard')}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <h1 className="text-xl font-bold">GC Project</h1>
      </button>
      {showLogout && (
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
