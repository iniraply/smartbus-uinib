// src/pages/LacakBus.jsx (FIXED)

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom"; // Asumsi Anda pakai react-router-dom
import L from "leaflet"; // Import L untuk perbaikan ikon

// --- Placeholder untuk Bottom Nav ---
// Anda mungkin sudah punya komponen ini, sesuaikan saja
const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex justify-around items-center z-20">
    {/* Ganti dengan <Link> dari router Anda */}
    <a
      href="/penumpang/home"
      className="flex flex-col items-center text-gray-500"
    >
      <svg
        /* ...ikon beranda... */ className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V9a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 001 1m-6 0h6"
        />
      </svg>
      <span className="text-xs">Beranda</span>
    </a>
    <a
      href="/penumpang/lacak"
      className="flex flex-col items-center text-blue-600"
    >
      {" "}
      {/* Ini halaman aktif */}
      <svg
        /* ...ikon bus... */ className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM17 16v1a1 1 0 01-1 1h-1m-6-16h8a1 1 0 011 1v3.5a1.5 1.5 0 01-1.5 1.5h-5a1.5 1.5 0 01-1.5-1.5V2a1 1 0 011-1z"
        />
      </svg>
      <span className="text-xs">Lacak</span>
    </a>
    <a
      href="/penumpang/jadwal"
      className="flex flex-col items-center text-gray-500"
    >
      <svg
        /* ...ikon jadwal... */ className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-xs">Jadwal</span>
    </a>
    <a
      href="/penumpang/lapor"
      className="flex flex-col items-center text-gray-500"
    >
      <svg
        /* ...ikon laporan... */ className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span className="text-xs">Laporan</span>
    </a>
  </nav>
);
// --- Akhir Placeholder ---

function LacakBus() {
  const [selectedBus, setSelectedBus] = useState(null);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showEta, setShowEta] = useState(false);

  // Ambil koordinat dari UIN Imam Bonjol Padang sebagai pusat peta
  const mapCenter = [-0.9163, 100.3541];

  // Placeholder lokasi bus
  const busLocation = [-0.914, 100.355];

  const navigate = useNavigate(); // Untuk tombol kembali

  const handleBusSelect = (e) => {
    const busId = e.target.value;
    if (busId) {
      setSelectedBus(busId);
      setShowDestinationModal(true); // Tampilkan modal pilih tujuan
    } else {
      setSelectedBus(null);
      setShowDestinationModal(false);
      setShowEta(false);
    }
  };

  const handleDestinationSelect = (destination) => {
    setShowDestinationModal(false); // Sembunyikan modal
    setShowEta(true); // Tampilkan kartu ETA
    // Di sini Anda akan memanggil API untuk mendapatkan ETA
  };

  // Perbaiki masalah ikon Leaflet yang hilang
  React.useEffect(() => {
    (async () => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: (await import("leaflet/dist/images/marker-icon-2x.png"))
          .default,
        iconUrl: (await import("leaflet/dist/images/marker-icon.png")).default,
        shadowUrl: (await import("leaflet/dist/images/marker-shadow.png"))
          .default,
      });
    })();
  }, []);

  return (
    // Kontainer utama setinggi layar (h-screen)
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      {/* 1. Top Bar */}
      <header className="flex items-center p-4 bg-white shadow-md z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">
          Lacak Bus
        </h1>
        <div className="w-6"></div> {/* Placeholder untuk spasi */}
      </header>

      {/* 2. Kontainer Peta dan Elemen Interaktif */}
      <main className="flex-grow relative">
        {/* Peta Leaflet - Atur z-index lebih rendah */}
        <MapContainer
          center={mapCenter}
          zoom={16}
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{ zIndex: 0 }} // Menambahkan z-index rendah ke peta
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Tampilkan marker bus jika sudah dipilih */}
          {showEta && (
            <Marker position={busLocation}>
              <Popup>{selectedBus} - Perkiraan Lokasi</Popup>
            </Marker>
          )}
        </MapContainer>

        {/* --- Elemen UI di atas Peta (Overlays) --- */}

        {/* Tahap 1: Pilih Bus (Dropdown) */}
        {!showEta && (
          // ***** PERUBAHAN DI SINI *****
          <div className="absolute top-4 left-4 z-[1000]">
            <select
              onChange={handleBusSelect}
              className="bg-white shadow-md rounded-md p-2 border border-gray-300"
            >
              <option value="">Pilih Bus</option>
              <option value="Bus 1">Bus 1</option>
              <option value="Bus 2">Bus 2</option>
              <option value="Bus 3">Bus 3</option>
            </select>
          </div>
        )}

        {/* Tahap 2: Pilih Tujuan (Modal) */}
        {showDestinationModal && (
          // ***** PERUBAHAN DI SINI *****
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-lg font-semibold mb-4">Pilih tujuan anda</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDestinationSelect("Kampus 2")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Kampus 2
                </button>
                <button
                  onClick={() => handleDestinationSelect("Kampus 3")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Kampus 3
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tahap 3: Estimasi Waktu (Kartu di Bawah) */}
        {showEta && (
          // ***** PERUBAHAN DI SINI *****
          <div className="absolute bottom-4 left-4 right-4 z-[1000] p-4 bg-white rounded-lg shadow-lg">
            <h4 className="font-semibold">Estimasi Waktu Perjalanan</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-700">{selectedBus}</span>
              <span className="text-blue-600 font-bold">± 5 Menit</span>
            </div>
          </div>
        )}
      </main>

      {/* 3. Bottom Navigation */}
      {/* Ganti ini dengan komponen Navigasi Anda yang sebenarnya */}
      <div className="pb-16">
        {" "}
        {/* Spacer untuk bottom nav */}
        <BottomNav />
      </div>
    </div>
  );
}

export default LacakBus;
