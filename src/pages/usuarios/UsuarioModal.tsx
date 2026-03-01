import UsuarioForm from "./UsuarioForm";
import type { UsuarioDTO } from "../../core/types/usuario";

interface Props {
  usuario: UsuarioDTO | null;
  onClose: () => void;
}

/**
 * Modal responsável por criação/edição de Usuário.
 *
 * - Reutiliza UsuarioForm
 * - Controlado externamente
 */
export default function UsuarioModal({ usuario, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 transition-colors">

        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {usuario ? "Editar" : "Novo"} Usuário
        </h2>

        <UsuarioForm usuario={usuario ?? undefined} onSuccess={onClose} />

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