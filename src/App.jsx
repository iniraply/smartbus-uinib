import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleLogin from "./components/RoleLogin";
import LoginDriver from "./pages/LoginDriver";
import LoginPenumpang from "./pages/LoginPenumpang";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDataDriver from "./pages/AdminDataDriver";

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
      </Routes>
    </Router>
  );
}

export default App;
