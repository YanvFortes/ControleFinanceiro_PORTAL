import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "../core/auth/AuthContext";
import { ThemeProvider } from "../core/theme/ThemeContext";
import MuiThemeWrapper from "../core/theme/MuiThemeProvider";

/**
 * Componente raiz da aplicação.
 * 
 * Centraliza os providers globais:
 * - Tema
 * - Integração com MUI
 * - Autenticação
 * - Sistema de rotas
 *
 * Garante que todo o app tenha acesso ao contexto de tema e autenticação.
 */
function App() {
  return (
    <ThemeProvider>
      <MuiThemeWrapper>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MuiThemeWrapper>
    </ThemeProvider>
  );
}

export default App;