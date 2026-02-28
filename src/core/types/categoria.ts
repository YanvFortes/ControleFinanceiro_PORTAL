export const FinalidadeCategoriaEnum = {
  Despesa: 0,
  Receita: 1,
  Ambas: 2
} as const;

export type FinalidadeCategoriaEnum =
  (typeof FinalidadeCategoriaEnum)[keyof typeof FinalidadeCategoriaEnum];

export interface CategoriaDTO {
  id: string;
  descricao: string;
  finalidade: FinalidadeCategoriaEnum;
  usuarioId: string;
  dataCriacao: string;
  dataEdicao?: string;
}

export interface CategoriaCreateDTO {
  descricao: string;
  finalidade: number;
}