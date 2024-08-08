const express = require("express");
//mconst mercadopago = require("mercadopago");

const router = express.Router();

// Set up MercadoPago credentials
//mercadopago.configure({
//  access_token: "YOUR_ACCESS_TOKEN",
//});

// Create a new payment
router.post("/payments", async (req, res) => {
  try {
    const { amount, description } = req.body;

    // Create a payment preference
    const preference = {
      items: [
        {
          title: description,
          quantity: 1,
          currency_id: "USD",
          unit_price: parseFloat(amount),
        },
      ],
    };

    // Create a payment
    //const response = await mercadopago.preferences.create(preference);

    // Return the payment preference ID
    //res.json({ preferenceId: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// Get payment status
router.get("/payments/:id", async (req, res) => {
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
});

module.exports = router;
