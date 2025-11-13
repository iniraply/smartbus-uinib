import { useNavigate } from "react-router-dom";
import { Home, Power, Calendar, PenBox, Bus } from "lucide-react";

const DriverHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-100 text-center py-3 shadow-sm">
        <h1 className="text-lg font-semibold">SmartBus UIN IB</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Hello Penumpang!
        </h2>

        <div className="w-full max-w-md space-y-4">
          <div className="border rounded-lg p-3">
            <h3 className="font-medium">Jadwal Hari Ini</h3>
            <p className="text-sm text-gray-500">Jumat, 17 Oktober 2025</p>
          </div>

          <button
            onClick={() => navigate("/penumpang/jadwal")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            Lihat Rute
          </button>

          <button
            onClick={() => navigate("/penumpang/lacak")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            Lacak Bus
          </button>

          <div className="bg-gray-200 rounded-lg p-6 text-center text-gray-600">
            Peta Lokasi Bus
          </div>
        </div>
      </main>

      {/* Navbar bawah */}
      <nav className="flex justify-around border-t py-2 bg-white text-sm">
        <button className="flex flex-col items-center text-blue-600 font-medium">
          <Home size={20} />
          <span className="text-xs mt-1">Beranda</span>
        </button>

        <button
          onClick={() => navigate("/penumpang/lacak")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600"
        >
          <Bus size={20} />
          <span className="text-xs mt-1">Lacak Bus</span>
        </button>

        <button
          onClick={() => navigate("/penumpang/jadwal")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600"
        >
          <Calendar size={20} />
          <span className="text-xs mt-1">Jadwal</span>
        </button>

        <button
          onClick={() => navigate("/penumpang/lapor")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600"
        >
          <PenBox size={20} />
          <span className="text-xs mt-1">Laporan</span>
        </button>
      </nav>
    </div>
  );
};

export default DriverHome;
