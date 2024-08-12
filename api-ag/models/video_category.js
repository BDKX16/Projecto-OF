const mongoose = require("mongoose");

const videoCategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
});

const VideoCategory = mongoose.model("VideoCategory", videoCategorySchema);

module.exports = VideoCategory;
