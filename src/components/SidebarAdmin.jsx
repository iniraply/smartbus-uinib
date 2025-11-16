// src/components/SidebarAdmin.jsx
import React from "react";
// --- PASTIKAN 2 IMPORT INI ADA ---
import { Link, useLocation } from "react-router-dom";

function SidebarAdmin() {
  // <-- Pastikan nama fungsi ini SidebarAdmin
  const location = useLocation();
  const activePath = location.pathname;

  // Fungsi untuk menandai link aktif
  const getLinkClass = (path) => {
    return activePath === path
      ? "block py-2 px-3 rounded bg-gray-700 font-semibold" // Aktif
      : "block py-2 px-3 rounded hover:bg-gray-700"; // Tidak Aktif
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">SmartBus Admin</h2>
      <nav className="space-y-2 flex-grow">
        <Link
          to="/admin/dashboard"
          className={getLinkClass("/admin/dashboard")}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/datadriver"
          className={getLinkClass("/admin/datadriver")}
        >
          Data Driver
        </Link>
        <Link to="/admin/databus" className={getLinkClass("/admin/databus")}>
          Data Bus
        </Link>
        <Link
          to="/admin/datapenumpang"
          className={getLinkClass("/admin/datapenumpang")}
        >
          Data Penumpang
        </Link>
        <Link to="/admin/jadwal" className={getLinkClass("/admin/jadwal")}>
          Jadwal Operasional
        </Link>
        <Link to="/admin/laporan" className={getLinkClass("/admin/laporan")}>
          Laporan
        </Link>
      </nav>
      {/* Tombol Logout */}
      <div className="mt-4">
        <button
          onClick={() => {
            if (window.confirm("Yakin ingin logout?")) {
              localStorage.clear(); // Hapus semua (token, user)
              window.location.href = "/"; // Arahkan ke halaman login
            }
          }}
          className="w-full text-left py-2 px-3 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

// --- PASTIKAN NAMA EXPORT DI BAWAH INI BENAR ---
export default SidebarAdmin;
