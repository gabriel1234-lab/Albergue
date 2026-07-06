'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      router.push('/');
    } else {
      alert('Senha incorreta!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Painel Administrativo</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Usuário</label>
            <input type="text" defaultValue="admin" disabled className="w-full border-gray-300 rounded-lg p-3 border bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 border"
              placeholder="Digite sua senha"
            />
          </div>
          <button type="submit" className="w-full bg-hostel-blue text-white py-3 rounded-lg font-bold">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
