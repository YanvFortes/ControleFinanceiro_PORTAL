import { api } from "./axios";
import type { TransacaoDTO } from "../types/transacao";
import type { CriarTransacaoDTO } from "../types/transacao";

export async function listarTransacoes(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const response = await api.get("/Transacoes/Get", {
    params: { page, pageSize, search },
  });

  return response.data;
}

export async function obterTransacao(id: string) {
  const response = await api.get(`/Transacoes/GetById/${id}`);
  return response.data as TransacaoDTO;
}

export async function cadastrarTransacao(data: CriarTransacaoDTO) {
  const response = await api.post("/Transacoes/Cadastrar", data);
  return response.data;
}

export async function editarTransacao(id: string, data: CriarTransacaoDTO) {
  const response = await api.put(`/Transacoes/Atualizar/${id}`, data);
  return response.data;
}

export async function deletarTransacao(id: string) {
  const response = await api.delete(`/Transacoes/Deletar/${id}`);
  return response.data;
}
