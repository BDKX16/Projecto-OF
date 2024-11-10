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

const ContentPage = () => {
  const userState = useSelector((state) => state.user);
  const { loading, callEndpoint } = useFetchAndLoad();
  const [data, setData] = useState({});

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
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="main-container">
        <LoadingSpinner />
      </div>
    );
  } else if (Object.keys(data).length === 0) {
    return (
      <div className="main-container">
        <NotFound />
      </div>
    );
  } else if (data.status === "unauthorized") {
    return <Navigate to="/login" />;
  } else if (data.status === "pending") {
    return (
      <div className="main-container">
        <PendingPayment video={data} />{" "}
      </div>
    );
  } else if (data.videoUrl == null) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: 30,
          borderRadius: 15,
        }}
      >
        <Checkout video={data} />
      </div>
    );
  } else {
    return <VideoPage video={data} />;
  }
};

export default ContentPage;
