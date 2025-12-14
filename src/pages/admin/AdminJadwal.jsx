// src/pages/admin/AdminJadwal.jsx (TEMA BARU)

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaTrash,
  FaPlus,
  FaEdit,
  FaClock,
  FaBus,
} from "react-icons/fa";
import SidebarAdmin from "../../components/SidebarAdmin";

function AdminJadwal() {
  const [jadwalList, setJadwalList] = useState([]);
  const [busList, setBusList] = useState([]); // Untuk dropdown

  // State Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // State Data
  const [newData, setNewData] = useState({ id_bus: "", waktu: "", tujuan: "" });
  const [editData, setEditData] = useState({
    id_jadwal: "",
    id_bus: "",
    waktu: "",
    tujuan: "",
  });

  const [loading, setLoading] = useState(false);
  const getAuthToken = () => localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  // --- FETCH DATA ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // Ambil Data Jadwal
      const resJadwal = await axios.get(
        "http://localhost:3001/api/admin/jadwal",
        config
      );
      setJadwalList(resJadwal.data);

      // Ambil Data Bus (untuk dropdown)
      const resBus = await axios.get(
        "http://localhost:3001/api/admin/bus",
        config
      );
      setBusList(resBus.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/admin/jadwal",
        newData,
        config
      );
      alert("Jadwal berhasil ditambahkan!");
      setShowAddModal(false);
      setNewData({ id_bus: "", waktu: "", tujuan: "" });
      fetchData();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      alert(`Gagal tambah jadwal: ${msg}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/admin/jadwal/${editData.id_jadwal}`,
        editData,
        config
      );
      alert("Jadwal berhasil diperbarui!");
      setShowEditModal(false);
      fetchData();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      alert(`Gagal update jadwal: ${msg}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus jadwal ini?")) {
      try {
        await axios.delete(
          `http://localhost:3001/api/admin/jadwal/${id}`,
          config
        );
        fetchData();
      } catch (err) {
        alert("Gagal hapus jadwal");
      }
    }
  };

  const openEdit = (item) => {
    setEditData({
      id_jadwal: item.id_jadwal,
      id_bus: item.id_bus,
      waktu: item.waktu,
      tujuan: item.tujuan || item.rute, // Sesuaikan dengan nama kolom di DB
    });
    setShowEditModal(true);
  };

  return (
    <div className="flex font-sans bg-brand-cream min-h-screen text-brand-dark">
      <SidebarAdmin />
      <main className="flex-grow p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-primary">
            Kelola Jadwal Operasional
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-primary hover:bg-brand-dark text-brand-cream px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all"
          >
            <FaPlus /> Tambah Jadwal
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-primary/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-primary text-brand-cream">
              <tr>
                <th className="p-4 font-semibold">Waktu Berangkat</th>
                <th className="p-4 font-semibold">Unit Bus</th>
                <th className="p-4 font-semibold">Tujuan / Rute</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/10">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : jadwalList.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 text-center italic text-gray-500"
                  >
                    Belum ada jadwal.
                  </td>
                </tr>
              ) : (
                jadwalList.map((item) => (
                  <tr
                    key={item.id_jadwal}
                    className="hover:bg-brand-cream/30 transition-colors"
                  >
                    <td className="p-4 font-bold text-brand-primary flex items-center gap-2">
                      <FaClock />{" "}
                      {item.waktu ? item.waktu.substring(0, 5) : "-"} WIB
                    </td>
                    <td className="p-4 font-medium">
                      <span className="flex items-center gap-2 bg-brand-primary/10 px-3 py-1 rounded-full w-fit text-sm">
                        <FaBus className="text-brand-primary" /> {item.nama_bus}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{item.tujuan || item.rute}</td>
                    <td className="p-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="bg-brand-accent hover:bg-red-700 text-white p-2 rounded-lg shadow transition-all"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id_jadwal)}
                        className="bg-brand-dark hover:bg-black text-white p-2 rounded-lg shadow transition-all"
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
              <FaPlus /> Tambah Jadwal
            </h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Pilih Bus
                </label>
                <select
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                  value={newData.id_bus}
                  onChange={(e) =>
                    setNewData({ ...newData, id_bus: e.target.value })
                  }
                  required
                >
                  <option value="">-- Pilih Unit Bus --</option>
                  {busList.map((bus) => (
                    <option key={bus.id_bus} value={bus.id_bus}>
                      {bus.nama_bus} ({bus.plat_nomor || "No Plat"})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Waktu Keberangkatan
                </label>
                <input
                  type="time"
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                  value={newData.waktu}
                  onChange={(e) =>
                    setNewData({ ...newData, waktu: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Tujuan / Rute
                </label>
                <input
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                  placeholder="Contoh: Kampus 2 ke Kampus 3"
                  value={newData.tujuan}
                  onChange={(e) =>
                    setNewData({ ...newData, tujuan: e.target.value })
                  }
                  required
                />
              </div>
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
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg shadow"
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
              <FaEdit /> Edit Jadwal
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Pilih Bus
                </label>
                <select
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.id_bus}
                  onChange={(e) =>
                    setEditData({ ...editData, id_bus: e.target.value })
                  }
                  required
                >
                  <option value="">-- Pilih Unit Bus --</option>
                  {busList.map((bus) => (
                    <option key={bus.id_bus} value={bus.id_bus}>
                      {bus.nama_bus}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Waktu
                </label>
                <input
                  type="time"
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.waktu}
                  onChange={(e) =>
                    setEditData({ ...editData, waktu: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-dark">
                  Tujuan
                </label>
                <input
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  value={editData.tujuan}
                  onChange={(e) =>
                    setEditData({ ...editData, tujuan: e.target.value })
                  }
                  required
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
                  className="px-4 py-2 bg-brand-accent text-white rounded-lg shadow"
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

export default AdminJadwal;
