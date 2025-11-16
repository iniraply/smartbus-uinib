// src/pages/JadwalPenumpang.jsx

import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// --- Placeholder Data Jadwal ---
// Nanti ini akan Anda ambil dari API/Backend
const jadwalData = [
  { bus: "Bus 1", tujuan: "Kampus 3", waktu: "6:30", status: "Aktif" },
  { bus: "Bus 2", tujuan: "Kampus 3", waktu: "8:30", status: "Aktif" },
  { bus: "Bus 3", tujuan: "Kampus 3", waktu: "14:30", status: "Belum Aktif" },
  { bus: "Bus 3", tujuan: "Kampus 2", waktu: "7:30", status: "Aktif" },
  { bus: "Bus 2", tujuan: "Kampus 2", waktu: "13:20", status: "Belum Aktif" },
  { bus: "Bus 1", tujuan: "Kampus 2", waktu: "16:00", status: "Belum Aktif" },
];

// --- Placeholder untuk Bottom Nav ---
// Gunakan komponen yang sama dari LacakBus.jsx
const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex justify-around items-center z-20">
    <a
      href="/penumpang/home"
      className="flex flex-col items-center text-gray-500"
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
      className="flex flex-col items-center text-blue-600"
    >
      {" "}
      {/* Ini halaman aktif */}
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

function JadwalPenumpang() {
  const navigate = useNavigate();

  return (
    // Kontainer utama setinggi layar dan overflow-auto untuk scroll
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 1. Top Bar (Header) */}
      <header className="flex items-center p-4 bg-white shadow-md z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">
          Jadwal Operasional
        </h1>
        <div className="w-6"></div> {/* Placeholder untuk spasi */}
      </header>

      {/* 2. Konten Utama (Bisa di-scroll) */}
      <main className="flex-grow overflow-y-auto pb-20">
        {" "}
        {/* pb-20 agar tidak tertutup bottom nav */}
        {/* Kartu Tabel Jadwal */}
        <div className="p-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-700">Bus</th>
                  <th className="px-4 py-3 font-medium text-gray-700">
                    Tujuan
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-700">Waktu</th>
                  <th className="px-4 py-3 font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {jadwalData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">{item.bus}</td>
                    <td className="px-4 py-3">{item.tujuan}</td>
                    <td className="px-4 py-3">{item.waktu}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Aktif"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Kartu Rute Bus */}
        <div className="px-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-md font-semibold mb-2">Rute Bus</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>
                Kampus 2 - Simpang Anduring - Jl. Dr. Moh. Hatta - By Pass - Jl.
                Hidayah - Kampus 3
              </li>
              <li>
                Kampus 3 - Jl. Hidayah - By Pass - Simp. Kampung Lalang - Simp.
                Kalawi - Kampus 2
              </li>
            </ol>
          </div>
        </div>
        {/* Kartu Catatan */}
        <div className="px-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-md font-semibold mb-2">Catatan</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Jadwal dapat berubah sesuai kondisi.</li>
              <li>
                Diharapkan kepada penumpang agar menunggu pada rute yang dilalui
                bus.
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* 3. Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default JadwalPenumpang;
