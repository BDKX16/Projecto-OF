const express = require("express");

const router = express.Router();
const Template = require("../models/template.js");
const Configuration = require("../models/configuration.js");
const User = require("../models/user.js");
const Category = require("../models/category.js");
const Carousel = require("../models/carousel.js");
const Content = require("../models/content.js");

// GET /api/content
router.get("/webcontent", async (req, res) => {
  try {
    let template = await Template.findOne({});

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
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;