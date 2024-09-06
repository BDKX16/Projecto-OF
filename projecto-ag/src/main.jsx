import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";

import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoadingSpinner from "./pages/content/components/LoadingSpinner.jsx";

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#9e0d0d",
      light: "#ff5f52",
    },
    secondary: {
      main: "#270000",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Cargando contenido</p>
            <LoadingSpinner />
          </div>
        }
      >
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Layout />
          </ThemeProvider>
        </Provider>
      </Suspense>
    </SnackbarProvider>
  </React.StrictMode>
);
