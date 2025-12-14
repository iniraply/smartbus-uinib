import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { FaBus, FaMapMarkerAlt, FaClock, FaRoute } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";

function HomePenumpang() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [todaysSchedule, setTodaysSchedule] = useState([]);
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
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.nama) {
          const name =
            userData.nama.charAt(0).toUpperCase() + userData.nama.slice(1);
          setUserName(name);
        }

        const token = localStorage.getItem("token");
        const res = await api.get("/api/penumpang/jadwal", {});

        // Ambil 2 jadwal pertama saja untuk preview di Home
        setTodaysSchedule(res.data.slice(0, 2));
      } catch (e) {
        console.error("Gagal memuat data home", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-cream">
      {/* Konten Utama */}
      <main className="flex-grow overflow-y-auto pb-20 p-4 space-y-5 pt-8">
        {/* Kartu 1: Selamat Datang */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-brand-accent">
          <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
            <FaBus className="h-8 w-8 text-brand-accent" />
          </div>
          <h1 className="text-xl font-bold text-brand-dark">SmartBus UIN IB</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Halo{" "}
            <span className="font-semibold text-brand-accent">
              {userName || "Penumpang"}
            </span>
            , mau kemana hari ini?
          </p>
        </div>

        {/* Kartu 2: Jadwal Hari Ini (Dinamis) */}
        <div className="bg-white shadow-md rounded-2xl p-5 border-l-4 border-brand-accent">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-brand-dark">
              Jadwal Hari Ini
            </h2>
            <span className="text-[10px] bg-brand-cream px-2 py-1 rounded text-gray-500">
              {today}
            </span>
          </div>

          {/* List Jadwal Preview */}
          <div className="space-y-3 mb-4">
            {loading ? (
              // Skeleton Loading
              <>
                <div className="h-12 bg-brand-cream rounded-lg animate-pulse"></div>
                <div className="h-12 bg-brand-cream rounded-lg animate-pulse"></div>
              </>
            ) : todaysSchedule.length > 0 ? (
              todaysSchedule.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FaClock className="text-brand-accent" />
                    <div>
                      <p className="font-bold text-brand-dark text-sm">
                        {item.waktu.substring(0, 5)} WIB
                      </p>
                      <p className="text-xs text-gray-500">{item.nama_bus}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                      <FaRoute className="w-3 h-3" /> Tujuan
                    </p>
                    <p className="text-xs font-semibold text-gray-700 truncate w-24 text-right">
                      {item.tujuan}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-2">
                Tidak ada jadwal tersedia.
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

        {/* Kartu 3: Lacak Bus */}
        <div className="bg-white shadow-md rounded-2xl p-0 overflow-hidden relative group">
          {/* Ilustrasi Peta Sederhana */}
          <div className="h-32 bg-green-50 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 bottom-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(#cbd5e1 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            ></div>

            {/* Jalan Raya */}
            <div className="absolute top-1/2 left-0 w-full h-8 bg-gray-300 -translate-y-1/2 transform -rotate-6 border-y-2 border-white"></div>
            <div className="absolute top-1/2 left-0 w-full h-0 border-t-2 border-dashed border-white -translate-y-1/2 transform -rotate-6"></div>

            {/* Pin dan Bus */}
            <div className="absolute top-8 left-1/3">
              <FaMapMarkerAlt className="h-6 w-6 text-red-500 animate-bounce" />
            </div>
            <div className="absolute top-12 right-1/3">
              <FaBus className="h-6 w-6 text-brand-accent" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-gray-600 backdrop-blur-sm shadow-sm">
                Pantau Lokasi Real-time
              </span>
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={() => navigate("/penumpang/lacak")}
              className="w-full bg-brand-accent text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
            >
              Lacak Posisi Bus
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default HomePenumpang;
