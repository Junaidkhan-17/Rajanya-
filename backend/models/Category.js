const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    seoTitle: {
      type: String,
      default: "",
      trim: true,
    },

    seoDescription: {
      type: String,
      default: "",
      trim: true,
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

categorySchema.index({
  isActive: 1,
});

categorySchema.index({
  isFeatured: 1,
});

categorySchema.index({
  displayOrder: 1,
});

categorySchema.index({
  createdAt: -1,
});

module.exports = mongoose.model(
  "Category",
  categorySchema
);