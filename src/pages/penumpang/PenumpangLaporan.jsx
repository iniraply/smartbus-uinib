// src/pages/penumpang/PenumpangLaporan.jsx (CONNECTED)

import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNav from "../../components/BottomNav";

function PenumpangLaporan() {
  const navigate = useNavigate();
  const [subjek, setSubjek] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjek || !deskripsi) {
      alert("Mohon isi semua kolom.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Kirim ke Backend
      await axios.post(
        "http://localhost:3001/api/penumpang/laporan",
        {
          subjek,
          deskripsi,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Laporan berhasil dikirim! Terima kasih atas masukan Anda.");

      // Reset Form
      setSubjek("");
      setDeskripsi("");
    } catch (err) {
      console.error("Gagal kirim laporan", err);
      alert("Gagal mengirim laporan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <header className="flex items-center p-4 bg-white shadow-md z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">Laporan</h1>
        <div className="w-6"></div>
      </header>

      {/* Konten Utama */}
      <main className="flex-grow overflow-y-auto p-4 pb-20">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Kirim Masukan
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Silakan laporkan kendala atau saran terkait layanan SmartBus.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Subjek */}
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
                placeholder="Contoh: Bus Terlambat"
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
                placeholder="Jelaskan detail laporan Anda..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            {/* Tombol Kirim */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {loading ? "Mengirim..." : "Kirim Laporan"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default PenumpangLaporan;
