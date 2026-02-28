import { api } from "./axios";
import type {
  DashboardResumoDTO,
  DashboardGastoDiaDTO,
  DashboardGastoPessoaDTO,
  DashboardTotaisResponseDTO
} from "../types/dashboard";

export async function obterResumo(dias = 7) {
  const response = await api.get("/Dashboard/Resumo", {
    params: { dias },
  });

  return response.data as DashboardResumoDTO;
}

export async function obterGastosPorDia(dias = 7) {
  const response = await api.get("/Dashboard/GastosPorDia", {
    params: { dias },
  });

  return response.data as DashboardGastoDiaDTO[];
}

export async function obterGastosPorPessoa(dias = 7) {
  const response = await api.get("/Dashboard/GastosPorPessoa", {
    params: { dias },
  });

  return response.data as DashboardGastoPessoaDTO[];
}

export async function obterTotaisPorPessoa(dias = 30) {
  const response = await api.get("/Dashboard/TotaisPorPessoa", {
    params: { dias },
  });

  return response.data as DashboardTotaisResponseDTO;
}

export async function obterTotaisPorCategoria(dias = 30) {
  const response = await api.get("/Dashboard/TotaisPorCategoria", {
    params: { dias },
  });

  return response.data as DashboardTotaisResponseDTO;
}