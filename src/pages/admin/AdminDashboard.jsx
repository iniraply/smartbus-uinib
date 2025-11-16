// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAdmin from "../../components/SidebarAdmin"; // Impor Sidebar
import { FaBus, FaUsers, FaFileAlt } from "react-icons/fa"; // Ikon FontAwesome

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDriver: 0,
    totalBusAktif: 0,
    totalLaporan: 0,
  });
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthToken = () => localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Panggil 2 API sekaligus
        const [statsRes, jadwalRes] = await Promise.all([
          axios.get("http://localhost:3001/api/admin/dashboard-stats", config),
          axios.get("http://localhost:3001/api/admin/jadwal", config), // API jadwal sudah ada
        ]);

        setStats(statsRes.data);
        setJadwalList(jadwalRes.data);
      } catch (err) {
        setError(
          "Gagal mengambil data dashboard. " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dijalankan sekali saat halaman dimuat

  return (
    <div className="flex" style={{ fontFamily: "Poppins, sans-serif" }}>
      <SidebarAdmin />

      <main className="flex-grow p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* --- 1. Kartu Statistik --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Kartu Total Bus Aktif */}
          <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">
                Total Bus Aktif
              </p>
              <p className="text-4xl font-bold text-gray-800">
                {stats.totalBusAktif}
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
              <FaBus className="h-8 w-8" />
            </div>
          </div>

          {/* Kartu Total Driver */}
          <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">
                Total Driver
              </p>
              <p className="text-4xl font-bold text-gray-800">
                {stats.totalDriver}
              </p>
            </div>
            <div className="bg-green-100 text-green-600 p-4 rounded-full">
              <FaUsers className="h-8 w-8" />
            </div>
          </div>

          {/* Kartu Laporan Masuk */}
          <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">
                Laporan Masuk
              </p>
              <p className="text-4xl font-bold text-gray-800">
                {stats.totalLaporan}
              </p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full">
              <FaFileAlt className="h-8 w-8" />
            </div>
          </div>
        </div>

        {/* --- 2. Tabel Jadwal Operasional (sesuai wireframe) --- */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <h2 className="text-xl font-semibold p-4 border-b">
            Aktivitas Jadwal
          </h2>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Nama Bus
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Tujuan
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Waktu Keberangkatan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jadwalList.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    Belum ada jadwal.
                  </td>
                </tr>
              )}
              {jadwalList.slice(0, 5).map(
                (
                  data // Tampilkan 5 jadwal terbaru
                ) => (
                  <tr key={data.id_jadwal} className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">{data.nama_bus}</td>
                    <td className="py-4 px-6">{data.tujuan}</td>
                    <td className="py-4 px-6">{data.waktu}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Note: Peta Lacak Bus di dashboard bisa ditambahkan di sini,
            tapi memerlukan setup API real-time (WebSocket) yang lebih kompleks.
            Kita fokus di statistik dulu sesuai wireframe. */}
      </main>
    </div>
  );
}

export default AdminDashboard;
