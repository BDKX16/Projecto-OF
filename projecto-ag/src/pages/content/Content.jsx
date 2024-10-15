import Carousel from "./components/Carousel";
import Publicity from "./components/Publicity";
import Classification from "./components/Classification";
import "./content.css";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { getWebContent } from "../../services/public";
import { Button, Modal, Box, Typography } from "@mui/material";
import LoadingSpinner from "./components/LoadingSpinner";

const style = {
  position: "absolute",
  borderRadius: 0,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.default",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const Content = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [data, setData] = useState([]);
  const [plusEighteen, setPlusEighteen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getWebContent());

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("Error al cargar", {
            variant: "warning",
          });
        } else {
          console.log(result.data.components);
          setData(result.data.components);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Modal
        open={plusEighteen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(37, 37, 37, 0.5)",
        }}
      >
        <Box sx={style}>
          <Typography
            variant="h5"
            fontWeight={600}
            component="h2"
            color="text.primary"
            mb={5}
          >
            Sos mayor de 18 años?
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 10, padding: 13 }}
              onClick={() => setPlusEighteen(false)}
            >
              Soy mayor de 18
            </Button>
            <Button
              variant="contained"
              onClick={() => (window.location.href = "https://www.google.com")}
            >
              Cerrar
            </Button>
          </div>
        </Box>
      </Modal>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data &&
            data.map((component) => {
              if (component.componentType === "banner") {
                return <Carousel key={component._id} data={component} />;
              } else if (component.componentType === "button") {
                return (
                  <>
                    <Button
                      key={component._id}
                      variant="contained"
                      style={{ marginBottom: 9, marginop: 17 }}
                    >
                      {component.componentData.title}
                    </Button>
                    <Typography color={"white"}>
                      {component.componentData.description}
                    </Typography>
                  </>
                );
                //return <Carousel key={component._id} data={component} />;
              } else if (component.componentType === "category") {
                return <Classification key={component._id} data={component} />;
              } else {
                return null;
              }
              return null;
            })}
        </>
      )}
    </div>
  );
};

export default Content;
