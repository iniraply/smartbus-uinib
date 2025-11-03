import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleLogin from "./components/RoleLogin";
import LoginDriver from "./pages/LoginDriver";
import LoginPenumpang from "./pages/LoginPenumpang";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDataDriver from "./pages/AdminDataDriver";
import AdminDataPenumpang from "./pages/AdminDataPenumpang";
import AdminJadwal from "./pages/AdminJadwal";
import AdminLaporan from "./pages/AdminLaporan";

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
      </Routes>
    </Router>
  );
}

export default App;
