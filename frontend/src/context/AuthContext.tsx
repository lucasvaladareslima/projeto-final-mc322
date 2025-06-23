"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User, AuthContextType } from "@/types";
import { apiUrl } from "@/constants";

// Função para ler o cookie CSRF
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função que verifica a sessão chamando o endpoint CORRETO
  const checkUserLoggedIn = useCallback(async () => {
    try {
      // ✅ A CHAMADA AGORA É PARA /me/
      const response = await fetch(`${apiUrl}/me/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        setUser(await response.json());
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn]);

  const login = async (email: string, password: string) => {
    const csrftoken = getCookie('csrftoken');
    if (!csrftoken) throw new Error("Token CSRF não encontrado.");

    const response = await fetch(`${apiUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.error || "Falha no login.");
    }
    
    // Após o login, buscamos novamente os dados do usuário para garantir o estado mais recente
    await checkUserLoggedIn();

    const userData: User = await response.json();
    
    router.push('/conta');
    
  };
  
  // A função de logout também precisa do token CSRF
  const logout = async () => {
    try {
      const csrftoken = getCookie('csrftoken');
      await fetch(`${apiUrl}/logout/`, {
        method: "POST",
        credentials: "include",
        headers: { "X-CSRFToken": csrftoken || "" },
      });
    } catch (err) {
      console.error("Erro na API de logout:", err);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  const contextValue: AuthContextType = { user, isAuthenticated: !!user, loading, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};