import CategoriaForm from "./CategoriaForm";
import type { CategoriaDTO } from "../../core/types/categoria";

/**
 * Modal responsável por encapsular o formulário de Categoria.
 *
 * - Reutilizado para nova categoria e edição
 * - Fecha automaticamente após sucesso
 */

interface Props {
  categoria: CategoriaDTO | null;
  onClose: () => void;
}

export default function CategoriaModal({ categoria, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 transition-colors">

        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {categoria ? "Editar" : "Nova"} Categoria
        </h2>

        <CategoriaForm
          categoria={categoria ?? undefined}
          onSuccess={onClose}
        />

        <button
          onClick={onClose}
          className="mt-6 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}