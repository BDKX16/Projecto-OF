const mongoose = require("mongoose");

const videoCategorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    ref: "Category",
    required: true,
  },
  videoId: {
    type: String,
    ref: "Video",
    required: true,
  },
});

const VideoCategory = mongoose.model("VideoCategory", videoCategorySchema);

module.exports = VideoCategory;
