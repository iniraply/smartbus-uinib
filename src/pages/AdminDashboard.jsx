// src/pages/AdminDashboard.jsx
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 shadow rounded-lg text-center">
              <h3 className="text-gray-500">Total Bus Aktif</h3>
              <p className="text-3xl font-bold text-red-700">2</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg text-center">
              <h3 className="text-gray-500">Total Driver</h3>
              <p className="text-3xl font-bold text-red-700">3</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg text-center">
              <h3 className="text-gray-500">Laporan Masuk</h3>
              <p className="text-3xl font-bold text-red-700">3</p>
            </div>
          </div>

          {/* Table + Map */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="font-semibold mb-2">Data Bus</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2 border">Bus</th>
                    <th className="p-2 border">Tujuan</th>
                    <th className="p-2 border">Waktu</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Bus 1</td>
                    <td className="p-2 border">Kampus 3</td>
                    <td className="p-2 border">6:30</td>
                    <td className="p-2 border text-green-600">Aktif</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Bus 2</td>
                    <td className="p-2 border">Kampus 2</td>
                    <td className="p-2 border">8:30</td>
                    <td className="p-2 border text-gray-500">Belum Aktif</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
              <h3 className="font-semibold mb-3">Lacak Bus</h3>
              <div className="bg-gray-300 w-full h-64 flex items-center justify-center text-gray-600">
                [Map Placeholder]
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
