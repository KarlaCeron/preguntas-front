import { useEffect, useState } from "react";
import { socket } from "../sockets/socket";

export default function QuestionViewer() {
  const [pregunta, setPregunta] = useState(null);
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    // Pregunta enviada desde el backend
    socket.on("nuevaPregunta", (data) => {
      setPregunta(data);
      setRespuestas([]); // reset
    });

    // Respuesta de jugador
    socket.on("respuestaJugador", (resp) => {
      setRespuestas((prev) => [...prev, resp]);
    });

    return () => {
      socket.off("nuevaPregunta");
      socket.off("respuestaJugador");
    };
  }, []);

  return (
    <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h2>❓ Pregunta en curso</h2>
      {pregunta ? (
        <>
          <p><b>{pregunta.texto}</b></p>
          <ul>
            {pregunta.opciones.map((op, i) => (
              <li key={i}>{op}</li>
            ))}
          </ul>

          <h3>📌 Respuestas de jugadores</h3>
          <ul>
            {respuestas.map((r, i) => (
              <li key={i}>
                {r.nombre}: {r.respuesta}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No hay pregunta activa</p>
      )}
    </div>
  );
}
