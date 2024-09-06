import { useEffect } from "react";
import "./checkoutMP.css";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

const CheckoutMP = () => {
  useEffect(() => {
    initMercadoPago("TEST-fed5640a-81dc-4481-b8c4-9e81ef9b2e53C_KEY");
  }, []);

  return (
    <Payment
      initialization={{ amount: 123 }}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />
  );
};

export default CheckoutMP;
