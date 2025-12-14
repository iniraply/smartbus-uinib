// src/pages/driver/DriverHome.jsx (OPTIMAL & TANPA HEADER)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Menggunakan Font Awesome agar konsisten
import { FaBus, FaClock, FaRoute, FaSignal, FaIdBadge } from "react-icons/fa";
import DriverBottomNav from "../../components/DriverBottomNav";

function DriverHome() {
  const navigate = useNavigate();
  const [driverName, setDriverName] = useState("");
  const [busInfo, setBusInfo] = useState(null);
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (userStr) {
          const userData = JSON.parse(userStr);
          // Ubah huruf pertama jadi kapital
          setDriverName(
            userData.nama.charAt(0).toUpperCase() + userData.nama.slice(1)
          );
        }

        // Panggil API Dashboard Driver
        const res = await axios.get(
          "http://192.168.100.17:3001/api/driver-app/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.hasBus) {
          setBusInfo(res.data.bus);
          setJadwal(res.data.jadwal);
        }
      } catch (err) {
        console.error("Error fetch driver data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-cream">
      {/* Konten Utama (Tanpa Header Atas) */}
      <main className="flex-grow overflow-y-auto pb-20 p-4 space-y-5 pt-8">
        {/* Kartu 1: Info Driver & Unit */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-brand-accent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-accent"></div>

          <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
            <FaIdBadge className="h-8 w-8 text-brand-accent" />
          </div>

          <h1 className="text-xl font-bold text-brand-dark">
            Halo, {driverName}
          </h1>
          <p className="text-gray-500 text-sm mb-4">Selamat Bertugas!</p>

          {/* Info Bus yang Ditugaskan */}
          {busInfo ? (
            <div className="bg-white rounded-xl p-3 inline-flex items-center gap-3 border border-brand-accent">
              <FaBus className="text-brand-accent" />
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Unit Anda
                </p>
                <p className="text-sm font-bold text-brand-primary">
                  {busInfo.nama_bus}
                </p>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  busInfo.status_bus === "Aktif"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-brand-cream text-gray-600 border-gray-200"
                }`}
              >
                {busInfo.status_bus}
              </span>
            </div>
          ) : (
            <div className="bg-red-50 rounded-xl p-3 inline-flex items-center gap-2 border border-red-100">
              <p className="text-xs font-bold text-red-600">
                Belum ada bus yang ditugaskan
              </p>
            </div>
          )}
        </div>

        {/* Kartu 2: Jadwal Tugas (Dinamis) */}
        <div className="bg-white shadow-md rounded-2xl p-5 border-l-4 border-brand-accent">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-brand-dark">Jadwal Tugas</h2>
            <span className="text-[10px] bg-brand-cream px-2 py-1 rounded text-gray-500">
              {today}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            {loading ? (
              <>
                <div className="h-12 bg-brand-cream rounded-lg animate-pulse"></div>
                <div className="h-12 bg-brand-cream rounded-lg animate-pulse"></div>
              </>
            ) : jadwal.length > 0 ? (
              jadwal.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <FaClock className="text-brand-accent" />
                    <div>
                      <p className="font-bold text-brand-dark text-sm">
                        {item.waktu.substring(0, 5)} WIB
                      </p>
                      <p className="text-xs text-gray-500">Keberangkatan</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                      <FaRoute className="w-3 h-3" /> Rute
                    </p>
                    <p className="text-xs font-semibold text-gray-700 truncate w-32 text-right">
                      {item.rute}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                Tidak ada jadwal tugas hari ini.
              </p>
            )}
          </div>

          <button
            onClick={() => navigate("/penumpang/jadwal")}
            className="w-full bg-brand-accent text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:bg-brand-dark transition-all text-sm"
          >
            Lihat Jadwal Lengkap
          </button>
        </div>

        {/* Kartu 3: Shortcut Aktivasi (Visual) */}
        <div className="bg-white shadow-md rounded-2xl p-0 overflow-hidden relative group">
          {/* Background Pattern */}
          <div className="h-28 bg-brand-dark relative flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            ></div>
            <FaSignal className="text-green-400 w-12 h-12 opacity-20 absolute right-4 top-4" />

            <div className="text-center z-10 px-4">
              <h3 className="text-white font-bold text-lg">Siap Beroperasi?</h3>
              <p className="text-gray-400 text-xs">
                Aktifkan GPS agar penumpang bisa melacak.
              </p>
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={() => navigate("/driver/aktivasi")}
              className="w-full bg-brand-accent text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
            >
              {" "}
              Buka Menu Aktivasi
            </button>
          </div>
        </div>
      </main>

      <DriverBottomNav />
    </div>
  );
}

export default DriverHome;
