import React, { useEffect } from 'react';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import '../styles.module.css';

const Routing = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Definir íconos personalizados
    const iconRed = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const iconBlue = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    // Waypoints de ida (rojo)
    const waypointsList1 = [
      [17.863111, -92.927805],//mercedes
      [17.862575, -92.924857],
      [17.862357, -92.924658],
      [17.866719, -92.924081],
      [17.875516, -92.923006],
      [17.878952, -92.922607],
      [17.884160, -92.921975],
      [17.892734, -92.923354],
      [17.900255, -92.922077],
      [17.904892, -92.922411],
      [17.907465, -92.922289],
      [17.911325, -92.917977],
      [17.913281, -92.915549],
      [17.920417, -92.911217],
      [17.922476, -92.910774],
      [17.928461, -92.913092],
      [17.948522, -92.915604],
      [17.970512, -92.923170],
      [17.972844, -92.925657],
      [17.974267, -92.927064],
      [17.981064, -92.933945],
      [17.984124, -92.937001],
      [17.995515, -92.941920],
      [17.997468, -92.939924],
      [17.998690, -92.938806],
      [18.007110, -92.923349],
      [18.014375, -92.916415],
      [18.018028, -92.909790],
      [18.024184, -92.906658],
      [18.025933, -92.905663],
      [18.029813, -92.903484],
      [18.035105, -92.901680],
      [18.034475, -92.906818],//reclusorio
    ];

    // Waypoints de regreso (azul)
    const waypointsList2 = [
      [18.034475, -92.906818],//reclusorio
      [18.029889, -92.903955],
      [18.026037, -92.905939],
      [18.024595, -92.906924],
      [18.017920, -92.911010],
      [18.014888, -92.916067],
      [18.007441, -92.923485],
      [17.998840, -92.938950],
      [17.996844, -92.941180],
      [17.995961, -92.942091],
      [17.983219, -92.936373],
      [17.980078, -92.933153],
      [17.974371, -92.927460],
      [17.973088, -92.926171],
      [17.970560, -92.923407],
      [17.948556, -92.915791],
      [17.927717, -92.912599],
      [17.922629, -92.910852],
      [17.920505, -92.911352],
      [17.913228, -92.915720],
      [17.911780, -92.917483],
      [17.907368, -92.922804],
      [17.905103, -92.922656],
      [17.900487, -92.922269],
      [17.892743, -92.923549],
      [17.884583, -92.922223],
      [17.879009, -92.922829],
      [17.875556, -92.923243],
      [17.866990, -92.924275],
      [17.863111, -92.927805],//mercedes
    ];

    // Función para crear una ruta con íconos personalizados
    const createRoute = (waypoints, color, icon) => {
      return L.Routing.control({
        waypoints: waypoints.map(coords => L.latLng(coords[0], coords[1])),
        routeWhileDragging: true,
        draggableWaypoints: false,
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
        }),
        lineOptions: {
          styles: [{ color, opacity: 0.9, weight: 5 }],
        },
        createMarker: function (i, waypoint) {
          return L.marker(waypoint.latLng, { icon });
        },
      }).addTo(map);
    };

    const firstRoute = createRoute(waypointsList1, '#FF0000', iconRed); // Rojo (ida)
    const secondRoute = createRoute(waypointsList2, '#0000FF', iconBlue); // Azul (regreso)

    return () => {
      map.removeControl(firstRoute);
      map.removeControl(secondRoute);
    };
  }, [map]);

  return null;
};

export const LeaMap = () => {
  return (
    <MapContainer 
      center={[17.98689, -92.93028]} 
      zoom={15} 
      maxBounds={[[17.844365, -92.762971], [18.118344, -93.067755]]}
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