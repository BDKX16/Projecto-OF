const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const mongoose = require("mongoose");

const { checkAuth, checkRole } = require("../middlewares/authentication");
const Content = require("../models/content.js");
const Category = require("../models/category.js");
const VideoCategory = require("../models/video_category.js");
const Payment = require("../models/payment.js");
const Interaction = require("../models/interaction.js");

// GET /api/content/:videoId
router.get("/content/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  let token = req.get("token");
  let userId;

  if (videoId === "undefined") {
    return res.status(400).json({ message: "VideoId is required" });
  }

  try {
    const content = await Content.findOne({ _id: videoId });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    try {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            const videoContent = {
              title: content.title,
              videoUrl: undefined,
              description: content.description,
              coverUrl: content.coverUrl,
              status: "expiredToken",
              price: content.price,
              createdAt: content.createdAt,
              id: content.id,
              trailer: content.trailer,
              priceTable: content.priceTable,
            };
            await Interaction.create({
              videoId: videoId,
              type: "visita-trailer",
              state: true,
              createdAt: Date.now(),
            });
            return res.status(200).json(videoContent);
          } else {
            const videoContent = {
              title: content.title,
              videoUrl: undefined,
              description: content.description,
              coverUrl: content.coverUrl,
              status: "unauthorized",
              price: content.price,
              createdAt: content.createdAt,
              id: content.id,
              trailer: content.trailer,
              priceTable: content.priceTable,
            };
            await Interaction.create({
              videoId: videoId,
              type: "visita-trailer",
              state: true,
              createdAt: Date.now(),
            });
            return res.status(200).json(videoContent);
          }
        } else {
          userId = decoded.userData._id;
          const payment = await Payment.findOne({
            userId: userId,
            videoId: videoId,
            nullDate: null,
            status: {
              $in: ["completed", "approved", "accredited", "authorized"],
            },
          });

          if (!payment) {
            ///MOSTRAR TRAILER
            const videoContent = {
              title: content.title,
              videoUrl: undefined,
              description: content.description,
              coverUrl: content.coverUrl,
              status: undefined,
              price: content.price,
              createdAt: content.createdAt,
              id: content.id,
              trailer: content.trailer,
              priceTable: content.priceTable,
            };

            res.status(200).json(videoContent);

            await Interaction.create({
              userId: userId,
              videoId: videoId,
              type: "visita-trailer",
              state: true,
              createdAt: Date.now(),
            });
            return;
          }

          const likes = await Interaction.find({
            videoId: content.id,
            type: "like",
            state: true,
          }).countDocuments();
          const dislikes = await Interaction.find({
            videoId: content.id,
            type: "dislike",
            state: true,
          }).countDocuments();

          const liked = (await Interaction.findOne({
            userId: userId,
            videoId: content.id,
            type: "like",
            state: true,
          }))
            ? true
            : false;

          const disliked = (await Interaction.findOne({
            userId: userId,
            videoId: content.id,
            type: "dislike",
            state: true,
          }))
            ? true
            : false;

          const favorite = (await Interaction.findOne({
            userId: userId,
            videoId: content.id,
            type: "favorite",
            state: true,
          }))
            ? true
            : false;

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
            likes: likes,
            dislikes: dislikes,
            cantVisits: content.cantVisits,
            liked: liked,
            disliked: disliked,
            favorite: favorite,
          };

          res.status(200).json(videoContent);

          // Increment the count of the specific content
          await Content.updateOne(
            { _id: videoId },
            { $inc: { cantVisits: 1 } }
          );

          await Interaction.create({
            userId: userId,
            videoId: videoId,
            type: "visita",
            state: true,
            createdAt: Date.now(),
          });
          return;
        }
      });
    } catch (err) {
      console.log("jwt error:");
      console.log(err);
      const videoContent = {
        title: content.title,
        videoUrl: undefined,
        description: content.description,
        coverUrl: content.coverUrl,
        status: "unauthorized",
        price: content.price,
        createdAt: content.createdAt,
        id: content.id,
      };
      return res.status(200).json(videoContent);
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/content/like", checkAuth, async (req, res) => {
  const videoId = req.body.videoId;
  let state;
  if (videoId === "undefined") {
    return res.status(400).json({ message: "VideoId is required" });
  }

  try {
    const like = await Interaction.findOne({
      userId: req.userData._id,
      videoId: videoId,
      type: "like",
    });

    if (like) {
      await Interaction.updateOne(
        {
          userId: req.userData._id,
          videoId: videoId,
          type: "like",
        },
        {
          state: !like.state,
          createdAt: Date.now(),
        }
      );
      state = !like.state;
    } else {
      Interaction.create({
        userId: req.userData._id,
        videoId: videoId,
        type: "like",
        state: true,
        createdAt: Date.now(),
      });
      state = true;
    }

    await Interaction.updateOne(
      {
        userId: req.userData._id,
        videoId: videoId,
        type: "dislike",
      },
      {
        state: false,
      }
    );

    return res.status(200).json({ like: state, dislike: false });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/content/dislike", checkAuth, async (req, res) => {
  const videoId = req.body.videoId;
  let state;
  if (videoId === "undefined") {
    return res.status(400).json({ message: "VideoId is required" });
  }

  try {
    const dislike = await Interaction.findOne({
      userId: req.userData._id,
      videoId: videoId,
      type: "dislike",
    });

    if (dislike) {
      await Interaction.updateOne(
        {
          userId: req.userData._id,
          videoId: videoId,
          type: "dislike",
        },
        {
          state: !dislike.state,
          createdAt: Date.now(),
        }
      );
      state = !dislike.state;
    } else {
      Interaction.create({
        userId: req.userData._id,
        videoId: videoId,
        type: "dislike",
        state: true,
        createdAt: Date.now(),
      });
      state = true;
    }

    await Interaction.updateOne(
      {
        userId: req.userData._id,
        videoId: videoId,
        type: "like",
      },
      {
        state: false,
      }
    );

    return res.status(200).json({ like: false, dislike: state });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/content/favorite", checkAuth, async (req, res) => {
  const videoId = req.body.videoId;

  if (videoId === "undefined") {
    return res.status(400).json({ message: "VideoId is required" });
  }

  try {
    const like = await Interaction.findOne({
      userId: req.userData._id,
      videoId: videoId,
      type: "favorite",
    });

    if (like) {
      await Interaction.updateOne(
        {
          userId: req.userData._id,
          videoId: videoId,
          type: "favorite",
        },
        {
          state: !like.state,
          createdAt: Date.now(),
        }
      );
    } else {
      Interaction.create({
        userId: req.userData._id,
        videoId: videoId,
        type: "favorite",
        state: true,
        createdAt: Date.now(),
      });
    }

    return res.status(200).json({ message: "Succes" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/content
router.get("/content-search/:id", async (req, res) => {
  try {
    const token = req.get("token");
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 15;

    let content;
    const total = await Content.countDocuments({});
    const totalPages = Math.ceil(total / limit);
    if (id === "favorites") {
      let userId;
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (!err) {
          userId = decoded.userData._id;
        }
        return;
      });
      const favoriteInteractions = await Interaction.find({
        userId: userId,
        type: "favorite",
        state: true,
      });
      const favoriteVideoIds = favoriteInteractions.map(
        (interaction) => interaction.videoId
      );

      content = await Content.find({
        _id: { $in: favoriteVideoIds },
      }).limit(limit);
    } else if (id === "most-liked") {
      const mostLikedInteractions = await Interaction.aggregate([
        { $match: { type: "like", state: true } },
        { $group: { _id: "$videoId", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: limit },
      ]);

      const mostLikedVideoIds = mostLikedInteractions.map(
        (interaction) => interaction.videoId
      );
      content = await Content.find({ _id: { $in: mostLikedVideoIds } }).limit(
        limit
      );

      content = await Content.find({}).sort({ likes: -1 }).limit(limit);
    } else if (id === "most-recent") {
      content = await Content.find({}).sort({ createdAt: -1 }).limit(limit);
    } else if (id === "this-month") {
      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
      content = await Content.find({ createdAt: { $gte: startOfMonth } }).limit(
        limit
      );
    } else {
      content = await Content.find({
        title: { $regex: id, $options: "i" },
      }).limit(limit);
    }

    content = content.map((item) => {
      const { videoUrl, ...rest } = item.toObject();
      return rest;
    });

    return res.status(200).json({
      content,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//PRIVATE

// GET /api/content
router.get(
  "/content",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const content = await Content.find({});
      return res.status(200).json(content);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// GET /api/categorys
router.get(
  "/categorys",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
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
  }
);

module.exports = router;
