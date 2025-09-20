// App.jsx
import { Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/LoginAdmin.jsx";
import RegisterAdmin from "./pages/RegisterAdmin.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/register-admin" element={<RegisterAdmin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
