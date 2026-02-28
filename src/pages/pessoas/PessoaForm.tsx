import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaSchema } from "./pessoa.schema";
import type { PessoaFormData } from "./pessoa.schema";
import { toastSuccess, toastError } from "../../core/utils/toast";
import {
  cadastrarPessoa,
  editarPessoa,
} from "../../core/api/pessoa.service";

interface Props {
  pessoa?: any;
  onSuccess: () => void;
}

export default function PessoaForm({ pessoa, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PessoaFormData>({
    resolver: zodResolver(pessoaSchema) as any,
    defaultValues: {
      nome: pessoa?.nome ?? "",
      idade: pessoa?.idade ?? 0,
    },
  });

  async function onSubmit(data: PessoaFormData) {
    try {
      setLoading(true);

      if (pessoa) {
        await editarPessoa(pessoa.id, data);
        toastSuccess("Pessoa atualizada com sucesso!");
      } else {
        await cadastrarPessoa(data);
        toastSuccess("Pessoa criada com sucesso!");
      }

      onSuccess();
    } catch {
      toastError("Erro ao salvar pessoa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Nome
        </label>
        <input
          {...register("nome")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
          focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        {errors.nome && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nome.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Idade
        </label>
        <input
          type="number"
          {...register("idade")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
          focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        {errors.idade && (
          <p className="text-red-500 text-sm mt-1">
            {errors.idade.message?.toString()}
          </p>
        )}
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