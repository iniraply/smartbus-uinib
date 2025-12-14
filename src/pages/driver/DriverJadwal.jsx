// src/pages/driver/DriverJadwal.jsx (DENGAN STATUS DINAMIS)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBus, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import DriverBottomNav from "../../components/DriverBottomNav";

function DriverJadwal() {
  const navigate = useNavigate();
  const [jadwal, setJadwal] = useState([]);
  const [busInfo, setBusInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3001/api/driver-app/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.hasBus) {
          setBusInfo(res.data.bus);
          setJadwal(res.data.jadwal);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- 🔥 FUNGSI LOGIKA STATUS (SAMA SEPERTI PENUMPANG) ---
  const getTripStatus = (waktuJadwal) => {
    if (!waktuJadwal) return { text: "-", color: "bg-gray-100 text-gray-500" };

    const now = new Date();
    const [hours, minutes] = waktuJadwal.split(":");

    // Buat objek tanggal untuk jadwal hari ini
    const scheduleDate = new Date();
    scheduleDate.setHours(hours, minutes, 0);

    const diffInMinutes = (now - scheduleDate) / 1000 / 60; // Selisih waktu dalam menit

    // LOGIKA PENENTUAN STATUS (KHUSUS DRIVER LEBIH TEGAS)
    if (diffInMinutes < -30) {
      // Masih lama (> 30 menit)
      return {
        text: "Menunggu",
        color: "bg-gray-100 text-gray-500 border border-gray-200",
      };
    } else if (diffInMinutes >= -30 && diffInMinutes <= 0) {
      // 30 menit sebelum berangkat (Persiapan)
      return {
        text: "Persiapan",
        color:
          "bg-blue-50 text-blue-600 border border-blue-200 animate-pulse font-bold",
      };
    } else if (diffInMinutes > 0 && diffInMinutes <= 60) {
      // Sedang dalam perjalanan (Rentang 1 jam)
      return {
        text: "Berjalan",
        color: "bg-green-50 text-green-600 border border-green-200 font-bold",
      };
    } else {
      // Sudah lewat > 1 jam
      return {
        text: "Selesai",
        color:
          "bg-gray-100 text-gray-400 border border-gray-200 line-through decoration-gray-400",
      };
    }
  };

  return (
    // Background Krem
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-cream text-brand-dark">
      {/* Header (Glassmorphism) */}
      <header className="flex items-center p-4 bg-white/50 backdrop-blur-md shadow-sm z-10 sticky top-0 border-b border-brand-primary/10">
        <button
          onClick={() => navigate(-1)}
          className="text-brand-dark hover:text-brand-primary transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-center flex-grow text-brand-dark">
          Jadwal Tugas
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Konten Utama */}
      <main className="flex-grow overflow-y-auto pb-20 p-4 space-y-4">
        {/* Info Unit Bus (Kartu Putih dengan Aksen Maroon) */}
        {busInfo ? (
          <div className="bg-white border border-brand-primary/10 p-5 rounded-2xl shadow-md flex items-center gap-4 relative overflow-hidden">
            {/* Hiasan background */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-bl-full -mr-4 -mt-4"></div>

            <div className="bg-brand-primary/10 p-3 rounded-full">
              <FaBus className="text-brand-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                Unit Bus Anda
              </p>
              <h2 className="text-xl font-bold text-brand-dark">
                {busInfo.nama_bus}
              </h2>
              <p className="text-xs text-brand-dark/60 mt-1 flex items-center gap-1">
                <FaMapMarkerAlt className="w-3 h-3" /> {busInfo.rute}
              </p>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
              <p className="text-red-600 font-bold text-sm">
                Belum ada bus yang ditugaskan.
              </p>
            </div>
          )
        )}

        {/* Tabel Jadwal */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-brand-primary/10">
          <div className="p-4 border-b border-brand-primary/10 bg-brand-primary/5 flex justify-between items-center">
            <h3 className="font-bold text-brand-dark text-sm">
              Rincian Keberangkatan
            </h3>
            <FaClock className="text-brand-primary/40" />
          </div>

          <table className="min-w-full text-sm text-left">
            <thead className="bg-brand-cream/50 border-b border-brand-primary/10">
              <tr>
                <th className="px-4 py-3 font-bold text-brand-dark uppercase text-xs">
                  Waktu
                </th>
                <th className="px-4 py-3 font-bold text-brand-dark uppercase text-xs">
                  Tujuan
                </th>
                <th className="px-4 py-3 font-bold text-brand-dark uppercase text-xs text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/5">
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-6 text-center text-brand-dark/50"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : jadwal.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-6 text-center text-brand-dark/50 italic"
                  >
                    Tidak ada jadwal hari ini.
                  </td>
                </tr>
              ) : (
                jadwal.map((item, index) => {
                  // PANGGIL FUNGSI LOGIKA
                  const status = getTripStatus(item.waktu);

                  return (
                    <tr
                      key={index}
                      className="hover:bg-brand-cream/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-bold text-brand-primary text-base">
                        {item.waktu.substring(0, 5)}
                      </td>
                      <td className="px-4 py-3 font-medium text-brand-dark">
                        {item.rute}
                      </td>

                      {/* KOLOM STATUS DINAMIS */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-md text-[10px] uppercase tracking-wide whitespace-nowrap ${status.color}`}
                        >
                          {status.text}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>

      <DriverBottomNav />
    </div>
  );
}

export default DriverJadwal;
