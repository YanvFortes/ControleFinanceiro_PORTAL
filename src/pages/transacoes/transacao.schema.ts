import { z } from "zod";

/**
 * Schema de validação para Transação.
 *
 * - descricao: mínimo de 3 caracteres
 * - valor: número positivo
 * - categoriaId e pessoaId: UUID válidos
 * - dataCriacao: obrigatória
 */
export const transacaoSchema = z.object({
  descricao: z.string().min(3, "Mínimo 3 caracteres"),
  valor: z.coerce.number().positive("Valor deve ser maior que 0"),
  categoriaId: z.uuid("Categoria inválida"),
  pessoaId: z.uuid("Pessoa inválida"),
  dataCriacao: z.string().min(1, "Data obrigatória"),
});

export type TransacaoFormData = z.infer<typeof transacaoSchema>;