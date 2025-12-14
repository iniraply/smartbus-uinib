// src/pages/admin/AdminDataBus.jsx (VERSI DEBUGGING & FIX)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBus, FaTrash, FaUserTie, FaPlus, FaEdit } from "react-icons/fa";
import SidebarAdmin from "../../components/SidebarAdmin";

function AdminDataBus() {
  const [busList, setBusList] = useState([]);
  const [driverList, setDriverList] = useState([]);

  // State Modal Tambah
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBus, setNewBus] = useState({
    nama_bus: "",
    plat_nomor: "",
    rute: "",
    status_bus: "Aktif",
  });

  // State Modal Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    id_bus: "",
    nama_bus: "",
    plat_nomor: "",
    rute: "",
    status_bus: "Aktif",
  });

  // State Modal Assign Driver
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState("");

  const [loading, setLoading] = useState(false);

  const getAuthToken = () => localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  // --- FETCH DATA ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const busRes = await axios.get(
        "http://localhost:3001/api/admin/bus",
        config
      );
      setBusList(busRes.data);
      const driverRes = await axios.get(
        "http://localhost:3001/api/admin/drivers-list",
        config
      );
      setDriverList(driverRes.data);
    } catch (err) {
      console.error("Error Fetching Data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLER TAMBAH (DIPERBAIKI) ---
  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/admin/bus", newBus, config);
      alert("Bus berhasil ditambahkan!");
      setShowAddModal(false);
      setNewBus({
        nama_bus: "",
        plat_nomor: "",
        rute: "",
        status_bus: "Aktif",
      });
      fetchData();
    } catch (err) {
      // TAMPILKAN ERROR ASLI
      console.error("Error Tambah:", err);
      const pesan = err.response?.data?.message || err.message;
      alert(`Gagal menambah bus: ${pesan}`);
    }
  };

  // --- HANDLER EDIT (DIPERBAIKI) ---
  const openEditModal = (bus) => {
    setEditData({
      id_bus: bus.id_bus,
      nama_bus: bus.nama_bus,
      plat_nomor: bus.plat_nomor,
      rute: bus.rute,
      status_bus: bus.status_bus,
    });
    setShowEditModal(true);
  };

  const handleUpdateBus = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/admin/bus/${editData.id_bus}`,
        editData,
        config
      );
      alert("Data bus berhasil diperbarui!");
      setShowEditModal(false);
      fetchData();
    } catch (err) {
      // TAMPILKAN ERROR ASLI
      console.error("Error Edit:", err);
      const pesan = err.response?.data?.message || err.message;
      alert(`Gagal update bus: ${pesan}`);
    }
  };

  // --- HANDLER ASSIGN ---
  const openAssignModal = (bus) => {
    setSelectedBus(bus);
    setSelectedDriverId(bus.driver_id || "");
    setShowAssignModal(true);
  };

  const handleAssignDriver = async (e) => {
    e.preventDefault();
    if (!selectedBus) return;
    try {
      await axios.put(
        `http://localhost:3001/api/admin/bus/${selectedBus.id_bus}/assign`,
        {
          driver_id: selectedDriverId || null,
        },
        config
      );
      alert(`Supir berhasil diupdate`);
      setShowAssignModal(false);
      fetchData();
    } catch (err) {
      console.error("Error Assign:", err);
      const pesan = err.response?.data?.message || err.message;
      alert(`Gagal update supir: ${pesan}`);
    }
  };

  // --- HANDLER DELETE ---
  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus bus ini?")) {
      try {
        await axios.delete(`http://localhost:3001/api/admin/bus/${id}`, config);
        fetchData();
      } catch (err) {
        alert("Gagal hapus bus");
      }
    }
  };

  return (
    <div className="flex font-sans bg-brand-cream min-h-screen text-brand-dark">
      <SidebarAdmin />

      <main className="flex-grow p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-primary">
            Kelola Unit Bus
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-primary hover:bg-brand-dark text-brand-cream px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all"
          >
            <FaPlus /> Tambah Bus
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-primary/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-primary text-brand-cream">
              <tr>
                <th className="p-4 font-semibold">Nama Bus</th>
                <th className="p-4 font-semibold">Plat Nomor</th>
                <th className="p-4 font-semibold">Rute</th>
                <th className="p-4 font-semibold">Supir</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/10">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                busList.map((bus) => (
                  <tr
                    key={bus.id_bus}
                    className="hover:bg-brand-cream/30 transition-colors"
                  >
                    <td className="p-4 font-bold">{bus.nama_bus}</td>
                    <td className="p-4 font-mono text-sm bg-brand-cream/20 rounded inline-block m-2 px-2 border border-brand-primary/10">
                      {bus.plat_nomor}
                    </td>
                    <td className="p-4 text-sm">{bus.rute}</td>
                    <td className="p-4">
                      {bus.nama_driver ? (
                        <span className="flex items-center gap-2 text-brand-primary font-bold bg-brand-primary/10 px-3 py-1 rounded-full text-sm w-fit">
                          <FaUserTie /> {bus.nama_driver}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm italic">
                          Belum ada supir
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center flex justify-center gap-2">
                      {/* Tombol Atur Supir */}
                      <button
                        onClick={() => openAssignModal(bus)}
                        className="bg-brand-dark hover:bg-black text-white p-2 rounded-lg shadow transition-all"
                        title="Atur Supir"
                      >
                        <FaUserTie />
                      </button>
                      {/* Tombol Edit */}
                      <button
                        onClick={() => openEditModal(bus)}
                        className="bg-brand-accent hover:bg-red-700 text-white p-2 rounded-lg shadow transition-all"
                        title="Edit Bus"
                      >
                        <FaEdit />
                      </button>
                      {/* Tombol Hapus */}
                      <button
                        onClick={() => handleDelete(bus.id_bus)}
                        className="bg-red-600 hover:bg-red-800 text-white p-2 rounded-lg shadow transition-all"
                        title="Hapus Bus"
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
              <FaPlus /> Tambah Bus
            </h2>
            <form onSubmit={handleAddBus} className="space-y-4">
              <input
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Nama Bus"
                value={newBus.nama_bus}
                onChange={(e) =>
                  setNewBus({ ...newBus, nama_bus: e.target.value })
                }
                required
              />
              <input
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Plat Nomor"
                value={newBus.plat_nomor}
                onChange={(e) =>
                  setNewBus({ ...newBus, plat_nomor: e.target.value })
                }
                required
              />
              <input
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Rute"
                value={newBus.rute}
                onChange={(e) => setNewBus({ ...newBus, rute: e.target.value })}
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
              <FaEdit /> Edit Bus
            </h2>
            <form onSubmit={handleUpdateBus} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Nama Bus
                </label>
                <input
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.nama_bus}
                  onChange={(e) =>
                    setEditData({ ...editData, nama_bus: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Plat Nomor
                </label>
                <input
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.plat_nomor}
                  onChange={(e) =>
                    setEditData({ ...editData, plat_nomor: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Rute
                </label>
                <input
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.rute}
                  onChange={(e) =>
                    setEditData({ ...editData, rute: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Status
                </label>
                <select
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.status_bus}
                  onChange={(e) =>
                    setEditData({ ...editData, status_bus: e.target.value })
                  }
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Rusak">Rusak / Tidak Aktif</option>
                </select>
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

      {/* --- MODAL ASSIGN --- */}
      {showAssignModal && selectedBus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-down border-2 border-brand-dark">
            <h2 className="text-xl font-bold text-brand-dark mb-2">
              Tugaskan Supir
            </h2>
            <form onSubmit={handleAssignDriver} className="space-y-4">
              <select
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-dark outline-none cursor-pointer"
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
              >
                <option value="">-- Pilih Driver / Kosongkan --</option>
                {driverList.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.nama}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-brand-dark hover:bg-brand-cream rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-dark text-white rounded-lg shadow hover:bg-black"
                >
                  Simpan
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
