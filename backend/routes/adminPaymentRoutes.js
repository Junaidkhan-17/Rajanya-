const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  getAdminPayments,
  getAdminPaymentStats,
  getAdminPaymentById,
} = require("../controllers/adminPaymentController");

/*
=========================================================
ADMIN PAYMENT ROUTES
=========================================================
*/

/*
GET /api/admin/payments/stats
*/
router.get(
  "/payments/stats",
  protect,
  adminOnly,
  getAdminPaymentStats,
);

/*
GET /api/admin/payments
*/
router.get(
  "/payments",
  protect,
  adminOnly,
  getAdminPayments,
);

/*
GET /api/admin/payments/:paymentId
*/
router.get(
  "/payments/:paymentId",
  protect,
  adminOnly,
  getAdminPaymentById,
);

module.exports = router;