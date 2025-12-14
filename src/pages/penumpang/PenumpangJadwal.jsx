// src/pages/penumpang/PenumpangJadwal.jsx (FINAL DENGAN STATUS DINAMIS)

import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNav from "../../components/BottomNav";

function PenumpangJadwal() {
  const navigate = useNavigate();
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://192.168.100.17:3001/api/penumpang/jadwal",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJadwalList(res.data);
      } catch (err) {
        console.error("Gagal ambil jadwal", err);
        setError("Gagal memuat jadwal operasional.");
      } finally {
        setLoading(false);
      }
    };

    fetchJadwal();
  }, []);

  // --- 🔥 FUNGSI LOGIKA STATUS (BARU) ---
  const getTripStatus = (waktuJadwal) => {
    if (!waktuJadwal) return { text: "-", color: "bg-gray-100 text-gray-500" };

    const now = new Date();
    const [hours, minutes] = waktuJadwal.split(":");

    // Buat objek tanggal untuk jadwal hari ini
    const scheduleDate = new Date();
    scheduleDate.setHours(hours, minutes, 0);

    // Hitung selisih waktu dalam menit
    // (Positif = Sudah lewat, Negatif = Belum lewat)
    const diffInMinutes = (now - scheduleDate) / 1000 / 60;

    if (diffInMinutes < -15) {
      // Masih lebih dari 15 menit lagi
      return {
        text: "Akan Datang",
        color: "bg-blue-50 text-blue-600 border border-blue-200",
      };
    } else if (diffInMinutes >= -15 && diffInMinutes <= 0) {
      // 15 menit sebelum berangkat (Persiapan)
      return {
        text: "Segera Berangkat",
        color:
          "bg-green-50 text-green-600 border border-green-200 animate-pulse",
      };
    } else if (diffInMinutes > 0 && diffInMinutes <= 60) {
      // Lewat dari jam jadwal (dalam rentang 1 jam)
      return {
        text: "Sedang Jalan",
        color: "bg-yellow-50 text-yellow-600 border border-yellow-200",
      };
    } else {
      // Sudah lewat lebih dari 1 jam
      return {
        text: "Selesai",
        color: "bg-gray-100 text-gray-400 border border-gray-200",
      };
    }
  };

  return (
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
          Jadwal Operasional
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Konten Utama */}
      <main className="flex-grow overflow-y-auto pb-20 pt-4 px-4 space-y-4">
        {loading && (
          <p className="text-center text-brand-dark/60 mt-4">
            Memuat jadwal...
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 mt-4 font-bold">{error}</p>
        )}

        {/* Kartu Tabel Jadwal */}
        {!loading && !error && (
          <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-brand-primary/10">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-brand-primary/5 border-b border-brand-primary/10">
                <tr>
                  <th className="px-4 py-3 font-bold text-brand-dark uppercase text-xs">
                    Bus
                  </th>
                  <th className="px-4 py-3 font-bold text-brand-dark uppercase text-xs">
                    Tujuan
                  </th>
                  <th className="px-4 py-3 font-bold text-brand-dark uppercase text-xs">
                    Waktu
                  </th>
                  <th className="px-4 py-3 font-bold text-brand-dark uppercase text-xs text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-primary/5">
                {jadwalList.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-brand-dark/50 italic"
                    >
                      Belum ada jadwal tersedia.
                    </td>
                  </tr>
                ) : (
                  jadwalList.map((item, index) => {
                    // PANGGIL FUNGSI LOGIKA DI SINI
                    const status = getTripStatus(item.waktu);

                    return (
                      <tr
                        key={index}
                        className="hover:bg-brand-cream/30 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-brand-dark">
                          {item.nama_bus}
                        </td>
                        <td className="px-4 py-3 text-brand-dark/80">
                          {item.tujuan}
                        </td>
                        <td className="px-4 py-3 font-bold text-brand-primary">
                          {item.waktu ? item.waktu.substring(0, 5) : "--:--"}{" "}
                          WIB
                        </td>

                        {/* KOLOM STATUS DINAMIS */}
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${status.color}`}
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
        )}

        {/* Kartu Rute Bus */}
        <div className="bg-white shadow-md rounded-2xl p-5 border border-brand-primary/10">
          <h2 className="text-md font-bold mb-3 text-brand-primary border-b border-brand-primary/10 pb-2">
            Rute Perjalanan
          </h2>
          <ol className="list-decimal list-inside text-sm text-brand-dark/80 space-y-3">
            <li>
              <span className="font-bold text-brand-dark">
                Rute Kampus 2 ke 3:
              </span>
              <p className="text-xs mt-1 ml-4 leading-relaxed">
                Simpang Anduring - Jl. Dr. Moh. Hatta - By Pass - Jl. Hidayah -
                Kampus 3
              </p>
            </li>
            <li>
              <span className="font-bold text-brand-dark">
                Rute Kampus 3 ke 2:
              </span>
              <p className="text-xs mt-1 ml-4 leading-relaxed">
                Jl. Hidayah - By Pass - Simp. Kampung Lalang - Simp. Kalawi -
                Kampus 2
              </p>
            </li>
          </ol>
        </div>

        {/* Kartu Catatan */}
        <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-4">
          <h2 className="text-sm font-bold mb-2 text-brand-primary flex items-center gap-2">
            Catatan Penting
          </h2>
          <ul className="list-disc list-inside text-xs text-brand-dark/70 space-y-1 ml-1">
            <li>Jadwal dapat berubah sesuai kondisi operasional.</li>
            <li>Harap menunggu pada rute yang dilalui Bus.</li>
          </ul>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default PenumpangJadwal;
