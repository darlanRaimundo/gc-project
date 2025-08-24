'use client';

import React from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Game, useGames } from '@/app/hooks/useGames';

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

const mockUsers = [
  {
    id: '1',
    name: 'Bruno Silva',
    availability: 'Hoje às 20:00',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Gosto de partidas rápidas e ranqueadas.',
  },
  {
    id: '2',
    name: 'Ana Pereira',
    availability: 'Amanhã às 19:30',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Prefiro jogar casual com voz.',
  },
  {
    id: '3',
    name: 'Lucas Andrade',
    availability: 'Hoje às 22:00',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Competitivo, posso treinar estratégias.',
  },
  {
    id: '4',
    name: 'Mariana Costa',
    availability: 'Sábado à tarde',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Novo no jogo, aprendendo aos poucos.',
  },
];

export default function GamePage({ params }: Props) {
  const { getGameById } = useGames();
  const [idResolved, setIdResolved] = React.useState<string | null>(null);
  const [gameFromHook, setGameFromHook] = React.useState<Game | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      // use Promise.resolve to safely handle both Promise and plain object without `any`
      const p = await Promise.resolve(
        params as unknown as { id: string } | Promise<{ id: string }>,
      );
      if (!mounted) return;
      setIdResolved(p.id);

      const _game = await getGameById(Number(p.id));

      setGameFromHook(_game as Game | null);
    })();
    return () => {
      mounted = false;
    };
  }, [params, getGameById]);

  if (!idResolved) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-900">
        <Header showLogout />
        <main className="flex-1 max-w-5xl mx-auto w-full p-6">
          <div className="rounded-lg overflow-hidden shadow-lg bg-neutral-900 border border-neutral-800 p-8 text-center text-white">
            <p className="text-neutral-400">Carregando...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!gameFromHook) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-900">
        <Header showLogout />
        <main className="flex-1 max-w-5xl mx-auto w-full p-6">
          <div className="rounded-lg overflow-hidden shadow-lg bg-neutral-900 border border-neutral-800 p-8 text-center text-white">
            <p className="text-neutral-400">Jogo não encontrado.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Header showLogout />

      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        <section className="rounded-lg overflow-hidden shadow-lg bg-neutral-900 border border-neutral-800">
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src={gameFromHook.header_image || 'https://placehold.co/1200x800'}
              alt={gameFromHook.nome}
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <h1 className="text-white text-2xl sm:text-3xl font-semibold">{gameFromHook.nome}</h1>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium mb-4 text-white">
              Jogadores que selecionaram este jogo
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 bg-neutral-800 rounded-md border border-neutral-700"
                >
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={64}
                      height={64}
                      unoptimized
                      className="rounded-full object-cover ring-2 ring-purple-700"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-yellow-300">{user.availability}</p>
                      </div>
                      <button
                        className="text-sm bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded-md shadow hover:opacity-95"
                        onClick={() => window.alert(`Entrando em contato com ${user.name} (mock)`)}
                      >
                        Contato
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-neutral-300">{user.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-neutral-400">
              Esta lista é mockada por enquanto. Integrarei com a API de usuários em seguida.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
