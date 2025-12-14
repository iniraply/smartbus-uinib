import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogout() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(true);

  const handleLogout = () => {
    // Hapus data sesi / token login di sini
    alert("Logout berhasil! (fungsi backend belum dihubungkan)");
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1">
        <SidebarAdmin />

        {/* Konten utama */}
        <main className="flex-1 bg-brand-cream relative flex items-center justify-center">
          {/* Background blur jika popup muncul */}
          {showConfirm && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[350px] text-center border">
                <h2 className="text-lg font-semibold text-brand-dark mb-4">
                  Konfirmasi Logout
                </h2>
                <p className="text-gray-600 mb-6">Anda yakin ingin Logout?</p>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={handleLogout}
                    className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 transition"
                  >
                    YA
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-brand-dark px-6 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    TIDAK
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
