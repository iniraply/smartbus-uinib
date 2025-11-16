// src/pages/LaporanPenumpang.jsx

import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// --- Placeholder untuk Bottom Nav ---
// Gunakan komponen yang sama dari file sebelumnya
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
    <a
      href="/penumpang/laporan"
      className="flex flex-col items-center text-blue-600"
    >
      {" "}
      {/* Ini halaman aktif */}
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

function LaporanPenumpang() {
  const navigate = useNavigate();
  const [subjek, setSubjek] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    // Di sinilah logika untuk mengirim data (subjek, deskripsi) ke backend Anda
    console.log({ subjek, deskripsi });
    alert("Laporan terkirim!");
    // Kosongkan form setelah kirim
    setSubjek("");
    setDeskripsi("");
  };

  return (
    // Kontainer utama
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 1. Top Bar (Header) */}
      <header className="flex items-center p-4 bg-white shadow-md z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">Laporan</h1>
        <div className="w-6"></div> {/* Placeholder untuk spasi */}
      </header>

      {/* 2. Konten Utama (Formulir) */}
      <main className="flex-grow overflow-y-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          {/* Input Subjek Laporan */}
          <div>
            <label
              htmlFor="subjek"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subjek Laporan
            </label>
            <input
              type="text"
              id="subjek"
              value={subjek}
              onChange={(e) => setSubjek(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Input Deskripsi */}
          <div>
            <label
              htmlFor="deskripsi"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              rows="5"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Tombol Kirim Laporan */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Kirim Laporan
            </button>
          </div>
        </form>
      </main>

      {/* 3. Bottom Navigation */}
      <div className="pb-16">
        {" "}
        {/* Spacer untuk bottom nav */}
        <BottomNav />
      </div>
    </div>
  );
}

export default LaporanPenumpang;
