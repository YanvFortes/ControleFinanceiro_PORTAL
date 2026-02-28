export interface RetornoDTO<T> {
  sucesso: boolean;
  mensagem: string;
  dados: T;
}