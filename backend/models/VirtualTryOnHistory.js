const mongoose = require("mongoose");

/*
========================================
Virtual Try-On History Schema
========================================
*/

const virtualTryOnHistorySchema =
  new mongoose.Schema(
    {
              /*
      ========================================
      Customer
      ========================================
      */

      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
            /*
      ========================================
      Uploaded Image
      ========================================
      */

      uploadedImage: {
        type: String,
        required: true,
        trim: true,
      },
            /*
      ========================================
      Generated Image
      ========================================
      */

      generatedImage: {
        type: String,
        default: "",
        trim: true,
      },
            /*
      ========================================
      Tokens Used
      ========================================
      */

      tokensUsed: {
        type: Number,
        default: 1,
        min: 1,
      },

            /*
      ========================================
      Generation Status
      ========================================
      */

      status: {
        type: String,
        enum: [
          "processing",
          "completed",
          "failed",
        ],
        default: "processing",
      },

            /*
      ========================================
      Generation Date
      ========================================
      */

      generatedAt: {
        type: Date,
        default: null,
      },

          },
    {
      timestamps: true,
    }
  );

  /*
========================================
MongoDB Indexes
========================================
*/

virtualTryOnHistorySchema.index({
  user: 1,
  createdAt: -1,
});

virtualTryOnHistorySchema.index({
  product: 1,
});

virtualTryOnHistorySchema.index({
  status: 1,
});

/*
========================================
Export Model
========================================
*/

module.exports = mongoose.model(
  "VirtualTryOnHistory",
  virtualTryOnHistorySchema
);