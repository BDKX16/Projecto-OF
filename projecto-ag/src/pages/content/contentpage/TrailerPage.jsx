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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TrailerPage = ({ video }) => {
  return (
    <Box>
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
        <Box className="title-description-section" sx={{ marginBottom: 4 }}>
          <Typography variant="h4" color="text.primary" gutterBottom>
            {video.title}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {video.trailer.description}
          </Typography>
        </Box>
      )}

      {video.trailer && video.trailer.images.length > 0 && (
        <Box className="images-section" sx={{ marginBottom: 4 }}>
          <Typography variant="h4" color="text.primary" gutterBottom>
            Images
          </Typography>
          <Grid container spacing={2}>
            {video.trailer.images.map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <img src={item} alt="Trailer" style={{ width: "100%" }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Box className="payment-info-section" sx={{ marginBottom: 4 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Payment Information
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(video.priceTable).map((location) => (
                  <TableCell key={location}>{location.toUpperCase()}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {Object.values(video.priceTable).map((price, index) => (
                  <TableCell key={index}>{price}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
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
              "Yo estoy en Argentina y no tengo tarjeta de crédito, puedo pagar en efectivo y a través de Pago Fácil / RapiPago, ¿Tengo que imprimir el cupón para ir a pagarlo?",
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
          <Accordion color="text.secondary" key={index}>
            <AccordionSummary
              color="background.default"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography color="text.secondary">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default TrailerPage;
