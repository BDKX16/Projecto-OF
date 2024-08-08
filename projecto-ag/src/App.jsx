import { useState } from "react";
import "./App.css";
import { Twirl as Hamburger } from "hamburger-react";

function App() {
  const [sidebarState, setSidebarState] = useState(false);

  const toggleSidebar = () => {
    if (sidebarState) {
      const sidebar = document.querySelector(".sidebar");
      sidebar.style.opacity = "0";
      setSidebarState(false);
    } else {
      const sidebar = document.querySelector(".sidebar");
      sidebar.style.opacity = "1";
      setSidebarState(true);
    }
  };
  return (
    <>
      <nav>
        <ul class="sidebar">
          <li onClick={toggleSidebar}>
            <a href="#">XXXX</a>
          </li>
          <li>
            <a href="#">Favoritos</a>
          </li>
          <li>
            <a href="#">Video del mes</a>
          </li>
          <li>
            <a href="#">Mas likeados</a>
          </li>
          <li>
            <a href="#">Más recientes</a>
          </li>
          <li>
            <a href="#">Carrito</a>
          </li>
        </ul>

        <ul className="topbar">
          <li className="principal">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"></img>
          </li>
          <li className="hideOnMobile">
            <a href="#">Favoritos</a>
          </li>
          <li className="hideOnMobile">
            <a href="#">Video del mes</a>
          </li>
          <li className="hideOnMobile">
            <a href="#">Mas likeados</a>
          </li>
          <li className="hideOnMobile">
            <a href="#">Más recientes</a>
          </li>
          <li className="hideOnMobile">
            <a href="#">Carrito</a>
          </li>

          <li className="menu-button" onClick={() => toggleSidebar()}>
            <a href="#">
              <Hamburger></Hamburger>
            </a>
          </li>
        </ul>
      </nav>

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
