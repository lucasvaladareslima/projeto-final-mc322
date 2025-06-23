import { cookies } from 'next/headers';
import { apiUrl } from '@/constants';
import type { User } from '@/types';

export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    // A CORREÇÃO ESTÁ AQUI: Adicionamos 'await' e guardamos em uma variável.
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('sessionid');

    // Se não houver cookie, não há sessão.
    if (!sessionCookie) {
      return null;
    }

    // Se houver cookie, verificamos a validade dele com a API.
    const response = await fetch(`${apiUrl}/me/`, {
      headers: { 'Cookie': `sessionid=${sessionCookie.value}` },
      cache: 'no-store', // Sempre verificar o usuário para ter dados atualizados
    });

    if (response.ok) {
      return await response.json();
    }
    
    return null;

  } catch (error) {
    console.error("Erro ao tentar obter usuário autenticado:", error);
    return null;
  }
}