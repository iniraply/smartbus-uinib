// src/components/BottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const activePath = location.pathname; // Ini akan memberi kita "/penumpang/jadwal", dll.

  // Fungsi kecil untuk menentukan kelas
  const getClassName = (path) => {
    return activePath === path
      ? "text-blue-600" // Aktif
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
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V9a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="text-xs">Beranda</span>
      </Link>

      {/* 2. Lacak */}
      <Link
        to="/penumpang/lacak"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/lacak"
        )}`}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM17 16v1a1 1 0 01-1 1h-1m-6-16h8a1 1 0 011 1v3.5a1.5 1.5 0 01-1.5 1.5h-5a1.5 1.5 0 01-1.5-1.5V2a1 1 0 011-1z"
          />
        </svg>
        <span className="text-xs">Lacak</span>
      </Link>

      {/* 3. Jadwal */}
      <Link
        to="/penumpang/jadwal"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/jadwal"
        )}`}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs">Jadwal</span>
      </Link>

      {/* 4. Laporan */}
      <Link
        to="/penumpang/lapor"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/lapor"
        )}`}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="text-xs">Laporan</span>
      </Link>

      {/* 5. Profil */}
      <Link
        to="/penumpang/profil"
        className={`flex flex-col items-center w-1/5 ${getClassName(
          "/penumpang/profil"
        )}`}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
        <span className="text-xs">Profil</span>
      </Link>
    </nav>
  );
}

export default BottomNav;
