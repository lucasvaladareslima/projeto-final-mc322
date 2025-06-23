import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { User, AuthContextType, AuthProviderProps } from "@/types"; // Ajuste o caminho se necessário

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função para buscar dados do usuário se um cookie de sessão existir
  const checkUserLoggedIn = async () => {
    try {
      // O cookie HttpOnly é enviado automaticamente pelo navegador
      const response = await fetch(`${API_URL}/users/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Usuário não autenticado");
      }

      const userData: User = await response.json();
      setUser(userData);
    } catch (err) {
      console.error("Erro ao verificar usuário logado:", err);
      setUser(null); // Garante que o usuário seja nulo se a verificação falhar
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Falha ao fazer login.");
      }

      // O backend deve definir os cookies HttpOnly na resposta do login.
      // Após o login bem-sucedido, buscamos os dados do usuário.
      await checkUserLoggedIn();
      router.push("/conta");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout/`, { method: "POST" });
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
