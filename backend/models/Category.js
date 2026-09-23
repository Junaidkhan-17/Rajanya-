const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    parentCategory: {
      type: String,
      default: "",
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
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

    /*
    ========================================
    Category Status
    ========================================
    */

    isActive: {
      type: Boolean,
      default: true,
    },

    /*
    ========================================
    Featured Category
    ========================================
    */

    isFeatured: {
      type: Boolean,
      default: false,
    },

    /*
    ========================================
    Homepage Display
    ========================================
    */

    showOnHomepage: {
      type: Boolean,
      default: false,
    },

    /*
    ========================================
    Navigation Display
    ========================================
    */

    showInNavigation: {
      type: Boolean,
      default: false,
    },

    /*
    ========================================
    Display Order
    ========================================
    */

    displayOrder: {
      type: Number,
      default: 0,
    },

    /*
    ========================================
    SEO
    ========================================
    */

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
  },
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
  showOnHomepage: 1,
});

categorySchema.index({
  showInNavigation: 1,
});

categorySchema.index({
  displayOrder: 1,
});

categorySchema.index({
  createdAt: -1,
});

module.exports = mongoose.model("Category", categorySchema);
