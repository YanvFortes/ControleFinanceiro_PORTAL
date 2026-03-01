import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider responsável pelo controle global de autenticação.
 *
 * - Persiste token no localStorage
 * - Decodifica JWT para extrair dados do usuário
 * - Controla estado de loading inicial
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Sempre que o token muda:
   * - Decodifica o JWT
   * - Extrai id, email e role
   * - Reseta sessão se token inválido
   */
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      setUser({
        id:
          decoded.sub ??
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ] ??
          "",
        email:
          decoded.email ??
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ] ??
          "",
        role:
          decoded.role ??
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] ??
          "",
      });
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Armazena token e dispara reprocessamento do usuário
  function login(token: string) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  // Limpa sessão local
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook customizado para acesso seguro ao contexto de autenticação.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside AuthProvider");
  return context;
}