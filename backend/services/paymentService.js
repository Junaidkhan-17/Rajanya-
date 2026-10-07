import api from "./api";

/* =========================================================
   GET ALL ADMIN PAYMENTS
   GET /api/admin/payments
========================================================= */

export const getAdminPayments = async () => {
  const response = await api.get("/admin/payments");

  return response.data;
};

/* =========================================================
   GET ADMIN PAYMENT STATISTICS
   GET /api/admin/payments/stats
========================================================= */

export const getAdminPaymentStats = async () => {
  const response = await api.get("/admin/payments/stats");

  return response.data;
};

/* =========================================================
   GET SINGLE ADMIN PAYMENT
   GET /api/admin/payments/:paymentId
========================================================= */

export const getAdminPaymentById = async (paymentId) => {
  const response = await api.get(
    `/admin/payments/${paymentId}`
  );

  return response.data;
};