import PessoaForm from "./PessoaForm";
import type { PessoaDTO } from "../../core/types/pessoa";

interface Props {
  pessoa: PessoaDTO | null;
  onClose: () => void;
}

export default function PessoaModal({ pessoa, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 transition-colors">

        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {pessoa ? "Editar" : "Nova"} Pessoa
        </h2>

        <PessoaForm pessoa={pessoa ?? undefined} onSuccess={onClose} />

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