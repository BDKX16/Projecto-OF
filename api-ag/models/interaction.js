const mongoose = require("mongoose");
const { create } = require("./content");

const Schema = mongoose.Schema;

const InteractionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "like",
      "dislike",
      "visita",
      "visita-trailer",
      "comment",
      "share",
      "save",
      "report",
    ],
  },
  state: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Interaction", InteractionSchema);
