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
import { getContent, getPayment } from "../../../services/public";
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
  deletePayment,
  editPayment,
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
          setData(result.data.map((item) => createPaymentAdapter(item)));
        }
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id, status) => {
    const result = await callEndpoint(editPayment(id, status));
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
    const result = await callEndpoint(deletePayment(id));
    if (result.status !== 200) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      enqueueSnackbar("Contenido eliminado", { variant: "success" });
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleViewUser = async (id) => {
    const result = await callEndpoint(getPayment(id));
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

  const PaymentIcon = ({ method }) => {
    switch (method) {
      case "mercadopago":
        return (
          <img
            width={40}
            src="https://logospng.org/download/mercado-pago/logo-mercado-pago-icone-1024.png"
            alt="mercadopago"
          />
        );
      case "paypal":
        return (
          <img
            width={60}
            src="https://freelogopng.com/images/all_img/1655979298paypal-logo-png-transparent.png"
            alt="paypal"
          />
        );
      case "stripe":
        return (
          <img
            width={60}
            src="https://th.bing.com/th/id/OIP.edmqAxMa4imIeujI3QyrqwHaDb?rs=1&pid=ImgDetMain"
            alt="stripe"
          />
        );
      default:
        return <p>{method}</p>;
    }
  };

  const PaymentStatus = ({ status }) => {
    switch (status) {
      case "pending":
      case "deleted":
      case "in_process":
      case "in_mediation":
        return (
          <span
            style={{
              backgroundColor: "#e0e0e0a7",
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
            {status}
          </span>
        );
      case "completed":
      case "approved":
      case "accredited":
      case "authorized":
        return (
          <span
            style={{
              backgroundColor: "#a0dda568",
              border: "solid",
              borderWidth: 2,
              borderColor: "#34c440",
              color: "#33bb3f",
              borderRadius: 20,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 3,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {status}
          </span>
        );
      case "charged_back":
        return (
          <span
            style={{
              backgroundColor: "#dfdbff83",
              border: "solid",
              borderWidth: 2,
              borderColor: "#564ce2",
              color: "#4f37d4",
              borderRadius: 20,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 3,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {status}
          </span>
        );
      case "failed":
      case "rejected":
      case "cancelled":
      case "refunded":
        return (
          <span
            style={{
              backgroundColor: "#f09d9d60",
              border: "solid",
              borderWidth: 2,
              borderColor: "#c92f2fd5",
              color: "#c92f2fca",
              borderRadius: 20,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 3,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {status}
          </span>
        );
      default:
        return <span>{status}</span>;
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
                <TableCell>User</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Metodo de pago</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Actions</TableCell>
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
                        <Tooltip
                          title={
                            row.userData &&
                            Object.entries(row.userData)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")
                          }
                        >
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
                    <TableCell disabled>{row.userId}</TableCell>
                    <TableCell>{row.videoId}</TableCell>
                    <TableCell>
                      <PaymentStatus
                        status={row.nullDate == null ? row.status : "deleted"}
                      ></PaymentStatus>
                    </TableCell>
                    <TableCell>{row.amount + " " + row.currency}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          ...black,
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <PaymentIcon method={row.paymentMethod}></PaymentIcon>
                      </div>
                    </TableCell>
                    <TableCell>{formatDateToString(row.date)}</TableCell>
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
