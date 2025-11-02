import { useNavigate } from "react-router-dom";
import { Bus } from "lucide-react";

export default function RoleLogin() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-[90%] max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Selamat Datang</h1>
          <p className="text-lg font-semibold text-blue-700">SmartBus UIN IB</p>
          <p className="text-gray-500 text-sm mt-2">Login Sebagai</p>
        </div>

        <div className="grid grid-cols-2 gap-4 place-items-center">
          <button
            onClick={() => handleLogin("driver")}
            className="w-28 h-28 bg-blue-100 hover:bg-blue-200 rounded-xl flex flex-col items-center justify-center shadow-md transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1000/1000649.png"
              alt="Driver"
              className="w-10 h-10 mb-2"
            />
            <span className="font-semibold text-gray-700">Driver</span>
          </button>

          <button
            onClick={() => handleLogin("penumpang")}
            className="w-28 h-28 bg-blue-100 hover:bg-blue-200 rounded-xl flex flex-col items-center justify-center shadow-md transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/709/709496.png"
              alt="Penumpang"
              className="w-10 h-10 mb-2"
            />
            <span className="font-semibold text-gray-700">Penumpang</span>
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => handleLogin("admin")}
            className="w-28 h-28 bg-blue-100 hover:bg-blue-200 rounded-xl flex flex-col items-center justify-center shadow-md transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
              alt="Admin"
              className="w-10 h-10 mb-2"
            />
            <span className="font-semibold text-gray-700">Admin</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 SmartBus UIN Imam Bonjol
        </p>
      </div>
    </div>
  );
}
