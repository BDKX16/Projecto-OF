import React, { useState } from "react";
import {
  Table,
  Tooltip,
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
  Avatar,
  Switch,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  ExpandMore,
  ExpandLess,
  ViewAgenda,
  Visibility,
} from "@mui/icons-material";
import { useEffect } from "react";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { enqueueSnackbar } from "notistack";
import { getContent } from "../../../services/public";
import {
  editContent,
  deleteContent,
  addContent,
  contentState,
  editUser,
  deleteUser,
  getUsers,
  getUser,
} from "../../../services/private";
import { createUserManagmentAdapter } from "../../../adapters/user";
import { formatDateToString } from "../../../utils/format-date-to-string";
import LoadingSpinner from "../../content/components/LoadingSpinner";

const initialFormData = {
  confirmed: false,
  email: "",
  name: "",
  role: "",
  nullDate: "",
  createdAt: "",
};

const ABMUsuarios = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching");
      const result = await callEndpoint(getUsers());

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
          setData(result.data.map((item) => createUserManagmentAdapter(item)));
        }
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(formData);
    setData([...data, { ...formData, id: Math.random() * 10000 }]);

    //handle submit form
    const result = await callEndpoint(addContent(formData));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido agregado", { variant: "success" });
      console.log(result.data);
      setData([...data, result.data]);
      setFormData(initialFormData);
    }
    setIsAddOpen(false);
  };

  const handleEdit = async () => {
    console.log(formData);
    const result = await callEndpoint(editUser(formData));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Usuario editado", { variant: "success" });
      setFormData(initialFormData);
      setData(
        data.map((item) => (item.id === currentEdit.id ? formData : item))
      );
      setIsEditOpen(false);
    }
    setCurrentEdit(null);
  };

  const handleDelete = async (id) => {
    const result = await callEndpoint(deleteUser(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido eliminado", { variant: "success" });
      console.log(result);
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleViewUser = async (id) => {
    const result = await callEndpoint(getUser(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido eliminado", { variant: "success" });
      console.log(result);
      //show modal
    }
  };

  const changeState = async (id, status) => {
    console.log(id);
    const result = await callEndpoint(contentState(id, !status));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar(
        status == true ? "Contenido desabilitado" : "Contenido visible",
        { variant: "success" }
      );

      console.log(
        data.map((item) => {
          if (item.id === id) {
            item.status = !item.status;
          }
          return item;
        })
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const colorRole = (role) => {
    switch (role) {
      case "admin":
        return (
          <span
            style={{
              backgroundColor: "#ffdbdb",
              border: "solid",
              borderWidth: 2,
              borderColor: "#ef4c4c",
              color: "#ef4c4c",
              borderRadius: 20,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 3,
              textTransform: "capitalize",
            }}
          >
            {role}
          </span>
        );
      case "owner":
        return (
          <span
            style={{
              backgroundColor: "#dfdbff",
              border: "solid",
              borderWidth: 2,
              borderColor: "#574cef",
              color: "#644cef",
              borderRadius: 20,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 3,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {role}
          </span>
        );
      case "user":
        return (
          <span
            style={{
              backgroundColor: "#dbffdb",
              border: "solid",
              borderWidth: 2,
              borderColor: "#39c958",
              color: "#39c958",
              borderRadius: 20,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 3,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {role}
          </span>
        );
      default:
        return <span>{role}</span>;
    }
  };

  return (
    <Box>
      <h1>User managment</h1>

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
                <TableCell></TableCell>
                <TableCell>User</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Fecha de creacion</TableCell>
                <TableCell>Fecha de baja</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div>
                        <Tooltip title="Account settings">
                          <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-haspopup="true"
                          >
                            <Avatar sx={{ width: 42, height: 42 }}>M</Avatar>
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p
                        style={{
                          fontWeight: "600",
                          lineHeight: ".2rem", // Use lineHeight property to control the height of a single line of text
                          fontSize: ".8rem",
                        }}
                      >
                        {row.name}
                      </p>
                      <p style={{ lineHeight: ".2rem", fontSize: ".8rem" }}>
                        {row.email}
                      </p>
                    </TableCell>
                    <TableCell>{colorRole(row.role)}</TableCell>
                    <TableCell>{formatDateToString(row.createdAt)}</TableCell>
                    <TableCell>{formatDateToString(row.nullDate)}</TableCell>
                    <TableCell>
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
                      <IconButton onClick={() => handleViewUser(row.id)}>
                        <Visibility />
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

export default ABMUsuarios;
