const express = require("express");

const router = express.Router();

const Content = require("../models/content.js");
const Category = require("../models/category.js");
const VideoCategory = require("../models/video_category.js");
const mongoose = require("mongoose");

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

// GET /api/categorys
router.get("/categorys", async (req, res) => {
  //get all categorys
  var categorys = await Category.find({});

  //for each category push all videos
  let algo = await Promise.all(
    categorys.map(async (item) => {
      try {
        var category = item;
        var video_categorys = await VideoCategory.find({
          categoryId: category._id,
        });
        //get all videos
        var videos = await Promise.all(
          video_categorys.map(async (element) => {
            return await Content.findOne({ _id: element.videoId });
          })
        );
        category.videos = videos;
        console.log(category);
        console.log(category.videos);
        return category;
      } catch (error) {
        console.log(error);
      }
    })
  );

  res.json(algo);
});

module.exports = router;
