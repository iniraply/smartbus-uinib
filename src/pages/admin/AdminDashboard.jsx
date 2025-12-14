// src/pages/admin/AdminDashboard.jsx (FINAL CLEAN)

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBus,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBus: 0,
    totalDrivers: 0,
    totalPenumpang: 0,
    totalLaporan: 0,
    activeBus: 0,
    nextSchedules: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://192.168.100.17:3001/api/admin/dashboard-stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Gagal ambil stats:", err);
      }
    };
    fetchStats();
  }, []);

  // Komponen Kartu Statistik
  const StatCard = ({ title, value, icon, link, colorClass, textClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-brand-primary/10 hover:shadow-xl transition-all relative overflow-hidden group flex flex-col justify-between h-40">
      <div
        className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-125 transition-transform duration-500 ${colorClass}`}
      ></div>
      <div className="flex justify-between items-start z-10">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
            {title}
          </p>
          <h3 className={`text-4xl font-extrabold ${textClass}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-xl text-white shadow-md ${colorClass}`}>
          {icon}
        </div>
      </div>
      <Link
        to={link}
        className={`flex items-center gap-2 text-xs font-bold mt-4 group-hover:translate-x-1 transition-transform ${textClass}`}
      >
        Lihat Detail <FaArrowRight />
      </Link>
    </div>
  );

  return (
    <div className="flex bg-brand-cream min-h-screen font-sans text-brand-dark">
      <SidebarAdmin />

      <main className="flex-grow p-8 ml-64">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary">Dashboard</h1>
            <p className="text-brand-dark/70 mt-1">
              Ringkasan statistik dan informasi terbaru.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-brand-primary border border-brand-primary/10">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        {/* 1. KARTU STATISTIK UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bus"
            value={stats.totalBus}
            icon={<FaBus className="text-xl" />}
            link="/admin/databus"
            colorClass="bg-brand-primary"
            textClass="text-brand-primary"
          />
          <StatCard
            title="Total Driver"
            value={stats.totalDrivers}
            icon={<FaUserTie className="text-xl" />}
            link="/admin/datadriver"
            colorClass="bg-brand-accent"
            textClass="text-brand-accent"
          />
          <StatCard
            title="Penumpang"
            value={stats.totalPenumpang}
            icon={<FaUsers className="text-xl" />}
            link="/admin/datapenumpang"
            colorClass="bg-yellow-600"
            textClass="text-yellow-600"
          />
          <StatCard
            title="Laporan Masuk"
            value={stats.totalLaporan}
            icon={<FaClipboardList className="text-xl" />}
            link="/admin/laporan"
            colorClass="bg-brand-dark"
            textClass="text-brand-dark"
          />
        </div>

        {/* 2. AREA KONTEN UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI (2/3): JADWAL KEBERANGKATAN TERDEKAT */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-brand-primary/10 overflow-hidden h-fit">
            <div className="p-6 border-b border-brand-primary/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-brand-primary flex items-center gap-2">
                <FaClock /> Jadwal Keberangkatan Terdekat
              </h3>
              <Link
                to="/admin/jadwal"
                className="text-xs font-bold text-brand-accent hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-brand-cream/30 text-brand-dark/60 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Jam</th>
                    <th className="px-6 py-4 font-semibold">Bus Info</th>
                    <th className="px-6 py-4 font-semibold">Tujuan</th>
                    {/* Kolom Status DIHAPUS */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.nextSchedules && stats.nextSchedules.length > 0 ? (
                    stats.nextSchedules.map((jadwal, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-brand-cream/10 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold text-brand-primary text-lg">
                          {jadwal.waktu
                            ? jadwal.waktu.substring(0, 5)
                            : "--:--"}
                          <span className="text-xs font-normal text-gray-400 ml-1">
                            WIB
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-brand-dark">
                            {jadwal.nama_bus}
                          </div>
                          <div className="text-xs text-gray-500">
                            {jadwal.plat_nomor || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {jadwal.tujuan}
                        </td>
                        {/* Data Status DIHAPUS */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3" // Colspan disesuaikan jadi 3 karena kolom status hilang
                        className="p-8 text-center text-gray-400 italic"
                      >
                        Tidak ada jadwal terdekat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* KOLOM KANAN (1/3): STATUS ARMADA */}
          <div className="space-y-6">
            {/* Panel Status Bus */}
            <div className="bg-brand-primary text-brand-cream p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>

              <h3 className="font-bold text-lg mb-1">Status Armada</h3>
              <p className="text-xs opacity-70 mb-6">
                Kondisi operasional saat ini.
              </p>

              <div className="space-y-4">
                {/* Aktif */}
                <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 text-green-300 rounded-lg">
                      <FaCheckCircle />
                    </div>
                    <div>
                      <p className="text-xs opacity-60">Bus Beroperasi</p>
                      <p className="font-bold text-lg">
                        {stats.activeBus || 0} Unit
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rusak / Non-Aktif */}
                <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 text-red-300 rounded-lg">
                      <FaExclamationTriangle />
                    </div>
                    <div>
                      <p className="text-xs opacity-60">
                        Dalam Perbaikan/Rusak
                      </p>
                      <p className="font-bold text-lg">
                        {(stats.totalBus || 0) - (stats.activeBus || 0)} Unit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Aksi Cepat SUDAH DIHAPUS DISINI */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
