const express = require("express");

const router = express.Router();

// GET /api/content/:videoId
router.get("/content/:videoId", (req, res) => {
  const videoId = req.params.videoId;

  // Fetch the content of the video with the given videoId
  // Replace this with your own logic to fetch the video content

  //Authenticate if the user is allowed to view the video

  // Example response
  const videoContent = {
    id: videoId,
    title: "Video Title",
    description: "Video Description",
    url: "https://example.com/videos/video1.mp4",
  };

  res.json(videoContent);
});

// GET /api/content
router.get("/content", (req, res) => {
  const videoId = req.params.videoId;

  // Fetch the content of the video with the given videoId
  // Replace this with your own logic to fetch the video content

  //Authenticate if the user is allowed to view the video

  // Example response
  const videoContent = [
    {
      id: "as7dyn8q7yn8172dynq807dy8q2",
      title: "Video Title",
      description: "Video Description",
      createdAt: "2021-09-01T12:00:00Z",
      videoUrl: "https://example.com/videos/video1.mp4",
      coverUrl: "https://example.com/images/video1.jpg",
      price: 10.0,
    },
    {
      id: "d81228dy172dynq807dy8q2",
      title: "Video Title1",
      description: "Video Description1",
      createdAt: "2021-09-01T12:00:00Z",
      videoUrl: "https://example.com/videos/video1.mp4",
      coverUrl: "https://example.com/images/video1.jpg",
      price: 12.0,
    },
  ];

  res.json(videoContent);
});

module.exports = router;
