const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: false,
  },
  videoId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  nullDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "completed",
      "failed",
      "approved",
      "accredited",
      "cancelled",
      "rejected",
      "authorized",
    ],
    default: "pending",
  },
  userData: {
    type: Object,
    required: false,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
