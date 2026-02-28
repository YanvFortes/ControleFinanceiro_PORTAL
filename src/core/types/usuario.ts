export interface UsuarioDTO {
  id: string;
  nome: string;
  tipoUsuarioId: number;
  email: string;
  dataCriacao: string;
  dataEdicao?: string;
  aspNetUserId: string;
}

export interface CriarUsuarioDTO {
  nome: string;
  tipoUsuarioId: number;
  email: string;
  senha?: string;
}

export type AtualizarUsuarioDTO = {
  nome: string;
  tipoUsuarioId: number;
  email: string;
  senha?: string;
};