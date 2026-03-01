import axios from "axios";

/**
 * Instância central do Axios.
 *
 * Define:
 * - Base URL da API
 * - Interceptor para inclusão automática do JWT
 */
export const api = axios.create({
  baseURL: "https://localhost:7171/api",
});

/**
 * Interceptor global de requisição.
 * Injeta o token JWT no header Authorization
 * quando presente no localStorage.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});