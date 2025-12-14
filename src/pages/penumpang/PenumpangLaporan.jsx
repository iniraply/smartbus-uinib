// src/pages/penumpang/PenumpangLaporan.jsx (TEMA BARU)

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
    // GANTI bg-gray-50 JADI bg-brand-cream
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-cream text-brand-dark">
      {/* Header */}
      <header className="flex items-center p-4 bg-white/50 backdrop-blur-md shadow-sm z-10 sticky top-0 border-b border-brand-primary/10">
        <button
          onClick={() => navigate(-1)}
          className="text-brand-dark hover:text-brand-primary transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-center flex-grow text-brand-dark">
          Laporan & Masukan
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Konten Utama */}
      <main className="flex-grow overflow-y-auto p-4 pb-20">
        <div className="bg-white shadow-md rounded-2xl p-6 border border-brand-primary/10">
          <h2 className="text-lg font-bold text-brand-primary mb-2">
            Punya Kendala?
          </h2>
          <p className="text-sm text-brand-dark/60 mb-6 leading-relaxed">
            Bantu kami meningkatkan layanan SmartBus dengan mengirimkan laporan
            atau saran Anda.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Subjek */}
            <div>
              <label
                htmlFor="subjek"
                className="block text-sm font-bold text-brand-dark mb-2"
              >
                Subjek Laporan
              </label>
              <input
                type="text"
                id="subjek"
                value={subjek}
                onChange={(e) => setSubjek(e.target.value)}
                placeholder="Contoh: AC Bus Tidak Dingin"
                className="w-full px-4 py-3 bg-brand-cream/30 border border-brand-primary/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder-brand-dark/30 text-brand-dark"
                required
              />
            </div>

            {/* Input Deskripsi */}
            <div>
              <label
                htmlFor="deskripsi"
                className="block text-sm font-bold text-brand-dark mb-2"
              >
                Deskripsi Detail
              </label>
              <textarea
                id="deskripsi"
                rows="5"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Jelaskan detail kejadian, nomor bus (jika ada), dan lokasi..."
                className="w-full px-4 py-3 bg-brand-cream/30 border border-brand-primary/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder-brand-dark/30 text-brand-dark"
                required
              ></textarea>
            </div>

            {/* Tombol Kirim */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-accent text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:bg-brand-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                {loading ? "Sedang Mengirim..." : "Kirim Laporan"}
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
