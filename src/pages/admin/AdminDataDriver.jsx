// src/pages/admin/AdminDataDriver.jsx (TEMA BARU)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserTie, FaTrash, FaPlus, FaEdit, FaEnvelope } from "react-icons/fa";
import SidebarAdmin from "../../components/SidebarAdmin";

function AdminDataDriver() {
  const [drivers, setDrivers] = useState([]);

  // State Modal Tambah
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    nama: "",
    email: "",
    password: "",
  });

  // State Modal Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nama: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const getAuthToken = () => localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  // --- FETCH DATA ---
  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3001/api/admin/drivers",
        config
      );
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // --- HANDLER TAMBAH ---
  const handleAddDriver = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/admin/drivers",
        newDriver,
        config
      );
      alert("Driver berhasil ditambahkan!");
      setShowAddModal(false);
      setNewDriver({ nama: "", email: "", password: "" });
      fetchDrivers();
    } catch (err) {
      const pesan = err.response?.data?.message || err.message;
      alert(`Gagal tambah driver: ${pesan}`);
    }
  };

  // --- HANDLER EDIT ---
  const openEditModal = (driver) => {
    // Mapping id_user ke id
    setEditData({
      id: driver.id_user || driver.id,
      nama: driver.nama,
      email: driver.email,
      password: "", // Kosongkan password saat edit (opsional diisi)
    });
    setShowEditModal(true);
  };

  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/admin/drivers/${editData.id}`,
        editData,
        config
      );
      alert("Data driver berhasil diperbarui!");
      setShowEditModal(false);
      fetchDrivers();
    } catch (err) {
      const pesan = err.response?.data?.message || err.message;
      alert(`Gagal update driver: ${pesan}`);
    }
  };

  // --- HANDLER DELETE (DEBUG VERSION) ---
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Yakin hapus driver ini? Tindakan ini tidak bisa dibatalkan."
      )
    ) {
      try {
        await axios.delete(
          `http://localhost:3001/api/admin/drivers/${id}`,
          config
        );
        alert("Driver berhasil dihapus."); // Beri notif sukses
        fetchDrivers();
      } catch (err) {
        console.error("Error Hapus:", err);
        // Tampilkan pesan error spesifik dari backend
        const pesan = err.response?.data?.message || err.message;
        alert(`Gagal hapus driver: ${pesan}`);
      }
    }
  };

  return (
    <div className="flex font-sans bg-brand-cream min-h-screen text-brand-dark">
      <SidebarAdmin />

      <main className="flex-grow p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-primary">
            Kelola Data Driver
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-primary hover:bg-brand-dark text-brand-cream px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all"
          >
            <FaPlus /> Tambah Driver
          </button>
        </div>

        {/* TABEL DRIVER */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-primary/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-primary text-brand-cream">
              <tr>
                <th className="p-4 font-semibold">Nama Driver</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/10">
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : drivers.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-4 text-center italic text-gray-500"
                  >
                    Belum ada data driver.
                  </td>
                </tr>
              ) : (
                drivers.map((driver) => (
                  <tr
                    key={driver.id_user || driver.id}
                    className="hover:bg-brand-cream/30 transition-colors"
                  >
                    <td className="p-4 font-bold flex items-center gap-3">
                      <div className="bg-brand-primary/10 p-2 rounded-full text-brand-primary">
                        <FaUserTie />
                      </div>
                      {driver.nama}
                    </td>
                    <td className="p-4 text-sm text-brand-dark/80">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-brand-primary/40" />{" "}
                        {driver.email}
                      </div>
                    </td>
                    <td className="p-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(driver)}
                        className="bg-brand-accent hover:bg-red-700 text-white p-2 rounded-lg shadow transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(driver.id_user || driver.id)
                        }
                        className="bg-brand-dark hover:bg-black text-white p-2 rounded-lg shadow transition-all"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* --- MODAL TAMBAH --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-down border-2 border-brand-primary">
            <h2 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
              <FaPlus /> Tambah Driver Baru
            </h2>
            <form onSubmit={handleAddDriver} className="space-y-4">
              <input
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Nama Lengkap"
                value={newDriver.nama}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, nama: e.target.value })
                }
                required
              />
              <input
                type="email"
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Email"
                value={newDriver.email}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Password"
                value={newDriver.password}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, password: e.target.value })
                }
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-brand-dark hover:bg-brand-cream rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg shadow hover:bg-brand-dark"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL EDIT --- */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-down border-2 border-brand-accent">
            <h2 className="text-xl font-bold text-brand-accent mb-4 flex items-center gap-2">
              <FaEdit /> Edit Driver
            </h2>
            <form onSubmit={handleUpdateDriver} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Nama
                </label>
                <input
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.nama}
                  onChange={(e) =>
                    setEditData({ ...editData, nama: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Password Baru (Opsional)
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  placeholder="Isi jika ingin mengganti password"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-brand-dark hover:bg-brand-cream rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-accent text-white rounded-lg shadow hover:bg-brand-dark"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDataDriver;
