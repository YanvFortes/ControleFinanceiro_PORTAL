import { api } from "./axios";
import type { TipoUsuarioDTO } from "../types/tipo-usuario";

export async function listarTiposUsuario(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const response = await api.get("/Roles/Get", {
    params: { page, pageSize, search },
  });

  return response.data;
}

export async function obterTipoUsuario(id: string) {
  const response = await api.get(`/Roles/GetById/${id}`);
  return response.data as TipoUsuarioDTO;
}

export async function cadastrarTipoUsuario(dto: TipoUsuarioDTO) {
  const response = await api.post("/Roles/Cadastrar", dto);
  return response.data;
}

export async function editarTipoUsuario(id: string, dto: TipoUsuarioDTO) {
  const response = await api.put(`/Roles/Editar/${id}`, dto);
  return response.data;
}

export async function deletarTipoUsuario(id: string) {
  const response = await api.delete(`/Roles/Deletar/${id}`);
  return response.data;
}