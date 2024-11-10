const express = require("express");

const router = express.Router();
const Template = require("../models/template.js");
const Carousel = require("../models/carousel.js");
const Content = require("../models/content.js");

// GET /api/content
router.get("/webcontent", async (req, res) => {
  try {
    console.log("hola");
    let template = await Template.findOne({
      nullDate: null,
      active: true,
      $or: [{ validityFrom: null }, { validityFrom: { $lt: new Date() } }],
      $or: [{ validityTo: null }, { validityTo: { $gt: new Date() } }],
    });

    if (!template) {
      return res.status(500).json({ message: "Template not found" });
    }

    template = template.toObject();
    delete template.nullDate;
    delete template.validityFrom;
    delete template.validityTo;
    delete template.userId;
    delete template.active;
    delete template._id;

    let componentIds = template.components.map(
      (component) => component.componentId
    );

    let carousels = await Carousel.find({ _id: { $in: componentIds } });

    const content = await Content.find({});

    const sanitizedContent = content.map((item) => {
      const sanitizedItem = item.toObject();
      delete sanitizedItem.videoUrl;
      delete sanitizedItem.dislikes;
      delete sanitizedItem.validityFrom;
      delete sanitizedItem.validityTo;
      delete sanitizedItem.nullDate;
      return sanitizedItem;
    });

    carousels.forEach((carousel, index) => {
      if (carousel.type === "category") {
        carousel.imagesUrl = sanitizedContent.filter((sanitizedContent) =>
          sanitizedContent.categorys.includes(carousel.title)
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
