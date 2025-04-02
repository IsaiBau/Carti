import React from 'react';
import Card from './Card';

interface Parada {
  id_paradas: number;
  nombre: string;
}

interface ParadasListProps {
  paradas: Parada[];
  paradasCompletadas: number[];
  esVuelta: boolean;
}

export const ParadasList: React.FC<ParadasListProps> = ({ 
  paradas, 
  paradasCompletadas, 
  esVuelta
}) => {
  // Si no hay paradas, no mostrar el componente
  if (paradas.length === 0) return null;

  // Ordenar paradas según dirección
  const paradasOrdenadas = esVuelta ? [...paradas].reverse() : [...paradas];

  // Dividir en grupos
  const completadas = paradasOrdenadas.filter(p => paradasCompletadas.includes(p.id_paradas));
  const proximas = paradasOrdenadas.filter(p => !paradasCompletadas.includes(p.id_paradas));

  // Obtener elementos a mostrar
  const ultimasCompletadas = completadas.slice(-2);
  const siguientesProximas = proximas.slice(0, 2);

  return (
    <Card title="Progreso del Viaje" subtitle={`${completadas.length}/${paradas.length} paradas`}>
      <div className="grid grid-cols-2 gap-4 p-3">
        {/* Paradas pasadas */}
        <div className="space-y-2">
          <div className="font-bold text-sm text-gray-600">Pasadas</div>
          {ultimasCompletadas.map(parada => (
            <div key={parada.id_paradas} className="line-through text-gray-500 text-sm">
              ✓ {parada.nombre}
            </div>
          ))}
          {ultimasCompletadas.length === 0 && <div className="text-gray-400 text-sm">-</div>}
        </div>

        {/* Próximas paradas */}
        <div className="space-y-2">
          <div className="font-bold text-sm text-gray-600">Siguientes</div>
          {siguientesProximas.map(parada => (
            <div key={parada.id_paradas} className="text-gray-700 text-sm">
              ○ {parada.nombre}
            </div>
          ))}
          {siguientesProximas.length === 0 && <div className="text-gray-400 text-sm">-</div>}
        </div>
      </div>
    </Card>
  );
};