
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["booking_created", "vto_payment_success"],
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "Bell",
    },

    iconColor: {
      type: String,
      default: "#64748b",
    },

    lineColor: {
      type: String,
      default: "#e2e8f0",
    },

    customer: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      fullName: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
    },

    referenceType: {
      type: String,
      enum: ["Booking", "Payment"],
      required: true,
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    referenceNumber: {
      type: String,
      default: "",
    },

    product: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: null,
      },
      productName: {
        type: String,
        default: "",
      },
    },

    amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    tokensCredited: {
      type: Number,
      default: 0,
      min: 0,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
      default: null,
    },

    // Stable identifier prevents duplicate notifications
    // when a webhook or payment-processing path is retried.
    dedupeKey: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Efficient retrieval of recent notifications.
notificationSchema.index({ createdAt: -1 });

notificationSchema.index({ isRead: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
