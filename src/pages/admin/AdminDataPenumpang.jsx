// src/pages/admin/AdminDataPenumpang.jsx (TEMA BARU)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaTrash, FaPlus, FaEdit, FaEnvelope } from "react-icons/fa";
import SidebarAdmin from "../../components/SidebarAdmin";

function AdminDataPenumpang() {
  const [penumpang, setPenumpang] = useState([]);

  // State Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // State Data
  const [newData, setNewData] = useState({ nama: "", email: "", password: "" });
  const [editData, setEditData] = useState({
    id: "",
    nama: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const getAuthToken = () => localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3001/api/admin/penumpang",
        config
      );
      setPenumpang(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/admin/penumpang",
        newData,
        config
      );
      alert("Penumpang berhasil ditambahkan!");
      setShowAddModal(false);
      setNewData({ nama: "", email: "", password: "" });
      fetchData();
    } catch (err) {
      alert("Gagal tambah penumpang");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/admin/penumpang/${editData.id}`,
        editData,
        config
      );
      alert("Penumpang berhasil diupdate!");
      setShowEditModal(false);
      fetchData();
    } catch (err) {
      alert("Gagal update penumpang");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus penumpang ini?")) {
      try {
        await axios.delete(
          `http://localhost:3001/api/admin/penumpang/${id}`,
          config
        );
        fetchData();
      } catch (err) {
        alert("Gagal hapus");
      }
    }
  };

  const openEdit = (p) => {
    setEditData({ id: p.id_user, nama: p.nama, email: p.email, password: "" });
    setShowEditModal(true);
  };

  return (
    <div className="flex font-sans bg-brand-cream min-h-screen text-brand-dark">
      <SidebarAdmin />
      <main className="flex-grow p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-primary">
            Kelola Data Penumpang
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-primary hover:bg-brand-dark text-brand-cream px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all"
          >
            <FaPlus /> Tambah Penumpang
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-primary/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-primary text-brand-cream">
              <tr>
                <th className="p-4 font-semibold">Nama Penumpang</th>
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
              ) : (
                penumpang.map((p) => (
                  <tr
                    key={p.id_user}
                    className="hover:bg-brand-cream/30 transition-colors"
                  >
                    <td className="p-4 font-bold flex items-center gap-3">
                      <div className="bg-brand-primary/10 p-2 rounded-full text-brand-primary">
                        <FaUser />
                      </div>
                      {p.nama}
                    </td>
                    <td className="p-4 text-sm text-brand-dark/80">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-brand-primary/40" />{" "}
                        {p.email}
                      </div>
                    </td>
                    <td className="p-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="bg-brand-accent hover:bg-red-700 text-white p-2 rounded-lg shadow transition-all"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id_user)}
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
              <FaPlus /> Tambah Penumpang
            </h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Nama"
                value={newData.nama}
                onChange={(e) =>
                  setNewData({ ...newData, nama: e.target.value })
                }
                required
              />
              <input
                type="email"
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Email"
                value={newData.email}
                onChange={(e) =>
                  setNewData({ ...newData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Password"
                value={newData.password}
                onChange={(e) =>
                  setNewData({ ...newData, password: e.target.value })
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
              <FaEdit /> Edit Penumpang
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
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
                  className="w-full p-3 border border-brand-primary/20 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  placeholder="Isi untuk ganti password"
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

export default AdminDataPenumpang;
