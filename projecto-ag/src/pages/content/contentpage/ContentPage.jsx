import { useEffect, useState } from "react";

import "./contentpage.css";
import Checkout from "../checkout/Checkout.jsx";
import { Navigate } from "react-router-dom";

import useFetchAndLoad from "../../../hooks/useFetchAndLoad.js";
import { getVideo } from "../../../services/public.js";
import VideoPage from "./VideoPage.jsx";
import { createContentAdapter } from "../../../adapters/content.js";
import NotFound from "./NotFound.jsx";
import PendingPayment from "./PendingPayment.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useSelector } from "react-redux";
import TrailerPage from "./TrailerPage.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "@mui/material";

const ContentPage = () => {
  const { logout } = useAuth();
  const { loading, callEndpoint } = useFetchAndLoad();
  const [data, setData] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const videoId = urlParams.get("id");
      // Use the parameters as needed
      const result = await callEndpoint(getVideo(videoId));

      if (!result || Object.keys(result).length === 0) {
        return;
      } else if (result.status !== 200) {
        //enqueueSnackbar("Error", { variant: "error", });
      } else {
        setData(createContentAdapter(result.data));
        if (result.data.status === "expiredToken") {
          logout();
        }
      }
    };

    fetchData();
  }, []);

  if (loading || data == null) {
    //loading || data == null
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          backgroundColor: theme.palette.background.default,
          top: 0,
          left: 0,
          height: "100dvh",
          width: "100dvw",
          zIndex: 100,
        }}
      >
        <LoadingSpinner />
      </div>
    );
  } else if (Object.keys(data).length === 0) {
    return (
      <div className="main-container">
        <NotFound />
      </div>
    );
  } else if (data.status === "pending") {
    return (
      <div className="main-container">
        <PendingPayment video={data} />{" "}
      </div>
    );
  } else if (data.videoUrl == undefined) {
    /* {<Checkout video={data} />} */
    return <TrailerPage video={data} />;
  } else {
    return <VideoPage video={data} />;
  }
};

export default ContentPage;
