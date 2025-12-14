// src/pages/RegistrasiPenumpang.jsx (Dengan link Kembali ke Login)

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // <-- Pastikan Link di-impor
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function RegistrasiPenumpang() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { username, email, password, konfirmasiPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== konfirmasiPassword) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const body = { username, email, password };
      const res = await axios.post(
        "http://localhost:3001/api/auth/register/penumpang",
        body
      );

      setLoading(false);
      alert(res.data.message);
      navigate("/login/penumpang");
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
          <h1 className="text-3xl font-bold">SmartBus UIN IB</h1>
          <p className="mt-2 font-semibold text-gray-600">
            Registrasi Penumpang
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* ... (Input Username) ... */}
          <div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* ... (Input Email) ... */}
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* ... (Input Password dengan ikon mata) ... */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* ... (Input Konfirmasi Password dengan ikon mata) ... */}
          <div className="relative">
            <input
              type={showKonfirmasiPassword ? "text" : "password"}
              name="konfirmasiPassword"
              value={konfirmasiPassword}
              onChange={onChange}
              placeholder="Konfirmasi Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => setShowKonfirmasiPassword(!showKonfirmasiPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showKonfirmasiPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* ... (Tombol Daftar) ... */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-accent text-white font-semibold rounded-md shadow-md disabled:bg-gray-400 hover:bg-brand-dark"
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </div>

          {/* --- INI DIA TAMBAHANNYA --- */}
          <p className="text-sm text-center text-gray-600">
            Sudah punya akun?{" "}
            <Link
              to="/login/penumpang"
              className="font-semibold text-brand-accent hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrasiPenumpang;
