'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, senha);
    if (result.token) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-dark)]">
      <main className="dashboard-shell items-start justify-start p-10">
        <aside className="dashboard-rail w-full max-w-xl ml-20 mt-20 rounded-2xl shadow-2xl bg-[rgba(0,0,0,0.35)]">
          <div className="rail-cta p-8 text-center">
            <h2>Central Gamer</h2>
            <p className="mt-3 text-sm text-gray-300">
              Encontre parceiros, descubra novos jogos e mantenha seu perfil em destaque.
            </p>
          </div>

          <div className="rail-login p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-full bg-transparent border border-white/10 text-white placeholder:text-yellow-200"
                  placeholder="Digite seu email"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-300">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-full bg-transparent border border-white/10 text-white placeholder:text-yellow-200"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-full hover:opacity-95 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-400 text-center">
              Ainda não tem conta?{' '}
              <a href="/register" className="text-purple-300 hover:underline">
                Cadastre-se
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default LoginPage;
