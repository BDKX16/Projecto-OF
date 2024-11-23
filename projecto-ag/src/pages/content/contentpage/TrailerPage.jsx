import React from "react";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableFooter,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const currencyMap = {
  ars: { locale: "es-AR", currency: "ARS", name: "Argentina" },
  brl: { locale: "pt-BR", currency: "BRL", name: "Brazil" },
  col: { locale: "es-CO", currency: "COP", name: "Colombia" },
  eur: { locale: "de-DE", currency: "EUR", name: "Europe" },
  mxn: { locale: "es-MX", currency: "MXN", name: "Mexico" },
  usd: { locale: "en-US", currency: "USD", name: "United States" },
};

const TrailerPage = ({ video }) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: 1 }}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ marginTop: 3 }}
          gutterBottom
        >
          {video.title}
        </Typography>
      </Box>
      {video.trailer && (
        <iframe
          style={{
            width: "100dvw",
            height: "50dvw",
            maxWidth: "1280px",
            maxHeight: "80vh",
          }}
          frameBorder={0}
          src={video.trailer.videoUrl}
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      {video.trailer && (
        <Box
          className="title-description-section"
          sx={{ marginBottom: 6, paddingLeft: 2, paddingRight: 2 }}
        >
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ marginTop: 5 }}
            gutterBottom
          >
            {video.trailer.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              textAlign: "start",
              lineHeight: 1.6,
              textWrap: "balance",
              letterSpacing: "0.00938em",
            }}
          >
            {video.trailer.description}
          </Typography>
        </Box>
      )}

      {video.trailer && video.trailer.images.length > 0 && (
        <Box className="images-section" sx={{ marginBottom: 9 }}>
          <Grid container spacing={2}>
            {video.trailer.images.map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <img src={item} alt="Trailer" style={{ width: "100%" }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Box
        sx={{
          marginBottom: 6,
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{ minWidth: 300, height: 60, fontSize: 22 }}
        >
          Comprar contenido
        </Button>
      </Box>
      <Box
        sx={{
          marginBottom: 6,
        }}
      >
        <Typography variant="h4" color="text.primary" gutterBottom>
          Payment Information
        </Typography>
        <Paper
          sx={{
            backgroundColor: "primary.main",
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
            {Object.entries(video.priceTable).map(([currency, price]) => {
              const {
                locale,
                currency: currencyCode,
                name,
              } = currencyMap[currency] || {};
              return (
                <Grid item xs={6} sm={4} md={2} key={currency}>
                  <Box
                    sx={{
                      minWidth: 157,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 2,
                      border: "1px solid",
                      borderColor: "primary.light",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body1">
                        {name.toUpperCase()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {locale && currencyCode
                          ? new Intl.NumberFormat(locale, {
                              style: "currency",
                              currency: currencyCode,
                            }).format(price)
                          : price}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Box>

      <Box className="faq-section">
        <Typography variant="h4" color="text.primary" gutterBottom>
          Preguntas Frecuentes
        </Typography>
        {[
          {
            question: "¿Puedo ver los videos desde cualquier país del mundo?",
            answer:
              "Si, puedes tener acceso desde cualquier lugar del planeta!",
          },
          {
            question:
              "¿Qué requerimientos técnicos debe tener mi computadora/ordenador, tablet o celular?",
            answer: "Sólo tener conexión a internet.",
          },
          {
            question: "¿Para personas de qué edad son los videos?",
            answer: "La persona debe ser mayor de 18 años.",
          },
          {
            question:
              "Ya realicé el pago del pack ¿Cuáles son los pasos a seguir?",
            answer:
              "Recibirás un mail de confirmación de EloUniversity.com con las indicaciones para acceder a los videos, a los cuales accederás ingresando la contraseña que te indiquemos en nuestra página https://elouniversity.com/",
          },
          {
            question: "¿Puedo acceder al curso desde mi teléfono celular?",
            answer:
              "Sí, puedes acceder a ambos cursos desde cualquier dispositivo móvil con conexión a internet.",
          },
          {
            question:
              "Yo no tengo tarjeta de crédito, puedo pagar en efectivo y a través de Pago Fácil / RapiPago",
            answer:
              "Si, puedes hacer el pago en efectivo a través de Pago Fácil / RapiPago.",
          },
          {
            question: "¿Se puede pagar con tarjeta de débito?",
            answer: "Si.",
          },
          {
            question:
              "Me encuentro fuera de la Argentina y quiero pagar en mi moneda local, es posible?",
            answer:
              "Si estás México podés pagar en Pesos Mexicanos; en Colombia en Pesos Colombianos; o en el resto del mundo en Dólares de Estados Unidos.",
          },
        ].map((faq, index) => (
          <Accordion
            color="text.secondary"
            sx={{ backgroundColor: "background.default" }}
            key={index}
          >
            <AccordionSummary
              color="background.default"
              expandIcon={<ExpandMoreIcon sx={{ color: "text.primary" }} />}
            >
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: { xs: 19, md: 22, xl: 24 },
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#252525", textAlign: "start" }}
            >
              <Typography sx={{ color: "text.primary", textAlign: "start" }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default TrailerPage;
