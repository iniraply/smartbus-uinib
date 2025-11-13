// src/pages/AdminDataDriver.jsx
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

export default function AdminJadwal() {
  const [drivers, setDrivers] = useState([
    {
      id: "01",
      nama: "Bus 1",
      username: "Kampus 3",
      email: "6:30",
      aktif: true,
    },
    {
      id: "02",
      nama: "Bus 2",
      username: "Kampus 2",
      email: "8:30",
      aktif: true,
    },
    {
      id: "03",
      nama: "Bus 1",
      username: "Kampus 2",
      email: "10:00",
      aktif: false,
    },
  ]);

  const handleTambah = () => {
    alert(
      "Form tambah data driver akan muncul (belum dihubungkan ke backend)."
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-700">
              Jadwal Operasional
            </h2>
            <button
              onClick={handleTambah}
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
            >
              + Tambah
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">
                Show
                <select className="mx-2 border rounded px-2 py-1">
                  <option>5</option>
                  <option>10</option>
                  <option>25</option>
                </select>{" "}
                Entries
              </span>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">No</th>
                  <th className="p-2 border">Nama Bus</th>
                  <th className="p-2 border">Tujuan</th>
                  <th className="p-2 border">Waktu Keberangkatan</th>
                  <th className="p-2 border text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="p-2 border">{d.id}</td>
                    <td className="p-2 border">{d.nama}</td>
                    <td className="p-2 border">{d.username}</td>
                    <td className="p-2 border">{d.email}</td>
                    <td className="p-2 border text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(d.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
