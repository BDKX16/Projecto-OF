const express = require("express");

const router = express.Router();
const Template = require("../models/template.js");
const Carousel = require("../models/carousel.js");
const Content = require("../models/content.js");
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
  "/template/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const templateId = req.params.id;
    try {
      const template = await Template.findOne({ _id: templateId });

      let componentIds = template.components.map(
        (component) => component.componentId
      );

      let carousels = await Carousel.find({ _id: { $in: componentIds } });

      const content = await Content.find({});

      carousels.forEach((carousel, index) => {
        if (carousel.type === "category") {
          carousel.imagesUrl = content.filter((content) =>
            content.categorys.includes(carousel.title)
          );
        }
      });

      template.components.forEach((component, index) => {
        template.components[index].componentData = carousels.find(
          (carousel) => carousel._id.toString() === component.componentId
        );
      });

      return res.status(200).json(template);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
