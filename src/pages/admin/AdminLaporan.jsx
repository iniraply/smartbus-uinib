// src/pages/admin/AdminLaporan.jsx (FINAL CLEAN + TOASTIFY + SWEETALERT)

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { FaTrash, FaEnvelope, FaClipboardList } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SidebarAdmin from "../../components/SidebarAdmin";

function AdminLaporan() {
  const [laporanList, setLaporanList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAuthToken = () => localStorage.getItem("token");
  const config = {};
}

// --- 1. FUNGSI READ (GET ALL LAPORAN) ---
const fetchLaporan = async () => {
  setLoading(true);
  try {
    const res = await api.get("/api/admin/laporan", config);
    setLaporanList(res.data);
  } catch (err) {
    const pesan = err.response?.data?.message || err.message;
    console.error(err);
    toast.error("Gagal mengambil data laporan: " + pesan);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchLaporan();
}, []);

// --- 2. FUNGSI DELETE (SWEETALERT PRO) ---
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Hapus Laporan ini?",
    text: "Data yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,

    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
    reverseButtons: true,
    buttonsStyling: false,

    customClass: {
      // Container & Popup (Blur + Estetik)
      container: "backdrop-blur-sm bg-black/30",
      popup: "rounded-2xl shadow-2xl border border-brand-primary/10 font-sans",
      title: "text-brand-primary font-bold text-2xl",
      htmlContainer: "text-brand-dark/80",

      // Tombol Konfirmasi (Tanpa animasi naik)
      confirmButton:
        "bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-xl ml-3 shadow-lg hover:shadow-xl transition-all",

      // Tombol Batal
      cancelButton:
        "bg-gray-200 hover:bg-gray-300 text-brand-dark font-bold py-3 px-6 rounded-xl shadow-md transition-all",
    },
  });

  if (result.isConfirmed) {
    try {
      await api.delete(`/api/admin/laporan/${id}`, config);

      Swal.fire({
        title: "Terhapus!",
        text: "Laporan berhasil dihapus.",
        icon: "success",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-2xl shadow-2xl font-sans",
          title: "text-brand-primary font-bold",
          confirmButton:
            "bg-brand-primary text-white font-bold py-2 px-6 rounded-xl shadow-lg",
        },
      });

      fetchLaporan(); // Muat ulang daftar laporan
    } catch (err) {
      const pesan = err.response?.data?.message || "Gagal menghapus laporan.";
      Swal.fire({
        title: "Gagal!",
        text: pesan,
        icon: "error",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-2xl shadow-2xl font-sans",
          confirmButton:
            "bg-brand-primary text-white font-bold py-2 px-6 rounded-xl",
        },
      });
    }
  }
};

// Fungsi untuk format tanggal
const formatDate = (dateString) => {
  if (!dateString || dateString === "0000-00-00") return "-"; // Handle tanggal kosong
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);

  return (
    // 1. BACKGROUND KREM
    <div className="flex font-sans bg-brand-cream min-h-screen text-brand-dark">
      <SidebarAdmin />

      <main className="flex-grow p-8 ml-64">
        <header className="mb-6 flex items-center justify-between">
          <div>
            {/* 2. JUDUL MAROON */}
            <h1 className="text-3xl font-bold text-brand-primary">
              Laporan Penumpang
            </h1>
            <p className="text-brand-dark/70 mt-1">
              Daftar keluhan dan saran dari penumpang.
            </p>
          </div>
          {/* Badge Jumlah Laporan */}
          <div className="bg-brand-primary text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
            <FaClipboardList />
            <span className="font-bold">{laporanList.length} Laporan</span>
          </div>
        </header>

        {loading && (
          <p className="text-center text-brand-dark/60">Loading...</p>
        )}

        {/* 3. KONTAINER TABEL PUTIH */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-primary/10">
          <table className="w-full text-left border-collapse">
            {/* 4. HEADER TABEL MAROON */}
            <thead className="bg-brand-primary text-brand-cream">
              <tr>
                <th className="p-4 font-semibold w-1/4">Pengirim</th>
                <th className="p-4 font-semibold w-1/4">Subjek</th>
                <th className="p-4 font-semibold w-1/3">Isi Laporan</th>
                <th className="p-4 font-semibold text-center w-24">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-brand-primary/10">
              {laporanList.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-8 text-center text-gray-400 italic"
                  >
                    Belum ada laporan yang masuk.
                  </td>
                </tr>
              ) : (
                laporanList.map((laporan) => (
                  // 5. BARIS TABEL DENGAN HOVER KREM
                  <tr
                    key={laporan.id_laporan}
                    className="hover:bg-brand-cream/30 transition-colors align-top"
                  >
                    {/* Kolom Pengirim */}
                    <td className="p-4">
                      <div className="font-bold text-brand-primary flex items-center gap-2 mb-1">
                        <FaEnvelope className="text-xs" />
                        {laporan.nama_pelapor ||
                          laporan.nama_penumpang ||
                          "Anonim"}
                      </div>
                      <div className="text-xs text-brand-dark/60">
                        {formatDate(laporan.tanggal || laporan.created_at)}
                      </div>
                    </td>

                    {/* Kolom Subjek */}
                    <td className="p-4 font-bold text-brand-dark">
                      {laporan.subjek}
                    </td>

                    {/* Kolom Isi */}
                    <td className="p-4 text-sm text-gray-600 leading-relaxed">
                      {laporan.deskripsi}
                    </td>

                    {/* Kolom Aksi */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(laporan.id_laporan)}
                        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-all shadow-sm border border-red-200"
                        title="Hapus Laporan"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
export default AdminLaporan;
