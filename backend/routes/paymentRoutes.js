const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  createPaymentOrder,
  verifyPayment,
  createPaymentQR,
  getPaymentStatus,
} = require("../controllers/paymentController");


/*
========================================
Customer APIs
========================================
*/


/*
========================================
Legacy Razorpay Checkout
========================================
*/

router.post(
  "/create-order",
  protect,
  createPaymentOrder
);

router.post(
  "/verify-payment",
  protect,
  verifyPayment
);


/*
========================================
Razorpay QR Payment
========================================
*/

router.post(
  "/create-qr",
  protect,
  createPaymentQR
);


/*
========================================
Payment Status
========================================
*/

router.get(
  "/:paymentId/status",
  protect,
  getPaymentStatus
);
module.exports = router;