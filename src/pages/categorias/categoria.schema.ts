import { z } from "zod";

export const categoriaSchema = z.object({
  descricao: z.string().min(3, "Mínimo 3 caracteres"),
  finalidade: z.coerce.number().refine(
    (val) => val === 0 || val === 1 || val === 2,
    "Finalidade inválida"
  ),
});

export type CategoriaFormData = z.infer<typeof categoriaSchema>;