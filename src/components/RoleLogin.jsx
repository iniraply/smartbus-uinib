// src/components/RoleLogin.jsx (Dengan Ikon Bus)

import React from "react";
import { Link } from "react-router-dom";
// --- IMPOR DARI LIBRARY BARU: react-icons ---
import { FaBus, FaUser, FaIdCard, FaShieldAlt } from "react-icons/fa";

function RoleLogin() {
  return (
    // Kontainer utama: Full-screen, layout di tengah, dan latar belakang cerah
    <div className="min-h-screen bg-brand-cream flex flex-col justify-center items-center p-6">
      {/* 1. Bagian Judul dan Ilustrasi (IKON BUS BARU) */}
      <div className="text-center mb-10">
        <FaBus className="w-24 h-24 text-brand-accent mx-auto" />
        <h1 className="text-3xl font-bold text-brand-dark mt-4">
          Selamat Datang di{" "}
          <span className="text-brand-accent">SmartBus UIN IB</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Silakan pilih peran Anda untuk melanjutkan.
        </p>
      </div>

      {/* 2. Tombol Aksi */}
      <div className="w-full max-w-sm space-y-4">
        {/* Tombol 1: Penumpang */}
        <Link
          to="/login/penumpang"
          className="group flex items-center justify-center w-full p-5 bg-brand-accent text-white rounded-xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50"
        >
          <FaUser className="h-6 w-6 mr-3" /> {/* <-- Ikon Baru */}
          <span className="text-lg font-semibold">Saya Penumpang</span>
        </Link>

        {/* Tombol 2: Driver */}
        <Link
          to="/login/driver"
          className="group flex items-center justify-center w-full p-5 bg-white text-gray-700 rounded-xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50"
        >
          <FaIdCard className="h-6 w-6 mr-3 text-gray-500" />{" "}
          {/* <-- Ikon Baru */}
          <span className="text-lg font-semibold">Saya Driver</span>
        </Link>

        {/* Tombol 3: Admin */}
        <Link
          to="/login/admin"
          className="group flex items-center justify-center w-full p-5 bg-white text-gray-700 rounded-xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50"
        >
          <FaShieldAlt className="h-6 w-6 mr-3 text-gray-500" />{" "}
          {/* <-- Ikon Baru */}
          <span className="text-lg font-semibold">Login Admin</span>
        </Link>
      </div>

      {/* Footer sederhana */}
      <p className="text-gray-500 text-sm mt-12">
        © 2025 SmartBus UIN Imam Bonjol
      </p>
    </div>
  );
}

export default RoleLogin;
