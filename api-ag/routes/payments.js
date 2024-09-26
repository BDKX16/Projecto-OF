const express = require("express");
const {
  MercadoPagoConfig,
  Preference,

  Payment,
} = require("mercadopago");

const { checkAuth, checkRole } = require("../middlewares/authentication");
const router = express.Router();

const Payments = require("../models/payment.js");
const Content = require("../models/content.js");

// Set up MercadoPago credentials
const client = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADOPAGO_ACCESS_TOKEN ||
    "TEST-4044483755982456-090411-5db8f54f0db2a277d1634dc16b51bc3d-157050868",
});

// Create a new payment
router.post(
  "/payments",
  checkAuth,
  checkRole(["user", "admin", "owner"]),
  async (req, res) => {
    try {
      const { contentId } = req.body;
      var paymentData;
      //guardar solicitud en mongo, estado: pendiente
      const content = await Content.findById(contentId);
      console.log(content);
      // Create a payment preference
      const requestMP = {
        body: {
          items: [
            {
              title: "test",
              quantity: 1,
              unit_price: 100,
            },
          ],
          back_urls: {
            success: "https://almendragala.com/success",
            failure: "https://almendragala.com/failure",
            pending: "https://almendragala.com/pending",
          },
          notification_url: "https://almendragala.com/api/payments/webhook",
          redirect_urls: {
            success: "https://almendragala.com/success",
            failure: "https://almendragala.com/failure",
            pending: "https://almendragala.com/pending",
          },
        },
      };

      const preference = await new Preference(client)
        .create(requestMP)
        .then((res) => (paymentData = res))
        .catch((error) => console.error(error));

      // Create a payment
      console.log(preference);
      /** 
      const payment = new Payments({
        userId: req.user._id,
        contentId: contentId,
        paymentId: preference.order.id,
        paymentMethod: "mercadopago",
        currency: "ars",
        date: new Date(),
        videoId: contentId,
        status: preference.status,
        amount: 100,
      });*/
      //const response = await mercadopago.preferences.create(preference);
      // Return the payment preference ID
      res.json(preference);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create payment" });
    }
  }
);

// Get user payments
router.get(
  "/payments",
  checkAuth,
  checkRole(["user", "admin", "owner"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      // Get the payment status
      let payments = await Payments.find({ userId: id });

      if (payments.length === 0) {
        return res.status(404).json({ error: "No payments found" });
      }

      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get payment status" });
    }
  }
);

// Get payment status
router.get(
  "/payments/:id",
  checkAuth,
  checkRole(["user", "admin", "owner"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Get the payment status
      //const response = await mercadopago.payment.get(id);

      // Return the payment status
      //res.json({ status: response.body.status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get payment status" });
    }
  }
);

router.post("/payments/success", async (req, res) => {
  console.log(req.query);
  const payment = req.query;

  try {
    res.status(204).send("webhook");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get payment status" });
  }
});

router.post("/payments/webhook", async (req, res) => {
  const payment = req.query;
  const body = req.body;
  console.log(body);

  const mpPayments = new Payment(client);
  try {
    if (payment.type === "payment") {
      const paymentId = payment["data.id"];
      console.log(paymentId);
      const pago = await mpPayments
        .get(paymentId)
        .then(console.log)
        .catch(console.log);
      //const data = await Payments.findById(payment["data.id"]);
      console.log(pago);
    }

    res.status(204).send("webhook");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get payment status" });
  }
});

module.exports = router;
