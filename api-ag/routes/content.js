const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const { checkAuth, checkRole } = require("../middlewares/authentication");
const Content = require("../models/content.js");
const Category = require("../models/category.js");
const VideoCategory = require("../models/video_category.js");
const Payment = require("../models/payment.js");
// GET /api/content/:videoId
router.get("/content/:videoId", async (req, res) => {
  const videoId = req.params.videoId;

  if (videoId === "undefined") {
    return res.status(400).json({ message: "VideoId is required" });
  }

  try {
    const content = await Content.findOne({ _id: videoId });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const payment = await Payment.findOne({ videoId: videoId });

    if (!payment) {
      const videoContent = {
        title: content.title,
        videoUrl: undefined,
        description: content.description,
        coverUrl: content.coverUrl,
        status: undefined,
        price: content.price,
        createdAt: content.createdAt,
        id: content.id,
      };
      return res.status(200).json(videoContent);
    }

    if (payment.status !== "completed") {
      const videoContent = {
        title: content.title,
        videoUrl: undefined,
        status: payment.status,
        description: content.description,
        coverUrl: content.coverUrl,
        price: content.price,
        createdAt: content.createdAt,
        id: content.id,
      };
      return res.status(200).json(videoContent);
    }

    // Increment the count of the specific content
    await Content.updateOne({ _id: videoId }, { $inc: { cantVisits: 1 } });

    // Example response
    const videoContent = {
      title: content.title,
      description: content.description,
      videoUrl: content.videoUrl,
      status: payment.status,
      coverUrl: content.coverUrl,
      price: content.price,
      categorys: content.categorys,
      createdAt: content.createdAt,
      id: content.id,
    };

    return res.status(200).json(videoContent);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/content
router.get("/content", async (req, res) => {
  try {
    const content = await Content.find({});
    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/content
router.get("/content-search/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let content;
    if (id === "favorites") {
      content = await Content.find({}).sort({ likes: -1 }).limit(15);
    } else if (id === "most-liked") {
      content = await Content.find({}).sort({ likes: -1 }).limit(15);
    } else if (id === "most-recent") {
      content = await Content.find({}).sort({ createdAt: -1 }).limit(15);
    } else if (id === "this-month") {
      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
      content = await Content.find({ createdAt: { $gte: startOfMonth } }).limit(
        15
      );
    } else {
      content = await Content.find({
        title: { $regex: id, $options: "i" },
      }).limit(15);
    }

    content = content.map((item) => {
      const { videoUrl, ...rest } = item.toObject();
      return rest;
    });

    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
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

        return category;
      } catch (error) {
        console.log(error);
      }
    })
  );

  res.json(algo);
});

module.exports = router;
