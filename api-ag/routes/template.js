const express = require("express");

const router = express.Router();
const Template = require("../models/template.js");

const { checkAuth, checkRole } = require("../middlewares/authentication");
// GET all templates
router.get(
  "/templates",
  checkAuth,
  checkRole(["admin", "owner"]),
  (req, res) => {
    // Logic to fetch all templates from the database
    Template.find({})
      .then((templates) => {
        res.status(200).json(templates);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "Failed to fetch templates from the database" });
      });
  }
);

// GET a specific template by ID
router.get(
  "/templates/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  (req, res) => {
    const templateId = req.params.id;
    // Logic to fetch the template with the given ID from the database
    // Send the template as a response
  }
);

module.exports = router;
