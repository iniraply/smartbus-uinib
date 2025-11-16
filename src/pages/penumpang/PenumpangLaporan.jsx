// src/pages/LaporanPenumpang.jsx

import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

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
