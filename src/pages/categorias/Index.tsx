import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import {
  listarCategorias,
  deletarCategoria,
} from "../../core/api/categoria.service";
import CategoriaModal from "./CategoriaModal";
import type { CategoriaDTO } from "../../core/types/categoria";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useDocumentTitle } from "../../core/hooks/useDocumentTitle";
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";

/**
 * Página de listagem de Categorias.
 *
 * - Paginação server-side
 * - Busca com filtro
 * - Integra DataGrid (MUI)
 * - Controla modal de criação/edição
 * - Controla diálogo de confirmação para exclusão
 */

export default function CategoriasPage() {
  useDocumentTitle("Categorias");
  const [rows, setRows] = useState<CategoriaDTO[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<CategoriaDTO | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /**
 * Carrega dados paginados da API.
 * Atualiza linhas e total de registros.
 */
  async function carregar() {
    setLoading(true);

    try {
      const result = await listarCategorias(
        paginationModel.page + 1,
        paginationModel.pageSize,
        search
      );

      setRows(result.items);
      setRowCount(result.totalCount);
    } finally {
      setLoading(false);
    }
  }

  // Recarrega dados sempre que paginação ou busca mudarem
  useEffect(() => {
    carregar();
  }, [paginationModel.page, paginationModel.pageSize, search]);

  /**
 * Definição das colunas do DataGrid.
 * Inclui renderização customizada e ações.
 */
  const columns: GridColDef[] = [
    { field: "descricao", headerName: "Descrição", flex: 1 },

    {
      field: "finalidade",
      headerName: "Finalidade",
      flex: 1,
      renderCell: (params) =>
        params.value === 1 ? (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <TrendingUp size={16} />
            Receita
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <TrendingDown size={16} />
            Despesa
          </div>
        ),
    },

    {
      field: "acoes",
      headerName: "Ações",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex mt-1 gap-3">
          <button
            className="text-blue-600 h-10 hover:scale-110 transition"
            onClick={() => {
              setSelected(params.row);
              setModalOpen(true);
            }}
          >
            <Pencil size={18} />
          </button>

          <button
            className="text-red-600 h-10 hover:scale-110 transition"
            onClick={() => {
              setDeleteId(params.row.id);
              setConfirmOpen(true);
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Categorias</h1>

        <button
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Nova Categoria
        </button>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-colors">
        <div className="mb-4">
          <TextField
            label="Pesquisar"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => {
              setPaginationModel((prev) => ({ ...prev, page: 0 }));
              setSearch(e.target.value);
            }}
          />
        </div>

        <div style={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={rowCount}
            loading={loading}
            pageSizeOptions={[10, 20, 50]}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            disableRowSelectionOnClick
            localeText={{
              noRowsLabel: "Nenhum registro encontrado",
              paginationRowsPerPage: "Linhas por página",
              paginationDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`
                }`,
            }}
          />
        </div>
      </div>

      {modalOpen && (
        <CategoriaModal
          categoria={selected}
          onClose={() => {
            setModalOpen(false);
            carregar();
          }}
        />
      )}

      {/* Diálogo de confirmação para exclusão */}
      <ConfirmDialog
        open={confirmOpen}
        title="Excluir categoria"
        description="Tem certeza que deseja excluir esta categoria?"
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
        onConfirm={async () => {
          if (deleteId) {
            await deletarCategoria(deleteId);
            carregar();
          }
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}