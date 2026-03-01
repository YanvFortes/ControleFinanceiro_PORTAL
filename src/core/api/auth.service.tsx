import { api } from "./axios";

export interface LoginRequest {
  usuario: string;
  senha: string;
}

export interface LoginResponse {
  mensagem: string;
  conteudo: string; // JWT
}

/**
 * Realiza autenticação do usuário.
 * Retorna token JWT para controle de sessão.
 */
export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>(
    "/Autenticacao/Login",
    data
  );

  return response.data;
}