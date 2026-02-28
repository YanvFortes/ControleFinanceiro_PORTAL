import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface Props {
  children: ReactNode;
  roles?: string[];
}

export function PrivateRoute({ children, roles }: Props) {
  const { token, user, loading } = useAuth();

  if (loading) {
    return null; 
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}