import { useEffect, useState } from "react";
import { pingServer, getPreguntas } from "../services/api";
import QuestionCard from "./PreguntasCard";
import Lobby from "./Lobby";

export default function Juego() {
  const [msg, setMsg] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  useEffect(() => {
    pingServer().then(setMsg);

    getPreguntas()
      .then((data) => {
        setPreguntas(data);
      })
      .catch((err) => console.error("❌ Error cargando preguntas:", err));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Preguntados 🎮</h1>
      <p>{msg}</p>

      {/* 👥 Mientras no haya 5 jugadores, se muestra el lobby */}
      {!juegoIniciado ? (
        <Lobby onStartGame={() => setJuegoIniciado(true)} />
      ) : (
        <>
          {/* 📋 Preguntas */}
          <h2 style={{ marginTop: "20px" }}>Preguntas disponibles:</h2>
          {preguntas.map((q, i) => (
            <QuestionCard
              key={i}
              preguntas={q.preguntas}
              options={q.options}
              category={q.category}
            />
          ))}
        </>
      )}
    </div>
  );
}