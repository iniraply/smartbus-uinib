import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      </Routes>
    </Router>
  );
}

export default App;
