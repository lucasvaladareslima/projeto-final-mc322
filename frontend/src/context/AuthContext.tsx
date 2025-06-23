"use client";

import {
  createContext,
  useState,
  useContext,
  // useEffect,
  // useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { User, AuthContextType, AuthProviderProps } from "@/types"; // Ajuste o caminho se necessário
import { apiUrl } from "@/constants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //  const hasSessionCookie = (name: string) => {
  //   if (typeof window === "undefined") return false;
  //   return document.cookie
  //     .split(";")
  //     .some((c) => c.trim().startsWith(`${name}=`));
  // };

  // // 2. checkUserLoggedIn apenas define isAuthenticated
  // const checkUserLoggedIn = useCallback(() => {
  //   const isAuth = hasSessionCookie("sessionid"); // ou o nome do seu cookie
  //   setUser(isAuth ? {/* opcional: leia info mínima do localStorage ou deixe null*/} : null);
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   checkUserLoggedIn();
  // }, [checkUserLoggedIn]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Falha ao fazer login.");
      }

      const user: User = await response.json();
      setUser(user); // Aqui você pode definir mais dados do usuário se necessário

      // O backend deve definir os cookies HttpOnly na resposta do login.
      // Após o login bem-sucedido, buscamos os dados do usuário.
      // await checkUserLoggedIn();
      router.push("/conta");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${apiUrl}/logout/`, { method: "POST" });
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
