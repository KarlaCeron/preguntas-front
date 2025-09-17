import { useEffect, useState } from "react";
import  io  from "socket.io-client";

const socket = io("http://localhost:4000");

interface Jugador {
  id: string;
  nombre: string;
}

export default function Lobby() {
  const [nombre, setNombre] = useState("");
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [registrado, setRegistrado] = useState(false);

  useEffect(() => {
    socket.on("jugadoresActualizados", (lista: Jugador[]) => {
      setJugadores(lista);
    });

    return () => {
      socket.off("jugadoresActualizados");
    };
  }, []);

  const registrarJugador = () => {
    if (nombre.trim()) {
      socket.emit("registrarJugador", nombre);
      setRegistrado(true);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!registrado ? (
        <div>
          <h2>Ingresa tu nombre</h2>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button onClick={registrarJugador}>Entrar</button>
        </div>
      ) : (
        <div>
          <h2>Jugadores conectados:</h2>
          <ul>
            {jugadores.map((j) => (
              <li key={j.id}>{j.nombre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
