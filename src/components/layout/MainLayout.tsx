import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../core/auth/AuthContext";
import { useTheme } from "../../core/theme/ThemeContext";
import { useState } from "react";

import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Users,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Wallet
} from "lucide-react";

export default function MainLayout() {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  function navClass(path: string) {
    const active = location.pathname === path;
    return `flex items-center gap-3 px-3 py-2 rounded-lg transition
      ${active
        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
        : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`;
  }

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-50
          h-full bg-white dark:bg-gray-800 shadow-md p-4
          transition-all duration-300
          ${sidebarWidth}
          ${sidebarOpen ? "left-0" : "-left-full"} md:left-0
        `}
      >
        {/* Top */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
  <div className="p-2 rounded-lg ms-1">
    <Wallet className="text-green-600 dark:text-green-400" size={20} />
  </div>

  {!collapsed && (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
        Controle 
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
        Financeiro
      </span>
    </div>
  )}
</div>

          <div className="flex items-center gap-2">
            {/* Collapse desktop */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-gray-600 dark:text-gray-300"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Close mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-600 dark:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
          <Link to="/" className={navClass("/")}>
            <LayoutDashboard size={20} />
            {!collapsed && "Dashboard"}
          </Link>

          <Link to="/transacoes" className={navClass("/transacoes")}>
            <ArrowLeftRight size={20} />
            {!collapsed && "Transações"}
          </Link>

          <Link to="/categorias" className={navClass("/categorias")}>
            <Tags size={20} />
            {!collapsed && "Categorias"}
          </Link>

          <Link to="/pessoas" className={navClass("/pessoas")}>
            <Users size={20} />
            {!collapsed && "Pessoas"}
          </Link>

          {user?.role === "administrador" && (
            <Link to="/usuarios" className={navClass("/usuarios")}>
              <Users size={20} />
              {!collapsed && "Usuários"}
            </Link>
          )}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-0">

        {/* Header */}
       <header className="bg-white dark:bg-gray-800 shadow px-4 md:px-6 py-4 flex items-center justify-between transition-colors duration-300">

  {/* LADO ESQUERDO */}
  <div className="flex items-center gap-4">
    
    {/* Hamburger mobile */}
    <button
      onClick={() => setSidebarOpen(true)}
      className="md:hidden text-gray-700 dark:text-gray-200"
    >
      <Menu size={22} />
    </button>


  </div>

  <div className="flex items-center gap-4 ml-auto">
    <div className="hidden sm:flex flex-col text-right">
      <span className="text-sm font-medium text-gray-800 dark:text-white">
        {user?.email}
      </span>
    </div>

    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
    >
      {theme === "light" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>

    <button
      onClick={logout}
      className="flex items-center gap-2 bg-red-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      <LogOut size={18} />
      <span className="hidden md:inline">Sair</span>
    </button>

  </div>

</header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto text-gray-800 dark:text-gray-100 transition-colors duration-300">
          <Outlet />
        </main>

      </div>
    </div>
  );
}