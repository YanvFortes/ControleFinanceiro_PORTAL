import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transacaoSchema } from "./transacao.schema";
import type { TransacaoFormData } from "./transacao.schema";
import type { PessoaDTO } from "../../core/types/pessoa";
import type { CategoriaDTO } from "../../core/types/categoria";
import { listarPessoas } from "../../core/api/pessoa.service";
import { listarCategorias } from "../../core/api/categoria.service";
import { toastSuccess, toastError } from "../../core/utils/toast";
import {
  cadastrarTransacao,
  editarTransacao,
} from "../../core/api/transacao.service";

interface Props {
  transacao?: any;
  onSuccess: () => void;
}

export default function TransacaoForm({ transacao, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransacaoFormData>({
    resolver: zodResolver(transacaoSchema) as unknown as Resolver<TransacaoFormData>,
    mode: "onSubmit",
    defaultValues: {
      descricao: transacao?.descricao ?? "",
      valor: transacao?.valor ?? 0,
      categoriaId: transacao?.categoriaId ?? "",
      pessoaId: transacao?.pessoaId ?? "",
      dataCriacao: transacao?.dataCriacao
        ? transacao.dataCriacao.split("T")[0]
        : new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pessoasResult, categoriasResult] = await Promise.all([
          listarPessoas(1, 100),
          listarCategorias(1, 100),
        ]);

        setPessoas(pessoasResult.items);
        setCategorias(categoriasResult.items);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toastError("Erro ao carregar dados");
      }
    }

    carregarDados();
  }, []);

  async function onSubmit(data: TransacaoFormData) {
    try {
      setLoading(true);

      const categoriaSelecionada = categorias.find(
        (c) => c.id === data.categoriaId
      );

      if (!categoriaSelecionada) {
        toastError("Categoria inválida");
        return;
      }

      const payload = {
  ...data,
  tipo: categoriaSelecionada.finalidade,
  dataCriacao: new Date(data.dataCriacao).toISOString(),
};
      if (transacao) {
        await editarTransacao(transacao.id, payload);
        toastSuccess("Transação atualizada com sucesso!");
      } else {
        await cadastrarTransacao(payload);
        toastSuccess("Transação criada com sucesso!");
      }

      onSuccess();
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      toastError("Erro ao salvar transação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Data da Transação */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Data da Transação
        </label>
        <input
          type="date"
          {...register("dataCriacao")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
    focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        {errors.dataCriacao && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dataCriacao.message?.toString()}
          </p>
        )}
      </div>

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

      {/* Valor */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Valor
        </label>
        <input
          type="number"
          step="0.01"
          {...register("valor", { valueAsNumber: true })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
          focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        {errors.valor && (
          <p className="text-red-500 text-sm mt-1">
            {errors.valor.message?.toString()}
          </p>
        )}
      </div>

      {/* Categoria */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Categoria
        </label>
        <select
          {...register("categoriaId")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
          focus:ring-2 focus:ring-blue-500 outline-none transition"
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.descricao}
            </option>
          ))}
        </select>
        {errors.categoriaId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.categoriaId.message?.toString()}
          </p>
        )}
      </div>

      {/* Pessoa */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Pessoa
        </label>
        <select
          {...register("pessoaId")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
          focus:ring-2 focus:ring-blue-500 outline-none transition"
        >
          <option value="">Selecione uma pessoa</option>
          {pessoas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
        {errors.pessoaId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.pessoaId.message?.toString()}
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