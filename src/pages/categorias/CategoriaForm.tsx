import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoriaSchema } from "./categoria.schema";
import type { CategoriaFormData } from "./categoria.schema";
import { toastSuccess, toastError } from "../../core/utils/toast";
import {
  cadastrarCategoria,
  editarCategoria,
} from "../../core/api/categoria.service";

/**
 * Formulário de criação/edição de Categoria.
 *
 * - Integra react-hook-form + zod
 * - Reutilizado para create e update
 * - Dispara callback onSuccess após persistência
 */

interface Props {
  categoria?: any;
  onSuccess: () => void;
}

export default function CategoriaForm({ categoria, onSuccess }: Props) {
    // Estado de controle de submissão
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema) as any,
    defaultValues: {
      descricao: categoria?.descricao ?? "",
      finalidade: categoria?.finalidade ?? 1,
    },
  });

   /**
   * Submissão do formulário.
   * Decide automaticamente entre cadastrar ou editar.
   */
  async function onSubmit(data: CategoriaFormData) {
    try {
      setLoading(true);

      if (categoria) {
        await editarCategoria(categoria.id, data);
        toastSuccess("Categoria atualizada com sucesso!");
      } else {
        await cadastrarCategoria(data);
        toastSuccess("Categoria criada com sucesso!");
      }

      onSuccess();
    } catch {
      toastError("Erro ao salvar categoria");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 forced-margin-top">

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Descrição
        </label>
        <input
          {...register("descricao")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700 text-gray-800 dark:text-white
          focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        {errors.descricao && (
          <p className="text-red-500 text-sm mt-1">
            {errors.descricao.message?.toString()}
          </p>
        )}
      </div>

      {/* Finalidade */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Finalidade
        </label>
        <select
          {...register("finalidade")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700 text-gray-800 dark:text-white
          focus:ring-2 focus:ring-blue-500 outline-none transition"
        >
          <option value={0}>Despesa</option>
          <option value={1}>Receita</option>
          <option value={2}>Ambas</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700
        text-white py-2.5 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}