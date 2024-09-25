import { useEffect, useState } from "react";

import "./contentpage.css";
import Checkout from "../checkout/Checkout.jsx";

import useFetchAndLoad from "../../../hooks/useFetchAndLoad.js";
import { getVideo } from "../../../services/public.js";
import VideoPage from "./VideoPage.jsx";
import { createContentAdapter } from "../../../adapters/content.js";
import NotFound from "./NotFound.jsx";
import { enqueueSnackbar } from "notistack";
import PendingPayment from "./PendingPayment.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const ContentPage = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const videoId = urlParams.get("id");
      // Use the parameters as needed
      const result = await callEndpoint(getVideo(videoId));

      if (Object.keys(result).length === 0) {
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
  } else if (data.status === "pending") {
    return (
      <div className="main-container">
        <PendingPayment video={data} />{" "}
      </div>
    );
  } else if (data.videoUrl == null) {
    return <Checkout />;
  } else {
    return <VideoPage video={data} />;
  }
};

export default ContentPage;
