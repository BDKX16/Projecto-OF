import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPendingPayments } from "../../../services/public";
import { createPaymentAdapter } from "../../../adapters/payments";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { formatDateToString } from "../../../utils/format-date-to-string";
const PendingPayment = ({ video }) => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callEndpoint(getPendingPayments());
      if (Object.keys(result).length === 0) {
        return;
      } else if (result.status !== 200) {
        //enqueueSnackbar("Error", { variant: "error", });
      } else {
        console.log(result);
        setData(result.data.map((item) => createPaymentAdapter(item)));
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Pending Payment</h1>
      <p>Your payment is currently pending approval.</p>
      <button onClick={() => (window.location.href = "/")}>
        Go Back to Homepage
      </button>
      {loading ? (
        <> </>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Metodo de pago</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment) => (
              <tr key={payment.id}>
                <td
                  style={{
                    fontWeight: video.id === payment.videoId ? "500" : "400",
                  }}
                >
                  {payment.paymentMethod}
                </td>
                <td
                  style={{
                    fontWeight: video.id === payment.videoId ? "500" : "400",
                  }}
                >
                  {payment.amount + " " + payment.currency}
                </td>
                <td
                  style={{
                    fontWeight: video.id === payment.videoId ? "500" : "400",
                  }}
                >
                  {payment.status}
                </td>
                <td
                  style={{
                    fontWeight: video.id === payment.videoId ? "500" : "400",
                  }}
                >
                  {formatDateToString(new Date(payment.date))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => (window.location.href = "/contact")}>
        Contact Advisor
      </button>
    </div>
  );
};
PendingPayment.propTypes = {
  video: PropTypes.object.isRequired,
};

export default PendingPayment;
