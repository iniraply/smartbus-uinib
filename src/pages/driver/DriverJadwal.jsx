import { useNavigate } from "react-router-dom";
import { Home, Power, Calendar } from "lucide-react";

const DriverJadwal = () => {
  const navigate = useNavigate();

  const jadwalHariIni = [
    { waktu: "07:00", rute: "Kampus I → Kampus II", status: "Selesai" },
    { waktu: "09:30", rute: "Kampus II → Kampus III", status: "Berjalan" },
    { waktu: "13:00", rute: "Kampus III → Asrama", status: "Belum Mulai" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-100 text-center py-3 shadow-sm">
        <h1 className="text-lg font-semibold">Jadwal Bus</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="w-full max-w-md mx-auto">
          <h2 className="font-medium text-gray-700 mb-3">Jadwal Hari Ini</h2>
          <div className="space-y-3">
            {jadwalHariIni.map((item, index) => (
              <div
                key={index}
                className="border rounded-md p-3 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div>
                  <p className="text-sm font-semibold">{item.rute}</p>
                  <p className="text-xs text-gray-500">{item.waktu}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    item.status === "Selesai"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Berjalan"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Navbar bawah */}
      <nav className="flex justify-around border-t py-2 bg-white text-sm">
        <button
          onClick={() => navigate("/driver/home")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600"
        >
          <Home size={20} />
          <span className="text-xs mt-1">Beranda</span>
        </button>

        <button
          onClick={() => navigate("/driver/aktivasi")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600"
        >
          <Power size={20} />
          <span className="text-xs mt-1">Aktivasi</span>
        </button>

        <button className="flex flex-col items-center text-blue-600 font-medium">
          <Calendar size={20} />
          <span className="text-xs mt-1">Jadwal</span>
        </button>
      </nav>
    </div>
  );
};

export default DriverJadwal;
