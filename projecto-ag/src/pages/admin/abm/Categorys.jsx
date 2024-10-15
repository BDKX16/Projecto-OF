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
  Box,
  Switch,
} from "@mui/material";
import { Add, Edit, Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useEffect } from "react";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { enqueueSnackbar } from "notistack";
import {
  getCategorys,
  editCategory,
  deleteCategory,
  addCategory,
} from "../../../services/private";
import { createCategoryAdapter } from "../../../adapters/categorys";
import { formatDateToString } from "../../../utils/format-date-to-string";
import LoadingSpinner from "../../content/components/LoadingSpinner";

import { RgbaStringColorPicker } from "react-colorful";
const initialFormData = {
  name: "",
  color: "",
};

const ABMCategorys = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getCategorys());

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("No hay datos", {
            variant: "warning",
          });
        } else {
          setData(result.data.map((item) => createCategoryAdapter(item)));
        }
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setData([...data, { ...formData, id: Math.random() * 10000 }]);

    //handle submit form
    const result = await callEndpoint(addCategory(formData));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido agregado", { variant: "success" });
      setData([...data, result.data]);
      setFormData(initialFormData);
    }
    setIsAddOpen(false);
  };

  const handleEdit = async () => {
    const result = await callEndpoint(editCategory(formData));
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
    const result = await callEndpoint(deleteCategory(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido eliminado", { variant: "success" });
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setFormData({ ...formData, color: e });
  };

  return (
    <Box>
      <h1 style={{ textAlign: "start", lineHeight: 0, fontSize: 45 }}>
        Gestor de categorias
      </h1>
      <p style={{ textAlign: "start" }}>
        En esta sección podras agregar, editar y eliminar categorias/grupos de
        videos
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
            Categorias
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
            Agregar nueva categoria
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
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="text"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
                marginTop: 30,
              }}
            >
              <div style={{ width: "50%" }}>
                <TextField
                  label="Color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <p style={{ color: "grey" }}>
                  Formatos disponibles: HEX (#333), RGBA (rgba(255, 255, 255,
                  0.5))
                </p>
              </div>

              <RgbaStringColorPicker
                color={formData.color}
                onChange={handleColorChange}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              Add
            </Button>
          </Box>
        </Box>
        {/* video cover preview */}
      </Collapse>
      {loading ? (
        <div className="main-container">
          <LoadingSpinner />
        </div>
      ) : data.length === 0 ? (
        <div className="main-container">
          <p>No hay datos</p>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#272727" }}>Nombre</TableCell>
                <TableCell style={{ color: "#272727" }}>Color</TableCell>
                <TableCell style={{ color: "#272727" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ color: "#272727" }}>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ color: "#272727" }}>
                      <IconButton
                        style={{
                          backgroundColor: row.color || "grey",
                          width: 35,
                          padding: 20,
                          borderRadius: 20,
                          marginRight: 10,
                        }}
                        onClick={() => {
                          setCurrentEdit(row);
                          setFormData(row);
                          setIsAddOpen(false);
                          setIsEditOpen(!isEditOpen);
                        }}
                      ></IconButton>
                    </TableCell>

                    <TableCell>
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
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignContent: "center",
              marginTop: 30,
            }}
          >
            <div style={{ width: "50%" }}>
              <TextField
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <p style={{ color: "grey" }}>
                Formatos disponibles: HEX (#333), RGBA (rgba(255, 255, 255,
                0.5))
              </p>
            </div>

            <RgbaStringColorPicker
              color={formData.valor}
              onChange={handleColorChange}
            />
          </div>
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

export default ABMCategorys;
