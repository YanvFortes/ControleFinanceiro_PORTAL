export interface DashboardResumoDTO {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface DashboardGastoDiaDTO {
  data: string;
  valor: number;
}

export interface DashboardGastoPessoaDTO {
  nome: string;
  valor: number;
}

export interface DashboardTotalItemDTO {
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface DashboardTotaisResponseDTO {
  itens: DashboardTotalItemDTO[];
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}