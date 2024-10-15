import { lazy } from "react";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Content from "./pages/admin/abm/Content.jsx";
import ABMUsuarios from "./pages/admin/abm/Users.jsx";
import ABMCategorys from "./pages/admin/abm/Categorys.jsx";
import Template from "./pages/admin/abm/Template.jsx";
import Carousels from "./pages/admin/abm/Carousels.jsx";
import Personalization from "./pages/admin/abm/Personalization.jsx";
import Payments from "./pages/admin/abm/Payments.jsx";
import { Button } from "@mui/material";

//Routes
const Login = lazy(() => import("./pages/Login.jsx"));

const Layout = () => {
  const userState = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={userState.name ? <Navigate to="/" /> : <Login />}
          caseSensitive={false}
        ></Route>
        <Route path={`/*`} element={<App />}></Route>
        <Route
          path={`/admin/*`}
          element={
            <AdminLayout>
              <Routes>
                <Route path={`/content`} element={<Content />} />
                <Route path={`/template`} element={<Template />} />
                <Route path={`/carousels`} element={<Carousels />} />
                <Route path={`/user-managment`} element={<ABMUsuarios />} />
                <Route path={`/category`} element={<ABMCategorys />} />
                <Route path={`/payments`} element={<Payments />} />
                <Route
                  path={`/`}
                  element={
                    <>
                      <h1>Almendra gala web panel</h1>
                      <h2>Panel de administrador</h2>
                      <p>Seleccione una opción del menú lateral</p>
                      <h3>Pagina principal</h3>
                      <Button
                        href="https://www.almendragala.com/"
                        variant="contained"
                      >
                        Almendra gala
                      </Button>
                      <h3>Enlaces utiles</h3>
                      <p>Para acceder al almacenamiento en la nube:</p>
                      <Button
                        href="https://s3.almendragala.com/"
                        variant="contained"
                      >
                        Cloud storage
                      </Button>
                    </>
                  }
                />
                <Route
                  path={`/personalization`}
                  element={<Personalization />}
                />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
