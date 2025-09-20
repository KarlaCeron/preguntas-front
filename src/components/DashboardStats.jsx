import { useEffect, useState } from "react";
import { API_URL } from "../services/api";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    partidas: 0,
    jugadores: 0,
    categoriasTop: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/stats`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h2>📊 Estadísticas Globales</h2>
      <p>Partidas jugadas: {stats.partidas}</p>
      <p>Jugadores únicos: {stats.jugadores}</p>

      <h3>🏆 Categorías más acertadas</h3>
      <ul>
        {stats.categoriasTop.length > 0 ? (
          stats.categoriasTop.map((cat, i) => (
            <li key={i}>{cat.nombre} - {cat.aciertos} aciertos</li>
          ))
        ) : (
          <p>No hay datos aún</p>
        )}
      </ul>
    </div>
  );
}
