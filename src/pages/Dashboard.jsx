import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Dashboard() {
  const [jugadores, setJugadores] = useState([]);
  const [pregunta, setPregunta] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    partidasJugadas: 0,
    ranking: [],
    categorias: []
  });

  useEffect(() => {
    // 👥 Jugadores conectados
    socket.on("jugadoresActualizados", (data) => {
      setJugadores(data);
    });

    // 🚀 Inicio del juego
    socket.on("iniciarJuego", () => {
      console.log("🎮 Juego iniciado");
    });

    // ❓ Pregunta nueva
    socket.on("nuevaPregunta", (preg) => {
      setPregunta(preg);
      setRespuestas([]); // reset respuestas
    });

    // 📝 Respuesta de jugador
    socket.on("respuestaJugador", (data) => {
      setRespuestas((prev) => [...prev, data]);
    });

    // 🌍 Estadísticas globales
    socket.on("estadisticasActualizadas", (data) => {
      setEstadisticas(data);
    });

    return () => {
      socket.off("jugadoresActualizados");
      socket.off("iniciarJuego");
      socket.off("nuevaPregunta");
      socket.off("respuestaJugador");
      socket.off("estadisticasActualizadas");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard del Juego</h1>

      {/* 👥 Jugadores conectados */}
      <section>
        <h2>👥 Jugadores conectados</h2>
        {jugadores.length === 0 ? (
          <p>No hay jugadores conectados</p>
        ) : (
          <ul>
            {jugadores.map((j) => (
              <li key={j.id}>{j.nombre}</li>
            ))}
          </ul>
        )}
      </section>

      {/* ❓ Pregunta actual */}
      {pregunta && (
        <section>
          <h2>❓ Pregunta actual</h2>
          <p><b>{pregunta.question}</b></p>
          <ul>
            {pregunta.options?.map((op, i) => (
              <li key={i}>{op}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 📝 Respuestas */}
      <section>
        <h2>📝 Respuestas</h2>
        {respuestas.length === 0 ? (
          <p>No hay respuestas aún</p>
        ) : (
          <ul>
            {respuestas.map((r, i) => (
              <li key={i}>
                {r.jugador} → {r.correcta ? "✅ Correcta" : "❌ Incorrecta"}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 🌍 Estadísticas globales */}
      <section>
        <h2>🌍 Estadísticas globales</h2>
        <p>Partidas jugadas: {estadisticas.partidasJugadas}</p>

        <h3>🏆 Ranking</h3>
        {estadisticas.ranking.length === 0 ? (
          <p>No hay ranking aún</p>
        ) : (
          <ul>
            {estadisticas.ranking.map((r, i) => (
              <li key={i}>
                {r.nombre}: {r.victorias} victorias
              </li>
            ))}
          </ul>
        )}

        <h3>📚 Categorías más acertadas</h3>
        {estadisticas.categorias.length === 0 ? (
          <p>No hay estadísticas de categorías</p>
        ) : (
          <ul>
            {estadisticas.categorias.map((c, i) => (
              <li key={i}>
                {c.categoria}: {c.aciertos} aciertos
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}