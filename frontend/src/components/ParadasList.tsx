import React from 'react';

interface Parada {
  id_paradas: number;
  nombre: string;
}

interface ParadasListProps {
  paradas: Parada[];
  paradasCompletadas: number[];
  paradaActual?: number;
}

export const ParadasList: React.FC<ParadasListProps> = ({ 
  paradas, 
  paradasCompletadas, 
  paradaActual 
}) => {
  // Ordenar paradas según la dirección (ida o vuelta)
  const paradasOrdenadas = [...paradas].sort((a, b) => {
    return a.id_paradas - b.id_paradas; // Orden ascendente por ID (puedes ajustar esto)
  });

  // Dividir las paradas en grupos
  const completadas = paradasOrdenadas.filter(p => paradasCompletadas.includes(p.id_paradas));
  const proximas = paradasOrdenadas.filter(p => 
    !paradasCompletadas.includes(p.id_paradas) && p.id_paradas !== paradaActual
  );
  
  // Tomar las últimas 2 completadas
  const ultimasCompletadas = completadas.slice(-2);
  
  // Encontrar la parada actual
  const actual = paradaActual ? paradasOrdenadas.find(p => p.id_paradas === paradaActual) : null;
  
  // Tomar las próximas 2 paradas
  const siguientesProximas = proximas.slice(0, 2);

  return (
    <div className="mt-6 bg-blue-800 bg-opacity-50 p-4 rounded-lg">
      <h3 className="text-white poppins-bold text-xl mb-3">Progreso del Viaje</h3>
      <div className="grid grid-cols-3 gap-2 text-white">
        {/* Columna 1: Paradas completadas */}
        <div className="space-y-2">
          <div className="poppins-semibold text-sm opacity-80">Pasadas</div>
          {ultimasCompletadas.map(parada => (
            <div key={parada.id_paradas} className="line-through text-sm opacity-70">
              ✓ {parada.nombre}
            </div>
          ))}
          {ultimasCompletadas.length === 0 && (
            <div className="text-sm opacity-50">-</div>
          )}
        </div>
        
        {/* Columna 2: Parada actual */}
        <div className="space-y-2">
          <div className="poppins-semibold text-sm opacity-80">Actual</div>
          {actual ? (
            <div className="bg-blue-500 text-white text-sm font-bold p-1 px-2 rounded">
              ➔ {actual.nombre}
            </div>
          ) : (
            <div className="text-sm opacity-50">-</div>
          )}
        </div>
        
        {/* Columna 3: Próximas paradas */}
        <div className="space-y-2">
          <div className="poppins-semibold text-sm opacity-80">Siguientes</div>
          {siguientesProximas.map(parada => (
            <div key={parada.id_paradas} className="text-sm">
              ○ {parada.nombre}
            </div>
          ))}
          {siguientesProximas.length === 0 && (
            <div className="text-sm opacity-50">-</div>
          )}
        </div>
      </div>
    </div>
  );
};