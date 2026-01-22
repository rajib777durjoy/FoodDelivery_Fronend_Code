import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import socket from "../../Socket";
import { useSelector } from "react-redux";

// Recenter component
const RecenterMap = ({ lat, lng, zoom }) => {
  const map = useMap();
  if (lat && lng) {
    map.setView([lat, lng], zoom); 
  }
  return null;
};

const TrackingMap = () => {
 const userData = useSelector(state=>state.user.user)
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(15);
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    // Watch your current location
    const watchId = navigator.geolocation.watchPosition((pos) => {
      setLocation({lat: pos.coords.latitude,lng: pos.coords.longitude})
      socket.emit('send_location',({lat: pos.coords.latitude,lng: pos.coords.longitude,user_id:15}))
    },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );


    // Listen to socket updates
    socket.on('receive_location', (location) => {
      console.log('receive_location::',location); // todo //
      setLocation(location);
    });

    // Cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId);
      // socket.off('send_location')
      socket.off('receive_location');
    };
  },[userData.id]);

  return (
    <MapContainer className="z-20" center={[location.lat, location.lng]} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <Marker position={[location.lat, location.lng]} />
      <RecenterMap lat={location.lat} lng={location.lng} zoom={zoom} />
    </MapContainer>
  );
};

export default TrackingMap;

