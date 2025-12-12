// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  // 1. Ambil token dan data user dari penyimpanan
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  let user = null;

  try {
    user = JSON.parse(userString);
  } catch (e) {
    user = null;
  }

  // 2. Cek apakah Token ada?
  if (!token || !user) {
    // Jika tidak login, tendang ke halaman pemilihan role (Landing Page)
    return <Navigate to="/" replace />;
  }

  // 3. Cek apakah Role sesuai? (Jika allowedRoles didefinisikan)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Jika role salah (misal: Penumpang coba masuk Admin), tendang balik
    alert("Anda tidak memiliki akses ke halaman ini!");

    // Redirect berdasarkan role asli user agar tidak nyasar
    if (user.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "driver") return <Navigate to="/driver/home" replace />;
    if (user.role === "penumpang")
      return <Navigate to="/penumpang/home" replace />;

    return <Navigate to="/" replace />;
  }

  // 4. Jika semua aman, izinkan masuk (Render halaman tujuan)
  return <Outlet />;
};

export default PrivateRoute;
