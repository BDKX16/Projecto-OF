const express = require("express");
const { checkAuth, checkRole } = require("../middlewares/authentication");

const router = express.Router();
const Template = require("../models/template.js");
const Configuration = require("../models/configuration.js");
const User = require("../models/user.js");
const Category = require("../models/category.js");
const Carousel = require("../models/carousel.js");
const Payment = require("../models/payment.js");

/*
Page personalization:
logo 128x128
logo 64x64
logo 30x30


*/

// POST /admin/content - Create new content

router.post(
  "/content",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const content = req.body;

      content.state = true;
      content.categorys = [];
      content.price = parseFloat(content.price);

      await Content.create(content);
      return res.status(200).json(content);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// PUT /admin/content/:id - Update existing content
router.put(
  "/content",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const content = req.body;
      await Content.updateOne({ _id: content.id }, content);
      return res.status(200).json(content);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE /admin/content/:id - Delete existing content
router.delete(
  "/admin/content/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      await Content.deleteOne({ _id: id });
      return res.status(200).message({ message: "Content deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
router.put(
  "/content-state",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const body = req.body;

      await Content.findOneAndUpdate(
        { _id: body.id },
        { $set: { state: body.status } },
        { new: true }
      );

      return res.status(200).json({ message: "Content state updated" });
    } catch (error) {
      console.log(error);
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// PUT /admin/payments/:id - Update existing payment
router.get(
  "/payments",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const payments = await Payment.find({});
    res.status(200).json(payments);
  }
);

// PUT /admin/payments/:id - Update existing payment
router.put(
  "/payment/:id",
  checkAuth,
  checkRole(["owner"]),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const payment = await Payment.findOneAndUpdate({ _id: id }, { status });
    res.status(200).json(payment);
  }
);

// DELETE /admin/payments/:id - Delete existing payment
router.delete(
  "/payment/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const { id } = req.params;
    // Logic to delete payment by ID from the database
    // ...
    await Payment.findOneAndUpdate({ _id: id }, { nullDate: new Date() });
    res.status(200).json({ message: "Deleted" });
  }
);

// CREATE a new template
router.post(
  "/template",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const templateData = req.body;
    const userId = req.userData._id;
    // Logic to create a new template in the database using the provided data
    // Send the created template as a response
    //create the template with mongo
    try {
      console.log(templateData);
      const toSave = {
        userId: userId,
        name: templateData.name,
        createdAt: new Date(),
        validityFrom: templateData.validityFrom,
        validityTo: templateData.validityTo,
        nullDate: null,
        components: templateData.components.map((component) => ({
          componentName: component.title,
          componentType: component.type,
          componentId: component.id,
        })),
      };
      const template = await Template.create(toSave);

      return res.status(200).json(template);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE an existing template
router.put(
  "/templates/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  (req, res) => {
    const templateId = req.params.id;
    const templateData = req.body;
    // Logic to update the template with the given ID in the database using the provided data
    // Send the updated template as a response
  }
);

// SELECT an existing template
router.put(
  "/template/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const templateId = req.params.id;
    const templateData = req.body;

    try {
      await Template.updateOne(
        { _id: templateId },
        { active: templateData.active }
      );
      // Logic to update the template with the given ID in the database using the provided data
      // Send the updated template as a response
      return res.status(200).json({ message: "Template updated" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE a template
router.delete(
  "/templates/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const templateId = req.params.id;
    // Logic to delete the template with the given ID from the database
    // Send a success message as a response

    try {
      const template = await Template.findOneAndUpdate(
        { _id: templateId },
        { nullDate: new Date() }
      );

      return res.status(200).json({ message: "Template deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// PUT public configuration
router.post(
  "/theme",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      // Logic to update the public configuration
      const config = req.body;
      await Configuration.create(config);
      // Send a success message as response
      res.json({ message: "Public configuration updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE a theme
router.delete(
  "/theme/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const id = req.params.id;
    try {
      const deleted = await Configuration.deleteOne({ _id: id });

      return res.json({ message: "Theme deleted successfully" }).status(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// PUT public configuration
router.put(
  "/theme",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    // Logic to update the public configuration
    // ...
    const config = req.body;

    try {
      const edited = await Configuration.updateOne({ _id: config._id }, config);

      const values = await Configuration.find({});

      // Send a success message as response
      res.json(values).status(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// GET /admin/content - Get all content
router.get(
  "/users",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    // Logic to fetch all user from the database
    const users = await User.find({});

    users.map((user) => {
      user.password = undefined;
    });
    res.status(200).json(users);
  }
);

// GET /admin/user/:id - Get data of a specific user by ID
router.get(
  "/user/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const { id } = req.params;
    // Logic to fetch user by ID from the database
    try {
      const user = await User.findOne({ _id: id });

      //BUSCAR VIDEOS COMPRADOS DEL USUARIO
      //cantidad de visitas a la pagina
      //cantidad de videos comprados
      //cantidad de videos vistos
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// PUT /admin/user/:id - Update existing user
router.put("/user/:id", checkAuth, checkRole(["owner"]), async (req, res) => {
  const { id } = req.params;
  const { role, nullDate } = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { role, nullDate });

    if (user) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /admin/user/:id - Delete existing user
router.delete(
  "/user/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { nullDate: new Date() }
      );

      if (user) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// GET /admin/content - Get all content
router.get(
  "/categorys",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const categorys = await Category.find({});
      res.status(200).json(categorys);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// CREATE a new category
router.post(
  "/category",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const categoryData = req.body;
    console.log(categoryData);
    categoryData.id = null;
    try {
      const categorys = await Category.create(categoryData);
      return res.status(200).json(categorys);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.put(
  "/category",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    // Logic to update the public configuration
    // ...
    const config = req.body;

    try {
      await Category.updateOne({ _id: config.id }, config);

      const values = await Category.find({});

      // Send a success message as response
      res.json(values).status(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE a theme
router.delete(
  "/category/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const id = req.params.id;
    try {
      const deleted = await Category.deleteOne({ _id: id });

      return res.json({ message: "Category deleted successfully" }).status(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// GET /admin/content - Get all content
router.get(
  "/carousels",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const carousels = await Carousel.find({});
      res.status(200).json(carousels);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// CREATE a new carousel
router.post(
  "/carousel",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const carouselData = req.body;
    carouselData.createdAt = new Date();

    if (carouselData.type === "static") {
    } else if (carouselData.type === "banner") {
      //carouselData.link = null;
    } else if (carouselData.type === "category") {
      carouselData.description = null;
      carouselData.link = null;
      //get mongo category
    } else if (carouselData.type === "button") {
      carouselData.imagesUrl = null;
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }

    try {
      const carousels = await Carousel.create(carouselData);
      return res.status(200).json(carousels);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.put(
  "/carousel",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    // Logic to update the public configuration
    // ...
    const config = req.body;

    try {
      await Carousel.updateOne({ _id: config.id }, config);

      const values = await Carousel.find({});

      // Send a success message as response
      res.json(values).status(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE a theme
router.delete(
  "/carousel/:id",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    const id = req.params.id;
    try {
      const deleted = await Carousel.deleteOne({ _id: id });

      return res.json({ message: "Category deleted successfully" }).status(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
