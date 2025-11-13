import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Power, Calendar } from "lucide-react";

const DriverAktivasi = () => {
  const [isActive, setIsActive] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setShowConfirm(true);

  const confirmActivation = (confirm) => {
    setShowConfirm(false);
    if (confirm) setIsActive(!isActive);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-gray-100 text-center py-3 shadow-sm">
        <h1 className="text-lg font-semibold">Aktivasi Bus</h1>
      </header>

      <main className="flex-1 p-4 flex flex-col items-center">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center justify-between border p-2 rounded-md">
            <p className="font-medium text-gray-700">Aktifkan Bus</p>
            <button
              onClick={handleToggle}
              className={`px-3 py-1 rounded-md text-sm ${
                isActive
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {isActive ? "Aktif" : "Tidak Aktif"}
            </button>
          </div>

          <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center text-gray-500">
            <p>Peta Lokasi Bus</p>
          </div>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-72 text-center">
              <h2 className="text-base font-semibold mb-2">
                Aktifkan Layanan Bus?
              </h2>
              <div className="flex justify-center space-x-4 mt-3">
                <button
                  onClick={() => confirmActivation(true)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md"
                >
                  YA
                </button>
                <button
                  onClick={() => confirmActivation(false)}
                  className="bg-gray-300 px-4 py-1 rounded-md"
                >
                  TIDAK
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="flex justify-around border-t py-2 text-sm bg-white">
        <button
          onClick={() => navigate("/driver/home")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600"
        >
          <Home size={20} />
          <span className="text-xs mt-1">Beranda</span>
        </button>
        <button className="flex flex-col items-center text-blue-600 font-medium">
          <Power size={20} />
          <span className="text-xs mt-1">Aktivasi</span>
        </button>
        <button
          onClick={() => navigate("/driver/jadwal")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600"
        >
          <Calendar size={20} />
          <span className="text-xs mt-1">Jadwal</span>
        </button>
      </nav>
    </div>
  );
};

export default DriverAktivasi;
