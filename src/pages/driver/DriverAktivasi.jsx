// src/pages/driver/DriverAktivasi.jsx (UPGRADED MAP)

import React, { useState, useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
// Kita gunakan ikon Font Awesome agar konsisten
import { FaBus, FaSignal, FaStopCircle, FaArrowLeft } from "react-icons/fa";
import DriverBottomNav from "../../components/DriverBottomNav";

// --- 1. Fix Ikon Leaflet (Sama seperti Penumpang) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// --- 2. Ikon Bus Custom (Sama seperti Penumpang) ---
const createBusIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center w-10 h-10">
      {/* Lingkaran Background dengan animasi pulse */}
      <div className="absolute w-10 h-10 bg-blue-600 rounded-full border-2 border-white shadow-lg opacity-90 animate-pulse"></div>
      {/* Ikon Bus */}
      <FaBus className="relative z-10 text-white w-5 h-5" />
      {/* Pointer segitiga */}
      <div className="absolute -bottom-1 w-3 h-3 bg-blue-600 rotate-45 border-b-2 border-r-2 border-white"></div>
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: "custom-bus-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 45],
    popupAnchor: [0, -40],
  });
};

// --- 3. Komponen Update Peta ---
function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, {
        animate: true,
        duration: 1.5, // Animasi halus saat lokasi berubah
      });
    }
  }, [position, map]);
  return null;
}

function DriverAktivasi() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState([
    -0.8108711135090128, 100.37100177052656,
  ]); // Default UIN IB
  const [loading, setLoading] = useState(false);

  const locationInterval = useRef(null);
  const getAuthToken = () => localStorage.getItem("token");

  // Cek status awal
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/driver-app/dashboard",
          {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
          }
        );
        if (res.data.hasBus && res.data.bus.status_bus === "Aktif") {
          setIsActive(true);
          startTracking();
        }
      } catch (err) {
        console.error("Gagal cek status", err);
      }
    };
    checkStatus();
    return () => stopTracking();
  }, []);

  // Kirim lokasi ke backend
  const sendLocationToBackend = async (lat, lng) => {
    try {
      await axios.post(
        "http://localhost:3001/api/driver-app/location",
        {
          latitude: lat,
          longitude: lng,
        },
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );
      console.log("Lokasi terkirim:", lat, lng);
    } catch (err) {
      console.error("Gagal kirim lokasi:", err);
    }
  };

  // Mulai tracking GPS
  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung Geolocation");
      return;
    }
    // Update lokasi setiap 5 detik
    locationInterval.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          sendLocationToBackend(latitude, longitude);
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }, 5000);
  };

  const stopTracking = () => {
    if (locationInterval.current) {
      clearInterval(locationInterval.current);
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = !isActive ? "Aktif" : "Tidak Aktif";
    const confirmMsg = !isActive
      ? "Aktifkan Layanan Bus? Lokasi Anda akan dilacak."
      : "Matikan Layanan Bus?";

    if (window.confirm(confirmMsg)) {
      setLoading(true);
      try {
        await axios.put(
          "http://localhost:3001/api/driver-app/status",
          {
            status: newStatus,
          },
          {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
          }
        );

        setIsActive(!isActive);
        if (newStatus === "Aktif") {
          startTracking();
        } else {
          stopTracking();
        }
      } catch (err) {
        alert(
          "Gagal mengubah status: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100 relative">
      {/* Header */}
      <header className="flex items-center p-4 bg-white shadow-md z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <FaArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">
          Aktivasi Bus
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Peta Full Screen */}
      <div className="flex-grow relative z-0">
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{ zIndex: 0 }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker Driver dengan Ikon Bus Custom */}
          <Marker position={position} icon={createBusIcon()}>
            <Popup className="custom-popup">
              <div className="text-center">
                <p className="font-bold text-blue-600 text-sm">Lokasi Anda</p>
                <p className="text-[10px] text-gray-500">
                  {isActive ? "Sedang Menyiarkan GPS" : "GPS Offline"}
                </p>
              </div>
            </Popup>
          </Marker>

          <MapUpdater position={position} />
        </MapContainer>

        {/* Panel Kontrol Status (Overlay Modern) */}
        <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl z-[500] border border-gray-100 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Status Layanan
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`flex h-3 w-3 rounded-full ${
                    isActive ? "bg-green-500 animate-pulse" : "bg-red-500"
                  }`}
                ></span>
                <h2
                  className={`text-lg font-bold ${
                    isActive ? "text-green-600" : "text-gray-700"
                  }`}
                >
                  {isActive ? "SEDANG AKTIF" : "OFFLINE"}
                </h2>
              </div>
            </div>

            <button
              onClick={handleToggleStatus}
              disabled={loading}
              className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all transform active:scale-95 ${
                isActive
                  ? "bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100"
                  : "bg-green-50 text-green-600 border-2 border-green-200 hover:bg-green-100"
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : isActive ? (
                <FaStopCircle className="h-7 w-7" />
              ) : (
                <FaSignal className="h-7 w-7" />
              )}
            </button>
          </div>

          {/* Indikator Text */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400">
              {isActive
                ? "Lokasi Anda sedang dibagikan ke penumpang."
                : "Tekan tombol sinyal untuk mulai beroperasi."}
            </p>
          </div>
        </div>
      </div>

      <DriverBottomNav />
    </div>
  );
}

export default DriverAktivasi;
