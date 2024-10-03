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
      contrastText: "#141414",
      secondary:
        theme.find((element) => element.clave === "text-secondary")?.valor ||
        "#000000",
      contrastText: "#141414",
    },
  },
  typography: {
    fontFamily:
      theme.find((element) => element.clave === "font-family")?.valor ||
      "#Cinzel",
    button: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    h1: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
      fontWeight: "bold",
    },
    h2: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
      fontWeight: "bold",
    },
    h3: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    h4: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    h5: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    h6: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    subtitle1: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    subtitle2: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    body1: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    body2: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
    caption: {
      fontFamily:
        theme.find((element) => element.clave === "font-family")?.valor ||
        "Cinzel",
    },
  },
});
