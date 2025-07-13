import { useEffect, useState } from 'react';

export interface Game {
  id: number;
  nome: string;
  appid?: number;
  provider?: string;
  categoria?: string[];
  header_image?: string;
}

export function useGames(page = 1, limit = 12, search = '', categoria = '') {
  const [games, setGames] = useState<Game[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search) params.append('search', search);
      if (categoria) params.append('categoria', categoria);

      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
          }/games?${params.toString()}`,
        );
        const result = await res.json();
        setGames(result.data);
        setTotal(result.total);
      } catch (err) {
        setError('Erro ao buscar jogos');
      }
      setLoading(false);
    };
    fetchGames();
  }, [page, limit, search, categoria]);

  return { games, total, loading, error };
}
