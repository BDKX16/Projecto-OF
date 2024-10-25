const express = require("express");

const { checkAuth, checkRole } = require("../middlewares/authentication");
const Configuration = require("../models/configuration.js");
const router = express.Router();

// GET public configuration
router.get(
  "/theme",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      // Logic to retrieve the public configuration
      //
      const values = await Configuration.find({});

      res.json(values);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
