// src/pages/admin/AdminJadwal.jsx
import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import axios from "axios";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function AdminJadwal() {
  const [jadwalList, setJadwalList] = useState([]);
  const [bus, setBus] = useState([]); // <-- State baru untuk daftar bus
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    bus_id: "",
    tujuan: "",
    waktu: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAuthToken = () => localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  // --- 1. FUNGSI READ (GET ALL JADWAL & BUS) ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // Panggil 2 API sekaligus
      const [jadwalRes, busRes] = await Promise.all([
        axios.get("http://localhost:3001/api/admin/jadwal", config),
        axios.get("http://localhost:3001/api/admin/bus", config),
      ]);
      setJadwalList(jadwalRes.data);
      setBus(busRes.data);
    } catch (err) {
      setError(
        "Gagal mengambil data. " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 2. FUNGSI UNTUK MODAL ---
  const handleOpenModal = (data = null) => {
    setError("");
    if (data) {
      // Mode Edit
      setIsEditing(true);
      setCurrentId(data.id_jadwal);
      setFormData({
        bus_id: data.id_bus,
        tujuan: data.tujuan,
        waktu: data.waktu,
      });
    } else {
      // Mode Tambah
      setIsEditing(false);
      setCurrentId(null);
      setFormData({ bus_id: "", tujuan: "", waktu: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // --- 3. FUNGSI CREATE & UPDATE (SUBMIT MODAL) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validasi form tidak kosong
    if (!formData.bus_id || !formData.tujuan || !formData.waktu) {
      setError("Semua field wajib diisi.");
      setLoading(false);
      return;
    }

    try {
      if (isEditing) {
        // UPDATE (PUT)
        await axios.put(
          `http://localhost:3001/api/admin/jadwal/${currentId}`,
          formData,
          config
        );
        alert("Jadwal berhasil diperbarui!");
      } else {
        // CREATE (POST)
        await axios.post(
          "http://localhost:3001/api/admin/jadwal",
          formData,
          config
        );
        alert("Jadwal berhasil ditambahkan!");
      }
      handleCloseModal();
      fetchData(); // Muat ulang data
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // --- 4. FUNGSI DELETE (HAPUS JADWAL) ---
  const handleDelete = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus jadwal ini?")) {
      setLoading(true);
      setError("");
      try {
        await axios.delete(
          `http://localhost:3001/api/admin/jadwal/${id}`,
          config
        );
        alert("Jadwal berhasil dihapus.");
        fetchData(); // Muat ulang data
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus jadwal.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex" style={{ fontFamily: "Poppins, sans-serif" }}>
      <SidebarAdmin />

      <main className="flex-grow p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Jadwal Operasional</h1>
          <button
            onClick={() => handleOpenModal(null)}
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Jadwal
          </button>
        </div>

        {error && !isModalOpen && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p>Loading...</p>}

        {/* Tabel Data Jadwal */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  No
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Nama Bus
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Tujuan
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Waktu Keberangkatan
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jadwalList.map((data, index) => (
                <tr key={data.id_jadwal} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 font-medium">{data.nama_bus}</td>
                  <td className="py-4 px-6">{data.tujuan}</td>
                  <td className="py-4 px-6">{data.waktu}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(data)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(data.id_jadwal)}
                      className="text-red-600 hover:text-red-800"
                      title="Hapus"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* --- MODAL TAMBAH/EDIT DATA --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">
                {isEditing ? "Edit Jadwal" : "Tambah Jadwal"}
              </h3>
              <button onClick={handleCloseModal}>
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* --- DROPDOWN BUS --- */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Bus
                </label>
                <select
                  value={formData.bus_id}
                  onChange={(e) =>
                    setFormData({ ...formData, bus_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">-- Pilih Bus --</option>
                  {bus.map((bus) => (
                    <option key={bus.id_bus} value={bus.id_bus}>
                      {bus.nama_bus}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tujuan</label>
                <input
                  type="text"
                  value={formData.tujuan}
                  onChange={(e) =>
                    setFormData({ ...formData, tujuan: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Waktu Keberangkatan
                </label>
                <input
                  type="time" // Tipe 'time' untuk jam
                  value={formData.waktu}
                  onChange={(e) =>
                    setFormData({ ...formData, waktu: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminJadwal;
