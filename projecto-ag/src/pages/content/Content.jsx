import Carousel from "./components/Carousel";
import Publicity from "./components/Publicity";
import Classification from "./components/Classification";
import "./content.css";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { getContent } from "../../services/public";
const Content = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getContent());

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
          console.log(result);
          //setData(result.data.map((item) => createCategoryAdapter(item)));
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Carousel />
      <Classification />
      m
      <Classification />
      <Classification />
    </div>
  );
};

export default Content;
