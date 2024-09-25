import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  TextField,
  IconButton,
  InputLabel,
  Box,
  Switch,
  Select,
  MenuItem,
  Tab,
  Autocomplete,
  Chip,
} from "@mui/material";
import { Add, Edit, Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useEffect } from "react";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { enqueueSnackbar } from "notistack";
import {
  editCarousel,
  deleteCarousel,
  addCarousel,
  getCarousels,
  getCategorys,
} from "../../../services/private";
import { createCarouselAdapter } from "../../../adapters/carousels";
import { createCategoryAdapter } from "../../../adapters/categorys";
import { formatDateToString } from "../../../utils/format-date-to-string";
import LoadingSpinner from "../../content/components/LoadingSpinner";

import { RgbaStringColorPicker } from "react-colorful";
const black = { color: "#272727" };

const initialFormData = {
  title: "",
  description: "",
  imagesUrl: [],
  link: "",
  type: "",
  createdAt: "",
};

const ABMCarousel = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getCarousels());

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        setData(result.data.map((item) => createCarouselAdapter(item)));
      }
    };

    fetchData();
    fetchCategorys();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(formData);
    //handle submit form
    const result = await callEndpoint(addCarousel(formData));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido agregado", { variant: "success" });
      setData([...data, createCarouselAdapter(result.data)]);
      setFormData(initialFormData);
    }
    setIsAddOpen(false);
  };

  const handleEdit = async () => {
    const result = await callEndpoint(editCarousel(formData));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido editado correctamente", {
        variant: "success",
      });
      setFormData(initialFormData);
      setData(
        data.map((item) => (item.id === currentEdit.id ? formData : item))
      );
      setIsEditOpen(false);
    }
    setCurrentEdit(null);
  };

  const handleDelete = async (id) => {
    const result = await callEndpoint(deleteCarousel(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido eliminado", { variant: "success" });
      console.log(result);
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesUrlChange = (e) => {
    setFormData({ ...formData, imagesUrl: e });
  };

  const handleColorChange = (e) => {
    setFormData({ ...formData, color: e });
  };

  const fetchCategorys = async () => {
    const result = await callEndpoint(getCategorys());
    if (!result || Object.keys(result)?.length === 0) {
      return;
    } else {
      if (result.data.length !== 0) {
        setCategorys(result.data.map((item) => createCategoryAdapter(item)));
      }
    }
  };

  const formDataByType = () => {
    if (formData.type === "static") {
      return (
        <>
          <TextField
            label="Titulo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />
          <TextField
            label="Descripcion"
            name="description"
            value={formData.desctiption}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />
          <TextField
            label="Imagen URL"
            name="imagesUrl"
            value={formData.imagesUrl}
            onChange={(e) => handleImagesUrlChange([e.target.value])}
            fullWidth
            margin="normal"
            type="text"
          />
          <TextField
            label="Link adonde redirigira al darle click. Ej: https://www.google.com"
            name="link"
            value={formData.link}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />
          {!isEditOpen && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              Add
            </Button>
          )}
        </>
      );
    } else if (formData.type === "category") {
      return (
        <>
          <Select
            label="Categoria"
            title="title"
            name="title"
            value={formData.title}
            type="text"
            disabled={categorys.length === 0}
            onChange={handleChange}
            style={{ width: "300px", marginLeft: 40, marginRight: 40 }}
          >
            {categorys ? (
              categorys.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="0">No hay categorias</MenuItem>
            )}
          </Select>

          {!isEditOpen && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              Add
            </Button>
          )}
        </>
      );
    } else if (formData.type === "banner") {
      return (
        <>
          <TextField
            label="Titulo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />

          <Autocomplete
            multiple
            name="imagesUrl"
            id="imagesUrl"
            options={formData.imagesUrl}
            freeSolo
            onChange={(e, value) => {
              handleImagesUrlChange(value);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    variant="outlined"
                    label={option}
                    key={key}
                    {...tagProps}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Urls de las imagenes"
                placeholder="URLs"
              />
            )}
          />

          <TextField
            label="Descripcion"
            name="description"
            value={formData.desctiption}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />

          {!isEditOpen && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              Add
            </Button>
          )}
        </>
      );
    } else if (formData.type === "button") {
      return (
        <>
          <TextField
            label="Titulo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />
          <TextField
            label="Descripcion"
            name="description"
            value={formData.desctiption}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />
          <TextField
            label="Link adonde redirigira al darle click. Ej: https://www.google.com"
            name="link"
            value={formData.link}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />
          {!isEditOpen && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              Add
            </Button>
          )}
        </>
      );
    }

    return <></>;
  };

  return (
    <Box>
      <h1 style={{ textAlign: "start", lineHeight: 0, fontSize: 45 }}>
        Gestor de publicidades
      </h1>
      <p style={{ textAlign: "start" }}>
        En esta sección podes gestionar las publicidades que se muestran en la
        web.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            style={{
              fontSize: 30,
              fontWeight: "700",
              lineHeight: 1,
              marginRight: 7,
            }}
          >
            Carousels
          </p>
          <p
            style={{
              fontSize: 30,
              fontWeight: "700",
              color: "#969696",
              lineHeight: 1,
            }}
          >
            {!loading && data.length}
          </p>
        </div>

        <div>
          <Button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
            }}
            startIcon={isAddOpen ? <ExpandLess /> : <ExpandMore />}
            onClick={() => {
              setIsEditOpen(false);
              setIsAddOpen(!isAddOpen);
            }}
          >
            Agregar nuevo carousel
          </Button>
        </div>
      </div>
      <Collapse in={isAddOpen}>
        <Box
          component={Paper}
          p={2}
          mb={2}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Box
            style={{
              width: "100%",
            }}
          >
            <Select
              label="Tipo"
              title="Tipo"
              name="type"
              value={formData.type}
              type="text"
              onChange={(e) => {
                setFormData(initialFormData);
                handleChange(e);
              }}
              style={{ width: "300px" }}
            >
              <MenuItem value="static">Imagen Estatica</MenuItem>
              <MenuItem value="category">Categorias</MenuItem>
              <MenuItem value="banner">Banner</MenuItem>
              <MenuItem value="button">Button</MenuItem>
            </Select>
            {formDataByType()}
          </Box>
        </Box>
        {/* video cover preview */}
      </Collapse>
      {loading ? (
        <div className="main-container">
          <LoadingSpinner />
        </div>
      ) : data.length === 0 ? (
        <div style={{}}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={black}>Title</TableCell>
                  <TableCell style={black}>Description</TableCell>
                  <TableCell style={black}>Images</TableCell>
                  <TableCell style={black}>Link</TableCell>
                  <TableCell style={black}>Type</TableCell>
                  <TableCell style={black}>Fecha de creación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>No hay datos</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={black}>Title</TableCell>
                <TableCell style={black}>Description</TableCell>
                <TableCell style={black}>Images</TableCell>
                <TableCell style={black}>Link</TableCell>
                <TableCell style={black}>Type</TableCell>
                <TableCell style={black}>Fecha de creación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={black}>{row.title}</TableCell>
                    <TableCell style={black}>{row.description}</TableCell>
                    <TableCell style={black}>
                      {row.imagesUrl ? row.imagesUrl.length : 0}
                    </TableCell>
                    <TableCell style={black}>{row.link}</TableCell>
                    <TableCell style={black}>{row.type}</TableCell>
                    <TableCell style={black}>
                      {formatDateToString(row.createdAt)}{" "}
                    </TableCell>
                    <TableCell style={black}>
                      <IconButton
                        onClick={() => {
                          setCurrentEdit(row);
                          setFormData(row);
                          setIsAddOpen(false);
                          setIsEditOpen(!isEditOpen);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Collapse in={isEditOpen}>
        <Box component={Paper} p={2} mt={2}>
          <Box
            style={{
              width: "100%",
            }}
          >
            <Select
              label="Tipo"
              title="Tipo"
              name="type"
              value={formData.type}
              type="text"
              disabled
              onChange={(e) => {
                setFormData(initialFormData);
                handleChange(e);
              }}
              style={{ width: "300px" }}
            >
              <MenuItem value="static">Imagen Estatica</MenuItem>
              <MenuItem value="category" disabled>
                Categorias
              </MenuItem>
              <MenuItem value="banner">Banner</MenuItem>
              <MenuItem value="button">Button</MenuItem>
            </Select>
            {formDataByType()}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
            disabled={loading}
          >
            Save
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ABMCarousel;
