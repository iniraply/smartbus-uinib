// src/pages/admin/AdminLaporan.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";
import SidebarAdmin from "../../components/SidebarAdmin"; // Impor Sidebar

function AdminLaporan() {
  const [laporanList, setLaporanList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAuthToken = () => localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  // --- 1. FUNGSI READ (GET ALL LAPORAN) ---
  const fetchLaporan = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        "http://localhost:3001/api/admin/laporan",
        config
      );
      setLaporanList(res.data);
    } catch (err) {
      setError(
        "Gagal mengambil data laporan. " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  // --- 2. FUNGSI DELETE (HAPUS LAPORAN) ---
  const handleDelete = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus laporan ini?")) {
      setError("");
      try {
        await axios.delete(
          `http://localhost:3001/api/admin/laporan/${id}`,
          config
        );
        alert("Laporan berhasil dihapus.");
        fetchLaporan(); // Muat ulang daftar laporan
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus laporan.");
      }
    }
  };

  // Fungsi untuk format tanggal (opsional tapi bagus)
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="flex" style={{ fontFamily: "Poppins, sans-serif" }}>
      <SidebarAdmin />

      <main className="flex-grow p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Laporan Penumpang</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* --- Daftar Laporan --- */}
        <div className="space-y-4">
          {laporanList.length === 0 && !loading && (
            <p className="text-gray-500">Belum ada laporan yang masuk.</p>
          )}

          {laporanList.map((laporan) => (
            <div
              key={laporan.id_laporan}
              className="bg-white rounded-lg shadow p-5"
            >
              <div className="flex justify-between items-start">
                {/* Info Laporan */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {laporan.subjek}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Dari:{" "}
                    <span className="font-medium text-gray-700">
                      {laporan.nama_pelapor}
                    </span>
                    &nbsp;|&nbsp; Tanggal:{" "}
                    <span className="font-medium text-gray-700">
                      {formatDate(laporan.tanggal)}
                    </span>
                  </p>
                  <p className="text-gray-700">{laporan.deskripsi}</p>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => handleDelete(laporan.id_laporan)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Hapus Laporan"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminLaporan;
