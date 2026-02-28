import { api } from "./axios";
import type { UsuarioDTO, CriarUsuarioDTO, AtualizarUsuarioDTO } from "../types/usuario";

export async function listarUsuarios(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const response = await api.get("/Usuarios/Get", {
    params: { page, pageSize, search },
  });

  return response.data;
}

export async function obterUsuario(id: string) {
  const response = await api.get(`/Usuarios/GetById/${id}`);
  return response.data as UsuarioDTO;
}

export async function cadastrarUsuario(dto: CriarUsuarioDTO) {
  const response = await api.post("/Usuarios/Cadastrar", dto);
  return response.data;
}

export async function editarUsuario(id: string, dto: AtualizarUsuarioDTO) {
  const response = await api.put(`/Usuarios/Editar/${id}`, dto);
  return response.data;
}

export async function deletarUsuario(id: string) {
  const response = await api.delete(`/Usuarios/Deletar/${id}`);
  return response.data;
}