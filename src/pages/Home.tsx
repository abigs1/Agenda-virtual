import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <header className="header">Atelier Lidia Sanmartin</header>

      <main className="card">
        <h1 className="bienvenida">Agenda tu cita</h1>

        <div className="buttons">
          <Button
            variant="outline-dark"
            className="botones"
            onClick={() => navigate("/primera-cita")}
          >
            Primera cita
          </Button>

          <Button
            variant="outline-dark"
            className="botones"
            onClick={() => navigate("/cita-subsecuente")}
          >
            Cita subsecuente
          </Button>
        </div>
      </main>

    </div>
  );
}

export default Home;
