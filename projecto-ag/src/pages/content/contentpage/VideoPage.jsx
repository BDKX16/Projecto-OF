import React from "react";
import { formatDateToString } from "../../../utils/format-date-to-string";

import { Button, Typography } from "@mui/material";

const VideoPage = ({ video }) => {
  return (
    <div
      className="mid-container"
      style={{ justifyContent: "start", padding: 0 }}
    >
      {/* Aquí puedes agregar el reproductor de video y otros elementos relacionados */}
      <div className="video-container">
        <iframe
          width="100%"
          height="100%"
          src={video.videoUrl}
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-info">
        <Typography
          component="h1"
          style={{ fontSize: "1.1rem", marginBottom: 10, lineHeight: 1.2 }}
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
        {video.categorys && (
          <>
            <Typography variant="h6" mr={2} color="text.primary">
              Categorías:
            </Typography>{" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              {video.categorys.map((category) => (
                <Button
                  key={category}
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: 5, marginTop: 5, marginLeft: 5 }}
                >
                  {category}
                </Button>
              ))}{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
