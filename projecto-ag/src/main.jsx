import React, { Suspense, lazy, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";

import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoadingSpinner from "./pages/content/components/LoadingSpinner.jsx";
import useFetchAndLoad from "./hooks/useFetchAndLoad";
import { getTheme } from "./services/public.js";
import { createThemeAdapter } from "./adapters/theme.js";
import { AuthProvider } from "./redux/AuthProvider";
const App = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        primary: {
          main: "rgba(198, 198, 198, 1)",
          light: "rgba(198, 198, 198, 1)",
        },
        secondary: {
          main: "rgba(198, 198, 198, 1)",
        },
        background: {
          default: "rgba(198, 198, 198, 1)",
          topbar: "rgba(198, 198, 198, 1)",
          sidebar: "rgba(198, 198, 198, 1)",
          footer: "rgba(198, 198, 198, 1)",
        },
      },
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getTheme());

      if (Object.keys(result).length === 0) {
        return;
      } else if (result.status === 401) {
        enqueueSnackbar("No autorizado", {
          variant: "error",
        });
      } else if (result.status !== 200) {
        enqueueSnackbar("Error", {
          variant: "error",
        });
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("No hay datos", {
            variant: "warning",
          });
        } else {
          setTheme(createTheme(createThemeAdapter(result.data)));
        }
      }
    };

    fetchData();
  }, []);

  return (
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
            <AuthProvider>
              <ThemeProvider theme={theme}>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      flexDirection: "column",
                    }}
                  >
                    <p>Cargando contenido</p>
                    <LoadingSpinner />
                  </div>
                ) : (
                  <Layout />
                )}
              </ThemeProvider>
            </AuthProvider>
          </Provider>
        </Suspense>
      </SnackbarProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
