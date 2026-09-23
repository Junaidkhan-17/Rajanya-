const mongoose = require("mongoose");

/*
========================================
Virtual Try-On Token Schema
========================================
*/

const virtualTryOnSchema = new mongoose.Schema(
  {
    /*
      ========================================
      Customer
      ========================================
      */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    /*
      ========================================
      Available Tokens
      ========================================
      */

    availableTokens: {
      type: Number,
      default: 0,
      min: 0,
    },

    /*
      ========================================
      Total Purchased Tokens
      ========================================
      */

    totalPurchased: {
      type: Number,
      default: 0,
      min: 0,
    },

    /*
      ========================================
      Total Used Tokens
      ========================================
      */

    totalUsed: {
      type: Number,
      default: 0,
      min: 0,
    },

    /*
      ========================================
      Last Purchase Date
      ========================================
      */

    lastPurchaseAt: {
      type: Date,
      default: null,
    },

    /*
      ========================================
      Last Token Used Date
      ========================================
      */

    lastUsedAt: {
      type: Date,
      default: null,
    },

    /*
========================================
Uploaded Image Information
========================================
*/

    uploadedImage: {
      type: String,
      default: null,
    },

    uploadedImagePublicId: {
      type: String,
      default: null,
    },

    generatedImage: {
      type: String,
      default: null,
    },

    generatedAt: {
      type: Date,
      default: null,
    },

    uploadedImageOriginalName: {
      type: String,
      default: null,
    },

    uploadedAt: {
      type: Date,
      default: null,
    },

    /*
========================================
Virtual Try-On History
========================================
*/

    history: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        productName: {
          type: String,
          required: true,
          trim: true,
        },

        uploadedImage: {
          type: String,
          required: true,
        },

        generatedImage: {
          type: String,
          required: true,
        },

        generatedAt: {
          type: Date,
          default: Date.now,
        },

        tokensUsed: {
          type: Number,
          default: 1,
          min: 1,
        },

        paymentId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Payment",
  default: null,
},
      },
    ],

    /*
      ========================================
      Account Status
      ========================================
      */

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

/*
========================================
Export Model
========================================
*/

module.exports = mongoose.model("VirtualTryOn", virtualTryOnSchema);
