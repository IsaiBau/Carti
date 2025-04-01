import React, { useEffect } from 'react';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import '../styles.module.css';

// Definimos tipos para las props si fuera necesario
interface RoutingProps {}

// Componente para manejar el routing
const Routing: React.FC<RoutingProps> = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Puntos de la ruta
    const startPoint: [number, number] = [17.848208, -92.926518]; //playas
    const endPoint: [number, number] = [18.03316541561618, -92.90270670499629]; //reclusorio

    // Configuración del control de ruta
    const control = L.Routing.control({
      waypoints: [
        L.latLng(startPoint[0], startPoint[1]),
        L.latLng(endPoint[0], endPoint[1])
      ],
      routeWhileDragging: true,
      addWaypoints: true,
      draggableWaypoints: true,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
      lineOptions: {
        styles: [{ color: '#3a7bd5', opacity: 0.7, weight: 5 }]
      },
      createMarker: function(i: number, waypoint: any, n: number) {
        return L.marker(waypoint.latLng, {
          draggable: true,
          icon: L.icon({
            iconUrl: i === 0 
              ? 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png' 
              : 'https://cdn-icons-png.flaticon.com/512/2776/2776000.png',
            iconSize: [32, 32]
          }),
          title: waypoint.latLng.toString()
        });
      }
    }).addTo(map);

    // Limpieza al desmontar
    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
};

// Definimos tipos para las props del mapa si fuera necesario
interface LeaMapProps {}

export const LeaMap: React.FC<LeaMapProps> = () => {
  return (
    <MapContainer 
      center={[17.98689, -92.93028]} 
      zoom={15} 
      maxBounds={[
        [17.844365, -92.762971],
        [18.118344, -93.067755]
      ]}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Routing />
    </MapContainer>
  );
};

export default Map;