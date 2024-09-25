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
  Select,
  MenuItem,
  Typography,
  Switch,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  ExpandMore,
  ExpandLess,
  Label,
  Visibility,
  Scale,
} from "@mui/icons-material";
import { useEffect } from "react";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { enqueueSnackbar } from "notistack";
import {
  getTemplates,
  getTemplate,
  addTemplate,
  editTemplate,
  deleteTemplate,
  selectTemplate,
  getCarousels,
} from "../../../services/private";
import { createTemplateAdapter } from "../../../adapters/template";
import { createCarouselAdapter } from "../../../adapters/carousels";
import { formatDateToString } from "../../../utils/format-date-to-string";
import { DatePicker } from "@mui/x-date-pickers";
import Carousel from "../../content/components/Carousel";
import Classification from "../../content/components/Classification";
const black = { color: "#272727" };

const initialFormData = {
  name: "",
  createdAt: new Date(),
  validityFrom: "",
  validityTo: "",
  components: [],
};
const Templates = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [carousels, setCarousels] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getTemplates());

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        setData(result.data.map((item) => createTemplateAdapter(item)));
      }
    };
    fetchCarousels();
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    const result = await callEndpoint(addTemplate(formData));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido agregado", { variant: "success" });
      setData([...data, createTemplateAdapter(result.data)]);
      setFormData(initialFormData);
      setIsAddOpen(false);
    }
  };

  const handleEdit = async () => {
    const result = await callEndpoint(editTemplate(formData));
    if (result.status !== 200) {
      enqueueSnackbar("Contenido agregado", { variant: "success" });
      setData([...data, createTemplateAdapter(result.data)]);
      setFormData(initialFormData);
      setIsAddOpen(false);
    }
    setData(data.map((item) => (item.id === currentEdit.id ? formData : item)));
    setFormData(initialFormData);
    setIsEditOpen(false);
    setCurrentEdit(null);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCarousels = async () => {
    const result = await callEndpoint(getCarousels());
    if (!result || Object.keys(result)?.length === 0) {
      return;
    } else {
      if (result.data.length !== 0) {
        setCarousels(result.data.map((item) => createCarouselAdapter(item)));
      }
    }
  };

  const addComponentToTemplate = (e) => {
    const component = carousels.find((item) => item.id === selectedComponent);
    setFormData({
      ...formData,
      components: [...formData.components, component],
    });
  };

  const handlePreview = async (id) => {
    const result = await callEndpoint(getTemplate(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error loading preview", { variant: "error" });
    } else {
      console.log(result.data);
    }
  };

  const handleChangeState = async (id, status) => {
    const result = await callEndpoint(selectTemplate(id, !status));
    if (result.status !== 200) {
      enqueueSnackbar("Error changing state", { variant: "error" });
    } else {
      setData(
        data.map((item) =>
          item.id === id ? { ...item, active: !status } : item
        )
      );
    }
  };

  const printPreview = () => {
    const component = carousels.find((item) => item.id === selectedComponent);
    if (component.type === "banner") {
      return (
        <>
          <h3>Banner</h3>
          <Carousel
            key={component.id}
            demo={true}
            data={{
              componentData: component,
              componentTitle: component.title,
            }}
            style={{ transform: "scale(0.2)" }}
          />
        </>
      );
    } else if (component.type === "button") {
      return (
        <>
          <h3>Boton</h3>
          <Button variant="contained" style={{ marginBottom: 9, marginop: 17 }}>
            {component.title}
          </Button>
          <Typography color={"white"}>{component.description}</Typography>
        </>
      );
      //return <Carousel key={component._id} data={component} />;
    } else if (component.type === "category") {
      return (
        <>
          <h3>Categoria</h3>
          <Classification
            key={component.id}
            demo={true}
            data={{
              componentData: component,
              componentTitle: component.title,
            }}
            style={{ transform: "scale(0.1)" }}
          />
        </>
      );
    } else {
      return null;
    }
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
              marginRight: 7,
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
            Agregar nuevo template
          </Button>
        </div>
      </div>
      <Collapse in={isAddOpen}>
        <Box
          component={Paper}
          p={2}
          mb={2}
          style={{ display: "flex", flexDirection: "row", gap: 50 }}
        >
          <Box
            style={{
              width: "50%",
            }}
          >
            <TextField
              label="Title"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <div style={{ display: "flex", gap: 50, marginBottom: 40 }}>
              <div>
                <p style={{ color: "grey" }}>Fecha de validez desde</p>
                <DatePicker
                  format="dd/MM/yyyy"
                  helperText="Fecha de validez desde"
                  value={formData.validitFrom}
                  onChange={(value) =>
                    handleChange({
                      target: { name: "validityFrom", value: value },
                    })
                  }
                />
              </div>
              <div>
                <p style={{ color: "grey" }}>Fecha de validez hasta</p>
                <DatePicker
                  helperText="Fecha de validez hasta"
                  value={formData.validitTo}
                  onChange={(value) =>
                    handleChange({
                      target: { name: "validityTo", value: value },
                    })
                  }
                />
              </div>
            </div>

            <Select
              label="Componentes"
              title="components"
              name="components"
              value={selectedComponent}
              type="text"
              disabled={carousels.length === 0}
              onChange={(e) => setSelectedComponent(e.target.value)}
              style={{ width: "300px", marginLeft: 40, marginRight: 40 }}
            >
              {carousels ? (
                carousels.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title + " - " + item.type}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No hay carousels</MenuItem>
              )}
            </Select>
            <Button
              color="secondary"
              variant="contained"
              onClick={addComponentToTemplate}
              style={{ marginRight: 40 }}
            >
              +
            </Button>
            <Button
              style={{ width: "100%", marginTop: 30, height: 50 }}
              variant="contained"
              color="primary"
              onClick={handleAdd}
            >
              Create
            </Button>
          </Box>
          <Box
            style={{
              width: "50%",
            }}
          >
            {selectedComponent && printPreview()}
          </Box>
        </Box>
      </Collapse>
      <Box mt={2}>
        {formData.components &&
          formData.components.map((component) => {
            if (component.type === "banner") {
              return (
                <Carousel
                  key={component.id}
                  demo={true}
                  data={{
                    componentData: component,
                    componentName: component.title,
                  }}
                  style={{ transform: "scale(0.2)" }}
                />
              );
            } else if (component.type === "button") {
              return (
                <>
                  <Button
                    key={component.id}
                    variant="contained"
                    style={{ marginBottom: 9, marginop: 17 }}
                  >
                    {component.title}
                  </Button>
                  <Typography color={"white"}>
                    {component.description}
                  </Typography>
                </>
              );
              //return <Carousel key={component._id} data={component} />;
            } else if (component.type === "category") {
              return (
                <Classification
                  key={component.id}
                  demo={true}
                  data={{
                    componentData: component,
                    componentName: component.title,
                  }}
                />
              );
            } else {
              return null;
            }
            return null;
          })}
      </Box>
      {data.length === 0 ? (
        <p>No hay datos</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={black}>Nombre</TableCell>
                <TableCell style={black}>Fecha de creacion</TableCell>
                <TableCell style={black}>Valido desde</TableCell>
                <TableCell style={black}>Valido hasta</TableCell>
                <TableCell style={black}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={black}>{row.name}</TableCell>
                    <TableCell style={black}>
                      {formatDateToString(row.createdAt)}
                    </TableCell>
                    <TableCell style={black}>
                      {formatDateToString(row.validityFrom)}
                    </TableCell>
                    <TableCell style={black}>
                      {formatDateToString(row.validityTo)}
                    </TableCell>
                    <TableCell style={black}>
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
                      <IconButton onClick={() => handlePreview(row.id)}>
                        <Visibility />
                      </IconButton>
                      <Switch
                        checked={row.active}
                        onClick={() => {
                          handleChangeState(row.id, row.active);
                        }}
                      ></Switch>
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
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <div
            style={{
              display: "flex",
              gap: 50,
              marginBottom: 40,
            }}
          >
            <div>
              <p style={{ color: "grey" }}>Fecha de validez desde</p>
              <DatePicker
                format="dd/MM/yyyy"
                helperText="Fecha de validez desde"
                value={formData.validitFrom}
                onChange={(value) =>
                  handleChange({
                    target: { name: "validityFrom", value: value },
                  })
                }
              />
            </div>
            <div>
              <p style={{ color: "grey" }}>Fecha de validez hasta</p>
              <DatePicker
                helperText="Fecha de validez hasta"
                value={formData.validitTo}
                onChange={(value) =>
                  handleChange({
                    target: { name: "validityTo", value: value },
                  })
                }
              />
            </div>
          </div>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Save
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Templates;
