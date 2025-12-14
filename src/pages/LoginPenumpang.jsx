// src/pages/LoginPenumpang.jsx (Dengan Ikon Mata)

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // <-- IMPOR IKON

function LoginPenumpang() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // --- STATE BARU ---
  const [showPassword, setShowPassword] = useState(false); // <-- TAMBAHKAN INI

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { identifier, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login/penumpang",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoading(false);
      alert(res.data.message);
      navigate("/penumpang/home");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-cream">
      <div
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl"
        style={{ fontFamily: "sans-serif" }}
      >
        <div className="text-center">
          <h1 className="text-xl font-bold text-brand-dark">Selamat Datang</h1>
          <h2 className="text-3xl font-bold">SmartBus UIN IB</h2>
          <p className="mt-2 font-semibold text-gray-600">Login Penumpang</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="identifier"
              value={identifier}
              onChange={onChange}
              placeholder="Email atau Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* --- BAGIAN PASSWORD BERUBAH --- */}
          <div className="relative">
            {" "}
            {/* <-- 1. Buat kontainer relative */}
            <input
              type={showPassword ? "text" : "password"} // <-- 2. Tipe dinamis
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md" // pr-10 untuk spasi ikon
              required
            />
            {/* --- 3. Tombol Ikon Mata --- */}
            <button
              type="button" // Penting agar tidak men-submit form
              onClick={() => setShowPassword(!showPassword)} // Toggle state
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-accent text-white font-semibold rounded-md shadow-md disabled:bg-gray-400 hover:bg-brand-dark"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>

          <p className="text-sm text-center text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register/penumpang"
              className="font-semibold text-brand-accent hover:underline"
            >
              Registrasi
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPenumpang;
