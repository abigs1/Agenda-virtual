import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrimeraCita from "./pages/PrimeraCita";
import CitaSubsecuente from "./pages/CitaSubsecuente";
import Disponibles from "./components/disponibles";
import ProtectedRoute from './components/protectedRoute';
import Admin from './pages/Admin/Admin';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/primera-cita" element={<PrimeraCita />} />
        <Route path="/cita-subsecuente" element={<CitaSubsecuente />} />
        <Route path="/citas-disponibles" element={<Disponibles />} />
        <Route
          path="/admin"
          element={
              <Admin />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
