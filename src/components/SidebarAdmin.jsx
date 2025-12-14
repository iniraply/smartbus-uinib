// src/components/SidebarAdmin.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserTie,
  FaBus,
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

const SidebarAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fungsi Logout
  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
    }
  };

  // Daftar Menu (Agar styling konsisten, kita pakai Array)
  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/admin/datadriver",
      label: "Data Driver",
      icon: <FaUserTie />,
    },
    {
      path: "/admin/databus", // Pastikan path ini sesuai route Anda (/admin/bus atau /admin/databus)
      label: "Data Bus",
      icon: <FaBus />,
    },
    {
      path: "/admin/datapenumpang", // Pastikan path sesuai (/admin/penumpang atau /admin/datapenumpang)
      label: "Data Penumpang",
      icon: <FaUsers />,
    },
    {
      path: "/admin/jadwal",
      label: "Jadwal Operasional",
      icon: <FaCalendarAlt />,
    },
    {
      path: "/admin/laporan",
      label: "Laporan",
      icon: <FaClipboardList />,
    },
  ];

  return (
    // Sidebar Container (Fixed width, full height)
    <aside className="w-64 bg-brand-dark text-brand-cream min-h-screen flex flex-col shadow-2xl z-50 fixed left-0 top-0">
      {/* Header Sidebar */}
      <div className="p-6 border-b border-brand-cream/10 flex items-center gap-3">
        <div className="bg-brand-primary p-2 rounded-lg">
          <FaBus className="text-2xl text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide">SmartBus</h1>
          <p className="text-xs opacity-60 uppercase tracking-widest">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Menu Navigasi */}
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          // Cek apakah menu ini sedang aktif
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={index}
              to={item.path}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
                min-h-[56px] /* INI KUNCINYA: Memaksa tinggi minimal agar seragam */
                ${
                  isActive
                    ? "bg-brand-primary text-white shadow-lg translate-x-1" // Style Aktif
                    : "text-brand-cream/70 hover:bg-brand-primary/20 hover:text-white" // Style Tidak Aktif
                }
              `}
            >
              <span className={`text-xl ${isActive ? "text-brand-cream" : ""}`}>
                {item.icon}
              </span>
              <span className="leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-brand-cream/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium min-h-[56px]"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
        <div className="mt-4 text-center text-[10px] opacity-30">
          &copy; 2025 UIN Imam Bonjol
        </div>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
