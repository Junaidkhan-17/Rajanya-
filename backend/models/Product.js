const mongoose = require("mongoose");

const rentalOptionSchema =
  new mongoose.Schema(
    {
      days: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    { _id: false }
  );

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
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
      },

      shortDescription: {
        type: String,
        default: "",
      },

      category: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },

      occasion: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Occasion",
    required: true,
  },
],

gender: {
  type: String,
  enum: ["Men", "Women", "Unisex"],
  default: "Women",
},

brand: {
  type: String,
  default: "",
},

tags: {
  type: [String],
  default: [],
},

      mainImage: {
        type: String,
        default: "",
      },

      thumbnailImage: {
        type: String,
        default: "",
      },

      galleryImages: [
        {
          type: String,
        },
      ],

      originalPrice: {
        type: Number,
        default: 0,
        min: 0,
      },

      securityDeposit: {
        type: Number,
        default: 0,
        min: 0,
      },

      rentalOptions: {
        type: [rentalOptionSchema],
        default: [],
      },

      sizes: {
        type: [String],
        default: [],
      },

      colors: {
        type: [String],
        default: [],
      },

      materials: {
        type: [String],
        default: [],
      },

      stock: {
        type: Number,
        default: 0,
        min: 0,
      },

      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },

      reviewsCount: {
        type: Number,
        default: 0,
        min: 0,
      },

      bookingCount: {
        type: Number,
        default: 0,
        min: 0,
      },

      isFeatured: {
        type: Boolean,
        default: false,
      },

      isTrending: {
        type: Boolean,
        default: false,
      },

      isRecommended: {
        type: Boolean,
        default: false,
      },

      availabilityStatus: {
        type: String,
        enum: [
  "available",
  "rented",
  "out-of-stock",
  "coming-soon",
  "discontinued"
],
        default: "available",
      },

      seoTitle: {
        type: String,
        default: "",
      },

      seoDescription: {
        type: String,
        default: "",
      },

      rentalIncludes: {
        type: [String],
        default: [],
      },

      careInstructions: {
        type: [String],
        default: [],
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

productSchema.index({
  category: 1,
});

productSchema.index({
  occasion: 1,
});

productSchema.index({
  gender: 1,
});

productSchema.index({
  isFeatured: 1,
});

productSchema.index({
  isTrending: 1,
});

productSchema.index({
  isRecommended: 1,
});

productSchema.index({
  availabilityStatus: 1,
});

productSchema.index({
  createdAt: -1,
});

module.exports = mongoose.model(
  "Product",
  productSchema
);