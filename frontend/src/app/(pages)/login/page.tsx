
"use client"; // Obrigatório para um componente interativo com estado

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Usando o seu hook de autenticação

export default function LoginPage() {
  // --- Estados para os campos do formulário e feedback de UI ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Lógica de Autenticação vinda do Contexto ---
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores a cada nova tentativa
    setIsLoading(true);

    try {
      // 1. A MÁGICA ACONTECE AQUI: Chamamos a função 'login' do nosso contexto.
      // Toda a lógica de fetch, salvar token e redirecionar está encapsulada lá dentro.
      await login(email, password);

    } catch (err: any) {
      // 2. TRATAMENTO DE ERRO: Se a função 'login' no contexto lançar um erro, nós o capturamos aqui.
      console.error("Erro ao fazer login:", err);
      setError(err.message || "Ocorreu um erro inesperado."); // Atualizamos o estado de erro para exibir na UI
    } finally {
      setIsLoading(false); // Garante que o estado de loading termine, mesmo se der erro
    }
  };

  return (
    <main className="flex bg-sky-50 flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-xl border border-gray-200">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Bem-vindo de volta
          </h2>
          <p className="mt-2 text-center text-sm text-sky-600">
            Por favor, entre na sua conta
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Campo de E-mail */}
            <input
              id="email-address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm disabled:bg-gray-200"
              placeholder="Endereço de e-mail"
            />
            {/* Campo de Senha */}
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm disabled:bg-gray-200"
              placeholder="Senha"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          {/* 3. EXIBIÇÃO DA MENSAGEM DE ERRO NA TELA */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?
          <Link href="/signup" className="font-medium text-sky-600 hover:text-sky-500 ml-1">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}