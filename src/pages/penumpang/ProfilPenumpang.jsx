// src/pages/penumpang/ProfilPenumpang.jsx (FIXED - Tanpa NAMA)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeftIcon,
  UserCircleIcon,
  XMarkIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

function ProfilPenumpang() {
  const navigate = useNavigate();
  // State user sekarang hanya butuh email dan username
  const [user, setUser] = useState({ email: "", username: "" });
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    if (window.confirm("Anda yakin ingin logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        // Kita ambil 'nama' dari token/storage dan set sebagai 'username'
        setUser({
          email: userData.email,
          username: userData.nama, // 'nama' dari token adalah username
        });
      } else {
        navigate("/login/penumpang");
      }
    } catch (e) {
      console.error("Gagal parse data user", e);
      navigate("/login/penumpang");
    }
  }, [navigate]);

  const handleEditClick = () => {
    setFormData({
      // Hapus 'nama' dari sini
      email: user.email,
      username: user.username,
      password: "",
    });
    setError("");
    setShowModal(true);
  };

  const onModalChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      //... (handling token error)
      return;
    }

    try {
      const updateData = {
        // Hapus 'nama' dari data yang dikirim
        email: formData.email,
        username: formData.username,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.put(
        "http://localhost:3001/api/users/profile",
        updateData,
        config
      );

      // Update localStorage dengan data baru dari backend
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Set state user baru
      setUser({
        email: res.data.user.email,
        username: res.data.user.nama, // 'nama' dari backend adalah username
      });

      setLoading(false);
      setShowModal(false);
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message || "Gagal memperbarui profil.");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      {/* Header */}
      <header className="flex items-center p-4 bg-white shadow-md z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">
          Profil Penumpang
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Konten Profil */}
      <main className="flex-grow p-4 space-y-4">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <UserCircleIcon className="h-24 w-24 text-gray-400 mb-4" />
          <div className="w-full space-y-2 text-left">
            {/* --- KOLOM NAMA SUDAH DIHAPUS --- */}

            <div>
              <label className="text-sm font-medium text-gray-500">
                Username
              </label>
              <p className="text-lg font-semibold">{user.username}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleEditClick}
            className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
          >
            Edit Profil
          </button>

          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <PowerIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </main>

      {/* --- Modal Edit Profil --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Profil</h3>
              <button onClick={() => setShowModal(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleModalSubmit} className="p-4 space-y-4">
              {/* --- INPUT NAMA SUDAH DIHAPUS --- */}

              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={onModalChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onModalChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Password Baru (Opsional)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onModalChange}
                  placeholder="Isi jika ingin ganti"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
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

export default ProfilPenumpang;
