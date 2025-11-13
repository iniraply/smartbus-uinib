import { useState } from "react";
import { MapPin, Bus, Calendar, Home } from "lucide-react";

export default function DriverHome() {
  const [activeTab, setActiveTab] = useState("beranda");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 text-center relative">
        <h1 className="text-lg font-semibold">SmartBus UIN IB</h1>
        <p className="text-sm text-gray-600">Hello Driver!</p>
        <div className="absolute right-6 top-4 cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="w-6 h-6"
          />
        </div>
      </header>

      {/* Konten */}
      <main className="flex-1 p-4 flex flex-col items-center">
        <div className="w-full max-w-sm">
          {/* Jadwal Hari Ini */}
          <div className="bg-white shadow rounded-xl p-4 mb-4">
            <h2 className="font-medium text-gray-800 mb-2">Jadwal Hari Ini</h2>
            <p className="text-sm text-gray-600">
              Jumat, 17 Oktober 2025
              <br />— Rute: Kampus II → Kampus I —
            </p>
          </div>

          {/* Tombol Aktivasi */}
          <button
            onClick={() => alert("Fitur Aktivasi Bus belum aktif.")}
            className="w-full bg-green-600 text-white py-2 rounded-xl font-medium shadow hover:bg-green-700 transition mb-4"
          >
            Aktivasi Bus
          </button>

          {/* Peta Dummy */}
          <div className="bg-gray-200 h-48 rounded-xl flex items-center justify-center text-gray-500">
            <MapPin className="mr-2" /> Tampilan Peta
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white shadow-inner py-2 flex justify-around items-center fixed bottom-0 left-0 right-0 md:static md:mt-4">
        <button
          onClick={() => setActiveTab("beranda")}
          className={`flex flex-col items-center ${
            activeTab === "beranda" ? "text-green-600" : "text-gray-500"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Beranda</span>
        </button>

        <button
          onClick={() => setActiveTab("aktivasi")}
          className={`flex flex-col items-center ${
            activeTab === "aktivasi" ? "text-green-600" : "text-gray-500"
          }`}
        >
          <Bus className="w-5 h-5" />
          <span className="text-xs">Aktivasi</span>
        </button>

        <button
          onClick={() => setActiveTab("jadwal")}
          className={`flex flex-col items-center ${
            activeTab === "jadwal" ? "text-green-600" : "text-gray-500"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Jadwal</span>
        </button>
      </nav>
    </div>
  );
}
