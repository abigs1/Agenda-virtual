
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Citas.css"
import { useNavigate } from "react-router-dom";

function PrimeraCita() {
   const navigate = useNavigate();

  return (
    <div className="page">
      <header className="header">Atelier Lidia Sanmartin</header>

      <main className="card">
        <h1 className="text">Bienvenida</h1>
        <p className="subtitle">
          Para agendar tu primera cita por favor ingresa:
        </p>

        <form className="form">
          <input
            type="text"
            placeholder="Nombre completo"
            className="input"
          />

          <input
            type="text"
            placeholder="Número de celular"
            className="input"
          />

          <select id="tipo" name="tipo" className="select">
            <option value="Novia">Novia</option>
            <option value="Gala">Gala / XV años</option>
          </select>

  <button type="button" className="siguiente" onClick={() => navigate("/citas-disponibles")}>
    Siguiente
  </button>
        </form>
        
      </main>

    </div>
  );
}

export default PrimeraCita;
