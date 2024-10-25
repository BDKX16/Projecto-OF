import React, { useEffect, useState } from "react";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { searchVideos } from "../../services/public";
import { enqueueSnackbar } from "notistack";
import { createContentAdapter } from "../../adapters/content";
import { Box, Typography, Button, Grid } from "@mui/material";

import { AsyncImage } from "loadable-image";
const SearchPage = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filtersMenu, setFiltersMenu] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get("id");

    const fetchData = async (searchTerm) => {
      const result = await callEndpoint(searchVideos(searchTerm, 1));

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("No hay datos", {
            variant: "warning",
          });
        } else {
          setData(
            result.data.content.map((item) => createContentAdapter(item))
          );
        }
      }
    };

    fetchData(searchTerm);
  }, []);

  return (
    <div
      style={{ color: "white", paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}
      className="mid-container"
    >
      <Box
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h5" component="h5" color="text.primary">
          Resultados de la busqueda
        </Typography>
        <Box
          display="flex"
          alignItems={"center"}
          gap={3}
          justifyContent={"space-between"}
        >
          <Button
            disabled
            variant="outlined"
            onClick={() => setFiltersMenu(!filtersMenu)}
          >
            Filtros
          </Button>
          <Typography variant="h5" component="h5" color="text.primary">
            {data.length} resultados
          </Typography>
        </Box>
      </Box>
      {filtersMenu && (
        <Box
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", sm: "column", md: "row" }}
          justifyContent="flex-end"
          mb={3}
        >
          <Button>Orden</Button>
          <Button>Mas recientes</Button>
          <Button>Menos recientes</Button>
          <Button>Mas vistos</Button>
          <Button>Menos vistos</Button>
          <Button>Mejor valorados</Button>
          <Button>Peor valorados</Button>
        </Box>
      )}
      <Grid container spacing={2}>
        {data.length > 0 ? (
          data.map((img) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={img.id}>
              <div className="carousel-image-container">
                <AsyncImage
                  src={img.coverUrl}
                  style={{ height: "auto", aspectRatio: 1 / 1 }}
                  loader={
                    <div
                      style={{
                        background: "#2b2b2b",
                        height: "150px",
                        width: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: "pulse 2.5s infinite",
                      }}
                    >
                      <div
                        style={{
                          height: "80%",
                          width: "80%",
                          background: "#353535",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  }
                  error={<div style={{ background: "#eee" }} />}
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
