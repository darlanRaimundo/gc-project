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
    <header className="w-full app-header flex justify-between items-center px-6 py-3">
      <div className="brand" role="button" onClick={() => router.push('/dashboard')}>
        <div className="logo">GC</div>
        <div>
          <div className="text-sm font-semibold">GC Project</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.85)' }}>Central Gamer</div>
        </div>
      </div>
      {showLogout && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-white/90 hover:text-white/100 px-3 py-2 rounded-md border border-white/10"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 rounded-md hover:bg-red-600 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
