export const createThemeAdapter = (theme) => ({
  palette: {
    primary: {
      main:
        theme.find((element) => element.clave === "primary")?.valor ||
        "rgba(198, 198, 198, 1)",
      light: "#ff5f52",
    },
    secondary: {
      main:
        theme.find((element) => element.clave === "secondary")?.valor ||
        "rgba(198, 198, 198, 1)",
    },
    background: {
      default:
        theme.find((element) => element.clave === "background")?.valor ||
        "rgba(198, 198, 198, 1)",
      topbar:
        theme.find((element) => element.clave === "topbar")?.valor ||
        "rgba(198, 198, 198, 1)",
      sidebar:
        theme.find((element) => element.clave === "sidebar")?.valor ||
        "rgba(198, 198, 198, 1)",
      footer:
        theme.find((element) => element.clave === "footer")?.valor ||
        "rgba(198, 198, 198, 1)",
    },
    text: {
      primary:
        theme.find((element) => element.clave === "text-primary")?.valor ||
        "#000000",
      secondary:
        theme.find((element) => element.clave === "text-secondary")?.valor ||
        "#000000",
    },
  },
});
