import { useEffect } from "react";

/**
 * Hook para alterar o título da aba do navegador.
 *
 * Mantém padrão: "Nome da Página | Controle Financeiro"
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const baseTitle = "Controle Financeiro";
    document.title = title
      ? `${title} | ${baseTitle}`
      : baseTitle;
  }, [title]);
}