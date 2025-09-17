import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:4000");

export default function Lobby() {
  const [nombre, setNombre] = useState("");
  const [jugadores, setJugadores] = useState([]);
  const [registrado, setRegistrado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("jugadoresActualizados", (lista) => {
      setJugadores(lista);
    });

    socket.on("iniciarJuego", () => {
      navigate("/juego"); // 🚀 Redirigir cuando el backend diga "iniciar"
    });

    return () => {
      socket.off("jugadoresActualizados");
      socket.off("iniciarJuego");
    };
  }, [navigate]);

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
          <p>Esperando a que se unan {5 - jugadores.length} jugadores...</p>
        </div>
      )}
    </div>
  );
}
