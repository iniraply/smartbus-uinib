import React from "react"; // Pastikan import React ada
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>  <-- HAPUS INI
  <App />
  // </StrictMode>, <-- HAPUS INI
);
