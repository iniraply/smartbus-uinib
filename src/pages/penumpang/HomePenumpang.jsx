// src/pages/HomePenumpang.jsx (FIXED)

import React from "react";
import { useNavigate } from "react-router-dom";
// INI PERBAIKANNYA: Ganti BusIcon dengan TruckIcon
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/solid";

// --- Placeholder untuk Bottom Nav ---
// (Saya asumsikan Anda sudah punya komponen ini,
//  pastikan link 'href' di dalamnya sesuai dengan router App.jsx Anda)
const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex justify-around items-center z-20">
    <a
      href="/penumpang/home"
      className="flex flex-col items-center text-blue-600"
    >
      <svg
        /* ...ikon beranda... */ className="h-6 w-6"
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
    </a>
    <a
      href="/penumpang/lacak"
      className="flex flex-col items-center text-gray-500"
    >
      <svg
        /* ...ikon bus... */ className="h-6 w-6"
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
    </a>
    <a
      href="/penumpang/jadwal"
      className="flex flex-col items-center text-gray-500"
    >
      <svg
        /* ...ikon jadwal... */ className="h-6 w-6"
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
    </a>
    {/* PERBAIKI TYPO RUTE: ganti "laporan" jadi "lapor" agar sesuai App.jsx */}
    <a
      href="/penumpang/lapor"
      className="flex flex-col items-center text-gray-500"
    >
      <svg
        /* ...ikon laporan... */ className="h-6 w-6"
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
    </a>
  </nav>
);
// --- Akhir Placeholder ---

function HomePenumpang() {
  const navigate = useNavigate(); // Kita aktifkan lagi

  const userName = "Wilda";
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      <main className="flex-grow overflow-y-auto pb-20 p-4 space-y-4">
        {/* Kartu 1: Selamat Datang */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          {/* INI PERBAIKANNYA: Menggunakan TruckIcon */}
          <TruckIcon className="h-12 w-12 text-blue-600 mx-auto mb-2" />
          <h1 className="text-xl font-bold">SmartBus UIN IB</h1>
          <p className="text-gray-600 mt-2">
            Hello {userName}, Selamat Datang!
          </p>
        </div>

        {/* Kartu 2: Jadwal Hari Ini */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="font-semibold text-lg">Jadwal Hari Ini</h2>
          <p className="text-sm text-gray-500 mb-4">{today}</p>

          <div className="space-y-2 mb-4">
            <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          <button
            onClick={() => navigate("/penumpang/jadwal")}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
          >
            Lihat Rute Disini
          </button>
        </div>

        {/* Kartu 3: Lacak Bus */}
        <div className="bg-white shadow-md rounded-lg p-4 relative">
          <div className="h-32 bg-green-100 rounded-md flex items-center justify-center relative overflow-hidden">
            <div className="absolute w-full h-1 bg-yellow-400 transform -rotate-12"></div>
            <div className="absolute w-full h-1 bg-yellow-400 transform rotate-12"></div>
            <MapPinIcon className="h-8 w-8 text-red-500 z-10" />
            <span className="absolute top-2 left-2 text-xs text-gray-400">
              Peta Kampus
            </span>
          </div>

          <button
            onClick={() => navigate("/penumpang/lacak")}
            className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gray-900 mt-4"
          >
            Lacak Bus
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default HomePenumpang;
