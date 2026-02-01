import React from 'react';
import './Subsecuente.css';

const Subsecuente = () => {
  return (
    <div className="page">
      <header className="header">Atelier Lidia Sanmartin</header>

      <main className="card">
        <h1 className="text">Introduce tu número de celular registrado:</h1>
        <form className="form">
          <input
            type="text"
            placeholder="Número sin líneas ni espacios"
            className="input"
          />
        </form>
      </main>
    </div>
  );
};

export default Subsecuente;
