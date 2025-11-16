import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import RoleLogin from "./components/RoleLogin";
import LoginDriver from "./pages/LoginDriver";
import LoginPenumpang from "./pages/LoginPenumpang";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDataDriver from "./pages/admin/AdminDataDriver";
import AdminDataPenumpang from "./pages/admin/AdminDataPenumpang";
import AdminJadwal from "./pages/admin/AdminJadwal";
import AdminLaporan from "./pages/admin/AdminLaporan";
import AdminLogout from "./pages/Admin/AdminLogout";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleLogin />} />
        <Route path="/login/driver" element={<LoginDriver />} />
        <Route path="/login/penumpang" element={<LoginPenumpang />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/datadriver" element={<AdminDataDriver />} />
        <Route path="/admin/datapenumpang" element={<AdminDataPenumpang />} />
        <Route path="/admin/jadwal" element={<AdminJadwal />} />
        <Route path="/admin/laporan" element={<AdminLaporan />} />
        <Route path="/admin/logout" element={<AdminLogout />} />
        <Route path="/driver/home" element={<DriverHome />} />
        <Route path="/driver/aktivasi" element={<DriverAktivasi />} />
        <Route path="/driver/jadwal" element={<DriverJadwal />} />
        <Route path="/penumpang/home" element={<HomePenumpang />} />
        <Route path="/penumpang/lacak" element={<PenumpangLacak />} />
        <Route path="/penumpang/jadwal" element={<PenumpangJadwal />} />
        <Route path="/penumpang/lapor" element={<PenumpangLaporan />} />
        <Route path="/registrasi/penumpang" element={<RegistrasiPenumpang />} />
        <Route path="/penumpang/profil" element={<ProfilPenumpang />} />
        <Route path="/admin/databus" element={<AdminDataBus />} />
      </Routes>
    </Router>
  );
}

export default App;
