import React, { useState } from 'react';
import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => 
{
  const [searchParams, setSearchParams ] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const navigate = useNavigate(); 
  
  return (
    <div className={styles.mapContainer} onClick={()=> navigate("form")}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
    </MapContainer>
  </div>
  )
}

export default Map;

