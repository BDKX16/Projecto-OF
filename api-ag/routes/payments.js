const express = require("express");
const crypto = require("crypto");
const {
  MercadoPagoConfig,
  Preference,

  Payment,
} = require("mercadopago");

const {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} = require("@paypal/paypal-server-sdk");

const bodyParser = require("body-parser");

const { checkAuth, checkRole } = require("../middlewares/authentication");
const router = express.Router();

const Payments = require("../models/payment.js");
const Content = require("../models/content.js");

// Set up PayPal credentials

const ppclient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: {
      logBody: true,
    },
    logResponse: {
      logHeaders: true,
    },
  },
});

const ordersController = new OrdersController(ppclient);

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
      const formData = req.body;
      const userId = req.userData._id;

      console.log(formData);
      let errorMessage = null;
      var paymentData;
      //guardar solicitud en mongo, estado: pendiente
      const content = await Content.findById(formData.contentId);
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }

      console.log("content");
      console.log(content);
      let paymentResponse;
      let paymentToSave = {
        userId: userId,
        contentId: formData.contentId,
        paymentId: null,
        paymentMethod: formData.paymentMethod,
        currency: "ARS",
        date: new Date(),
        videoId: formData.contentId,
        status: "pending",
        amount: content.price,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
      };

      if (formData.paymentMethod === "mercadopago") {
        paymentResponse = await processMercadopagoPayment(
          formData.contentId,
          content.price
        );

        if (!paymentResponse.preference) {
          return res.status(500).json({ error: "Failed to create payment" });
        }
      } else if (formData.paymentMethod === "paypal") {
        const usdPrice = (content.price / 1250) * 1.04;
        paymentResponse = await processPaypalPayment(usdPrice);

        if (
          !(
            paymentResponse.httpStatusCode === 201 ||
            paymentResponse.httpStatusCode === 200
          )
        ) {
          errorMessage = "Failed to create payment";
        } else {
          paymentToSave.paymentId = paymentResponse.jsonResponse.id;
          paymentToSave.currency = "USD";
        }
      } else {
        return res.status(500).json({ error: "Invalid payment method" });
      }

      if (!paymentResponse || errorMessage !== null) {
        return res
          .status(500)
          .json({ error: errorMessage || "Failed to create payment" });
      }

      const paymentResult = await Payments.create(paymentToSave);

      // Return the payment preference ID
      res
        .json({
          paymentResponse: paymentResponse,
          preferenceRedirect: paymentResponse.init_point,
          orderId: paymentResult._id,
        })
        .status(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create payment" });
    }
  }
);

// Get user payments (no sensitive data)
router.get(
  "/payments",
  checkAuth,
  checkRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      // Get the payment status
      let payments = await Payments.find({ userId: id });

      if (payments.length === 0) {
        return res.status(404).json({ error: "No payments found" });
      }
      payments = payments.map((payment) => {
        return {
          _id: payment._id,
          videoId: payment.videoId,
          status: payment.status,
          date: payment.date,
          amount: payment.amount,
          currency: payment.currency,
        };
      });

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
  checkRole(["admin", "owner"]),
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

// Capture payment region

router.post("/payments/paypal/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    const errorDetail = jsonResponse?.details?.[0];
    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
      console.error("Failed to create order:", error);
      return res.status(500).json({ error: "Failed to capture order." });
    } else if (errorDetail) {
      // (2) Other non-recoverable errors -> Show a failure message
      await Payments.findOneAndUpdate(
        {
          paymentMethod: "paypal",
          paymentId: jsonResponse.id,
        },
        { userData: userData, status: "rejected" }
      );
      res.status(500).json({ error: "Failed to capture order." });
      throw new Error(`${errorDetail.description} (${jsonResponse.debug_id})`);
    } else {
      // (3) Successful transaction -> Show confirmation or thank you message
      const transaction = jsonResponse.purchase_units[0].payments.captures[0];

      const userData = {
        user: jsonResponse.payer,
        address: jsonResponse.purchase_units[0].shipping.address,
      };

      await Payments.findOneAndUpdate(
        {
          paymentMethod: "paypal",
          paymentId: jsonResponse.id,
        },
        {
          userData: userData,
          status: "completed",
          date: new Date(),
          currency: transaction.amount.currency_code,
          amount: transaction.amount.value,
          netAmount: transaction.seller_receivable_breakdown.net_amount.value,
        }
      );
    }
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

router.post("/payments/success", async (req, res) => {
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
  if (payment.type != "payment") {
    return res.status(204).send("webhook");
  }

  //prod only
  const signatureHeader = req.headers["x-signature"];
  const requestHeader = req.headers["x-request-id"];

  const signatureParts = signatureHeader.split(",");

  // Initializing variables to store ts and hash
  let ts;
  let hash;
  // Iterate over the values to obtain ts and v1
  signatureParts.forEach((part) => {
    // Split each part into key and value
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });

  const secret = process.env.MERCADOPAGO_SECRET;
  // Generate the manifest string
  const manifest = `id:${body.data.id};request-id:${requestHeader};ts:${ts};`;

  // Create an HMAC signature
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);

  // Obtain the hash result as a hexadecimal string
  const sha = hmac.digest("hex");

  if (sha === hash) {
    console.log("Payment!");
  } else {
    // HMAC verification failed
    console.log("HMAC verification failed");
    return res.status(400).send("HMAC verification failed");
  }

  var paymentData;
  var userInfo = null;
  try {
    await new Payment(client)
      .get({ id: body.data.id })
      .then((res) => (paymentData = res))
      .catch(console.log);

    paymentData.payer && (userInfo = paymentData.payer);
    await Payments.findOneAndUpdate(
      {
        paymentMethod: "mercadopago",
        videoId: paymentData.additional_info.items[0].id,
      },
      {
        status: paymentData.status,
        paymentyId: paymentData.id,
        userData: userInfo,
      }
    );

    res.status(204).send("webhook");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get payment status" });
  }
});

const processMercadopagoPayment = async (contentId, price) => {
  let paymentData;
  const requestMP = {
    body: {
      items: [
        {
          id: contentId,
          title: "AlmenWeb",
          description: "Contenido pagina web",
          quantity: 1,
          currency_id: "ARS",
          unit_price: price,
        },
      ],
      back_urls: {
        success: "https://almendragala.com/",
        failure: "https://almendragala.com/",
        pending: "https://almendragala.com/",
      },
      notification_url: "https://almendragala.com/api/payments/webhook",
      redirect_urls: {
        success: "https://almendragala.com/",
        failure: "https://almendragala.com/",
        pending: "https://almendragala.com/",
      },
    },
  };
  try {
    const preference = await new Preference(client)
      .create(requestMP)
      .then((res) => (paymentData = res))
      .catch((error) => console.error(error));

    return { preference: preference, init_point: preference.init_point };
  } catch (error) {
    return { preference: null, init_point: null };
  }
};

const processPaypalPayment = async (amount) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals

    const { jsonResponse, httpStatusCode } = await createOrder(
      amount.toFixed(2)
    );

    //res.status(httpStatusCode).json(jsonResponse);
    return { jsonResponse, httpStatusCode };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { preference: null, init_point: null };
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (ammount) => {
  const collect = {
    body: {
      intent: CheckoutPaymentIntent.CAPTURE,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: ammount.toString(),
          },
        },
      ],
    },
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCreate(
      collect
    );

    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      return {
        jsonResponse: null,
        httpStatusCode: 500,
      };

      throw new Error(error.message);
    }
  }
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCapture(
      collect
    );
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

module.exports = router;

/*{
  accounts_info: null,
  acquirer_reconciliation: [],
  additional_info: {
    authentication_code: null,
    available_balance: null,
    ip_address: '190.194.81.208',
    items: [ [Object] ],
    nsu_processadora: null
  },
  authorization_code: '229549003',
  binary_mode: false,
  brand_id: null,
  build_version: '3.71.0-rc-4',
  call_for_authorize_id: null,
  captured: true,
  card: {
    cardholder: { identification: [Object], name: 'APRO' },
    country: 'ARG',
    date_created: '2024-09-25T23:01:55.000-04:00',
    date_last_updated: '2024-09-25T23:01:55.000-04:00',
    expiration_month: 11,
    expiration_year: 2025,
    first_six_digits: '450995',
    id: null,
    last_four_digits: '3704',
    tags: null
  },
  charges_details: [
    {
      accounts: [Object],
      amounts: [Object],
      client_id: 0,
      date_created: '2024-09-25T23:01:55.000-04:00',
      id: '1327154491-001',
      last_updated: '2024-09-25T23:01:55.000-04:00',
      metadata: [Object],
      name: 'mercadopago_fee',
      refund_charges: [],
      reserve_id: null,
      type: 'fee'
    }
  ],
  collector_id: 157050868,
  corporation_id: null,
  counter_currency: null,
  coupon_amount: 0,
  currency_id: 'ARS',
  date_approved: '2024-09-25T23:01:55.816-04:00',
  date_created: '2024-09-25T23:01:55.464-04:00',
  date_last_updated: '2024-09-25T23:01:55.816-04:00',
  date_of_expiration: null,
  deduction_schema: null,
  description: 'test',
  differential_pricing_id: null,
  external_reference: null,
  fee_details: [ { amount: 4.1, fee_payer: 'collector', type: 'mercadopago_fee' } ],
  financing_group: null,
  id: 1327154491,
  installments: 1,
  integrator_id: null,
  issuer_id: '310',
  live_mode: false,
  marketplace_owner: null,
  merchant_account_id: null,
  merchant_number: null,
  metadata: {},
  money_release_date: '2024-10-13T23:01:55.816-04:00',
  money_release_schema: null,
  money_release_status: 'pending',
  notification_url: 'https://almendragala.com/api/payments/webhook',
  operation_type: 'regular_payment',
  order: { id: '23215819116', type: 'mercadopago' },
  payer: {
    identification: { number: '32659430', type: 'DNI' },
    entity_type: null,
    phone: { number: null, extension: null, area_code: null },
    last_name: null,
    id: '2008633462',
    type: null,
    first_name: null,
    email: 'test_user_80507629@testuser.com'
  },
  payment_method: {
    data: { routing_data: [Object] },
    id: 'visa',
    issuer_id: '310',
    type: 'credit_card'
  },
  payment_method_id: 'visa',
  payment_type_id: 'credit_card',
  platform_id: null,
  point_of_interaction: {
    business_info: {
      branch: 'Merchant Services',
      sub_unit: 'checkout_pro',
      unit: 'online_payments'
    },
    transaction_data: { e2e_id: null },
    type: 'CHECKOUT'
  },
  pos_id: null,
  processing_mode: 'aggregator',
  refunds: [],
  release_info: null,
  shipping_amount: 0,
  sponsor_id: null,
  statement_descriptor: null,
  status: 'approved',
  status_detail: 'accredited',
  store_id: null,
  tags: null,
  taxes_amount: 0,
  transaction_amount: 100,
  transaction_amount_refunded: 0,
  transaction_details: {
    acquirer_reference: null,
    external_resource_url: null,
    financial_institution: null,
    installment_amount: 100,
    net_received_amount: 95.9,
    overpaid_amount: 0,
    payable_deferral_period: null,
    payment_method_reference_id: null,
    total_paid_amount: 100
  },
  api_response: {
    status: 200,
    headers: [Object: null prototype] {
      date: [Array],
      'content-type': [Array],
      'transfer-encoding': [Array],
      connection: [Array],
      vary: [Array],
      'cache-control': [Array],
      'x-content-type-options': [Array],
      'x-request-id': [Array],
      'x-xss-protection': [Array],
      'strict-transport-security': [Array],
      'access-control-allow-origin': [Array],
      'access-control-allow-headers': [Array],
      'access-control-allow-methods': [Array],
      'access-control-max-age': [Array],
      'timing-allow-origin': [Array],
      'content-encoding': [Array]
    }
  }
}
*/
