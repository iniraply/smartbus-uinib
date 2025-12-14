// src/pages/LoginPenumpang.jsx (FINAL CLEAN + TOASTIFY)

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

function LoginPenumpang() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { identifier, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://192.168.100.17:3001/api/auth/login/penumpang",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoading(false);

      // Notif Sukses
      toast.success("Login berhasil! Selamat datang");

      navigate("/penumpang/home");
    } catch (err) {
      setLoading(false);
      // Notif Gagal
      const pesan =
        err.response?.data?.message ||
        "Login gagal. Periksa koneksi atau data Anda.";
      toast.error(pesan);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-cream font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl animate-fade-in-down border-t-4 border-brand-primary">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-brand-dark">Selamat Datang</h1>
          <h2 className="text-3xl font-extrabold text-brand-primary mt-1">
            SmartBus UIN IB
          </h2>
          <p className="mt-2 font-medium text-gray-500">Login Penumpang</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Input Email/Username */}
          <div>
            <input
              type="text"
              name="identifier"
              value={identifier}
              onChange={onChange}
              placeholder="Email atau Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all"
              required
            />
          </div>

          {/* Input Password dengan Ikon Mata */}
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

          {/* Tombol Login */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-accent text-white font-bold rounded-lg shadow-md hover:bg-brand-dark hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>

          {/* Link Registrasi */}
          <p className="text-sm text-center text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register/penumpang"
              className="font-bold text-brand-primary hover:text-brand-dark hover:underline transition-colors"
            >
              Daftar disini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPenumpang;
