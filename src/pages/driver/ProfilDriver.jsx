// src/pages/driver/ProfilDriver.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeftIcon,
  UserCircleIcon,
  XMarkIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import DriverBottomNav from "../../components/DriverBottomNav"; // <-- PENTING: Pakai Navigasi Driver

function ProfilDriver() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", username: "" });
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- FUNGSI LOGOUT ---
  const handleLogout = () => {
    if (window.confirm("Anda yakin ingin logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  // --- AMBIL DATA USER ---
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        const username = userData.username || userData.nama;
        setUser({ email: userData.email, username });
      } else {
        navigate("/login/driver");
      }
    } catch (e) {
      navigate("/login/driver");
    }
  }, [navigate]);

  // --- MODAL HANDLERS ---
  const handleEditClick = () => {
    setFormData({
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

  // --- SUBMIT UPDATE ---
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const updateData = {
        email: formData.email,
        username: formData.username,
      };
      if (formData.password) updateData.password = formData.password;

      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Kita gunakan API yang SAMA dengan penumpang (karena tabel users-nya satu)
      const res = await axios.put(
        "http://localhost:3001/api/users/profile",
        updateData,
        config
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser({
        email: res.data.user.email,
        username: res.data.user.nama,
      });

      setLoading(false);
      setShowModal(false);
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Gagal memperbarui profil.");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-cream">
      {/* Header */}
      <header className="flex items-center p-4 bg-white/50 backdrop-blur-md shadow-sm z-10 sticky top-0 border-b border-brand-primary/10">
        <button
          onClick={() => navigate(-1)}
          className="text-brand-dark hover:text-brand-primary transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-center flex-grow text-brand-dark">
          Profil Driver
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Konten Profil */}
      <main className="flex-grow p-4 space-y-4">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="bg-brand-primary/10 p-4 rounded-full mb-4">
            <UserCircleIcon className="h-20 w-20 text-brand-accent" />
          </div>

          <div className="w-full space-y-3 text-left">
            <div className="border-b pb-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                Username
              </label>
              <p className="text-lg font-semibold text-brand-dark">
                {user.username}
              </p>
            </div>
            <div className="border-b pb-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                Email
              </label>
              <p className="text-lg font-semibold text-brand-dark">
                {user.email}
              </p>
            </div>
            <div className="pb-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                Peran
              </label>
              <p className="text-lg font-semibold text-brand-accent">
                Pengemudi Bus
              </p>
            </div>
          </div>

          <button
            onClick={handleEditClick}
            className="mt-6 w-full bg-brand-accent text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-brand-dark transition-colors"
          >
            Edit Profil
          </button>

          <button
            onClick={handleLogout}
            className="mt-3 w-full bg-white border-2 border-red-500 text-red-500 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-red-50 flex items-center justify-center gap-2 transition-colors"
          >
            <PowerIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </main>

      {/* --- Modal Edit Profil (Sama Persis) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm transform transition-all scale-100">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-brand-dark">
                Edit Data Diri
              </h3>
              <button onClick={() => setShowModal(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleModalSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={onModalChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onModalChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password Baru (Opsional)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onModalChange}
                  placeholder="Kosongkan jika tidak diganti"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 font-medium bg-brand-cream rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-white font-medium bg-brand-accent rounded-lg hover:bg-brand-dark disabled:bg-gray-400 transition-colors shadow-md"
                >
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DriverBottomNav />
    </div>
  );
}

export default ProfilDriver;
