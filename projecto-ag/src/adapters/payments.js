export const createPaymentAdapter = (payment) => ({
  id: payment._id,
  amount: payment.amount,
  currency: payment.currency,
  paymentMethod: payment.paymentMethod,
  date: payment.date,
  status: payment.status,
  videoId: payment.videoId,
});
