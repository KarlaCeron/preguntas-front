import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./componentes/Login";
import Registro from "./componentes/Registro";
import Juego from "./componentes/Juego";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route
          path="/juego"
          element={token ? <Juego /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;