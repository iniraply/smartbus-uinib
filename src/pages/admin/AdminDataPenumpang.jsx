// src/pages/admin/AdminDataPenumpang.jsx
import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import axios from "axios";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function AdminDataPenumpang() {
  // --- Semua state diganti dari 'driver' ke 'penumpang' ---
  const [penumpangList, setPenumpangList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAuthToken = () => localStorage.getItem("token");

  // --- 1. FUNGSI READ (GET ALL PENUMPANG) ---
  const fetchPenumpang = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      // Ganti URL API
      const res = await axios.get("http://localhost:3001/api/admin/penumpang", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPenumpangList(res.data);
    } catch (err) {
      setError(
        "Gagal mengambil data penumpang. " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPenumpang();
  }, []);

  // --- 2. FUNGSI UNTUK MODAL ---
  const handleOpenModal = (data = null) => {
    setError("");
    if (data) {
      // Mode Edit
      setIsEditing(true);
      setCurrentId(data.id_user);
      setFormData({
        nama: data.nama,
        email: data.email,
        password: "",
      });
    } else {
      // Mode Tambah
      setIsEditing(false);
      setCurrentId(null);
      setFormData({ nama: "", email: "", password: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentId(null);
  };

  // --- 3. FUNGSI CREATE & UPDATE (SUBMIT MODAL) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = getAuthToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const dataToSubmit = { ...formData };
    if (isEditing && !dataToSubmit.password) {
      delete dataToSubmit.password;
    }

    try {
      if (isEditing) {
        // UPDATE (PUT) - Ganti URL API
        await axios.put(
          `http://localhost:3001/api/admin/penumpang/${currentId}`,
          dataToSubmit,
          config
        );
        alert("Penumpang berhasil diperbarui!");
      } else {
        // CREATE (POST) - Ganti URL API
        await axios.post(
          "http://localhost:3001/api/admin/penumpang",
          dataToSubmit,
          config
        );
        alert("Penumpang berhasil ditambahkan!");
      }

      handleCloseModal();
      fetchPenumpang(); // Muat ulang data
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // --- 4. FUNGSI DELETE (HAPUS PENUMPANG) ---
  const handleDelete = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus penumpang ini?")) {
      setLoading(true);
      setError("");
      try {
        const token = getAuthToken();
        // Ganti URL API
        await axios.delete(`http://localhost:3001/api/admin/penumpang/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Penumpang berhasil dihapus.");
        fetchPenumpang(); // Muat ulang data
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus penumpang.");
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
          <h1 className="text-3xl font-bold">Data Penumpang</h1>
          <button
            onClick={() => handleOpenModal(null)}
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Penumpang
          </button>
        </div>

        {error && !isModalOpen && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p>Loading...</p>}

        {/* Tabel Data Penumpang */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  No
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Nama Penumpang
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {penumpangList.map((data, index) => (
                <tr key={data.id_user} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 font-medium">{data.nama}</td>
                  <td className="py-4 px-6">{data.email}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(data)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(data.id_user)}
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
                {isEditing ? "Edit Data Penumpang" : "Tambah Data Penumpang"}
              </h3>
              <button onClick={handleCloseModal}>
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Penumpang
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder={
                    isEditing ? "Isi untuk reset password" : "Wajib diisi"
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  required={!isEditing}
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

export default AdminDataPenumpang;
