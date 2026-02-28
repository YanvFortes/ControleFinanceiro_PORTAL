interface Props {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Confirmar ação",
  description = "Tem certeza que deseja continuar?",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="
          w-full max-w-md mx-4
          bg-white dark:bg-gray-800
          rounded-2xl
          shadow-xl
          border border-gray-200 dark:border-gray-700
          p-6
          animate-fadeIn
        "
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              px-4 py-2 rounded-lg
              border border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-200
              bg-white dark:bg-gray-700
              hover:bg-gray-100 dark:hover:bg-gray-600
              transition
            "
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2 rounded-lg
              bg-red-600 hover:bg-red-700
              text-white
              transition
              focus:outline-none focus:ring-2 focus:ring-red-400
            "
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}