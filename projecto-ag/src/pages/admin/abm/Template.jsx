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
import { getTemplates } from "../../../services/public";
import { createTemplateAdapter } from "../../../adapters/template";
import { formatDateToString } from "../../../utils/format-date-to-string";

const Templates = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "" });

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getTemplates());

      if (Object.keys(result).length === 0) {
        return;
      } else if (result.status === 401) {
        enqueueSnackbar("No autorizado", {
          variant: "error",
        });
      } else if (result.status !== 200) {
        enqueueSnackbar("Error", {
          variant: "error",
        });
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("No hay datos", {
            variant: "warning",
          });
        } else {
          console.log(result.data);
          setData(result.data.map((item) => createTemplateAdapter(item)));
        }
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    setData([...data, { ...formData, id: Date.now() }]);
    setFormData({ name: "", age: "" });
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    setData(data.map((item) => (item.id === currentEdit.id ? formData : item)));
    setFormData({ name: "", age: "" });
    setIsEditOpen(false);
    setCurrentEdit(null);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <h1 style={{ textAlign: "start", lineHeight: 0, fontSize: 45 }}>
        Gestor de templates
      </h1>
      <p style={{ textAlign: "start", flexWrap: "nowrap" }}>
        En esta seccion podras armar tu pagina web con los templates. Estos
        definen el orden de los carousels, publicidades y componentes en la
        pagina principal.
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
              marginRight: 6,
            }}
          >
            Templates
          </p>
          <p
            style={{
              fontSize: 30,
              fontWeight: "700",
              color: "#969696",
              lineHeight: 1,
            }}
          >
            11
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
            Agregar nuevo template
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
              width: "50%",
            }}
          >
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={8}
            />
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              helperText="Url de la imagen de portada en jpeg o jpg"
              name="coverUrl"
              value={formData.coverUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              helperText="Url del video"
              label="Video URL"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </Box>
          <Box
            style={{
              width: "50%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {formData.coverUrl ? (
              <img
                src={formData.coverUrl}
                alt="cover"
                style={{ width: 300, height: 200, borderRadius: 5 }}
              />
            ) : (
              <div
                style={{
                  backgroundColor: "lightgrey",
                  borderRadius: 10,
                  width: 200,
                  height: 200,
                }}
              ></div>
            )}
            {formData.title ? (
              <h3 style={{ margin: 2 }}>{formData.title}</h3>
            ) : (
              <div style={{ padding: 20 }}></div>
            )}

            {formData.description ? (
              <p style={{ margin: 2, maxWidth: 300 }}>{formData.description}</p>
            ) : (
              <div style={{ padding: 20 }}></div>
            )}
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
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Fecha de subida</TableCell>
                <TableCell>Portada</TableCell>
                <TableCell>Video</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{formatDateToString(row.date)}</TableCell>
                    <TableCell>
                      {row.coverUrl
                        ? row.coverUrl.substring(0, 20) + "..."
                        : " - "}
                    </TableCell>
                    <TableCell>
                      {row.videoUrl
                        ? row.videoUrl.substring(0, 20) + "..."
                        : " - "}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setCurrentEdit(row);
                          setFormData(row);
                          setIsEditOpen(true);
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
            label="Name"
            name="name"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={8}
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            helperText="Url de la imagen de portada en jpeg o jpg"
            name="coverUrl"
            value={formData.coverUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            helperText="Url del video"
            label="Video URL"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Save
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Templates;
