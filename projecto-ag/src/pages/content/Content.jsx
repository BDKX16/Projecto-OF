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
  borderRadius: 3,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.footer",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
          //console.log(result.data.components);
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
        style={{ backgroundColor: "black" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sos mayor de 18 años?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button onClick={() => setPlusEighteen(false)}>
            Soy mayor de 18
          </Button>
          <Button
            onClick={() => (window.location.href = "https://www.google.com")}
          >
            Cerrar
          </Button>
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
              } else if (component.componentType === "Carousel") {
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
