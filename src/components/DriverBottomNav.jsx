// src/components/DriverBottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBus, FaCalendarAlt, FaUser } from "react-icons/fa";

function DriverBottomNav() {
  const location = useLocation();
  const activePath = location.pathname;

  const getClassName = (path) => {
    return activePath === path ? "text-blue-600" : "text-gray-500";
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex justify-around items-center z-20">
      <Link
        to="/driver/home"
        className={`flex flex-col items-center w-1/4 ${getClassName(
          "/driver/home"
        )}`}
      >
        <FaHome className="h-6 w-6" />
        <span className="text-xs">Beranda</span>
      </Link>

      <Link
        to="/driver/aktivasi"
        className={`flex flex-col items-center w-1/4 ${getClassName(
          "/driver/aktivasi"
        )}`}
      >
        <FaBus className="h-6 w-6" />
        <span className="text-xs">Aktivasi</span>
      </Link>

      <Link
        to="/driver/jadwal"
        className={`flex flex-col items-center w-1/4 ${getClassName(
          "/driver/jadwal"
        )}`}
      >
        <FaCalendarAlt className="h-6 w-6" />
        <span className="text-xs">Jadwal</span>
      </Link>

      {/* Profil Driver (bisa gunakan halaman ProfilPenumpang yang dimodifikasi atau buat baru) */}
      <Link
        to="/driver/profil"
        className={`flex flex-col items-center w-1/4 ${getClassName(
          "/driver/profil"
        )}`}
      >
        <FaUser className="h-6 w-6" />
        <span className="text-xs">Profil</span>
      </Link>
    </nav>
  );
}

export default DriverBottomNav;
