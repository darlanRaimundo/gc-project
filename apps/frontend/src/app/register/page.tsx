'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });
      if (res.ok) {
        setSuccess('Cadastro realizado com sucesso!');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        const data = await res.json();
        setError(data.message || 'Erro ao cadastrar usuário');
      }
    } catch {
      setError('Erro de conexão com o servidor');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-dark)]">
      <main className="dashboard-shell items-center justify-center p-10">
        <aside className="dashboard-rail w-full max-w-lg mx-auto rounded-2xl shadow-2xl bg-[rgba(0,0,0,0.35)]">
          <div className="rail-cta p-8 text-center">
            <h2>Central Gamer</h2>
            <p className="mt-3 text-sm text-gray-300">
              Crie sua conta e comece a jogar com parceiros agora mesmo.
            </p>
          </div>

          <div className="rail-login p-8">
            <h2 className="text-xl font-semibold text-center text-purple-400 mb-4">Cadastro</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300">
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-full bg-transparent border border-white/10 text-white placeholder:text-yellow-200"
                  placeholder="Digite seu nome"
                  autoComplete="name"
                />
              </div>
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
                  autoComplete="new-password"
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-green-500 text-sm">{success}</div>}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-full hover:opacity-95 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-400 text-center">
              Já tem conta?{' '}
              <a href="/login" className="text-purple-300 hover:underline">
                Faça login
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RegisterPage;
