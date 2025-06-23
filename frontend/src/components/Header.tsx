"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="material-icons text-sky-600 text-3xl mr-2">school</span>
          <h1 className="text-2xl font-bold text-sky-700">UniComp</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/disciplinas" className="text-gray-600 hover:text-sky-600 transition-colors duration-300 flex items-center">
            <span className="material-icons mr-1">auto_stories</span>
            Matérias
          </Link>
          
          {/* A LÓGICA ATUALIZADA FICA AQUI */}
          {isLoggedIn ? (
            // Se ESTIVER logado, mostra o ícone da conta e o botão de sair
            <div className="flex items-center gap-4">
              <Link href="/conta" title="Minha Conta" className="flex items-center text-gray-600 hover:text-sky-600">
                <span className="material-icons text-4xl">account_circle</span>
              </Link>
              <button 
                onClick={handleLogout} 
                title="Sair"
                className="flex items-center text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors"
              >
                <span className="material-icons mr-1">logout</span>
                Sair
              </button>
            </div>
          ) : (
            // Se NÃO ESTIVER logado, mostra o botão de Login
            <Link href="/login" className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 flex items-center">
              <span className="material-icons mr-2">login</span>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;