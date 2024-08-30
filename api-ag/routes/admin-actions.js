const express = require("express");
const { checkAuth, checkRole } = require("../middlewares/authentication");

const router = express.Router();

/*
Page personalization:
logo 128x128
logo 64x64
logo 30x30


*/

// GET /admin/content - Get all content
router.get("/content", checkAuth, (req, res) => {
  // Logic to fetch all content from the database

  // ...
  res.send("Get all content");
});

// GET /admin/content/:id - Get a specific content by ID
router.get("/content/:id", checkAuth, checkRole("admin"), (req, res) => {
  const { id } = req.params;
  // Logic to fetch content by ID from the database
  // ...
  res.send(`Get content with ID ${id}`);
});

// POST /admin/content - Create new content
router.post("/content", checkAuth, checkRole("admin"), (req, res) => {
  const { title, body } = req.body;
  // Logic to create new content in the database
  // ...
  res.send(`Create new content: ${title}`);
});

// PUT /admin/content/:id - Update existing content
router.put("/content/:id", checkAuth, checkRole("admin"), (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  // Logic to update content by ID in the database
  // ...
  res.send(`Update content with ID ${id}`);
});

// DELETE /admin/content/:id - Delete existing content
router.delete("/content/:id", checkAuth, checkRole("admin"), (req, res) => {
  const { id } = req.params;
  // Logic to delete content by ID from the database
  // ...
  res.send(`Delete content with ID ${id}`);
});

// GET /admin/payments - Get all payments
router.get("/payments", checkAuth, checkRole("admin"), (req, res) => {
  // Logic to fetch all payments from the database
  // ...
  res.send("Get all payments");
});

// GET /admin/payments/:id - Get a specific payment by ID
router.get("/payments/:id", checkAuth, checkRole("admin"), (req, res) => {
  const { id } = req.params;
  // Logic to fetch payment by ID from the database
  // ...
  res.send(`Get payment with ID ${id}`);
});

// POST /admin/payments - Create new payment
router.post("/payments", checkAuth, checkRole("admin"), (req, res) => {
  const { amount, description } = req.body;
  // Logic to create new payment in the database
  // ...
  res.send(`Create new payment: ${description}`);
});

// PUT /admin/payments/:id - Update existing payment
router.put("/payments/:id", checkAuth, checkRole("admin"), (req, res) => {
  const { id } = req.params;
  const { amount, description } = req.body;
  // Logic to update payment by ID in the database
  // ...
  res.send(`Update payment with ID ${id}`);
});

// DELETE /admin/payments/:id - Delete existing payment
router.delete("/payments/:id", checkAuth, checkRole("admin"), (req, res) => {
  const { id } = req.params;
  // Logic to delete payment by ID from the database
  // ...
  res.send(`Delete payment with ID ${id}`);
});

module.exports = router;
