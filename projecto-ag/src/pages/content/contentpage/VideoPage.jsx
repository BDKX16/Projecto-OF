import React from "react";
import { formatDateToString } from "../../../utils/format-date-to-string";

import { Button, Typography } from "@mui/material";

const VideoPage = ({ video }) => {
  return (
    <div className="main-container">
      {/* Aquí puedes agregar el reproductor de video y otros elementos relacionados */}
      <div className="video-container">
        <iframe
          width="100%"
          height="100%"
          src={
            video.videoUrl ||
            "https://via.placeholder.com/989x556?text=Video+not+found"
          }
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-info">
        <Typography
          component="h1"
          variant="h1"
          fontWeight={400}
          color="text.primary"
        >
          {video.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {formatDateToString(video.date)}
        </Typography>
        <Typography variant="body1" fontWeight={500} color="text.secondary">
          {video.description}
        </Typography>
      </div>
    </div>
  );
};

export default VideoPage;
