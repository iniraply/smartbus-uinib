// src/pages/penumpang/PenumpangJadwal.jsx (CONNECTED TO BACKEND)

import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import BottomNav from "../../components/BottomNav";

function PenumpangJadwal() {
  const navigate = useNavigate();
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- FUNGSI FETCH DATA ---
  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const token = localStorage.getItem("token");
        // Panggil API Penumpang yang baru kita buat
        const res = await axios.get(
          "http://localhost:3001/api/penumpang/jadwal",
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

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <header className="flex items-center p-4 bg-white shadow-md z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">
          Jadwal Operasional
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Konten Utama */}
      <main className="flex-grow overflow-y-auto pb-20 pt-4">
        {/* Status Loading/Error */}
        {loading && (
          <p className="text-center text-gray-500 mt-4">Memuat jadwal...</p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Kartu Tabel Jadwal */}
        {!loading && !error && (
          <div className="px-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-700">Bus</th>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Tujuan
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Waktu
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {jadwalList.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        Belum ada jadwal tersedia.
                      </td>
                    </tr>
                  ) : (
                    jadwalList.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 font-medium">
                          {item.nama_bus}
                        </td>
                        <td className="px-4 py-3">{item.tujuan}</td>
                        {/* Format Waktu (ambil 5 karakter pertama, misal 07:30:00 -> 07:30) */}
                        <td className="px-4 py-3 font-bold text-blue-600">
                          {item.waktu.substring(0, 5)} WIB
                        </td>
                        <td className="px-4 py-3">
                          {/* Logika Status Sederhana: 
                              Nanti bisa dikembangkan berdasarkan jam sekarang vs jam jadwal.
                              Untuk sekarang kita set 'Terjadwal' atau sesuai data dummy logic */}
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Terjadwal
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Kartu Rute Bus */}
        <div className="px-4 mt-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-md font-semibold mb-2">Rute Bus</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Rute Kampus 2 ke 3:</span>
                <br />
                Simpang Anduring - Jl. Dr. Moh. Hatta - By Pass - Jl. Hidayah -
                Kampus 3
              </li>
              <li>
                <span className="font-medium">Rute Kampus 3 ke 2:</span>
                <br />
                Jl. Hidayah - By Pass - Simp. Kampung Lalang - Simp. Kalawi -
                Kampus 2
              </li>
            </ol>
          </div>
        </div>

        {/* Kartu Catatan */}
        <div className="px-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-md font-semibold mb-2">Catatan</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Jadwal dapat berubah sesuai kondisi operasional.</li>
              <li>Harap menunggu pada rute yang dilalui bus.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default PenumpangJadwal;
