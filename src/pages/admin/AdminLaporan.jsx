import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import { useState } from "react";

export default function AdminLaporan() {
  const [laporan, setLaporan] = useState([
    {
      id: 1,
      nama: "Diandra Marsha",
      isi: "Pelayanan busnya bagus",
      tanggal: "18 Oktober 2025",
    },
    {
      id: 2,
      nama: "Rafi Hidayat",
      isi: "GPS bus kadang delay, tolong diperbaiki 🙏",
      tanggal: "17 Oktober 2025",
    },
    {
      id: 3,
      nama: "Siti Nurhaliza",
      isi: "Jadwal bus sore sering terlambat.",
      tanggal: "15 Oktober 2025",
    },
  ]);

  const handleDetail = (id) => {
    alert(`Detail laporan ID ${id} (belum dihubungkan ke backend).`);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          {/* Header */}
          <h2 className="text-xl font-bold text-gray-700 mb-6">
            Laporan Penumpang
          </h2>

          {/* Daftar laporan */}
          <div className="flex flex-col space-y-4">
            {laporan.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-between items-start bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                {/* Kiri */}
                <div className="flex items-start space-x-4">
                  {/* Titik garis timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-red-700 rounded-full"></div>
                    {index < laporan.length - 1 && (
                      <div className="w-[2px] h-10 bg-gray-300"></div>
                    )}
                  </div>

                  {/* Info laporan */}
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base">
                      {item.nama}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{item.isi}</p>
                    <button
                      onClick={() => handleDetail(item.id)}
                      className="text-sm bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800 transition"
                    >
                      Detail Laporan
                    </button>
                  </div>
                </div>

                {/* Kanan - tanggal */}
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {item.tanggal}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
