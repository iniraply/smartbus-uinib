// src/pages/penumpang/PenumpangLacak.jsx (FIX: KONTRAS WARNA IKON)

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
import {
  FaBus,
  FaMapMarkerAlt,
  FaChevronDown,
  FaCircle,
  FaLocationArrow,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import L from "leaflet";
import { toast } from "react-toastify";
import BottomNav from "../../components/BottomNav";

// --- Fix Ikon Leaflet ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// --- IKON CUSTOM (DIPERBAIKI) ---
const createBusIcon = (isFull) => {
  // PERBAIKAN: Gunakan HIJAU (Green) untuk Tersedia, MERAH (Red) untuk Penuh
  const colorClass = isFull ? "bg-red-600" : "bg-green-600";
  const pointerClass = isFull ? "bg-red-600" : "bg-green-600";

  const iconMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center w-12 h-12">
      <div
        className={`absolute w-12 h-12 ${colorClass} rounded-full border-2 border-white shadow-xl opacity-90 animate-pulse`}
      ></div>
      <FaBus className="relative z-10 text-white w-6 h-6" />
      <div
        className={`absolute -bottom-1 w-3 h-3 ${pointerClass} rotate-45 border-b-2 border-r-2 border-white`}
      ></div>
    </div>
  );
  return L.divIcon({
    html: iconMarkup,
    className: "custom-bus-icon",
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
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

const DESTINATIONS = {
  "Kampus 2": [-0.929989, 100.38667],
  "Kampus 3": [-0.810871, 100.371002],
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
    if (center) map.flyTo(center, 15, { animate: true, duration: 1.5 });
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [etaDestination, setEtaDestination] = useState(null);
  const [etaToUser, setEtaToUser] = useState(null);

  // State Lokasi
  const [isLocating, setIsLocating] = useState(false);

  const pollingInterval = useRef(null);
  const getAuthToken = () => localStorage.getItem("token");

  // --- FUNGSI AMBIL LOKASI USER ---
  const getUserLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(newPos);
          setMapCenter(newPos); // Peta terbang ke user
          setIsLocating(false);
        },
        () => {
          console.log("Gagal ambil lokasi user");
          toast.error("Gagal mendeteksi lokasi Anda. Pastikan GPS aktif.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("Browser Anda tidak mendukung Geolocation.");
      setIsLocating(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await api.get("/api/penumpang/locations", {});
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

  const handleBusSelect = (id) => {
    setIsDropdownOpen(false);

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
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-cream relative font-sans">
      {/* Header Minimalis */}
      <header className="absolute top-0 left-0 right-0 p-4 z-[500] flex items-center pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-3 rounded-full shadow-lg text-brand-dark pointer-events-auto active:scale-95 transition-transform hover:bg-gray-50 border border-gray-100"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      </header>

      <main className="flex-grow relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={14}
          zoomControl={false}
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
              icon={createBusIcon(bus.status_penumpang === "Penuh")}
              eventHandlers={{
                click: () => handleBusSelect(bus.id_bus),
              }}
            >
              <Popup className="custom-popup">
                <div className="text-center">
                  <h3 className="font-bold text-brand-primary text-sm">
                    {bus.nama_bus}
                  </h3>
                  <p className="text-xs font-medium text-gray-500">
                    {bus.rute}
                  </p>
                  {bus.status_penumpang === "Penuh" ? (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                      PENUH
                    </span>
                  ) : (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full">
                      TERSEDIA
                    </span>
                  )}
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
                color: "#800000",
                dashArray: "10, 10",
                opacity: 0.6,
                weight: 4,
              }}
            />
          )}
        </MapContainer>

        {/* Tombol Locate Me */}
        <button
          onClick={getUserLocation}
          className="absolute bottom-28 right-4 z-[400] bg-white p-3 rounded-full shadow-xl border border-gray-100 text-blue-600 active:scale-95 transition-transform hover:bg-blue-50"
          title="Lokasi Saya"
        >
          {isLocating ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FaLocationArrow className="w-5 h-5" />
          )}
        </button>

        {/* Floating Selector Bus */}
        <div className="absolute top-20 left-4 right-4 z-[500]">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 overflow-hidden transition-all">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 p-2 rounded-full">
                  <FaBus className="text-brand-primary w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Pilih Armada
                  </p>
                  <p className="text-sm font-bold text-brand-dark truncate">
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

            {/* Dropdown List */}
            {isDropdownOpen && (
              <div className="border-t border-gray-100 max-h-60 overflow-y-auto animate-fade-in-down bg-white">
                {activeBuses.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 text-sm italic">
                    Tidak ada bus aktif saat ini.
                  </div>
                ) : (
                  activeBuses.map((bus) => (
                    <button
                      key={bus.id_bus}
                      onClick={() => handleBusSelect(bus.id_bus)}
                      className="w-full p-3 flex items-center gap-3 hover:bg-brand-cream/30 transition-colors text-left border-b border-gray-50 last:border-0"
                    >
                      <FaCircle
                        className={`w-2 h-2 ml-2 ${
                          bus.status_penumpang === "Penuh"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-bold text-brand-dark">
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
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl animate-bounce-in text-center border-t-4 border-brand-primary">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-brand-dark">
                  Mau Kemana?
                </h3>
                <button
                  onClick={() => setShowDestinationModal(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {etaToUser && (
                <div className="mb-6 bg-brand-cream/50 p-4 rounded-2xl border border-brand-primary/10 text-left flex items-center gap-4">
                  <div className="bg-brand-primary p-3 rounded-full text-white shadow-md">
                    <FaBus />
                  </div>
                  <div>
                    <p className="text-xs text-brand-primary font-bold uppercase tracking-wider">
                      Jarak Bus ke Anda
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-brand-dark">
                        {etaToUser.minutes}
                      </span>
                      <span className="text-sm text-gray-600 font-medium">
                        Menit ({etaToUser.distanceKm} km)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {Object.keys(DESTINATIONS).map((dest) => (
                  <button
                    key={dest}
                    onClick={() => handleDestinationSelect(dest)}
                    className="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-brand-primary hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-3 group-hover:bg-brand-primary transition-colors">
                      <FaMapMarkerAlt className="text-brand-dark group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {dest}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Panel Info ETA */}
        {selectedBusId && etaDestination !== null && currentBus && (
          <div className="absolute bottom-24 left-4 right-4 z-[500] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up">
            <div className="bg-brand-primary p-4 flex justify-between items-center text-white shadow-inner">
              <div>
                <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">
                  Tujuan
                </p>
                <p className="font-bold text-lg tracking-tight">
                  {selectedDestination}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></span>
                <span className="text-[10px] font-bold tracking-wider">
                  LIVE
                </span>
              </div>
            </div>

            <div className="p-5 flex justify-between items-center bg-white/95 backdrop-blur">
              <div>
                <h4 className="font-bold text-xl text-brand-dark">
                  {currentBus.nama_bus}
                </h4>
                <p className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded inline-block font-medium">
                  {currentBus.rute}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Estimasi Tiba
                </p>
                <p className="text-3xl font-extrabold text-brand-primary">
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
