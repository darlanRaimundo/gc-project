'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useGames } from '../hooks/useGames';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 12;
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('');

  // Listagem paginada e filtrada
  const { games, total, loading, error } = useGames(page, limit, '', categoria);

  // Pesquisa por nome (sem paginação)
  const {
    games: searchGames,
    loading: loadingSearch,
    error: errorSearch,
  } = useGames(1, 999, search, '');

  // Extrai categorias únicas dos jogos carregados
  const categoriasUnicas = Array.from(new Set(games.flatMap((game) => game.categoria || [])));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/');
      }
    }
  }, [router]);

  const totalPages = Math.ceil(total / limit);

  // Decide qual lista mostrar
  const showSearch = search.trim().length > 0;
  const listaJogos = showSearch ? searchGames : games;
  const isLoading = showSearch ? loadingSearch : loading;
  const isError = showSearch ? errorSearch : error;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-200">
      <Header showLogout />
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded w-full md:w-1/2"
            />
            <select
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded w-full md:w-1/2"
              disabled={showSearch}
            >
              <option value="">Todas categorias</option>
              {categoriasUnicas.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {isLoading && <div className="text-center text-gray-500 mb-4">Carregando jogos...</div>}
          {isError && <div className="text-center text-red-500 mb-4">{isError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(listaJogos.length > 0 ? listaJogos : []).map((game, idx) => (
              <div
                key={game.id || idx}
                className="bg-blue-50 rounded-lg shadow p-4 flex flex-col items-center"
              >
                <img
                  src={game.header_image || 'https://placehold.co/100x100'}
                  alt={game.nome}
                  width={80}
                  height={80}
                  className="mb-4 rounded-full w-20 h-20 object-cover"
                />
                <h3 className="text-lg font-semibold text-blue-700 mb-2">{game.nome}</h3>
                <p className="text-gray-600 text-center">
                  {game.categoria?.join(', ') || 'Sem categoria'}
                </p>
              </div>
            ))}
          </div>
          {!showSearch && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                className="px-3 py-1 bg-purple-600 text-white rounded disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </button>
              <span className="mx-2 text-purple-700 font-semibold">
                Página {page} de {totalPages}
              </span>
              <button
                className="px-3 py-1 bg-purple-600 text-white rounded disabled:opacity-50"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
