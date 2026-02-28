import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import {
  obterResumo,
  obterGastosPorDia,
  obterGastosPorPessoa,
  obterTotaisPorCategoria,
  obterTotaisPorPessoa
} from "../../core/api/dashboard.service";
import type {
  DashboardResumoDTO,
  DashboardGastoDiaDTO,
  DashboardGastoPessoaDTO,
  DashboardTotaisResponseDTO
} from "../../core/types/dashboard";

export default function DashboardPage() {
  const [resumo, setResumo] = useState<DashboardResumoDTO | null>(null);
  const [gastosDia, setGastosDia] = useState<DashboardGastoDiaDTO[]>([]);
  const [porPessoa, setPorPessoa] = useState<DashboardGastoPessoaDTO[]>([]);
  const [totaisPessoa, setTotaisPessoa] = useState<DashboardTotaisResponseDTO | null>(null);
  const [totaisCategoria, setTotaisCategoria] = useState<DashboardTotaisResponseDTO | null>(null);
  const [dias, setDias] = useState(7);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      setLoading(true);

      const [resumoData, diaData, pessoaData, totaisPessoaData, totaisCategoriaData] = await Promise.all([
        obterResumo(dias),
        obterGastosPorDia(dias),
        obterGastosPorPessoa(dias),
        obterTotaisPorPessoa(dias),
        obterTotaisPorCategoria(dias),
      ]);

      setResumo(resumoData);
      setGastosDia(diaData);
      setPorPessoa(pessoaData);
      setTotaisPessoa(totaisPessoaData);
      setTotaisCategoria(totaisCategoriaData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [dias]);

  if (loading || !resumo) {
    return <p className="text-gray-500">Carregando dashboard...</p>;
  }

  const pieColors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-8">

      {/* Filtro período */}
      <div className="flex gap-3">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDias(d)}
            className={`px-4 py-2 rounded-lg transition ${dias === d
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
              }`}
          >
            Últimos {d} dias
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Receitas
            </span>
            <TrendingUp className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-green-600 dark:text-green-400">
            {formatar(resumo.totalReceitas)}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Despesas
            </span>
            <TrendingDown className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-red-600 dark:text-red-400">
            {formatar(resumo.totalDespesas)}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Saldo
            </span>
            <Wallet className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-blue-600 dark:text-blue-400">
            {formatar(resumo.saldo)}
          </h2>
        </div>

      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Linha */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="font-semibold mb-6 text-gray-800 dark:text-white">
            Gastos por Dia
          </h3>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={gastosDia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number" ? formatar(value) : value
                  }
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pizza */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="font-semibold mb-6 text-gray-800 dark:text-white">
            Gastos por Pessoa
          </h3>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={porPessoa}
                  dataKey="valor"
                  nameKey="nome"
                  outerRadius={100}
                  label
                >
                  {porPessoa.map((_, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number" ? formatar(value) : value
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {totaisPessoa && (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
    <h3 className="font-semibold mb-6 text-gray-800 dark:text-white">
      Totais por Pessoa
    </h3>

    <div className="space-y-3">
      {totaisPessoa.itens.map((item) => (
        <div
          key={item.nome}
          className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
        >
          <span className="text-gray-700 dark:text-gray-300">
            {item.nome}
          </span>

          <div className="text-right">
            <p className="text-green-600 dark:text-green-400">
              + {formatar(item.totalReceitas)}
            </p>
            <p className="text-red-600 dark:text-red-400">
              - {formatar(item.totalDespesas)}
            </p>
            <p className="font-semibold text-blue-600 dark:text-blue-400">
              {formatar(item.saldo)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{totaisCategoria && (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
    <h3 className="font-semibold mb-6 text-gray-800 dark:text-white">
      Totais por Categoria
    </h3>

    <div className="space-y-3">
      {totaisCategoria.itens.map((item) => (
        <div
          key={item.nome}
          className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
        >
          <span className="text-gray-700 dark:text-gray-300">
            {item.nome}
          </span>

          <div className="text-right">
            <p className="text-green-600 dark:text-green-400">
              + {formatar(item.totalReceitas)}
            </p>
            <p className="text-red-600 dark:text-red-400">
              - {formatar(item.totalDespesas)}
            </p>
            <p className="font-semibold text-blue-600 dark:text-blue-400">
              {formatar(item.saldo)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
        
      </div>
    </div>
  );
}

function formatar(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}