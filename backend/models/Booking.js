const mongoose = require("mongoose");

/*
========================================
User Snapshot
========================================
*/

const userSchema = new mongoose.Schema(
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

    mobileNumber: {
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
  },
  { _id: false },
);

/*
========================================
Address Snapshot
========================================
*/

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pinCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

/*
========================================
Rental Details
========================================
*/

const rentalSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      required: true,
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
      enum: ["Men", "Women", "Unisex"],
      default: "Women",
    },

    productBrand: {
      type: String,
      default: "",
      trim: true,
    },

    productImage: {
      type: String,
      default: "",
    },

    productUrl: {
      type: String,
      default: "",
    },

    selectedSize: {
      type: String,
      required: true,
    },

    rentalDuration: {
      type: Number,
      required: true,
    },

    rentalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false },
);

/*
========================================
Pricing
========================================
*/

const pricingSchema = new mongoose.Schema(
  {
    rentalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
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
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedAt: {
      type: Date,
    },
  },
  { _id: false },
);

/*
========================================
Booking Schema
========================================
*/

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      index: true,
      required: true,
      trim: true,
    },

    user: {
      type: userSchema,
      required: true,
    },

    address: {
      type: addressSchema,
      required: true,
    },

    rental: {
      type: rentalSchema,
      required: true,
    },

    product: {
      type: productSchema,
      required: true,
    },

    pricing: {
      type: pricingSchema,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "ready_for_dispatch",
        "dispatched",
        "delivered",
        "rental_active",
        "return_requested",
        "returned",
        "completed",
        "cancelled",
        "rejected",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentId: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      default: "",
    },

    cancellationReason: {
      type: String,
      default: "",
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

bookingSchema.index({
  "user.userId": 1,
});

bookingSchema.index({
  "product.productId": 1,
});

bookingSchema.index({
  bookingStatus: 1,
});

bookingSchema.index({
  paymentStatus: 1,
});

bookingSchema.index({
  createdAt: -1,
});

module.exports = mongoose.model("Booking", bookingSchema);
