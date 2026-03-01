import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../core/api/auth.service";
import { useAuth } from "../../core/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../core/utils/toast";
import { useDocumentTitle } from "../../core/hooks/useDocumentTitle";

interface LoginFormData {
  usuario: string;
  senha: string;
}

/**
 * Página de autenticação.
 *
 * - Realiza login via API
 * - Armazena JWT no AuthContext
 * - Redireciona para a rota raiz após sucesso
 */
export default function LoginPage() {
  useDocumentTitle("Login");
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /**
   * Submissão do formulário de login.
   * Em caso de sucesso, armazena token e redireciona.
   */
  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true);

      const response = await login(data);

      // Armazena JWT no contexto global
      authLogin(response.conteudo);

      // Redireciona para dashboard
      navigate("/");
    } catch {
      toastError("Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border border-blue-100">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">CF</span>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800">
            Controle Financeiro
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Entre para acessar sua conta
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Usuário */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Usuário
            </label>
            <input
              {...register("usuario")}
              placeholder="Digite seu usuário"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
              outline-none transition"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Senha
            </label>
            <input
              type="password"
              {...register("senha")}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
              outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white 
            font-medium py-2.5 rounded-lg transition duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-400">
          © {new Date().getFullYear()} Controle Financeiro
        </div>
      </div>
    </div>
  );
}