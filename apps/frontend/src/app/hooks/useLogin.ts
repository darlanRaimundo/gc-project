import { useState } from 'react';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, senha: string): Promise<{ token?: string }> {
    setLoading(true);
    setError(null);
    console.log('process.env.NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        return { token: data.token };
      } else {
        setError(data.error || 'Credenciais inválidas');
        return {};
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      return {};
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
