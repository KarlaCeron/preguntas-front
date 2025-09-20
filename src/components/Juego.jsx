import { useEffect, useState } from "react";
import socket from "../sockets/socket";

export default function Juego() {
  const [pregunta, setPregunta] = useState(null);

  useEffect(() => {
    socket.on("nuevaPregunta", (q) => {
      setPregunta(q);
    });

    socket.on("resultado", (res) => {
      console.log("Resultado parcial:", res);
    });

    return () => {
      socket.off("nuevaPregunta");
      socket.off("resultado");
    };
  }, []);

  const responder = (respuesta) => {
    socket.emit("responder", respuesta);
  };

  return (
    <div>
      <h2>Juego en Progreso</h2>
      {pregunta ? (
        <div>
          <p>{pregunta.texto}</p>
          {pregunta.opciones.map((op, i) => (
            <button key={i} onClick={() => responder(op)}>
              {op}
            </button>
          ))}
        </div>
      ) : (
        <p>Esperando pregunta...</p>
      )}
    </div>
  );
}
