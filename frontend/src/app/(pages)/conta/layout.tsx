import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { apiUrl } from '@/constants';
import type { User } from '@/types';

async function getAuthenticatedUser(): Promise<User | null> {
  try {
    // A CORREÇÃO ESTÁ AQUI: Adicionamos 'await'
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

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/login');
  }

  return <>{children}</>;
}