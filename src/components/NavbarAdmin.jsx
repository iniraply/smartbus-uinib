// src/components/NavbarAdmin.jsx
export default function NavbarAdmin() {
  return (
    <div className="bg-red-700 text-white flex justify-between items-center px-6 py-3 shadow">
      <h1 className="font-bold text-lg">SmartBus UIN IB</h1>
      <button className="bg-white text-red-700 px-4 py-1 rounded-md font-semibold hover:bg-red-100">
        Logout
      </button>
    </div>
  );
}
