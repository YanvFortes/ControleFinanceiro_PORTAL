export const TipoTransacaoEnum = {
  Despesa: 0,
  Receita: 1,
} as const;

export type TipoTransacaoEnum =
  (typeof TipoTransacaoEnum)[keyof typeof TipoTransacaoEnum];

export interface TransacaoDTO {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacaoEnum;
  categoriaId: string;
  pessoaId: string;
  usuarioId: string;
  dataCriacao: string;
  dataEdicao?: string;
}

export interface CriarTransacaoDTO {
  descricao: string;
  valor: number;
  categoriaId: string;
  pessoaId: string;
  dataCriacao: string;
}