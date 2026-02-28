import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import {
  listarUsuarios,
  deletarUsuario,
} from "../../core/api/usuario.service";
import UsuarioModal from "./UsuarioModal";
import type { UsuarioDTO } from "../../core/types/usuario";
import { toastError } from "../../core/utils/toast";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

export default function UsuariosPage() {
  const [rows, setRows] = useState<UsuarioDTO[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<UsuarioDTO | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function carregar() {
    try {
      setLoading(true);

      const result = await listarUsuarios(
        paginationModel.page + 1,
        paginationModel.pageSize,
        search
      );

      setRows(result.items);
      setRowCount(result.totalCount);
    } catch {
      toastError("Erro ao carregar usuários");
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
      headerName: "Criado em",
      flex: 1,
      renderCell: (params) => {
        if (!params.value) return "-";

        const normalized = params.value.replace(/\.(\d{3})\d+/, ".$1");
        const date = new Date(normalized);

        if (isNaN(date.getTime())) return "-";

        return date.toLocaleDateString("pt-BR");
      },
    },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "acoes",
      headerName: "Ações",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-3 mt-1">
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
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users size={22} />
          Usuários
        </h1>

        <button
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Novo Usuário
        </button>
      </div>

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
          />
        </div>
      </div>

      {modalOpen && (
        <UsuarioModal
          usuario={selected}
          onClose={() => {
            setModalOpen(false);
            carregar();
          }}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir usuário"
        description="Tem certeza que deseja excluir este usuário?"
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
        onConfirm={async () => {
          if (deleteId) {
            await deletarUsuario(deleteId);
            carregar();
          }
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}