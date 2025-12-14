// src/pages/admin/AdminLogout.jsx (FIX: WARNA SESUAI TEMA)

import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AdminLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Hapus Sesi
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // 2. Notifikasi Sukses
    toast.success("Logout berhasil!", {
      position: "top-center",
      autoClose: 2000,
    });

    // 3. Redirect ke Login Admin
    navigate("/login/admin");
  };

  const handleCancel = () => {
    navigate("/admin/dashboard"); // Kembali ke dashboard
  };

  return (
    // Layout Konsisten dengan Halaman Admin Lain
    <div className="flex font-sans bg-brand-cream min-h-screen text-brand-dark">
      <SidebarAdmin />

      {/* Konten Utama (Tengah Layar) */}
      <main className="flex-grow ml-64 flex items-center justify-center p-8">
        {/* Kartu Konfirmasi */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border-2 border-brand-primary/10 animate-fade-in-down relative overflow-hidden">
          {/* Hiasan Background (Lingkaran Pudar) */}
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-accent/5 rounded-full blur-xl"></div>

          {/* Ikon Besar (Maroon Pudar) */}
          <div className="bg-brand-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <FaSignOutAlt className="text-4xl text-brand-primary ml-1" />
          </div>

          <h2 className="text-2xl font-bold text-brand-primary mb-2">
            Konfirmasi Logout
          </h2>
          <p className="text-brand-dark/60 mb-8 leading-relaxed">
            Apakah Anda yakin ingin mengakhiri sesi dan keluar dari sistem?
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-col gap-3">
            {/* TOMBOL UTAMA: MAROON (Sesuai Tema) */}
            <button
              onClick={handleLogout}
              className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Ya, Keluar Sekarang
            </button>

            {/* TOMBOL BATAL: Abu-abu Netral */}
            <button
              onClick={handleCancel}
              className="w-full bg-gray-200 hover:bg-gray-300 text-brand-dark font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Batal
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
