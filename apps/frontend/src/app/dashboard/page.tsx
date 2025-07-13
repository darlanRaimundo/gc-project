'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const cards = [
  { title: 'Jogo 1', description: 'Descrição do Jogo 1', image: 'https://placehold.co/100x100' },
  { title: 'Jogo 2', description: 'Descrição do Jogo 2', image: 'https://placehold.co/100x100' },
  { title: 'Jogo 3', description: 'Descrição do Jogo 3', image: 'https://placehold.co/100x100' },
];

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700">Dashboard</h2>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-blue-50 rounded-lg shadow p-4 flex flex-col items-center">
              <img
                src={card.image}
                alt={card.title}
                className="mb-4 rounded-full w-20 h-20 object-cover"
              />
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-center">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
