import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface Props {
  children: ReactNode;
  roles?: string[];
}

/**
 * Componente de proteção de rota.
 *
 * - Bloqueia acesso sem autenticação
 * - Permite controle opcional por role
 * - Aguarda carregamento inicial do contexto
 */
export function PrivateRoute({ children, roles }: Props) {
  const { token, user, loading } = useAuth();

  // Aguarda validação inicial do token
  if (loading) {
    return null;
  }

  // Não autenticado
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Sem permissão por role
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}