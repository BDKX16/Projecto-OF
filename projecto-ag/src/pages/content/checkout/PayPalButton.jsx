import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { enqueueSnackbar } from "notistack";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";

import { capturePaypalPayment, sendPayment } from "../../../services/public";
const initialOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  "enable-funding": "venmo",
  "buyer-country": "US",
  currency: "USD",
  components: "buttons",
};

function PayPalButton({ toSend }) {
  const { loading, callEndpoint } = useFetchAndLoad();

  return (
    <div className="paypal-button-container">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "pill",
            layout: "vertical",
            color: "blue",
            label: "pay",
          }}
          createOrder={async () => {
            try {
              const response = await callEndpoint(sendPayment(toSend));
              const orderData = response.data.paymentResponse.jsonResponse;

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              enqueueSnackbar(`Could not initiate PayPal Checkout...${error}`, {
                variant: "error",
              });
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await callEndpoint(
                capturePaypalPayment(data.orderID)
              );

              const orderData = response.data;
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];

                enqueueSnackbar(
                  `Pago completado con exito! ${transaction.id}`,
                  {
                    variant: "success",
                  }
                );
                window.location.reload();
              }
            } catch (error) {
              console.error(error);
              enqueueSnackbar(
                `Sorry, your transaction could not be processed...${error}`,
                {
                  variant: "error",
                }
              );
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPalButton;
