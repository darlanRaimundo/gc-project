import { useEffect, useState } from 'react';

export interface Category {
  id: number;
  nome: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
          }/categories`,
        );
        const result = await res.json();
        setCategories(result.data);
      } catch (err) {
        setError('Erro ao buscar categorias');
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
}
