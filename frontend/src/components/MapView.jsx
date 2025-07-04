import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

function ChangeMapView({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lon], map.getZoom(), {
      animate: true,
      duration: 1.5,
    });
  }, [lat, lon, map]);

  return null;
}

const MapView = ({ lat, lon }) => (
  <MapContainer
    center={[lat, lon]}
    zoom={10}
    scrollWheelZoom={true}
    style={{ height: "400px", width: "100%" }}
  >
    <ChangeMapView lat={lat} lon={lon} />

    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="© OpenStreetMap contributors"
    />

    <Marker position={[lat, lon]}>
      <Popup>Selected Location</Popup>
    </Marker>
  </MapContainer>
);

export default MapView;
