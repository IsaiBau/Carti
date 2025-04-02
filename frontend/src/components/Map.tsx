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

    const startPoint = [17.848208, -92.926518]; // Playas
    const endPoint = [18.034475, -92.906818]; // Reclusorio
    const waypointsList = [
      startPoint,
      endPoint,
      [17.51444, -92.55286],
      [17.866895, -92.924036],
      [17.875493, -92.923023],
      [17.879075, -92.922527],
      [17.884149, -92.921965],
      [17.884519, -92.922222],
      [17.892725, -92.923332],
      [17.892749, -92.923565],
      [17.900414, -92.922260],
      [17.900296, -92.922042],
      [17.904901, -92.922397],
      [17.905072, -92.922681],
      [17.907442, -92.922304],
      [17.907401, -92.922788],
      [17.911131, -92.918351],
      [17.913160, -92.915570],
      [17.913252, -92.915699],
      [17.919498, -92.911615],
      [17.919388, -92.911440],
      [17.920369, -92.911303],
      [17.922347, -92.910839],
      [17.922635, -92.910857],
      [17.927725, -92.912536],
      [17.928643, -92.913314],
      [17.948327, -92.915686],
      [17.948457, -92.91579],
      [17.970670, -92.923325],
      [17.970468, -92.923392],
      [17.973182, -92.926300],
      [17.972825, -92.925612],
      [17.981107, -92.933985],
      [17.980061, -92.933130],
      [17.981988, -92.935027],
      [17.983772, -92.936739],
      [17.989502, -92.942476],
      [17.995557, -92.941908],
      [17.995889, -92.942191],
      [17.989077, -92.942261],
      [17.997523, -92.939837],
      [17.996846, -92.941201],
      [18.001506, -92.927955],
      [18.007527, -92.923370],
      [18.007336, -92.923209],
      [18.013019, -92.918501],
      [18.013063, -92.918769],
      [18.014294, -92.916505],
      [18.014886, -92.916064],
      [18.017979, -92.910995],
      [8.017993, -92.909807],
      [8.025863, -92.905756],
      [18.025971, -92.905945],
      [18.030087, -92.903923],
      [18.030034, -92.903382]
    ];

    const control = L.Routing.control({
      waypoints: waypointsList.map(coords => L.latLng(coords[0], coords[1])),
      routeWhileDragging: true,
      draggableWaypoints: true,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
      lineOptions: {
        styles: [{ color: '#3a7bd5', opacity: 0.7, weight: 5 }]
      },
      createMarker: (i, waypoint) => {
        return L.marker(waypoint.latLng, {
          draggable: true,
          icon: L.icon({
            iconUrl: i === 0
              ? 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png'
              : 'https://cdn-icons-png.flaticon.com/512/2776/2776000.png',
            iconSize: [32, 32]
          })
        });
      }
    }).addTo(map);

    return () => {
      map.removeControl(control);
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