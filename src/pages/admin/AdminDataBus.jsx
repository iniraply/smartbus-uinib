// src/pages/admin/AdminDataBus.jsx
import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import axios from "axios";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function AdminDataBus() {
  const [buses, setBuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    nama_bus: "",
    rute: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAuthToken = () => localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  // --- 1. FUNGSI READ ---
  const fetchBuses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3001/api/admin/bus",
        config
      );
      setBuses(res.data);
    } catch (err) {
      setError(
        "Gagal mengambil data bus. " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // --- 2. FUNGSI MODAL ---
  const handleOpenModal = (data = null) => {
    setError("");
    if (data) {
      setIsEditing(true);
      setCurrentId(data.id_bus);
      setFormData({ nama_bus: data.nama_bus, rute: data.rute });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({ nama_bus: "", rute: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // --- 3. FUNGSI CREATE & UPDATE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3001/api/admin/bus/${currentId}`,
          formData,
          config
        );
        alert("Bus berhasil diperbarui!");
      } else {
        await axios.post(
          "http://localhost:3001/api/admin/bus",
          formData,
          config
        );
        alert("Bus berhasil ditambahkan!");
      }
      handleCloseModal();
      fetchBuses();
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // --- 4. FUNGSI DELETE ---
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Anda yakin ingin menghapus bus ini? (Ini mungkin gagal jika bus terdaftar di jadwal)"
      )
    ) {
      setLoading(true);
      setError("");
      try {
        await axios.delete(`http://localhost:3001/api/admin/bus/${id}`, config);
        alert("Bus berhasil dihapus.");
        fetchBuses();
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus bus.");
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
          <h1 className="text-3xl font-bold">Data Bus</h1>
          <button
            onClick={() => handleOpenModal(null)}
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Bus
          </button>
        </div>

        {error && !isModalOpen && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p>Loading...</p>}

        {/* Tabel Data Bus */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Nama Bus
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Rute
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {buses.map((bus) => (
                <tr key={bus.id_bus} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">{bus.nama_bus}</td>
                  <td className="py-4 px-6">{bus.rute}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        bus.status_bus === "Aktif"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {bus.status_bus}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(bus)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(bus.id_bus)}
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
                {isEditing ? "Edit Bus" : "Tambah Bus"}
              </h3>
              <button onClick={handleCloseModal}>
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Bus
                </label>
                <input
                  type="text"
                  value={formData.nama_bus}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_bus: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rute</label>
                <input
                  type="text"
                  value={formData.rute}
                  onChange={(e) =>
                    setFormData({ ...formData, rute: e.target.value })
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

export default AdminDataBus;
