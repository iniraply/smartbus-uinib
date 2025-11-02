// src/components/SidebarAdmin.jsx
import { Link, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Data Driver", path: "/admin/datadriver" },
    { name: "Data Penumpang", path: "/admin/datapenumpang" },
    { name: "Jadwal Operasioanl", path: "/admin/jadwal" },
    { name: "Laporan", path: "/admin/laporan" },
    { name: "Logout", path: "/admin/logout" },
  ];

  return (
    <aside className="w-64 bg-red-800 text-white flex flex-col p-4 space-y-2">
      <h2 className="text-lg font-bold mb-4">SmartBus Admin</h2>
      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-3 py-2 rounded-md transition 
            ${
              location.pathname === item.path
                ? "bg-red-600 font-semibold"
                : "hover:bg-red-700"
            }`}
        >
          {item.name}
        </Link>
      ))}
    </aside>
  );
}
