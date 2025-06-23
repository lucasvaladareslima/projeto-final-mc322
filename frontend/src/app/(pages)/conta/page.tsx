// src/app/conta/page.tsx
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';

export default async function AccountRedirectPage() {
  const user = await getAuthenticatedUser();

  // Se, por algum motivo, o usuário chegar aqui sem estar logado,
  // o layout de /conta já o teria redirecionado, mas esta é uma segurança extra.
  if (!user) {
    redirect('/login');
  }

  // Redireciona com base no tipo de usuário
  if (user.type === 'PROFESSOR') {
    redirect('/conta/professor');
  } else {
    redirect('/conta/aluno');
  }
  
  // Esta página nunca renderiza nada, apenas redireciona.
  return null;
}