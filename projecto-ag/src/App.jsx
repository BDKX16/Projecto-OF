import { useState } from "react";
import "./App.css";
import { Twirl as Hamburger } from "hamburger-react";
import Content from "./pages/content/Content";
import Lupa from "./utils/icons/Lupa";

import { Route, Routes } from "react-router-dom";
import ContentPage from "./pages/content/contentpage/ContentPage";
import { useTheme } from "@mui/material";
import BasesYCondiciones from "./pages/BasesYCondiciones";
function App() {
  const [sidebarState, setSidebarState] = useState(false);
  const theme = useTheme();

  const toggleSidebar = () => {
    if (sidebarState) {
      const sidebar = document.querySelector(".sidebar");
      sidebar.style.opacity = "0";
      sidebar.style.display = "none";
      setSidebarState(false);
    } else {
      const sidebar = document.querySelector(".sidebar");
      sidebar.style.opacity = "1";
      sidebar.style.display = "block";
      setSidebarState(true);
    }
  };

  return (
    <>
      <nav style={{ backgroundColor: theme.palette.background.topbar }}>
        <ul
          className="sidebar"
          style={{ backgroundColor: theme.palette.background.sidebar }}
        >
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
          <li className="hideOnMobile">
            <div className="buscar">
              <input type="text" placeholder="buscar" required></input>
              <a className="btn-lupa">
                <Lupa className="Lupa2"></Lupa>
              </a>
            </div>
          </li>
          <li className="menu-button" onClick={() => toggleSidebar()}>
            <a href="#">
              <Hamburger></Hamburger>
            </a>
          </li>
        </ul>
      </nav>

      <div className="container">
        <Routes>
          <Route path={`/`} element={<Content />} />
          <Route path="/video" element={<ContentPage />} />
          <Route path={`/video/:id`} element={<ContentPage />} />
          <Route
            path={"/bases"}
            element={<BasesYCondiciones></BasesYCondiciones>}
          ></Route>
        </Routes>
      </div>

      <footer style={{ backgroundColor: theme.palette.background.footer }}>
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
          <a href="/bases">Términos y condiciones</a>
        </div>
      </footer>
    </>
  );
}

export default App;
