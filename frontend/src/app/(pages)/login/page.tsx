"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// Todo o código está aqui. Note o "export default" diretamente na função.
// Não precisamos importar um componente de outro lugar.

function AuthTestButtons() {
  "use client"; // Este pequeno componente também precisa ser de cliente

  const simulateLogin = () => {
    // Salva um token falso no navegador e recarrega a página para o Header atualizar
    localStorage.setItem("user_token", "12345fake_token");
    window.location.reload();
  };

  const simulateLogout = () => {
    // Remove o token falso e recarrega a página
    localStorage.removeItem("user_token");
    window.location.reload();
  };

  return (
    <div className="my-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
      <h3 className="font-bold">Área de Teste de Autenticação</h3>
      <p className="text-sm mb-4">
        Use estes botões para simular o login e logout.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={simulateLogin}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Simular Login
        </button>
        <button
          onClick={simulateLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Simular Logout
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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
        <form className="mt-8 space-y-6" onSubmit={(e) => handleLogin(e)}>
          <input
            name="remember"
            type="hidden"
            value="true"
            className="border border-black px-4"
          />

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input relative block w-full appearance-none rounded-none rounded-t-md border px-3 py-3 placeholder-[var(--placeholder-color)] text-gray-900 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm"
                placeholder="Endereço de e-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input relative block w-full appearance-none rounded-none rounded-b-md border px-3 py-3 placeholder-[var(--placeholder-color)] text-gray-900 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-[var(--primary-color)] hover:text-opacity-80"
              >
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
          <Link
            href="/signup"
            className="font-medium hover:text-opacity-80 ml-1"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}
