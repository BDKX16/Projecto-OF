const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cantVisits: {
    type: Number,
    default: 0,
  },
  categorys: {
    type: [String],
    required: true,
  },
  coverUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  validityFrom: {
    type: Date,
    required: true,
    default: null,
  },
  validityTo: {
    type: Date,
    required: false,
    default: null,
  },
  nullDate: {
    type: Date,
    required: false,
    default: null,
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
