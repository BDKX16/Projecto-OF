import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Collapse,
  TextField,
  IconButton,
  Box,
  Switch,
  Chip,
  Autocomplete,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";

import { Add, Edit, Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useEffect } from "react";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { enqueueSnackbar } from "notistack";
import { getContent } from "../../../services/public";
import { getCategorys } from "../../../services/private";
import {
  editContent,
  deleteContent,
  addContent,
  contentState,
} from "../../../services/private";
import { createContentAdapter } from "../../../adapters/content";
import { createCategoryAdapter } from "../../../adapters/categorys";
import { formatDateToString } from "../../../utils/format-date-to-string";
import LoadingSpinner from "../../content/components/LoadingSpinner";

const initialFormData = {
  title: "",
  description: "",
  price: 0,
  categorys: [],
  coverUrl: "",
  videoUrl: "",
  date: new Date(),
};
const initialTrailerData = {
  videoUrl: "",
  images: [],
  description: "",
};

const initialPaymentData = {
  usd: 0,
  eur: 0,
  ars: 0,
  brl: 0,
  col: 0,
  mxn: 0,
};

const steps = ["Video", "Trailer", "Pago"];

const ABMTable = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  //stepper

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [data, setData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [trailerData, setTrailerData] = useState(initialTrailerData);
  const [paymentData, setPaymentData] = useState(initialPaymentData);

  const [categorys, setCategorys] = useState([]);
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
    fetchCategorys();
    fetchData();
  }, []);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        formData.title &&
        formData.description &&
        formData.coverUrl &&
        formData.videoUrl &&
        formData.categorys.length > 0
      ) {
        handleComplete();
      } else {
        handleUncomplete();
      }
    } else if (activeStep === 1) {
      if (
        trailerData.videoUrl &&
        trailerData.images.length > 0 &&
        trailerData.description
      ) {
        handleComplete();
      } else {
        handleUncomplete();
      }
    } else if (activeStep === 2) {
      if (
        paymentData.usd &&
        paymentData.eur &&
        paymentData.ars &&
        paymentData.brl &&
        paymentData.col &&
        paymentData.mxn
      ) {
        handleComplete();
      } else {
        handleUncomplete();
      }
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      if (
        formData.title &&
        formData.description &&
        formData.coverUrl &&
        formData.videoUrl &&
        formData.categorys.length > 0
      ) {
        handleComplete();
      } else {
        handleUncomplete();
      }
    } else if (activeStep === 1) {
      if (
        trailerData.videoUrl &&
        trailerData.images.length > 0 &&
        trailerData.description
      ) {
        handleComplete();
      } else {
        handleUncomplete();
      }
    } else if (activeStep === 2) {
      if (
        paymentData.usd &&
        paymentData.eur &&
        paymentData.ars &&
        paymentData.brl &&
        paymentData.col &&
        paymentData.mxn
      ) {
        handleComplete();
      } else {
        handleUncomplete();
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    //handleNext();
  };
  const handleUncomplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: false,
    });
    //handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleImagesUrlChange = (e) => {
    setTrailerData({ ...trailerData, images: e });
  };

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
    console.log(currentEdit);
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
    }
  };
  const fetchCategorys = async () => {
    const result = await callEndpoint(getCategorys());
    if (!result || Object.keys(result)?.length === 0) {
      return;
    } else {
      if (result.data.length !== 0) {
        setCategorys(result.data.map((item) => item.name));
      }
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoriesChange = (e) => {
    setFormData({ ...formData, categorys: e });
  };

  const handleTrailerChange = (e) => {
    setTrailerData({ ...trailerData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
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
            <Stepper
              nonLinear
              activeStep={activeStep}
              style={{ marginBottom: 40, paddingLeft: 60, paddingRight: 60 }}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && (
              <>
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
                  helperText="Url de la imagen de portada en jpeg o jpg. Preferentemente en formato 150x150, aunque puede ir cualquier tamaño si es el mismo en todo el contenido"
                  name="coverUrl"
                  label="Cover URL"
                  value={formData.coverUrl}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  helperText="https://s3.almengragala.com/..."
                  label="Video URL"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Autocomplete
                  multiple
                  name="categorys"
                  id="categorys"
                  options={categorys}
                  onChange={(e, value) => {
                    handleCategoriesChange(value);
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
                      label="Categorias"
                      placeholder="Categorias"
                    />
                  )}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <TextField
                  label="Description"
                  name="description"
                  value={trailerData.description}
                  onChange={handleTrailerChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={8}
                />
                <TextField
                  helperText="https://s3.almengragala.com/..."
                  label="Video URL"
                  name="videoUrl"
                  value={trailerData.videoUrl}
                  onChange={handleTrailerChange}
                  fullWidth
                  margin="normal"
                />
                <Autocomplete
                  multiple
                  name="imagesUrl"
                  id="imagesUrl"
                  options={trailerData.images}
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
              </>
            )}
            {activeStep === 2 && (
              <>
                <TextField
                  label="Europa (€)"
                  name="eur"
                  value={paymentData.eur}
                  onChange={handlePaymentChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Argentina (ARS)"
                  name="ars"
                  value={paymentData.ars}
                  onChange={handlePaymentChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Brazil (R$)"
                  name="brl"
                  value={paymentData.brl}
                  onChange={handlePaymentChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Colombia (COP)"
                  name="col"
                  value={paymentData.col}
                  onChange={handlePaymentChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Mexico (MXN)"
                  name="mxn"
                  value={paymentData.mxn}
                  onChange={handlePaymentChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Resto del mundo (U$D)"
                  name="usd"
                  value={paymentData.usd}
                  onChange={handlePaymentChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
              </>
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isLastStep() ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAdd}
                  disabled={loading || !allStepsCompleted()}
                >
                  Finalizar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                >
                  Siguiente
                </Button>
              )}
            </Box>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
              style={{ marginTop: 20, paddingLeft: 40, paddingRight: 40 }}
            >
              Agregar
            </Button> */}
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
                  <TableRow key={row.id}>
                    <TableCell style={{ color: "#272727" }}>
                      {row.title}
                    </TableCell>
                    <TableCell style={{ color: "#272727" }}>
                      {row.description != null && row.description.length > 20
                        ? `${row.description.substring(0, 20)}...`
                        : row.description}
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
            helperText="https://s3.almengragala.com/..."
            label="Video URL"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Autocomplete
            multiple
            name="categorys"
            id="categorys"
            options={categorys}
            freeSolo
            value={formData.categorys}
            onChange={(e, value) => {
              handleCategoriesChange(value);
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
                label="Categorias"
                placeholder="Categorias"
              />
            )}
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
