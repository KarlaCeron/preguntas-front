import { useEffect, useState } from "react";
import { socket } from "../sockets/socket";

export default function PlayerTable() {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    // Escuchar lista de jugadores
    socket.on("jugadoresActualizados", (data) => {
      setJugadores(data);
    });

    // Cleanup
    return () => {
      socket.off("jugadoresActualizados");
    };
  }, []);

  return (
    <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
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
    </div>
  );
}
