import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "./Card";

interface Unidad {
    numero_combi: string;
    choferes: string;
    gestionTotal: string;
    gestionAvg: string;
    gastosAvg: string;
    accion: string;
}

const UnidadesTable = () => {
    const [unidades, setUnidades] = useState<Unidad[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchUnidades = async () => {
            try {
                const response = await axios.get('/api/unidades');
                
                if (response.data.message) {
                    throw new Error(response.data.message);
                }

                setUnidades(response.data);
            } catch (error) {
                console.error("Error fetching unidades:", error);
                // setError(error.response?.data?.error || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUnidades();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card title="Lista de unidades" subtitle="">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2"><input type="checkbox"/></th>
                        <th className="p-2"># COMBI</th>
                        <th className="p-2">CHOFERES</th>
                        <th className="p-2">GCIA. TOT.</th>
                        <th className="p-2">GCIA. AVG.</th>
                        <th className="p-2">GTOS. AVG.</th>
                        <th className="p-2">ACCIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    {unidades.map((unidad, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-2 text-center"><input type="checkbox"/></td>
                            <td className="p-2">{unidad.numero_combi}</td>
                            <td className="p-2">{unidad.choferes}</td>
                            <td className="p-2">{unidad.gestionTotal}</td>
                            <td className="p-2">{unidad.gestionAvg}</td>
                            <td className="p-2">{unidad.gastosAvg}</td>
                            <td className="p-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                    {unidad.accion}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

export default UnidadesTable;
