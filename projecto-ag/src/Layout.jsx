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
import Template from "./pages/admin/abm/Template.jsx";
import Carousels from "./pages/admin/abm/Carousels.jsx";
import Personalization from "./pages/admin/abm/Personalization.jsx";

//Routes
const Login = lazy(() => import("./pages/Login.jsx"));

const Layout = () => {
  const userState = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={userState.name ? <Navigate to="/dashboard" /> : <Login />}
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
