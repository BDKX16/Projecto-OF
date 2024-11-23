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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const App = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        primary: {
          main: "rgba(198, 198, 198, 1)",
          light: "rgba(198, 198, 198, 1)",
          contrastText: "#141414",
        },
        secondary: {
          main: "rgba(198, 198, 198, 1)",
          contrastText: "#141414",
        },
        background: {
          default: "rgba(198, 198, 198, 1)",
          topbar: "rgba(198, 198, 198, 1)",
          sidebar: "rgba(198, 198, 198, 1)",
          footer: "rgba(198, 198, 198, 1)",
        },
      },
      typography: {
        fontFamily: "Cinzel",
        button: {
          fontFamily: "Cinzel",
        },
        h1: {
          fontFamily: "Cinzel",
        },
        h2: {
          fontFamily: "Cinzel",
        },
        h3: {
          fontFamily: "Cinzel",
        },
        h4: {
          fontFamily: "Cinzel",
        },
        h5: {
          fontFamily: "Cinzel",
        },
        h6: {
          fontFamily: "Cinzel",
        },
        subtitle1: {
          fontFamily: "Cinzel",
        },
        subtitle2: {
          fontFamily: "Cinzel",
        },
        body1: {
          fontFamily: "Cinzel",
        },
        body2: {
          fontFamily: "Cinzel",
        },
        caption: {
          fontFamily: "Cinzel",
        },
      },
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getTheme());

      if (Object.keys(result).length === 0) {
        return;
      } else {
        if (result.data.length === 0) {
        } else {
          setTheme(createTheme(createThemeAdapter(result.data)));
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CssBaseline />
      <SnackbarProvider>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                backgroundColor: theme.palette.background.default,
                top: 0,
                left: 0,
                height: "100dvh",
                width: "100dvw",
                zIndex: 100,
              }}
            >
              <LoadingSpinner />
            </div>
          }
        >
          <Provider store={store}>
            <AuthProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        backgroundColor: "black",
                        top: 0,
                        left: 0,
                        height: "100dvh",
                        width: "100dvw",
                        zIndex: 100,
                      }}
                    >
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <Layout />
                  )}
                </ThemeProvider>
              </LocalizationProvider>
            </AuthProvider>
          </Provider>
        </Suspense>
      </SnackbarProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
