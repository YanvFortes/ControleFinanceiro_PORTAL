import { api } from "./axios";
import type { PessoaDTO , CriarPessoaDTO } from "../types/pessoa";

/**
 * Service responsável pelo CRUD de Pessoas.
 */

export async function listarPessoas(page = 1, pageSize = 10, search?: string) {
  const response = await api.get("/Pessoas/Get", {
    params: { page, pageSize, search },
  });

  return response.data;
}

export async function obterPessoa(id: string) {
  const response = await api.get(`/Pessoas/GetById/${id}`);
  return response.data as PessoaDTO;
}

export async function cadastrarPessoa(dto: CriarPessoaDTO) {
  const response = await api.post("/Pessoas/Cadastrar", dto);
  return response.data;
}

export async function editarPessoa(id: string, dto: CriarPessoaDTO) {
  const response = await api.put(`/Pessoas/Editar/${id}`, dto);
  return response.data;
}

export async function deletarPessoa(id: string) {
  const response = await api.delete(`/Pessoas/Deletar/${id}`);
  return response.data;
}