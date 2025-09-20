import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterAdmin() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
   console.log("📝 Registrando admin:", nombre, email, password);

    if (data.msg) {
      setMsg(data.msg);
      navigate("/login-admin"); // 👉 redirige al login
    } else {
      setMsg(data.error || "Error en el registro");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Registro de Admin 👑</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />
        <button type="submit">Registrar</button>
      </form>

      <p>{msg}</p>
      <p>
        ¿Ya tienes cuenta? <Link to="/login-admin">Inicia sesión</Link>
      </p>
    </div>
  );
}
