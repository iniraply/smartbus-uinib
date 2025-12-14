// src/pages/RegistrasiPenumpang.jsx (FINAL CLEAN + TOASTIFY)

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

function RegistrasiPenumpang() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { username, email, password, konfirmasiPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validasi Password
    if (password !== konfirmasiPassword) {
      toast.error("Password dan Konfirmasi tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      const body = { username, email, password };
      // Pastikan endpoint backend Anda benar
      await axios.post(
        "http://192.168.100.17:3001/api/auth/register/penumpang",
        body
      );

      setLoading(false);

      // Notif Sukses
      toast.success("Registrasi Berhasil! Silakan Login");

      navigate("/login/penumpang");
    } catch (err) {
      setLoading(false);
      // Notif Gagal
      const pesan = err.response?.data?.message || "Registrasi gagal";
      toast.error(`Gagal: ${pesan}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-cream font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl animate-fade-in-down">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-brand-primary">
            SmartBus UIN IB
          </h1>
          <p className="mt-2 font-medium text-gray-500">Registrasi Penumpang</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Input Username */}
          <div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all"
              required
            />
          </div>

          {/* Input Email */}
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all"
              required
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-brand-primary transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Input Konfirmasi Password */}
          <div className="relative">
            <input
              type={showKonfirmasiPassword ? "text" : "password"}
              name="konfirmasiPassword"
              value={konfirmasiPassword}
              onChange={onChange}
              placeholder="Konfirmasi Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowKonfirmasiPassword(!showKonfirmasiPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-brand-primary transition-colors"
            >
              {showKonfirmasiPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Tombol Daftar */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-accent text-white font-bold rounded-lg shadow-md hover:bg-brand-dark hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Mendaftar..." : "Daftar Sekarang"}
            </button>
          </div>

          {/* Link Login */}
          <p className="text-sm text-center text-gray-600">
            Sudah punya akun?{" "}
            <Link
              to="/login/penumpang"
              className="font-bold text-brand-primary hover:text-brand-dark hover:underline transition-colors"
            >
              Login disini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrasiPenumpang;
