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
} from "@mui/material";
import { Add, Edit, Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useEffect } from "react";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { enqueueSnackbar } from "notistack";
import { addTheme, deleteTheme, editTheme } from "../../../services/private";
import { getTheme } from "../../../services/public";
import { RgbaStringColorPicker } from "react-colorful";

const Personalization = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState({ clave: "", valor: "" });

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getTheme());

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("No hay datos", {
            variant: "warning",
          });
        } else {
          console.log(result.data);
          setData(result.data);
        }
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsAddOpen(false);
    const result = await callEndpoint(addTheme(formData));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido agregado", { variant: "success" });
      setData([...data, result.data]);
    }
    setFormData({ clave: "", valor: "" });
    setIsAddOpen(false);
  };

  const handleEdit = async () => {
    console.log(currentEdit._id);
    var toSend = {
      clave: formData.clave,
      valor: formData.valor,
      _id: currentEdit._id,
    };

    const result = await callEndpoint(editTheme(toSend));
    if (result.status !== 200) {
      enqueueSnackbar("Error en la edicion", { variant: "error" });
    } else {
      enqueueSnackbar("Configuracion editada", { variant: "success" });
      setData([...data, result.data]);
    }

    setData(
      data.map((item) => (item._id === currentEdit._id ? formData : item))
    );
    setFormData({ clave: "", valor: "" });
    setIsEditOpen(false);
    setCurrentEdit(null);
  };

  const handleDelete = async (id) => {
    const clave = data.find((item) => item._id === id).clave;
    setData(data.filter((item) => item._id !== id));
    const result = await callEndpoint(deleteTheme(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar(clave + " borrado", { variant: "success" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setFormData({ ...formData, valor: e });
  };

  return (
    <Box>
      <h1 style={{ textAlign: "start", lineHeight: 0, fontSize: 45 }}>
        Paleta de colores
      </h1>
      <p style={{ textAlign: "start" }}>
        En esta seccion podras agregar, editar y borrar colores de la paleta de
        colores y propiedades de la pagina.
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
            Colores
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
            Agregar nuevo video
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
              label="Clave"
              name="clave"
              value={formData.clave}
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
                  label="Valor"
                  name="valor"
                  value={formData.valor}
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

            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </Box>
        {/* video cover preview */}
      </Collapse>
      {data.length === 0 ? (
        <p>No hay datos</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#272727" }}>Clave</TableCell>
                <TableCell style={{ color: "#272727" }}>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        color: "#272727",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: row.valor || "grey",
                          padding: 20,
                          borderRadius: 20,
                          marginRight: 10,
                        }}
                      ></div>
                      {row.clave}
                    </TableCell>
                    <TableCell style={{ color: "#272727" }}>
                      {row.valor}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setCurrentEdit(row);
                          setFormData(row);
                          setIsEditOpen(true);
                          setIsAddOpen(false);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row._id)}>
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
            label="Clave"
            name="clave"
            value={formData.clave}
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
                label="Valor"
                name="valor"
                value={formData.valor}
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

          <Button variant="contained" color="primary" onClick={handleEdit}>
            Save
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Personalization;
