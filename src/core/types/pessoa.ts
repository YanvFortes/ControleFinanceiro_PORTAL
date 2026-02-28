export interface PessoaDTO {
  id: string;
  nome: string;
  idade: number;
  usuarioId: string;
  dataCriacao: string;
  dataEdicao?: string;
}

export interface CriarPessoaDTO {
  nome: string;
  idade: number;
}