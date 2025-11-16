// src/pages/JadwalPenumpang.jsx

import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

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
