// src/pages/driver/DriverAktivasi.jsx (IMMERSIVE UI)

import React, { useState, useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
// Kita gunakan ikon Font Awesome agar konsisten
import {
  FaBus,
  FaSignal,
  FaStopCircle,
  FaArrowLeft,
  FaUsers,
  FaUsersSlash,
} from "react-icons/fa";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DriverBottomNav from "../../components/DriverBottomNav";

// --- 1. Fix Ikon Leaflet ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// --- 2. Ikon Bus Custom ---
const createBusIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center w-10 h-10">
      <div className="absolute w-10 h-10 bg-brand-accent rounded-full border-2 border-white shadow-lg opacity-90 animate-pulse"></div>
      <FaBus className="relative z-10 text-white w-5 h-5" />
      <div className="absolute -bottom-1 w-3 h-3 bg-brand-accent rotate-45 border-b-2 border-r-2 border-white"></div>
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
      map.flyTo(position, 16, { animate: true, duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

function DriverAktivasi() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isFull, setIsFull] = useState(false);
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
        if (res.data.hasBus) {
          if (res.data.bus.status_bus === "Aktif") {
            setIsActive(true);
            startTracking();
          }
          if (res.data.bus.status_penumpang === "Penuh") {
            setIsFull(true);
          }
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
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
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

  const handleToggleCapacity = async () => {
    const newCapacity = !isFull ? "Penuh" : "Tersedia";
    try {
      await axios.put(
        "http://localhost:3001/api/driver-app/capacity",
        {
          status_penumpang: newCapacity,
        },
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );
      setIsFull(!isFull);
    } catch (err) {
      alert("Gagal update kapasitas.");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-cream relative">
      {/* HEADER BARU: Floating Back Button */}
      <header className="absolute top-0 left-0 right-0 p-4 z-[500] flex items-center pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-3 rounded-full shadow-lg text-gray-700 pointer-events-auto active:scale-95 transition-transform hover:bg-gray-50"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      </header>

      {/* Peta Full Screen */}
      <div className="flex-grow relative z-0">
        <MapContainer
          center={position}
          zoom={16}
          zoomControl={false} // Hilangkan zoom control default biar bersih
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{ zIndex: 0 }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker Driver */}
          <Marker position={position} icon={createBusIcon()}>
            <Popup className="custom-popup">
              <div className="text-center">
                <p className="font-bold text-brand-accent text-sm">
                  Lokasi Anda
                </p>
                <p className="text-[10px] text-gray-500">
                  {isActive ? "Live GPS ON" : "Live GPS OFF"}
                </p>
              </div>
            </Popup>
          </Marker>

          <MapUpdater position={position} />
        </MapContainer>

        {/* PANEL KONTROL (Disesuaikan posisinya ke top-20 agar tidak ketabrak tombol back) */}
        <div className="absolute top-20 left-4 right-4 flex flex-col gap-3 z-[500]">
          {/* 1. Kartu Status GPS */}
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg flex justify-between items-center border border-white/50">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
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
                  {isActive ? "ONLINE" : "OFFLINE"}
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
                <FaStopCircle className="h-6 w-6" />
              ) : (
                <FaSignal className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* 2. Kartu Status Kapasitas */}
          {isActive && (
            <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg flex justify-between items-center animate-fade-in-down border border-white/50">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Kapasitas Penumpang
                </p>
                <h2
                  className={`text-sm font-bold ${
                    isFull ? "text-red-600" : "text-brand-accent"
                  }`}
                >
                  {isFull ? "BUS PENUH" : "TERSEDIA"}
                </h2>
              </div>
              <button
                onClick={handleToggleCapacity}
                className={`w-auto px-4 h-10 flex items-center justify-center rounded-lg shadow-md transition-all text-xs font-bold gap-2 ${
                  isFull
                    ? "bg-brand-primary/10 text-brand-accent hover:bg-brand-dark"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
              >
                {isFull ? (
                  <>
                    <FaUsers className="w-4 h-4" /> Buka
                  </>
                ) : (
                  <>
                    <FaUsersSlash className="w-4 h-4" /> Penuhkan
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <DriverBottomNav />
    </div>
  );
}

export default DriverAktivasi;
