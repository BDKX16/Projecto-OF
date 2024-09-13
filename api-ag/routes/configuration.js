const express = require("express");

const Configuration = require("../models/configuration.js");
const router = express.Router();

// GET public configuration
router.get("/theme", async (req, res) => {
  try {
    // Logic to retrieve the public configuration
    //
    const values = await Configuration.find({});

    res.json(values);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
