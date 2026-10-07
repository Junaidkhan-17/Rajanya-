const mongoose = require("mongoose");
const Payment = require("../models/Payment");

/* =========================================================
   HELPERS
========================================================= */

const formatStatus = (status) => {
  if (!status) return "Pending";

  const statusMap = {
    pending: "Pending",
    processing: "Processing",
    paid: "Paid",
    failed: "Failed",
    cancelled: "Cancelled",
    refunded: "Refunded",
  };

  return statusMap[status] || status;
};

/*
  Rajanya operates in India.
  Explicitly use Asia/Kolkata so the dashboard does not depend
  on the Render/server timezone.
*/
const formatDate = (date) => {
  if (!date) return "--";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatTime = (date) => {
  if (!date) return "--";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
};

/* =========================================================
   NORMALIZE PAYMENT FOR ADMIN DASHBOARD
========================================================= */

const normalizePayment = (payment) => {
  const paymentInfo = payment.payment || {};
  const customer = payment.customer || {};
  const product = payment.product || {};
  const virtualTryOn = payment.virtualTryOn || {};
  const gateway = payment.gateway || {};
  const refund = payment.refund || {};

  const completedDate =
    paymentInfo.paymentCompletedAt || payment.createdAt;

  const paymentNumber = paymentInfo.paymentNumber || "N/A";

  return {
    _id: payment._id,

    /* ---------------------------------------------
       PAYMENT
    --------------------------------------------- */

    transactionId: paymentNumber,

    /*
      Payment schema does not contain a separate invoice number.
      Therefore this is a dashboard display identifier.
    */
    invoiceNumber: `INV-${paymentNumber}`,

    invoiceDate: formatDate(completedDate),
    invoiceTime: formatTime(completedDate),

    customer: customer.fullName || "N/A",
    customerImage: "",

    email: customer.email || "N/A",
    phone: customer.phone || "",

    service:
      paymentInfo.paymentFor === "virtual_try_on"
        ? "Virtual Try-On"
        : paymentInfo.paymentFor || "N/A",

    amount: Number(virtualTryOn.amountPaid || 0),

    method:
      paymentInfo.paymentMethod ||
      paymentInfo.paymentGateway ||
      "Razorpay",

    status: formatStatus(paymentInfo.paymentStatus),

    /* ---------------------------------------------
       DATE / TIME
    --------------------------------------------- */

    date: formatDate(completedDate),

    createdDate: formatDate(payment.createdAt),
    createdTime: formatTime(payment.createdAt),

    paymentDate: paymentInfo.paymentCompletedAt
      ? formatDate(paymentInfo.paymentCompletedAt)
      : "--",

    paymentTime: paymentInfo.paymentCompletedAt
      ? formatTime(paymentInfo.paymentCompletedAt)
      : "--",

    /* ---------------------------------------------
       PRODUCT / SERVICE
    --------------------------------------------- */

    productImage: product.productImage || "",
    productName: product.productName || "N/A",
    category: product.productCategory || "N/A",

    /*
      Size is not stored in the Payment schema.
      Do not invent a customer-selected size.
    */
    size: "N/A",

    /* ---------------------------------------------
       VIRTUAL TRY-ON
    --------------------------------------------- */

    tokensPurchased: Number(
      virtualTryOn.tokensPurchased || 0
    ),

    tokensCredited: Boolean(
      virtualTryOn.tokensCredited
    ),

    creditedAt: virtualTryOn.creditedAt || null,

    /* ---------------------------------------------
       RAZORPAY / GATEWAY
    --------------------------------------------- */

    razorpayOrderId: gateway.orderId || "",

    razorpayPaymentId: gateway.paymentId || "",

    razorpayTransactionId:
      gateway.transactionId || "",

    qrCodeId: gateway.qrCodeId || "",

    qrStatus: gateway.qrStatus || "",

    /* ---------------------------------------------
       REFUND
    --------------------------------------------- */

    refundStatus:
      refund.refundStatus || "Not Refunded",

    /* ---------------------------------------------
       ADDITIONAL INFO
    --------------------------------------------- */

    currency: paymentInfo.currency || "INR",

    /*
      These are intentionally NOT supplied because they
      are not part of the Rajanya Payment schema:

      device
      ipAddress
      location
      platformFee
      gst
    */

    /* ---------------------------------------------
       RAW TIMESTAMPS
    --------------------------------------------- */

    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
};

/* =========================================================
   GET ALL ADMIN PAYMENTS
   GET /api/admin/payments
========================================================= */

const getAdminPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .sort({ createdAt: -1 })
      .lean();

    const normalizedPayments =
      payments.map(normalizePayment);

    return res.status(200).json({
      success: true,
      count: normalizedPayments.length,
      payments: normalizedPayments,
    });
  } catch (error) {
    console.error(
      "Admin Payments Fetch Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};

/* =========================================================
   GET ADMIN PAYMENT STATS
   GET /api/admin/payments/stats
========================================================= */

const getAdminPaymentStats = async (req, res) => {
  try {
    const now = new Date();

    /* ---------------------------------------------
       CURRENT MONTH
    --------------------------------------------- */

    const currentMonthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const nextMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    /* ---------------------------------------------
       PREVIOUS MONTH
    --------------------------------------------- */

    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    /* ---------------------------------------------
       TOTAL REVENUE
       Only successful payments count.
    --------------------------------------------- */

    const revenueResult = await Payment.aggregate([
      {
        $match: {
          "payment.paymentStatus": "paid",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $ifNull: [
                "$virtualTryOn.amountPaid",
                0,
              ],
            },
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult[0]?.total || 0;

    /* ---------------------------------------------
       PAYMENT COUNTS
    --------------------------------------------- */

    const statusCounts = await Payment.aggregate([
      {
        $group: {
          _id: "$payment.paymentStatus",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const counts = {
      paid: 0,
      pending: 0,
      failed: 0,
      processing: 0,
      cancelled: 0,
      refunded: 0,
    };

    statusCounts.forEach((item) => {
      if (counts[item._id] !== undefined) {
        counts[item._id] = item.count;
      }
    });

    /* ---------------------------------------------
       CURRENT MONTH REVENUE
    --------------------------------------------- */

    const currentMonthRevenueResult =
      await Payment.aggregate([
        {
          $match: {
            "payment.paymentStatus": "paid",
            "payment.paymentCompletedAt": {
              $gte: currentMonthStart,
              $lt: nextMonthStart,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $ifNull: [
                  "$virtualTryOn.amountPaid",
                  0,
                ],
              },
            },
          },
        },
      ]);

    const monthRevenue =
      currentMonthRevenueResult[0]?.total || 0;

    /* ---------------------------------------------
       PREVIOUS MONTH REVENUE
    --------------------------------------------- */

    const previousMonthRevenueResult =
      await Payment.aggregate([
        {
          $match: {
            "payment.paymentStatus": "paid",
            "payment.paymentCompletedAt": {
              $gte: previousMonthStart,
              $lt: currentMonthStart,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $ifNull: [
                  "$virtualTryOn.amountPaid",
                  0,
                ],
              },
            },
          },
        },
      ]);

    const previousMonthRevenue =
      previousMonthRevenueResult[0]?.total || 0;

    /* ---------------------------------------------
       MONTH-OVER-MONTH CHANGE
    --------------------------------------------- */

    const calculateChange = (
      current,
      previous
    ) => {
      if (previous === 0) {
        if (current === 0) {
          return 0;
        }

        /*
          No meaningful percentage exists when the
          previous month had zero revenue.
        */
        return null;
      }

      return Number(
        (
          ((current - previous) / previous) *
          100
        ).toFixed(1)
      );
    };

    /*
      Both revenue cards now use the same legitimate
      month-over-month comparison.

      We are NOT comparing lifetime total revenue
      against a single month's revenue.
    */
    const monthRevenueChange =
      calculateChange(
        monthRevenue,
        previousMonthRevenue
      );

    /* ---------------------------------------------
       RESPONSE
    --------------------------------------------- */

    return res.status(200).json({
      success: true,

      stats: {
        totalRevenue,

        successfulPayments: counts.paid,

        pendingPayments: counts.pending,

        failedPayments: counts.failed,

        monthRevenue,

        changes: {
          /*
            Total Revenue is lifetime revenue.
            The frontend should not interpret this as
            a lifetime-vs-previous-month percentage.

            We return the legitimate monthly comparison
            separately.
          */
          totalRevenue: null,

          successfulPayments: null,

          pendingPayments: null,

          failedPayments: null,

          monthRevenue: monthRevenueChange,
        },

        previousMonthRevenue,
      },
    });
  } catch (error) {
    console.error(
      "Admin Payment Stats Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment statistics",
      error: error.message,
    });
  }
};

/* =========================================================
   GET SINGLE ADMIN PAYMENT
   GET /api/admin/payments/:paymentId
========================================================= */

const getAdminPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;

    /* ---------------------------------------------
       VALIDATE OBJECT ID
    --------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment ID",
      });
    }

    /* ---------------------------------------------
       FIND PAYMENT
    --------------------------------------------- */

    const payment = await Payment.findById(
      paymentId
    ).lean();

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    /* ---------------------------------------------
       NORMALIZE
    --------------------------------------------- */

    const normalizedPayment =
      normalizePayment(payment);

    return res.status(200).json({
      success: true,
      payment: normalizedPayment,
    });
  } catch (error) {
    console.error(
      "Admin Payment Details Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment details",
      error: error.message,
    });
  }
};

/* =========================================================
   EXPORTS
========================================================= */

module.exports = {
  getAdminPayments,
  getAdminPaymentStats,
  getAdminPaymentById,
};