import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleLogin from "./components/RoleLogin";
import LoginDriver from "./pages/LoginDriver";
import LoginPenumpang from "./pages/LoginPenumpang";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDataDriver from "./pages/admin/AdminDataDriver";
import AdminDataPenumpang from "./pages/admin/AdminDataPenumpang";
import AdminJadwal from "./pages/admin/AdminJadwal";
import AdminLaporan from "./pages/admin/AdminLaporan";
import AdminLogout from "./pages/admin/AdminLogout";
import DriverHome from "./pages/driver/DriverHome";
import DriverAktivasi from "./pages/driver/DriverAktivasi";
import DriverJadwal from "./pages/driver/DriverJadwal";
import HomePenumpang from "./pages/penumpang/HomePenumpang";
import PenumpangLacak from "./pages/penumpang/PenumpangLacak";
import PenumpangJadwal from "./pages/penumpang/PenumpangJadwal";
import PenumpangLaporan from "./pages/penumpang/PenumpangLaporan";
import RegistrasiPenumpang from "./pages/RegistrasiPenumpang";
import ProfilPenumpang from "./pages/penumpang/ProfilPenumpang";
import AdminDataBus from "./pages/admin/AdminDataBus";
import ProfilDriver from "./pages/driver/ProfilDriver";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      {/* 2. PASANG WADAHNYA DISINI (Di atas Routes atau di bawahnya, asal di dalam Router) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Pilihan: "light", "dark", "colored"
      />
      <Routes>
        {/* --- HALAMAN PUBLIK (Bisa diakses siapa saja) --- */}
        <Route path="/" element={<RoleLogin />} />
        <Route path="/login/driver" element={<LoginDriver />} />
        <Route path="/login/penumpang" element={<LoginPenumpang />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/register/penumpang" element={<RegistrasiPenumpang />} />

        {/* --- HALAMAN KHUSUS ADMIN --- */}
        {/* Hanya user dengan role 'admin' yang bisa masuk sini */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/datadriver" element={<AdminDataDriver />} />
          <Route path="/admin/datapenumpang" element={<AdminDataPenumpang />} />
          <Route path="/admin/jadwal" element={<AdminJadwal />} />
          <Route path="/admin/databus" element={<AdminDataBus />} />
          <Route path="/admin/laporan" element={<AdminLaporan />} />
          <Route path="/admin/logout" element={<AdminLogout />} />
        </Route>

        {/* --- HALAMAN KHUSUS DRIVER --- */}
        {/* Hanya user dengan role 'driver' yang bisa masuk sini */}
        <Route element={<PrivateRoute allowedRoles={["driver"]} />}>
          <Route path="/driver/home" element={<DriverHome />} />
          <Route path="/driver/aktivasi" element={<DriverAktivasi />} />
          <Route path="/driver/jadwal" element={<DriverJadwal />} />
          <Route path="/driver/profil" element={<ProfilDriver />} />
        </Route>

        {/* --- HALAMAN KHUSUS PENUMPANG --- */}
        {/* Hanya user dengan role 'penumpang' yang bisa masuk sini */}
        <Route element={<PrivateRoute allowedRoles={["penumpang"]} />}>
          <Route path="/penumpang/home" element={<HomePenumpang />} />
          <Route path="/penumpang/lacak" element={<PenumpangLacak />} />
          <Route path="/penumpang/jadwal" element={<PenumpangJadwal />} />
          <Route path="/penumpang/lapor" element={<PenumpangLaporan />} />
          <Route path="/penumpang/profil" element={<ProfilPenumpang />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
