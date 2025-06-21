"use client"; // Obrigatório para interatividade (useState, onClick, etc.)

import React, { useState } from 'react';
import Link from 'next/link';

// Definimos um tipo para o perfil do usuário para maior clareza
type UserType = 'student' | 'teacher';

export default function SignupPage() {
  // Estados para cada campo do formulário
  const [userType, setUserType] = useState<UserType>('student'); // 'student' como padrão
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Em uma aplicação real, aqui você enviaria os dados para uma API
    console.log("Dados do cadastro:", { name, email, password, userType });
    alert("Cadastro realizado com sucesso! (Simulação)");
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-sky-50">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Crie sua Conta
          </h2>
          <p className="mt-2 text-center text-sm text-sky-600">
            É rápido e fácil. Vamos começar!
          </p>
        </div>

        {/* Seletor de Perfil: Aluno ou Professor */}
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-sky-100 p-1">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              userType === 'student' ? 'bg-sky-600 text-white shadow' : 'text-sky-700 hover:bg-sky-200'
            }`}
          >
            Sou Aluno
          </button>
          <button
            type="button"
            onClick={() => setUserType('teacher')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              userType === 'teacher' ? 'bg-sky-600 text-white shadow' : 'text-sky-700 hover:bg-sky-200'
            }`}
          >
            Sou Professor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nome Completo */}
          <div>
            <label htmlFor="name" className="sr-only">Nome Completo</label>
            <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border-gray-300 bg-gay-50 p-3 text-black focus:border-sky-500 focus:ring-sky-500" placeholder="Nome Completo"/>
          </div>
          
          {/* Campo E-mail Institucional */}
          <div>
            <label htmlFor="email-address" className="sr-only">E-mail Institucional</label>
            <input id="email-address" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-black focus:border-sky-500 focus:ring-sky-500" placeholder="E-mail Institucional"/>
          </div>
          
          {/* Campo Senha */}
          <div>
            <label htmlFor="password"className="sr-only">Senha</label>
            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-black focus:border-sky-500 focus:ring-sky-500" placeholder="Senha"/>
          </div>

          {/* Campo Confirme sua Senha */}
          <div>
            <label htmlFor="confirm-password"className="sr-only">Confirme sua Senha</label>
            <input id="confirm-password" name="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-black focus:border-sky-500 focus:ring-sky-500" placeholder="Confirme sua Senha"/>
          </div>
          
          <div>
            <button type="submit" className="w-full rounded-lg bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
              Cadastrar
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta?
          <Link href="/login" className="font-medium text-sky-600 hover:text-sky-500 ml-1">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}