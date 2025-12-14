// src/pages/driver/ProfilDriver.jsx (FINAL CLEAN + TOASTIFY + SWEETALERT)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import {
  ArrowLeftIcon,
  UserCircleIcon,
  XMarkIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DriverBottomNav from "../../components/DriverBottomNav";

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

  // --- FUNGSI LOGOUT (SWEETALERT) ---
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Selesai Bertugas?",
      text: "Anda akan keluar dari sesi driver.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        container: "backdrop-blur-sm bg-black/30",
        popup: "rounded-2xl shadow-2xl font-sans",
        title: "text-brand-dark font-bold text-xl",
        htmlContainer: "text-gray-600",
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl ml-2 shadow-md transition-all",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-xl shadow-sm transition-all",
      },
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      toast.success("Logout berhasil!");
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
    setShowModal(true);
  };

  const onModalChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SUBMIT UPDATE ---
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const updateData = {
        email: formData.email,
        username: formData.username,
      };
      if (formData.password) updateData.password = formData.password;

      const config = {};

      const res = await api.put("/api/users/profile", updateData, config);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser({
        email: res.data.user.email,
        username: res.data.user.nama,
      });

      setLoading(false);
      setShowModal(false);

      // Notif Sukses
      toast.success("Profil berhasil diperbarui!");
    } catch (err) {
      setLoading(false);
      // Notif Gagal
      const msg = err.response?.data?.message || "Gagal memperbarui profil.";
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-cream font-sans">
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
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center animate-fade-in-up border border-brand-primary/5">
          {/* Lingkaran Biru di Belakang Ikon */}
          <div className="bg-brand-primary/5 p-4 rounded-full mb-4">
            <UserCircleIcon className="h-20 w-20 text-brand-primary" />
          </div>

          {/* Info User */}
          <div className="w-full space-y-4 text-left">
            <div className="border-b border-gray-100 pb-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Nama Driver
              </label>
              <p className="text-lg font-semibold text-brand-dark">
                {user.username}
              </p>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Email
              </label>
              <p className="text-lg font-semibold text-brand-dark">
                {user.email}
              </p>
            </div>
            <div className="pb-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Peran
              </label>
              <p className="text-lg font-semibold text-brand-primary">
                Pengemudi Bus
              </p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <button
            onClick={handleEditClick}
            className="mt-8 w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-brand-dark transition-all transform active:scale-95"
          >
            Edit Profil
          </button>

          <button
            onClick={handleLogout}
            className="mt-3 w-full bg-white border-2 border-red-100 text-red-500 font-bold py-3 px-4 rounded-xl shadow-sm hover:bg-red-50 hover:border-red-200 flex items-center justify-center gap-2 transition-all"
          >
            <PowerIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </main>

      {/* --- Modal Edit Profil --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-lg font-bold text-brand-dark">
                Edit Data Diri
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={onModalChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onModalChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Password Baru (Opsional)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onModalChange}
                  placeholder="Kosongkan jika tidak diganti"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 font-bold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-white font-bold bg-brand-primary rounded-lg hover:bg-brand-dark disabled:bg-gray-400 transition-colors shadow-md"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
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
