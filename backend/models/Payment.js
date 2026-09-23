const mongoose = require("mongoose");

/*
========================================
Payment Information
========================================
*/

const paymentInfoSchema = new mongoose.Schema(
  {
    paymentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    paymentFor: {
      type: String,
      enum: ["virtual_try_on"],
      default: "virtual_try_on",
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "paid",
        "failed",
        "cancelled",
        "refunded",
      ],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["", "UPI", "Card", "Net Banking", "Wallet", "Razorpay"],
      default: "",
    },

    paymentCompletedAt: {
      type: Date,
      default: null,
    },

    paymentGateway: {
      type: String,
      enum: ["", "Razorpay"],
      default: "",
    },

    currency: {
      type: String,
      enum: ["INR"],
      default: "INR",
    },
  },
  { _id: false },
);

/*
========================================
Customer Snapshot
========================================
*/

const customerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false },
);

/*
========================================
Product Snapshot
========================================
*/

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productSlug: {
      type: String,
      default: "",
      trim: true,
    },

    productCategory: {
      type: String,
      default: "",
      trim: true,
    },

    productOccasion: {
      type: [String],
      default: [],
    },

    productGender: {
      type: String,
      default: "",
      trim: true,
    },

    productBrand: {
      type: String,
      default: "",
      trim: true,
    },

    productImage: {
      type: String,
      default: "",
      trim: true,
    },

    productUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false },
);

/*
========================================
Virtual Try-On Payment
========================================
*/

const virtualTryOnSchema = new mongoose.Schema(
  {
    amountPaid: {
      type: Number,
      required: true,
      default: 50,
      min: 50,
    },

    tokensPurchased: {
      type: Number,
      required: true,
      default: 2,
      min: 1,
    },

    tokensCredited: {
      type: Boolean,
      default: false,
    },

    creditedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);

/*
========================================
Payment Gateway Details
========================================
*/

const gatewaySchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      default: "",
      trim: true,
    },

    paymentId: {
      type: String,
      default: "",
      trim: true,
    },

    transactionId: {
      type: String,
      default: "",
      trim: true,
    },

    paymentSignature: {
      type: String,
      default: "",
      trim: true,
    },

    /* ========================================
       Razorpay QR Information
    ======================================== */

    qrCodeId: {
      type: String,
      default: "",
      trim: true,
    },

    qrImageUrl: {
      type: String,
      default: "",
      trim: true,
    },

    qrStatus: {
      type: String,
      default: "",
      trim: true,
    },

    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false },
);

/*
========================================
Admin Information
========================================
*/

const adminSchema = new mongoose.Schema(
  {
    notes: {
      type: String,
      default: "",
      trim: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updatedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);

/*
========================================
Refund Information
========================================
*/

const refundSchema = new mongoose.Schema(
  {
    refundStatus: {
      type: String,
      enum: ["not_requested", "requested", "approved", "rejected", "processed"],
      default: "not_requested",
    },

    isRefundable: {
      type: Boolean,
      default: true,
    },

    refundAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    refundReason: {
      type: String,
      default: "",
      trim: true,
    },

    refundedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);

/*
========================================
Payment Schema
========================================
*/

const paymentSchema = new mongoose.Schema(
  {
    payment: {
      type: paymentInfoSchema,
      required: true,
    },

    customer: {
      type: customerSchema,
      required: true,
    },

    product: {
      type: productSchema,
      required: true,
    },

    virtualTryOn: {
      type: virtualTryOnSchema,
      required: true,
    },

    gateway: {
      type: gatewaySchema,
      default: () => ({}),
    },

    refund: {
      type: refundSchema,
      default: () => ({}),
    },

    admin: {
      type: adminSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  },
);

/*
========================================
MongoDB Indexes
========================================
*/

paymentSchema.index({
  "payment.paymentStatus": 1,
});

paymentSchema.index({
  "customer.userId": 1,
});

paymentSchema.index({
  "product.productId": 1,
});

paymentSchema.index({
  createdAt: -1,
});

module.exports = mongoose.model("Payment", paymentSchema);
