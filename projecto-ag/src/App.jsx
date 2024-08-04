import { useState } from "react";
import "./App.css";
import Modal from "./utils/Modal";

function App() {
  return (
    <>
      <header>
        <div className="logo"></div>
        <div className="categorias">
          <p>Categoria 1</p>
          <p>Categoria 2</p>
          <p>Categoria 3</p>
          <p>Categoria 4</p>
        </div>
        <div className="lupa-buscador">
          <p>Lupa</p>
        </div>
      </header>

      <div className="container">{/*<Modal></Modal>*/}</div>

      <footer>
        <div className="redes-sociales">
          <div className="red-principalmn">
            <h1> Canal Telegram </h1>
          </div>
          <div className="redes-varias">
            <h4>Seguime en redes sociales:</h4>
            <div className="logos-redes"></div>
          </div>
        </div>
        <div className="terminos-condiciones">
          <h4>C 2024 - ALMEN GALARRETA</h4>
          <p>Términos y condiciones</p>
        </div>
      </footer>
    </>
  );
}

export default App;
