import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { SnackbarProvider } from "notistack";

import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider>
      <Suspense fallback={<div>Laxy Loading...</div>}>
        <Provider store={store}>
          <Layout />
        </Provider>
      </Suspense>
    </SnackbarProvider>
  </React.StrictMode>
);
