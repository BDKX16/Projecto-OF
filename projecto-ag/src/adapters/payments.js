export const createPaymentAdapter = (payment) => ({
  id: payment._id,
  amount: payment.amount,
  currency: payment.currency,
  paymentMethod: payment.paymentMethod,
  paymentId: payment.paymentId,
  date: payment.date,
  nullDate: payment.nullDate,
  status: payment.status,
  videoId: payment.videoId,
  userId: payment.userId,
  userData: payment.userData,
});
