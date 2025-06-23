"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  // --- 1. Nossos estados para controlar a UI ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Estado para a mensagem de erro que será exibida na tela
  const [error, setError] = useState("");
  // Estado para mostrar feedback de carregamento
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Limpa erros antigos a cada nova tentativa
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      // Chama a função de login do nosso AuthContext
      await login(email, password);
      // Se o login for bem-sucedido, o AuthContext cuidará do redirecionamento

    } catch (err: any) {
      // 2. Se a função login() lançar um erro, nós o capturamos aqui
      console.error("Erro ao fazer login:", err);
      setError(err.message || "Ocorreu um erro. Tente novamente mais tarde."); // E o definimos para ser exibido na tela
    } finally {
      setIsLoading(false); // Garante que o estado de loading termine, mesmo se der erro
    }
  };

  return (
    <main className="flex bg-sky-50 flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl border border-gray-200">
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
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                // 3. Estilos diretos do Tailwind para consistência
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm disabled:bg-gray-200"
                placeholder="Endereço de e-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
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
          </div>

          {/* 4. Bloco para exibir a mensagem de erro na tela */}
          {error && (
            <div className="text-sm text-center text-red-700 bg-red-100 border border-red-300 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed"
            >
              {/* 5. Texto do botão muda durante o carregamento */}
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