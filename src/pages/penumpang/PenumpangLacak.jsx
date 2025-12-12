// src/pages/penumpang/PenumpangLacak.jsx (MODERN UI UPDATE)

import React, { useState, useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { FaBus, FaMapMarkerAlt, FaChevronDown, FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import L from "leaflet";
import BottomNav from "../../components/BottomNav";

// --- Fix Ikon Leaflet ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// --- IKON CUSTOM ---
// Ubah fungsi ini agar menerima status
const createBusIcon = (isFull) => {
  // Warna: Merah jika penuh, Biru jika tersedia
  const colorClass = isFull ? "bg-red-600" : "bg-blue-600";
  const pointerClass = isFull ? "bg-red-600" : "bg-blue-600";

  const iconMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center w-10 h-10">
      <div
        className={`absolute w-10 h-10 ${colorClass} rounded-full border-2 border-white shadow-lg opacity-90 animate-pulse`}
      ></div>
      <FaBus className="relative z-10 text-white w-5 h-5" />
      <div
        className={`absolute -bottom-1 w-3 h-3 ${pointerClass} rotate-45 border-b-2 border-r-2 border-white`}
      ></div>
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

const createUserIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md z-20"></div>
      <div className="absolute w-12 h-12 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
    </div>
  );
  return L.divIcon({
    html: iconMarkup,
    className: "custom-user-icon",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Ganti koordinat ini dengan hasil copy dari Google Maps Anda sebelumnya
const DESTINATIONS = {
  "Kampus 2": [-0.929989487161048, 100.38666960323135],
  "Kampus 3": [-0.8108711135090128, 100.37100177052656],
};

// --- RUMUS HAVERSINE ---
function calculateDistanceAndETA(
  startLat,
  startLng,
  endLat,
  endLng,
  speedKmh = 25
) {
  const R = 6371;
  const dLat = (endLat - startLat) * (Math.PI / 180);
  const dLon = (endLng - startLng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(startLat * (Math.PI / 180)) *
      Math.cos(endLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceStraight = R * c;
  const distanceRoad = distanceStraight * 1.4;
  const timeHours = distanceRoad / speedKmh;
  const timeMinutes = Math.ceil(timeHours * 60);

  return {
    distanceKm: distanceRoad.toFixed(1),
    minutes: timeMinutes,
  };
}

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15);
  }, [center, map]);
  return null;
}

function PenumpangLacak() {
  const navigate = useNavigate();
  const [activeBuses, setActiveBuses] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState("");
  const [mapCenter, setMapCenter] = useState([
    -0.8108711135090128, 100.37100177052656,
  ]);
  const [userLocation, setUserLocation] = useState(null);

  // State UI
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // <-- Untuk Custom Dropdown
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [etaDestination, setEtaDestination] = useState(null);
  const [etaToUser, setEtaToUser] = useState(null);

  const pollingInterval = useRef(null);
  const getAuthToken = () => localStorage.getItem("token");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => console.log("Gagal ambil lokasi user"),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/penumpang/locations",
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );
      setActiveBuses(res.data);

      if (selectedBusId) {
        const bus = res.data.find((b) => b.id_bus === parseInt(selectedBusId));
        if (bus) {
          setMapCenter([parseFloat(bus.latitude), parseFloat(bus.longitude)]);

          if (selectedDestination) {
            const destCoords = DESTINATIONS[selectedDestination];
            const eta = calculateDistanceAndETA(
              parseFloat(bus.latitude),
              parseFloat(bus.longitude),
              destCoords[0],
              destCoords[1]
            );
            setEtaDestination(eta.minutes);
          }

          if (userLocation) {
            const etaUser = calculateDistanceAndETA(
              parseFloat(bus.latitude),
              parseFloat(bus.longitude),
              userLocation[0],
              userLocation[1],
              30
            );
            setEtaToUser(etaUser);
          }
        }
      }
    } catch (err) {
      console.error("Gagal ambil lokasi bus", err);
    }
  };

  useEffect(() => {
    fetchLocations();
    pollingInterval.current = setInterval(fetchLocations, 5000);
    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
    };
  }, [selectedBusId, selectedDestination, userLocation]);

  // Handle Pilih Bus
  const handleBusSelect = (id) => {
    setIsDropdownOpen(false); // Tutup dropdown setelah memilih

    if (!id) {
      setSelectedBusId("");
      setEtaDestination(null);
      setEtaToUser(null);
      return;
    }
    const busIdInt = parseInt(id);
    setSelectedBusId(busIdInt);

    const bus = activeBuses.find((b) => b.id_bus === busIdInt);
    if (bus && userLocation) {
      const etaUser = calculateDistanceAndETA(
        parseFloat(bus.latitude),
        parseFloat(bus.longitude),
        userLocation[0],
        userLocation[1]
      );
      setEtaToUser(etaUser);
    }

    setShowDestinationModal(true);
  };

  const handleDestinationSelect = (tujuan) => {
    setSelectedDestination(tujuan);
    setShowDestinationModal(false);
  };

  const currentBus = activeBuses.find(
    (b) => b.id_bus === parseInt(selectedBusId)
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100 relative">
      {/* Header Minimalis */}
      <header className="absolute top-0 left-0 right-0 p-4 z-[500] flex items-center pointer-events-none">
        {/* Tombol Back (Pointer events auto agar bisa diklik) */}
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-2 rounded-full shadow-lg text-gray-700 pointer-events-auto active:scale-95 transition-transform"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      </header>

      <main className="flex-grow relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={14}
          zoomControl={false} // Hilangkan kontrol zoom default agar lebih bersih
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{ zIndex: 0 }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={mapCenter} />

          {userLocation && (
            <Marker position={userLocation} icon={createUserIcon()}>
              <Popup>Lokasi Anda</Popup>
            </Marker>
          )}

          {activeBuses.map((bus) => (
            <Marker
              key={bus.id_bus}
              position={[parseFloat(bus.latitude), parseFloat(bus.longitude)]}
              // --- UPDATE DI SINI: Cek status_penumpang ---
              icon={createBusIcon(bus.status_penumpang === "Penuh")}
              // --------------------------------------------
              eventHandlers={{
                click: () => handleBusSelect(bus.id_bus),
              }}
            >
              <Popup className="custom-popup">
                <div className="text-center">
                  <h3 className="font-bold text-blue-600 text-sm">
                    {bus.nama_bus}
                  </h3>
                  <p className="text-xs font-medium">{bus.rute}</p>

                  {/* --- TAMBAHKAN INDIKATOR TEKS JUGA --- */}
                  {bus.status_penumpang === "Penuh" ? (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                      PENUH
                    </span>
                  ) : (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full">
                      TERSEDIA
                    </span>
                  )}
                  {/* ------------------------------------- */}
                </div>
              </Popup>
            </Marker>
          ))}

          {currentBus && selectedDestination && (
            <Polyline
              positions={[
                [
                  parseFloat(currentBus.latitude),
                  parseFloat(currentBus.longitude),
                ],
                DESTINATIONS[selectedDestination],
              ]}
              pathOptions={{
                color: "blue",
                dashArray: "10, 10",
                opacity: 0.6,
                weight: 4,
              }}
            />
          )}

          {currentBus && userLocation && (
            <Polyline
              positions={[
                [
                  parseFloat(currentBus.latitude),
                  parseFloat(currentBus.longitude),
                ],
                userLocation,
              ]}
              pathOptions={{
                color: "gray",
                dashArray: "5, 10",
                opacity: 0.5,
                weight: 3,
              }}
            />
          )}
        </MapContainer>

        {/* --- MODERN FLOATING SELECTOR (Pengganti Dropdown Lama) --- */}
        <div className="absolute top-20 left-4 right-4 z-[500]">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all">
            {/* Header Selector */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaBus className="text-blue-600 w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Pilih Armada
                  </p>
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {currentBus
                      ? `${currentBus.nama_bus} (${currentBus.rute})`
                      : "Ketuk untuk memilih bus"}
                  </p>
                </div>
              </div>
              <FaChevronDown
                className={`text-gray-400 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown List (Animasi Expand) */}
            {isDropdownOpen && (
              <div className="border-t border-gray-100 max-h-60 overflow-y-auto animate-fade-in-down">
                {activeBuses.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    Tidak ada bus aktif saat ini.
                  </div>
                ) : (
                  activeBuses.map((bus) => (
                    <button
                      key={bus.id_bus}
                      onClick={() => handleBusSelect(bus.id_bus)}
                      className="w-full p-3 flex items-center gap-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-50 last:border-0"
                    >
                      <FaCircle className="text-green-500 w-2 h-2 ml-2" />
                      <div>
                        <p className="text-sm font-bold text-gray-700">
                          {bus.nama_bus}
                        </p>
                        <p className="text-xs text-gray-500">{bus.rute}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Pilih Tujuan */}
        {showDestinationModal && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl animate-bounce-in text-center">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Mau Kemana?</h3>
                <button
                  onClick={() => setShowDestinationModal(false)}
                  className="p-1 bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Info Jarak ke User */}
              {etaToUser && (
                <div className="mb-6 bg-blue-50 p-4 rounded-2xl border border-blue-100 text-left flex items-center gap-4">
                  <div className="bg-blue-500 p-3 rounded-full text-white">
                    <FaBus />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase">
                      Jarak Bus ke Anda
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-gray-800">
                        {etaToUser.minutes}
                      </span>
                      <span className="text-sm text-gray-600">
                        Menit ({etaToUser.distanceKm} km)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleDestinationSelect("Kampus 2")}
                  className="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
                    <FaMapMarkerAlt className="text-gray-500 group-hover:text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-blue-700">
                    Kampus 2
                  </span>
                </button>
                <button
                  onClick={() => handleDestinationSelect("Kampus 3")}
                  className="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
                    <FaMapMarkerAlt className="text-gray-500 group-hover:text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-blue-700">
                    Kampus 3
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel Info ETA */}
        {selectedBusId && etaDestination !== null && currentBus && (
          <div className="absolute bottom-24 left-4 right-4 z-[500] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center text-white">
              <div>
                <p className="text-[10px] opacity-80 font-bold uppercase tracking-wider">
                  Tujuan
                </p>
                <p className="font-bold text-lg">{selectedDestination}</p>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold">LIVE TRACKING</span>
              </div>
            </div>

            <div className="p-5 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-xl text-gray-800">
                  {currentBus.nama_bus}
                </h4>
                <p className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded inline-block">
                  {currentBus.rute}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-semibold uppercase">
                  Estimasi Tiba
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {etaDestination}
                  <span className="text-sm text-gray-500 font-medium ml-1">
                    mnt
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

export default PenumpangLacak;
