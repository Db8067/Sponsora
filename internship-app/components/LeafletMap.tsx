"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function LeafletMap({ address }: { address: string }) {
  const [coords, setCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!address) return;
    
    // Simple geocoding using Nominatim
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          // Default to a generic location if not found
          setCoords([20.5937, 78.9629]); // India
        }
      })
      .catch(() => setCoords([20.5937, 78.9629]));
  }, [address]);

  if (!coords) {
    return <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 text-foreground/50">Loading Map...</div>;
  }

  return (
    <MapContainer center={coords} zoom={13} style={{ height: "100%", width: "100%", zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords} icon={icon}>
        <Popup>{address}</Popup>
      </Marker>
      <MapUpdater center={coords} />
    </MapContainer>
  );
}
