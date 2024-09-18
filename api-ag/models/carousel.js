const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  imagesUrl: {
    type: Array,
    required: false,
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
