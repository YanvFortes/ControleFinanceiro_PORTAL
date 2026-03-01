import { z } from "zod";

/**
 * Schema de validação para criação/edição de Pessoa.
 *
 * - nome: mínimo de 3 caracteres
 * - idade: número inteiro e positivo
 */
export const pessoaSchema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres"),
  idade: z.coerce
    .number()
    .int("Idade deve ser inteira")
    .positive("Idade deve ser maior que 0"),
});

export type PessoaFormData = z.infer<typeof pessoaSchema>;