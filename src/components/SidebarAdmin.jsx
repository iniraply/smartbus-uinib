// src/components/SidebarAdmin.jsx
import { Home, Users, Bus, Calendar, FileText, LogOut } from "lucide-react";

export default function SidebarAdmin() {
  return (
    <div className="bg-gray-100 w-60 min-h-screen shadow-md p-4 space-y-4">
      <nav className="flex flex-col gap-3 text-gray-700">
        <a
          href="#"
          className="flex items-center gap-2 hover:text-red-700 font-medium"
        >
          <Home size={18} /> Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-2 hover:text-red-700 font-medium"
        >
          <Bus size={18} /> Data Driver
        </a>
        <a
          href="#"
          className="flex items-center gap-2 hover:text-red-700 font-medium"
        >
          <Users size={18} /> Data User
        </a>
        <a
          href="#"
          className="flex items-center gap-2 hover:text-red-700 font-medium"
        >
          <Calendar size={18} /> Jadwal Operasional
        </a>
        <a
          href="#"
          className="flex items-center gap-2 hover:text-red-700 font-medium"
        >
          <FileText size={18} /> Laporan
        </a>
        <a
          href="#"
          className="flex items-center gap-2 hover:text-red-700 font-medium"
        >
          <LogOut size={18} /> Logout
        </a>
      </nav>
    </div>
  );
}
