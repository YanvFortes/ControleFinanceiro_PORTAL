import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usuarioSchema } from "./usuario.schema";
import type { UsuarioFormData } from "./usuario.schema";
import { toastSuccess, toastError } from "../../core/utils/toast";
import {
  cadastrarUsuario,
  editarUsuario,
} from "../../core/api/usuario.service";
import { listarTiposUsuario } from "../../core/api/role.service";
import type { TipoUsuarioDTO } from "../../core/types/tipo-usuario";

interface Props {
  usuario?: any;
  onSuccess: () => void;
}

export default function UsuarioForm({ usuario, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [tipos, setTipos] = useState<TipoUsuarioDTO[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nome: usuario?.nome ?? "",
      email: usuario?.email ?? "",
      senha: "",
      tipoUsuario: usuario
        ? tipos.find(t => t.id === usuario.tipoUsuarioId)?.name ?? ""
        : "",
    },
  });

  useEffect(() => {
    async function carregarTipos() {
      try {
        const result = await listarTiposUsuario(1, 100);

        if (Array.isArray(result)) {
          setTipos(result);
        } else if (result?.items && Array.isArray(result.items)) {
          setTipos(result.items);
        } else {
          setTipos([]);
        }
      } catch {
        setTipos([]);
      }
    }

    carregarTipos();
  }, []);

  async function onSubmit(data: UsuarioFormData) {
    try {
      setLoading(true);

      const tipoUsuarioId =
        data.tipoUsuario.toLowerCase() === "administrador"
          ? 1
          : 2;

      const payload = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        tipoUsuarioId,
      };

      if (usuario) {
        const { senha, ...dadosAtualizacao } = payload;
        await editarUsuario(usuario.id, dadosAtualizacao);
        toastSuccess("Usuário atualizado com sucesso!");
      } else {
        await cadastrarUsuario(payload);
        toastSuccess("Usuário criado com sucesso!");
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      toastError("Erro ao salvar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Nome */}
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

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          {...register("email")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
        focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message?.toString()}
          </p>
        )}
      </div>

      {/* Senha */}
      {!usuario && (
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Senha
          </label>
          <input
            type="password"
            {...register("senha")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
          focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          {errors.senha && (
            <p className="text-red-500 text-sm mt-1">
              {errors.senha.message?.toString()}
            </p>
          )}
        </div>
      )}

      {/* Tipo */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Tipo de Usuário
        </label>
        <select
          {...register("tipoUsuario")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
        focus:ring-2 focus:ring-blue-500 outline-none transition"
        >
          <option value="">Selecione...</option>

          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.name}>
              {tipo.name}
            </option>
          ))}
        </select>

        {errors.tipoUsuario && (
          <p className="text-red-500 text-sm mt-1">
            {errors.tipoUsuario.message?.toString()}
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