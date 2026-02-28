import { api } from "./axios";
import type { CategoriaDTO , CategoriaCreateDTO } from "../types/categoria";

export async function listarCategorias(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const response = await api.get("/Categorias/Get", {
    params: { page, pageSize, search },
  });

  return response.data;
}

export async function obterCategoria(id: string) {
  const response = await api.get(`/Categorias/GetById/${id}`);
  return response.data as CategoriaDTO;
}

export async function cadastrarCategoria(dto: CategoriaCreateDTO) {
  const response = await api.post("/Categorias/Cadastrar", dto);
  return response.data;
}

export async function editarCategoria(id: string, dto: CategoriaCreateDTO) {
  const response = await api.put(`/Categorias/Editar/${id}`, dto);
  return response.data;
}

export async function deletarCategoria(id: string) {
  const response = await api.delete(`/Categorias/Deletar/${id}`);
  return response.data;
}