// src/components/MapWrapper.jsx
import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // CSS Peta PENTING
import { renderToStaticMarkup } from "react-dom/server";
import { FaBus } from "react-icons/fa";

// --- Fix Icon Leaflet (Dipindahkan ke sini) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// --- Komponen Update Posisi Peta ---
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15, { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
}

// --- ICON CUSTOM (Dipindahkan ke sini) ---
const createBusIcon = (isFull) => {
  const colorClass = isFull ? "bg-red-600" : "bg-green-600";
  const pointerClass = isFull ? "bg-red-600" : "bg-green-600";

  const iconMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center w-12 h-12">
      <div
        className={`absolute w-12 h-12 ${colorClass} rounded-full border-2 border-white shadow-xl opacity-90 animate-pulse`}
      ></div>
      <FaBus className="relative z-10 text-white w-6 h-6" />
      <div
        className={`absolute -bottom-1 w-3 h-3 ${pointerClass} rotate-45 border-b-2 border-r-2 border-white`}
      ></div>
    </div>
  );
  return L.divIcon({
    html: iconMarkup,
    className: "custom-bus-icon",
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
};

const createUserIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md z-20"></div>
      <div className="absolute w-12 h-12 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
    </div>
  );
  return L.divIcon({
    html: iconMarkup,
    className: "custom-user-icon",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// --- KOMPONEN UTAMA WRAPPER ---
const MapWrapper = ({
  center,
  userLocation,
  activeBuses,
  handleBusSelect,
  currentBus,
  selectedDestination,
  DESTINATIONS,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={14}
      zoomControl={false}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} />

      {/* Marker User */}
      {userLocation && (
        <Marker position={userLocation} icon={createUserIcon()}>
          <Popup>Lokasi Anda</Popup>
        </Marker>
      )}

      {/* Marker Bus */}
      {activeBuses.map((bus) => (
        <Marker
          key={bus.id_bus}
          position={[parseFloat(bus.latitude), parseFloat(bus.longitude)]}
          icon={createBusIcon(bus.status_penumpang === "Penuh")}
          eventHandlers={{
            click: () => handleBusSelect(bus.id_bus),
          }}
        >
          <Popup className="custom-popup">
            <div className="text-center">
              <h3 className="font-bold text-brand-primary text-sm">
                {bus.nama_bus}
              </h3>
              <p className="text-xs font-medium text-gray-500">{bus.rute}</p>
              {bus.status_penumpang === "Penuh" ? (
                <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                  PENUH
                </span>
              ) : (
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full">
                  TERSEDIA
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Polyline Rute */}
      {currentBus && selectedDestination && (
        <Polyline
          positions={[
            [parseFloat(currentBus.latitude), parseFloat(currentBus.longitude)],
            DESTINATIONS[selectedDestination],
          ]}
          pathOptions={{
            color: "#800000",
            dashArray: "10, 10",
            opacity: 0.6,
            weight: 4,
          }}
        />
      )}
    </MapContainer>
  );
};

export default MapWrapper;
