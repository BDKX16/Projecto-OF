import React, { useState } from "react";
import {
  formatDateToString,
  timeSince,
} from "../../../utils/format-date-to-string";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { likeVideo, dislikeVideo } from "../../../services/public";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";

const VideoPage = ({ video }) => {
  const theme = useTheme();
  const { loading, callEndpoint } = useFetchAndLoad();
  const [interactions, setInteractions] = useState({
    like: video.liked,
    dislike: video.disliked,
    likes: video.likes,
    dislikes: video.dislikes,
  });

  const likeVideoHandle = async () => {
    const { data } = await callEndpoint(likeVideo(video.id));
    if (data) {
      let likes = interactions.likes;
      let dislikes = interactions.dislikes;
      if (interactions.like == true) {
        likes--;
      } else {
        likes++;
        if (interactions.dislike) dislikes--;
      }
      setInteractions({
        dislikes: dislikes,

        likes: likes,
        like: data.like,
        dislike: data.dislike,
      });
    }
  };

  const dislikeVideoHandle = async () => {
    const { data } = await callEndpoint(dislikeVideo(video.id));
    let dislikes = interactions.dislikes;
    let likes = interactions.likes;
    if (data) {
      if (interactions.dislike == true) {
        dislikes--;
      } else {
        dislikes++;
        if (interactions.like) likes--;
      }
      setInteractions({
        dislikes: dislikes,

        likes: likes,
        like: data.like,
        dislike: data.dislike,
      });
    }
  };

  const shareVideoHandle = () => {
    console.log("Share video");
  };

  const calculateLikePercentage = () => {
    const total = video.likes + video.dislikes;
    if (total === 0) return "0%";
    return `${((video.likes / total) * 100).toFixed(2)}%`;
  };

  return (
    <div
      className="mid-container"
      style={{ justifyContent: "start", padding: 0 }}
    >
      {/* Aquí puedes agregar el reprod</div>uctor de video y otros elementos relacionados */}
      <div className="video-container">
        <iframe
          style={{
            width: "100dvw",
            height: "50dvw",
            maxWidth: "1280px",
            maxHeight: "80vh",
          }}
          frameBorder={0}
          src={video.videoUrl}
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <Box
        className="video-info"
        sx={{ maxWidth: 1310, paddingLeft: 2, paddingRight: 2 }}
      >
        <Typography
          component="h1"
          style={{ fontSize: "1.1rem", marginBottom: 10, lineHeight: 1.2 }}
          fontWeight={400}
          color="text.primary"
        >
          {video.title}
        </Typography>
        <Box
          className="battom-video-bar"
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          width="100%"
        >
          <Box
            className="battom-video-bar"
            display="flex"
            justifyContent="space-between"
            gap={2}
          >
            <Typography variant="subtitle1" color="text.secondary">
              {video.views + " vistas"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {"|"}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <ThumbUpIcon sx={{ color: theme.palette.text.secondary }} />
              <Typography variant="subtitle1" color="text.secondary">
                {calculateLikePercentage()}
              </Typography>
            </Box>

            <Typography variant="subtitle1" color="text.secondary">
              {"|"}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              {timeSince(video.date)}
            </Typography>
          </Box>
          <Box
            className="battom-video-bar"
            display="flex"
            justifyContent="space-between"
            gap={5}
          >
            <Button
              sx={{ display: "flex", alignItems: "center" }}
              disabled={loading}
              onClick={() => {
                likeVideoHandle();
              }}
            >
              <ThumbUpIcon
                sx={{
                  color: interactions.like
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                }}
              />
              <Typography
                sx={{ marginTop: 1, marginLeft: 2 }}
                variant="subtitle1"
                color="text.secondary"
              >
                {interactions.likes}
              </Typography>
            </Button>
            <Button
              sx={{ display: "flex", alignItems: "center" }}
              disabled={loading}
              onClick={() => {
                dislikeVideoHandle();
              }}
            >
              <ThumbDownIcon
                sx={{
                  color:
                    interactions.dislike == true
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                }}
              />
              <Typography
                sx={{ marginTop: 1, marginLeft: 2 }}
                variant="subtitle1"
                color="text.secondary"
              >
                {interactions.dislikes}
              </Typography>
            </Button>

            <Button
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
              onClick={() => {
                shareVideoHandle();
              }}
            >
              <ReplyIcon />
              <Typography
                sx={{ marginTop: 1 }}
                variant="subtitle1"
                color="text.secondary"
              >
                {"Compartir"}
              </Typography>
            </Button>
          </Box>
        </Box>

        <Typography
          variant="body1"
          fontWeight={500}
          color="text.secondary"
          sx={{ textWrap: "balance", letterSpacing: "0.00938em", marginTop: 2 }}
        >
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
      </Box>
    </div>
  );
};

export default VideoPage;
