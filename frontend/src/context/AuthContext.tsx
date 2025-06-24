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

// Função melhorada para ler cookies com fallback
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  try {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, ...rest] = cookie.trim().split('=');
      if (cookieName === name) return decodeURIComponent(rest.join('='));
    }
    return null;
  } catch (error) {
    console.error("Erro ao ler cookies:", error);
    return null;
  }
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUserLoggedIn = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/me/`, {
        credentials: "include",
      });

      console.log("Check session response:", response.status, response.statusText);
      
      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
        setUser(userData);
      } else {
        console.warn("Session check failed");
        setUser(null);
      }
    } catch (error) {
      console.error("Session check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Initializing auth provider...");
    checkUserLoggedIn();
      console.log("API URL configurada:", apiUrl);
      console.log("URL do Check Session:", `${apiUrl}me/`);
      console.log("URL do CSRF Token:", `${apiUrl}auth/get-csrf-token/`);
      console.log("URL do Login:", `${apiUrl}login/`);
  }, [checkUserLoggedIn]);

  // Função para obter CSRF Token com depuração detalhada
  const fetchCsrfToken = useCallback(async (): Promise<string> => {
    console.group("Fetching CSRF Token");
    
    try {
      // 1. Tentar pegar token existente
      let token = getCookie('csrftoken');
      console.log("Existing token from cookie:", token);
      
      if (token) {
        console.groupEnd();
        return token;
      }

      const tokenUrl = `${apiUrl}/auth/get-csrf-token/`;
      console.log("Fetching new token from:", tokenUrl);
      
      const tokenResponse = await fetch(tokenUrl, {
        method: "GET",
        credentials: "include",
      });

      console.log("Token response status:", tokenResponse.status);
      
      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("Token request failed:", errorText);
        throw new Error(`Falha na requisição: ${tokenResponse.status} - ${tokenResponse.statusText}`);
      }

      // 3. Tentar novamente pegar o token do cookie
      token = getCookie('csrftoken');
      console.log("Token after request (from cookie):", token);
      
      // 4. Fallback: tentar extrair do corpo da resposta
      if (!token) {
        try {
          const data = await tokenResponse.json();
          token = data.csrfToken;
          console.log("Token from response body:", token);
        } catch (jsonError) {
          console.error("JSON parse error:", jsonError);
        }
      }

      if (!token) {
        // Inspecionar cabeçalhos da resposta
        console.log("Response headers:");
        tokenResponse.headers.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        
        throw new Error("Token CSRF não encontrado após requisição");
      }

      console.groupEnd();
      return token;
    } catch (error) {
      console.error("Erro completo ao obter CSRF token:", error);
      console.groupEnd();
      throw new Error("Não foi possível obter o token CSRF: " + error.message);
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.group("Login Attempt");
    try {
      console.log("Step 1: Getting CSRF token");
      const csrftoken = await fetchCsrfToken();
      console.log("CSRF Token:", csrftoken);

      console.log("Step 2: Sending login request");
      const response = await fetch(`${apiUrl}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      console.log("Login response status:", response.status);
      
      if (!response.ok) {
        // Clone a resposta para ler múltiplas vezes
        const errorClone = response.clone();
        
        try {
          const errorData = await errorClone.json();
          const errorMessage = errorData.error || errorData.detail || "Credenciais inválidas ou erro desconhecido: ";
          throw new Error(errorMessage); // Exibe apenas a mensagem do erro
        } catch {
          const errorText = await response.text();
          throw new Error("Credenciais inválidas ");
        }
      }

      console.log("Step 3: Checking user session");
      await checkUserLoggedIn();
      
      console.log("Step 4: Redirecting to account page");
      router.push('/conta');
    } catch (error) {
      console.error("Login process error:", error);
      throw error;
    } finally {
      console.groupEnd();
    }
  };

  const logout = async () => {
    try {
      const csrftoken = await fetchCsrfToken();
      await fetch(`${apiUrl}/logout/`, {
        method: "POST",
        credentials: "include",
        headers: { "X-CSRFToken": csrftoken },
      });
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
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};