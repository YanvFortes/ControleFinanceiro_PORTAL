import { z } from "zod";

/**
 * Schema de validação da Categoria.
 *
 * - descricao: mínimo 3 caracteres
 * - finalidade: aceita apenas 0 (Despesa), 1 (Receita) ou 2 (Ambas)
 */
export const categoriaSchema = z.object({
  descricao: z.string().min(3, "Mínimo 3 caracteres"),
  finalidade: z.coerce.number().refine(
    (val) => val === 0 || val === 1 || val === 2,
    "Finalidade inválida"
  ),
});

export type CategoriaFormData = z.infer<typeof categoriaSchema>;