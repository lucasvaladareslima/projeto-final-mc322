import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { apiUrl } from '@/constants';
import type { User } from '@/types';

// Esta é a mesma função de verificação que usamos nos outros layouts.
// Em um projeto maior, poderíamos extraí-la para um arquivo em /lib para não repetir.
async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('sessionid');

    if (!sessionCookie) {
      return null;
    }

    const response = await fetch(`${apiUrl}/me/`, {
      headers: { 'Cookie': `sessionid=${sessionCookie.value}` },
      cache: 'no-store',
    });

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error("Layout Auth Check Error:", error);
    return null;
  }
}

export default async function AlunoLayout({ children }: { children: ReactNode }) {
  const user = await getAuthenticatedUser();

  // O layout pai (/conta/layout.tsx) já faria isso, mas é uma boa prática
  // ter uma checagem de segurança em cada camada.
  if (!user) {
    redirect('/login');
  }

  // AQUI ESTÁ A PROTEÇÃO ESPECÍFICA DESTA ÁREA
  // Se o usuário logado não for um aluno...
  if (user.type !== 'ALUNO') {
    // ...redirecionamos para a página inicial ou para o painel do professor, se aplicável.
    // Usar a página inicial é uma opção segura.
    redirect('/'); 
  }

  // Se for um aluno, permite o acesso e renderiza a página filha.
  return <>{children}</>;
}