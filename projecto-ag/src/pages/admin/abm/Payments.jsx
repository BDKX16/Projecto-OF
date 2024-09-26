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
  getPayments,
} from "../../../services/private";
import { createPaymentAdapter } from "../../../adapters/payments";
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

const Payments = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getPayments());

      if (!result || Object.keys(result)?.length === 0) {
        return;
      } else {
        if (result.data.length === 0) {
          enqueueSnackbar("No hay datos", {
            variant: "warning",
          });
        } else {
          console.log(result.data);
          setData(result.data.map((item) => createPaymentAdapter(item)));
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

  const changeState = async (id, status) => {
    const result = await callEndpoint(contentState(id, !status));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar(
        status == true ? "Contenido desabilitado" : "Contenido visible",
        { variant: "success" }
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const colorPaymentStatus = (role) => {
    switch (role) {
      case "pending":
        return (
          <span
            style={{
              backgroundColor: "#e0e0e0",
              border: "solid",
              borderWidth: 2,
              borderColor: "#858282",
              color: "#696969",
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
      case "completed":
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
        Gestor de pagos
      </h1>
      <p style={{ textAlign: "start" }}>
        En esta sección se pueden visualizar y gestionar los pagos de los
        usuarios.
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
                <TableCell style={black}>User</TableCell>
                <TableCell style={black}>Video</TableCell>
                <TableCell style={black}>Estado</TableCell>
                <TableCell style={black}>Monto</TableCell>
                <TableCell style={black}>Metodo de pago</TableCell>
                <TableCell style={black}>Fecha</TableCell>
                <TableCell style={black}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow
                    key={row.id}
                    style={{
                      backgroundColor: row.nullDate != null && "#ebebeb",
                    }}
                  >
                    <TableCell>
                      <div>
                        <Tooltip title={JSON.stringify(row.userData)}>
                          <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-haspopup="true"
                          >
                            <Avatar sx={{ width: 42, height: 42 }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell disabled style={black}>
                      {row.userId}
                    </TableCell>
                    <TableCell style={black}>{row.videoId}</TableCell>
                    <TableCell style={black}>
                      {colorPaymentStatus(
                        row.nullDate == null ? row.status : "deleted"
                      )}
                    </TableCell>
                    <TableCell style={black}>
                      {row.amount + " " + row.currency}
                    </TableCell>
                    <TableCell style={black}>{row.paymentMethod}</TableCell>
                    <TableCell style={black}>
                      {formatDateToString(row.date)}
                    </TableCell>
                    <TableCell>
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
    </Box>
  );
};

export default Payments;
