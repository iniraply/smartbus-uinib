// src/components/RoleLogin.jsx (FINAL: CLEAN, TENGAH, TANPA KOTAK IKON)

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaIdCard, FaUserShield, FaBus } from "react-icons/fa";

const RoleLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full animate-fade-in-down">
        {/* 1. Header */}
        <div className="mb-10">
          <div className="mx-auto bg-brand-primary text-white w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-2xl mb-6 transform hover:rotate-6 transition-transform duration-500 cursor-default">
            <FaBus />
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            SmartBus <span className="text-brand-primary">UIN IB</span>
          </h1>
          <p className="mt-2 text-brand-dark/60 text-sm font-medium">
            Pantau jadwal dan lokasi bus kampus secara real-time.
          </p>
        </div>

        {/* 2. Tombol Utama */}
        <div className="space-y-4">
          {/* Tombol Penumpang */}
          <button
            onClick={() => navigate("/login/penumpang")}
            className="w-full group relative flex items-center justify-center py-4 px-6 bg-brand-primary text-white rounded-2xl shadow-lg 
            hover:bg-brand-dark hover:shadow-xl hover:-translate-y-1 
            active:scale-95 transition-all duration-300"
          >
            {/* Hapus <span> pembungkus background, langsung ikon & teks */}
            <div className="flex items-center gap-3 text-lg font-bold">
              <FaUser className="text-2xl" />
              <span>Saya Penumpang</span>
            </div>
          </button>

          {/* Tombol Driver */}
          <button
            onClick={() => navigate("/login/driver")}
            className="w-full group relative flex items-center justify-center py-4 px-6 bg-white text-brand-dark rounded-2xl shadow-md border-2 border-transparent 
            hover:border-brand-primary/20 hover:shadow-lg hover:-translate-y-1 
            active:scale-95 transition-all duration-300"
          >
            {/* Hapus <span> pembungkus background, langsung ikon & teks */}
            <div className="flex items-center gap-3 text-lg font-bold">
              <FaIdCard className="text-2xl text-brand-primary" />
              <span>Saya Driver</span>
            </div>
          </button>
        </div>

        {/* 3. Footer Admin */}
        <div className="mt-12 pt-6 border-t border-brand-dark/10">
          <p className="text-xs text-brand-dark/40 mb-3 uppercase tracking-widest font-bold">
            Khusus Pengelola Sistem
          </p>

          <button
            onClick={() => navigate("/login/admin")}
            className="text-sm font-semibold text-brand-dark/50 hover:text-brand-primary transition-colors flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-lg hover:bg-brand-primary/5"
          >
            <FaUserShield />
            Login Admin
          </button>
        </div>
      </div>

      <div className="fixed bottom-6 text-[10px] text-brand-dark/30 font-medium">
        &copy; 2025 UIN Imam Bonjol Padang
      </div>
    </div>
  );
};

export default RoleLogin;
