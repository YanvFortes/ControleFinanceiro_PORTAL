import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import {
  listarTransacoes,
  deletarTransacao,
} from "../../core/api/transacao.service";
import TransacaoModal from "./TransacaoModal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";

export default function TransacoesPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);

    try {
      const result = await listarTransacoes(
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

  useEffect(() => {
    carregar();
  }, [paginationModel.page, paginationModel.pageSize, search]);

  const columns: GridColDef[] = [
    {
      field: "dataCriacao",
      headerName: "Data",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("pt-BR");
      },
    },

    { field: "descricao", headerName: "Descrição", flex: 1 },

    {
      field: "valor",
      headerName: "Valor",
      flex: 1,
      renderCell: (params) => (
        <span className="font-medium">
          R$ {Number(params.value).toFixed(2)}
        </span>
      ),
    },

    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
      renderCell: (params) =>
        Number(params.value) === 1 ? (
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
        <h1 className="text-2xl font-bold">Transações</h1>

        <button
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Nova Transação
        </button>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-colors">
        {/* Campo de pesquisa */}
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

      {/* Modal */}
      {modalOpen && (
        <TransacaoModal
          transacao={selected}
          onClose={() => {
            setModalOpen(false);
            carregar();
          }}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir transação"
        description="Tem certeza que deseja excluir esta transação?"
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
        onConfirm={async () => {
          if (deleteId) {
            await deletarTransacao(deleteId);
            carregar();
          }
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}