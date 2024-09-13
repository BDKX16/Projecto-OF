export const createThemeAdapter = (theme) => ({
  palette: {
    primary: {
      main: theme.find((element) => element.clave === "primary").valor,
      light: "#ff5f52",
    },
    secondary: {
      main: theme.find((element) => element.clave === "secondary").valor,
    },
    background: {
      default: theme.find((element) => element.clave === "background").valor,
      topbar: theme.find((element) => element.clave === "topbar").valor,
      sidebar: theme.find((element) => element.clave === "sidebar").valor,
      footer: theme.find((element) => element.clave === "footer").valor,
    },
  },
});
