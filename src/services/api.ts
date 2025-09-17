const API_URL = "http://localhost:4000";

// Ping al backend
export async function pingServer(): Promise<string> {
  const res = await fetch(API_URL);
  return res.text();
}

// Obtener preguntas
export async function getPreguntas() {
  const res = await fetch(`${API_URL}/preguntas`);
  if (!res.ok) {
    throw new Error("Error al obtener preguntas");
  }
  return res.json();
}
