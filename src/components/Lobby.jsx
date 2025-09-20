import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../sockets/socket";

export default function Lobby() {
  const [jugadores, setJugadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("jugadoresActualizados", (data) => {
      setJugadores(data);
    });

    socket.on("iniciarJuego", () => {
      navigate("/juego");
    });

    return () => {
      socket.off("jugadoresActualizados");
      socket.off("iniciarJuego");
    };
  }, [navigate]);

  return (
    <div>
      <h2>Lobby de Jugadores</h2>
      <ul>
        {jugadores.map((j) => (
          <li key={j.id}>{j.nombre}</li>
        ))}
      </ul>
      <p>Esperando a que se unan 5 jugadores...</p>
    </div>
  );
}
