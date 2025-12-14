// src/components/BottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
// --- Impor Ikon Baru dari Font Awesome ---
import {
  FaHome,
  FaBus,
  FaCalendarAlt,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";

function BottomNav() {
  const location = useLocation();
  const activePath = location.pathname;

  const getClassName = (path) => {
    return activePath === path
      ? "text-brand-accent" // Aktif
      : "text-gray-500"; // Tidak Aktif
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex justify-around items-center z-20">
      {/* 1. Beranda */}
      <Link
        to="/penumpang/home"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/home"
        )}`}
      >
        <FaHome className="h-6 w-6" /> {/* <-- Ikon Diganti */}
        <span className="text-xs">Beranda</span>
      </Link>

      {/* 2. Lacak */}
      <Link
        to="/penumpang/lacak"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/lacak"
        )}`}
      >
        <FaBus className="h-6 w-6" /> {/* <-- Ikon Diganti */}
        <span className="text-xs">Lacak</span>
      </Link>

      {/* 3. Jadwal */}
      <Link
        to="/penumpang/jadwal"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/jadwal"
        )}`}
      >
        <FaCalendarAlt className="h-6 w-6" /> {/* <-- Ikon Diganti */}
        <span className="text-xs">Jadwal</span>
      </Link>

      {/* 4. Laporan */}
      <Link
        to="/penumpang/lapor"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/lapor"
        )}`}
      >
        <FaFileAlt className="h-6 w-6" /> {/* <-- Ikon Diganti */}
        <span className="text-xs">Laporan</span>
      </Link>

      {/* 5. Profil */}
      <Link
        to="/penumpang/profil"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/profil"
        )}`}
      >
        <FaUser className="h-6 w-6" /> {/* <-- Ikon Diganti */}
        <span className="text-xs">Profil</span>
      </Link>
    </nav>
  );
}

export default BottomNav;
