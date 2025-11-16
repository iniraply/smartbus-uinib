import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/solid";
import { FaMapMarkerAlt, FaBus } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";

function HomePenumpang() {
  const navigate = useNavigate(); // Kita aktifkan lagi

  const [userName, setUserName] = useState("");
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  useEffect(() => {
    try {
      // Ambil data 'user' yang kita simpan saat login
      const userData = JSON.parse(localStorage.getItem("user"));

      // 'userData.nama' adalah kolom 'username' Anda
      if (userData && userData.nama) {
        // Opsional: Buat huruf pertama jadi kapital (misal: "wildaa" -> "Wildaa")
        const name =
          userData.nama.charAt(0).toUpperCase() + userData.nama.slice(1);
        setUserName(name);
      }
    } catch (e) {
      console.error("Gagal mengambil data user dari localStorage", e);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
           {" "}
      <main className="flex-grow overflow-y-auto pb-20 p-4 space-y-4">
                {/* Kartu 1: Selamat Datang */}       {" "}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    {/* INI PERBAIKANNYA: Menggunakan TruckIcon */}         {" "}
          <FaBus className="h-12 w-12 text-blue-600 mx-auto mb-2" />         {" "}
          <h1 className="text-xl font-bold">SmartBus UIN IB</h1>         {" "}
          <p className="text-gray-600 mt-2">
                        Hello {userName}, Selamat Datang!          {" "}
          </p>
                 {" "}
        </div>
                {/* Kartu 2: Jadwal Hari Ini */}       {" "}
        <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="font-semibold text-lg">Jadwal Hari Ini</h2> 
                  <p className="text-sm text-gray-500 mb-4">{today}</p>         {" "}
          <div className="space-y-2 mb-4">
                       {" "}
            <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
                       {" "}
            <div className="w-3/4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                     {" "}
          </div>
                   {" "}
          <button
            onClick={() => navigate("/penumpang/jadwal")}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
          >
                        Lihat Rute Disini          {" "}
          </button>
                 {" "}
        </div>
                {/* Kartu 3: Lacak Bus */}       {" "}
        <div className="bg-white shadow-md rounded-lg p-4 relative">
                   {" "}
          <div className="h-32 bg-green-100 rounded-md flex items-center justify-center relative overflow-hidden">
                       {" "}
            <div className="absolute w-full h-1 bg-yellow-400 transform -rotate-12"></div>
                       {" "}
            <div className="absolute w-full h-1 bg-yellow-400 transform rotate-12"></div>
                        <FaMapMarkerAlt className="h-8 w-8 text-red-500 z-10" />
                       {" "}
            <span className="absolute top-2 left-2 text-xs text-gray-400">
                            Peta Kampus            {" "}
            </span>
                     {" "}
          </div>
                   {" "}
          <button
            onClick={() => navigate("/penumpang/lacak")}
            className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gray-900 mt-4"
          >
                        Lacak Bus          {" "}
          </button>
                 {" "}
        </div>
             {" "}
      </main>
            <BottomNav />   {" "}
    </div>
  );
}

export default HomePenumpang;
