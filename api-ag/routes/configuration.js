const express = require("express");

const Configuration = require("../models/configuration.js");
const router = express.Router();

// GET public configuration
router.get("/theme", async (req, res) => {
  try {
    // Logic to retrieve the public configuration
    //
    const values = await Configuration.find({});

    // Send the public configuration as response
    const response = {
      theme: "light",
      primary: "#333",
      secondary: "#333",
      background: "#333",
      topbar: "#fff",
      sidebar: "#fff",
      footer: "#fff",
    };

    res.json(values);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
