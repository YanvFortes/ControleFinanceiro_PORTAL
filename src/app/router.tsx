import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/login";
import DashboardPage from "../pages/dashboard";
import MainLayout from "../components/layout/MainLayout";
import { PrivateRoute } from "../core/auth/PrivateRoute";
import UsuariosPage from "../pages/usuarios/Index";
import TransacoesPage from "../pages/transacoes/Index";
import PessoasPage from "../pages/pessoas/Index";
import CategoriasPage from "../pages/categorias/Index";

/**
 * Configuração central de rotas.
 *
 * - /login é público
 * - / é protegido
 * - Rotas internas usam MainLayout
 * - Algumas rotas exigem role específica
 */
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/inicio", element: <DashboardPage /> },
      {
        path: "usuarios",
        element: (
          <PrivateRoute roles={["administrador"]}>
            <UsuariosPage />
          </PrivateRoute>
        ),
      },
      { path: "transacoes", element: <TransacoesPage /> },
      { path: "pessoas", element: <PessoasPage /> },
      { path: "categorias", element: <CategoriasPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);