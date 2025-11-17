// src/pages/driver/DriverJadwal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
        // Kita pakai endpoint dashboard karena sudah memberikan data jadwal bus yg relevan
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

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      <header className="flex items-center p-4 bg-white shadow-md z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">
          Jadwal Tugas
        </h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-grow overflow-y-auto pb-20 p-4">
        {busInfo && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4 text-center">
            <p className="text-sm text-blue-600">Unit Bus Anda</p>
            <h2 className="text-xl font-bold text-blue-800">
              {busInfo.nama_bus}
            </h2>
            <p className="text-xs text-gray-500">Rute: {busInfo.rute}</p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">Waktu</th>
                <th className="px-4 py-3 font-medium text-gray-700">Tujuan</th>
                <th className="px-4 py-3 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : jadwal.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center">
                    Tidak ada jadwal.
                  </td>
                </tr>
              ) : (
                jadwal.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold">
                      {item.waktu.substring(0, 5)}
                    </td>
                    <td className="px-4 py-3">{item.rute}</td>
                    <td className="px-4 py-3">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        Terjadwal
                      </span>
                    </td>
                  </tr>
                ))
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
