import React, { useEffect, useState } from "react";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { searchVideos } from "../../services/public";
import { enqueueSnackbar } from "notistack";
import { createContentAdapter } from "../../adapters/content";
import { Box, Typography, Button, Grid } from "@mui/material";

const SearchPage = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [data, setData] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get("id");

    const fetchData = async (searchTerm) => {
      const result = await callEndpoint(searchVideos(searchTerm));

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("No hay datos", {
            variant: "warning",
          });
        } else {
          console.log(result.data);
          setData(result.data.map((item) => createContentAdapter(item)));
        }
      }
    };

    fetchData(searchTerm);
  }, []);

  return (
    <div style={{ color: "white" }}>
      <Grid container spacing={2}>
        {data.length > 0 ? (
          data.map((img) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={img.id}>
              <div className="carousel-image-container">
                <img
                  src={img.coverUrl || "https://via.placeholder.com/150"}
                  alt={`Slide ${img.title}`}
                  className="carousel-image"
                />
                <Box height={34}>
                  <Typography
                    variant="h3"
                    component="h3"
                    fontSize={14}
                    color="text.primary"
                    textAlign="start"
                    mt={1}
                    mb={1}
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {img.title}
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  className="carousel-image-button"
                  href={"video?id=" + img.id}
                >
                  Ver mas
                </Button>
              </div>
            </Grid>
          ))
        ) : (
          <div className="mid-container">
            <Typography variant="h4" component="h4" color="white">
              No hay contenido que coincida con el criterio de busqueda
            </Typography>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default SearchPage;
