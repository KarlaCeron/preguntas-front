import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await login(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      setMsg(`Bienvenido ${data.usuario.nombre}`);
      navigate("/dashboard"); // 👈 va al Dashboard
    } else {
      setMsg(data.msg || data.error || "Error al iniciar sesión");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login Admin 🔐</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>

      <p>{msg}</p>
      <p>
        ¿No tienes cuenta? <Link to="/register-admin">Regístrate</Link>
      </p>
    </div>
  );
}