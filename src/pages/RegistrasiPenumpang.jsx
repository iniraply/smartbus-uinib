// src/pages/RegistrasiPenumpang.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrasiPenumpang() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { username, email, password, konfirmasiPassword } = formData;

  // Fungsi untuk menangani perubahan input
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi saat form disubmit
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validasi password
    if (password !== konfirmasiPassword) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Panggil API Backend!
      const body = { username, email, password };
      const res = await axios.post(
        "http://localhost:3001/api/auth/register/penumpang",
        body
      );

      // Jika sukses
      setLoading(false);
      alert(res.data.message); // Tampilkan "Registrasi berhasil!"
      navigate("/login/penumpang"); // Arahkan ke halaman login
    } catch (err) {
      // Jika gagal
      setLoading(false);
      setError(err.response.data.message); // Tampilkan "Email sudah terdaftar."
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl"
        style={{ fontFamily: "sans-serif" }}
      >
        {" "}
        {/* Style mirip wireframe */}
        <h1 className="text-3xl font-bold text-center">Buat Akun</h1>
        <form onSubmit={onSubmit} className="space-y-4">
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
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="konfirmasiPassword"
              value={konfirmasiPassword}
              onChange={onChange}
              placeholder="Konfirmasi Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Tampilkan error jika ada */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md disabled:bg-gray-400"
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrasiPenumpang;
