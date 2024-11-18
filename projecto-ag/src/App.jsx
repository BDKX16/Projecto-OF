import { useState } from "react";
import "./App.css";
import { Twirl as Hamburger } from "hamburger-react";
import Content from "./pages/content/Content";
import Lupa from "./utils/icons/Lupa";

import { Route, Routes } from "react-router-dom";
import ContentPage from "./pages/content/contentpage/ContentPage";
import { Box, Typography, useTheme } from "@mui/material";
import BasesYCondiciones from "./pages/BasesYCondiciones";
import { Facebook, Instagram, Telegram, Twitter } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import SearchPage from "./pages/content/SearchPage";

function TikTokIcon({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 013.183-4.51v-3.5a6.329 6.329 0 00-5.394 10.692 6.33 6.33 0 0010.857-4.424V8.687a8.182 8.182 0 004.773 1.526V6.79a4.831 4.831 0 01-1.003-.104z"></path>
    </svg>
  );
}

function OnlyFans({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill={color}
    >
      <path d="M16.165 17.236h.063a1.721 1.721 0 01.636 3.32l-.012.004h-.107v1.448a.626.626 0 01-.288.527l-.002.002h-.639a.65.65 0 01-.3-.542v-1.434a1.721 1.721 0 01.625-3.324h.027-.001zm-.58-6.493h1.006a3.11 3.11 0 012.187.905c.561.546.91 1.308.912 2.151l.004 1.262h-7.21v-1.262a3 3 0 01.912-2.151l.001-.001a3.114 3.114 0 012.188-.906h.001zm0-2.462h-.004c-1.54 0-2.936.62-3.951 1.624l.001-.001a5.404 5.404 0 00-1.646 3.89v1.228l-.695 1.253v1.804a6.034 6.034 0 001.829 4.325l.001.001a6.263 6.263 0 004.403 1.799h1.127a6.259 6.259 0 004.4-1.8l-.001.001a6.024 6.024 0 001.833-4.326v-1.806l-.687-1.253v-1.225a5.423 5.423 0 00-1.648-3.893l-.001-.001a5.6 5.6 0 00-3.95-1.623h-.006zm.4-5.707h.003c7.415 0 13.427 6.011 13.427 13.427s-6.011 13.427-13.427 13.427c-7.415 0-13.427-6.011-13.427-13.427v-.005-.002c0-7.412 6.009-13.421 13.421-13.421h.003zM16 1.004C7.718 1.004 1.004 7.718 1.004 16S7.718 30.996 16 30.996 30.996 24.282 30.996 16 24.282 1.005 16 1.004z"></path>
    </svg>
  );
}

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

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?id=${searchQuery.trim()}`;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav>
        <ul
          className="sidebar"
          style={{ backgroundColor: theme.palette.background.sidebar }}
        >
          <li onClick={toggleSidebar}>
            <a href="#">X</a>
          </li>
          <li>
            <a className="btn-hover" href="/search?id=favorites">
              Favoritos
            </a>
          </li>
          <li>
            <a className="btn-hover" href="/search?id=this-month">
              Video del mes
            </a>
          </li>
          <li>
            <a className="btn-hover" href="/search?id=most-liked">
              Mas likeados
            </a>
          </li>
          <li>
            <a className="btn-hover" href="/search?id=most-recent">
              Más recientes
            </a>
          </li>
        </ul>

        <ul
          className="topbar"
          style={{ backgroundColor: theme.palette.background.topbar }}
        >
          <li className="principal">
            <a
              href="/"
              className="logo cinzel-600"
              alt="Almendra Gala Logo"
              style={{
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.background.topbar,
              }}
            >
              <img
                src="/logo-horizontal-blanco.webp"
                alt="Almendra Gala Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              ></img>
            </a>
          </li>
          <li className="hideOnMobile">
            <a className="btn-hover" href="/search?id=favorites">
              Favoritos
            </a>
          </li>
          <li className="hideOnMobile">
            <a className="btn-hover" href="/search?id=this-month">
              Video del mes
            </a>
          </li>
          <li className="hideOnMobile">
            <a className="btn-hover" href="/search?id=most-liked">
              Mas likeados
            </a>
          </li>
          <li className="hideOnMobile">
            <a className="btn-hover" href="/search?id=most-recent">
              Más recientes
            </a>
          </li>
          <li className="lupa-container">
            <div className="buscar">
              <input
                type="text"
                placeholder="Buscar"
                style={{ color: "black" }}
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              ></input>
              <div className="overlay"></div>
              <a
                className="btn-lupa"
                onClick={handleSearch}
                style={{
                  backgroundColor:
                    window.innerWidth > 768 && theme.palette.secondary.main,
                }}
              >
                <Lupa
                  className="Lupa2"
                  color={window.innerWidth < 768 ? "white" : "black"}
                ></Lupa>
              </a>
            </div>
          </li>
          <li className="menu-button" onClick={() => toggleSidebar()}>
            <a href="#">
              <Hamburger size={window.innerWidth < 768 ? 25 : 30}></Hamburger>
            </a>
          </li>
        </ul>
      </nav>

      <div
        className="container"
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Routes>
          <Route path={`/`} element={<Content />} />
          <Route path={`/search`} element={<SearchPage />} />
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
          <div className="red-principal">
            <h3 style={{ color: theme.palette.text.primary }}>
              Mis redes sociales
            </h3>{" "}
          </div>
          <div className="redes-varias">
            <div className="logos-redes">
              <a href="https://www.instagram.com/almendragala/">
                <Instagram style={{ color: theme.palette.text.primary }} />{" "}
              </a>
              <a href="https://www.tiktok.com/@almendragala?_t=8n6No5KEIy5&_r=1">
                <TikTokIcon color={theme.palette.text.primary} />{" "}
              </a>
              <a href="https://x.com/almendragala_">
                <Twitter style={{ color: theme.palette.text.primary }} />{" "}
              </a>
              <a href="https://t.me/+vJcfN6HM5pgyMTJh">
                <Telegram style={{ color: theme.palette.text.primary }} />{" "}
              </a>
              <a href="https://onlyfans.com/almendragalavip/c15">
                <OnlyFans color={theme.palette.text.primary}></OnlyFans>{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="terminos-condiciones">
          <h4 style={{ color: theme.palette.text.primary }}>
            C 2024 - ALMEN GALARRETA
          </h4>
          <a style={{ color: theme.palette.text.primary }} href="/bases">
            Términos y condiciones
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
