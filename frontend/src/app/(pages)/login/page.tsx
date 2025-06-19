import React from 'react';
import Link from 'next/link';

// Todo o código está aqui. Note o "export default" diretamente na função.
// Não precisamos importar um componente de outro lugar.

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-[var(--accent-color)] p-8 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--text-color)]">
            Bem-vindo de volta
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--primary-color)]">
            Por favor, entre na sua conta
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <input name="remember" type="hidden" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input relative block w-full appearance-none rounded-none rounded-t-md border px-3 py-3 placeholder-[var(--placeholder-color)] text-gray-900 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm"
                placeholder="Endereço de e-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-input relative block w-full appearance-none rounded-none rounded-b-md border px-3 py-3 placeholder-[var(--placeholder-color)] text-gray-900 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-[var(--primary-color)] hover:text-opacity-80">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn-primary group relative flex w-full justify-center rounded-md border border-transparent py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2"
            >
              Entrar
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--primary-color)]">
          Não tem uma conta?
          <Link href="/signup" className="font-medium hover:text-opacity-80 ml-1">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}