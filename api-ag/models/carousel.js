const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagesUrl: {
    type: Array,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Carousel = mongoose.model("Carousel", carouselSchema);

module.exports = Carousel;
