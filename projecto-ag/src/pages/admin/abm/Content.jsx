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
import { getContent } from "../../../services/public";
import {
  editContent,
  deleteContent,
  addContent,
  contentState,
} from "../../../services/private";
import { createContentAdapter } from "../../../adapters/content";
import { formatDateToString } from "../../../utils/format-date-to-string";
import LoadingSpinner from "../../content/components/LoadingSpinner";

const initialFormData = {
  title: "",
  description: "",
  price: 0,
  coverUrl: "",
  videoUrl: "",
  date: new Date(),
};

const ABMTable = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getContent());

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("No hay datos", {
            variant: "warning",
          });
        } else {
          setData(result.data.map((item) => createContentAdapter(item)));
        }
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setData([...data, { ...formData, id: Math.random() * 10000 }]);

    //handle submit form
    const result = await callEndpoint(addContent(formData));
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
    const result = await callEndpoint(editContent(formData));
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
    const result = await callEndpoint(deleteContent(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido eliminado", { variant: "success" });
      setData(data.filter((item) => item.id !== id));
    }
  };

  const changeState = async (id, status) => {
    const result = await callEndpoint(contentState(id, !status));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar(
        status == true ? "Contenido desabilitado" : "Contenido visible",
        { variant: "success" }
      );
      m;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <h1 style={{ textAlign: "start", lineHeight: 0, fontSize: 45 }}>
        Gestor de contenido
      </h1>
      <p style={{ textAlign: "start" }}>
        En esta sección se pueden agregar, editar y eliminar videos.
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
            Contenido
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
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
                <TableCell style={{ color: "#272727" }}>Title</TableCell>
                <TableCell style={{ color: "#272727" }}>Description</TableCell>
                <TableCell style={{ color: "#272727" }}>Precio</TableCell>
                <TableCell style={{ color: "#272727" }}>
                  Fecha de subida
                </TableCell>
                <TableCell style={{ color: "#272727" }}>Portada</TableCell>
                <TableCell style={{ color: "#272727" }}>Video</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell style={{ color: "#272727" }}>
                      {row.title}
                    </TableCell>
                    <TableCell style={{ color: "#272727" }}>
                      {row.description}
                    </TableCell>
                    <TableCell style={{ color: "#272727" }}>
                      {row.price}
                    </TableCell>
                    <TableCell style={{ color: "#272727" }}>
                      {formatDateToString(row.date)}
                    </TableCell>
                    <TableCell style={{ color: "#272727" }}>
                      {row.coverUrl
                        ? row.coverUrl.substring(0, 20) + "..."
                        : " - "}
                    </TableCell>
                    <TableCell style={{ color: "#272727" }}>
                      {row.videoUrl
                        ? row.videoUrl.substring(0, 20) + "..."
                        : " - "}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={row.status}
                        onClick={() => changeState(row.id, row.status)}
                      ></Switch>
                      <IconButton
                        onClick={() => {
                          setCurrentEdit(row);
                          setFormData(row);
                          setIsAddOpen(false);
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

export default ABMTable;
