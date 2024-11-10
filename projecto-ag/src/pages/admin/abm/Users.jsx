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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect } from "react";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { enqueueSnackbar } from "notistack";
import {
  editUser,
  deleteUser,
  getUsers,
  getUser,
} from "../../../services/private";
import { createUserManagmentAdapter } from "../../../adapters/user";
import { formatDateToString } from "../../../utils/format-date-to-string";
import LoadingSpinner from "../../content/components/LoadingSpinner";

const black = { color: "#272727" };
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
      const result = await callEndpoint(getUsers());

      if (!result || Object.keys(result)?.length === 0) {
        return;
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

  const handleEdit = async () => {
    console.log(currentEdit.id);
    console.log(formData.role);

    console.log("currentEdit");
    const result = await callEndpoint(
      editUser(currentEdit.id, formData.role, null)
    );
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
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleViewUser = async (id) => {
    const result = await callEndpoint(getUser(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido eliminado", { variant: "success" });
      //show modal
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const colorRole = (role, deleted = false) => {
    if (deleted) {
      return (
        <span
          style={{
            backgroundColor: "#dddddd",
            border: "solid",
            borderWidth: 2,
            borderColor: "#868686",
            color: "#636363",
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
    }
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
      <h1 style={{ textAlign: "start", lineHeight: 0, fontSize: 45 }}>
        Gestor de usuarios
      </h1>
      <p style={{ textAlign: "start" }}>
        En esta sección se pueden agregar, editar y eliminar usuarios.
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
            Usuarios
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

        <div></div>
      </div>
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
                        <Tooltip title={row.name}>
                          <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-haspopup="true"
                          >
                            <Avatar sx={{ width: 42, height: 42 }}>
                              {row.name.charAt(0).toUpperCase()}
                            </Avatar>
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p
                        style={{
                          fontWeight: "600",
                          lineHeight: ".2rem",
                          fontSize: ".8rem",
                          color: "#272727",
                        }}
                      >
                        {row.name}
                      </p>
                      <p
                        style={{
                          lineHeight: ".2rem",
                          fontSize: ".8rem",
                          color: "#525252",
                        }}
                      >
                        {row.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      {colorRole(row.role, row.nullDate != null)}
                    </TableCell>
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
                      {/*<IconButton onClick={() => handleViewUser(row.id)}>
                        <Visibility />
                      </IconButton>*/}
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
            label="Role"
            name="role"
            value={formData.role}
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
