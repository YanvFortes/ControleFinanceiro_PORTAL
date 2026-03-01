import { z } from "zod";

/**
 * Schema de validação para Usuário.
 *
 * - nome: mínimo de 3 caracteres
 * - email: formato válido
 * - senha: opcional (obrigatória apenas em criação)
 * - tipoUsuario: obrigatório
 */
export const usuarioSchema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Mínimo 6 caracteres").optional(),
  tipoUsuario: z.string().min(1, "Selecione um tipo de usuário"),
});

export type UsuarioFormData = z.infer<typeof usuarioSchema>;