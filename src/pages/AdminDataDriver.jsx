// src/pages/AdminDataDriver.jsx
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import { useState } from "react";

export default function AdminDataDriver() {
  const [drivers, setDrivers] = useState([
    {
      id: "DRV001",
      nama: "Budi Santoso",
      username: "budi01",
      email: "budi@uinib.ac.id",
      password: "******",
      aktif: true,
    },
    {
      id: "DRV002",
      nama: "Rahmat Hidayat",
      username: "rahmat02",
      email: "rahmat@uinib.ac.id",
      password: "******",
      aktif: true,
    },
    {
      id: "DRV003",
      nama: "Siti Aminah",
      username: "siti03",
      email: "siti@uinib.ac.id",
      password: "******",
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
            <h2 className="text-xl font-bold text-gray-700">Data Driver</h2>
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
                  <th className="p-2 border">ID Driver</th>
                  <th className="p-2 border">Nama Driver</th>
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Password</th>
                  <th className="p-2 border text-center">Aktif</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="p-2 border">{d.id}</td>
                    <td className="p-2 border">{d.nama}</td>
                    <td className="p-2 border">{d.username}</td>
                    <td className="p-2 border">{d.email}</td>
                    <td className="p-2 border">{d.password}</td>
                    <td className="p-2 border text-center">
                      <input type="checkbox" checked={d.aktif} readOnly />
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
