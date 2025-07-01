import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ lat, lon }) => (
  <MapContainer
    center={[lat, lon]}
    zoom={10}
    scrollWheelZoom={true}
    style={{ height: "400px", width: "100%" }}
  >
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
