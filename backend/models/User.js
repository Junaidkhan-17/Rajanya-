const mongoose = require("mongoose");

/*
=========================================
Virtual Try-On Token Wallet
=========================================
*/

const virtualTryOnSchema = new mongoose.Schema(
  {
    availableTokens: {
      type: Number,
      default: 0,
      min: 0,
    },

    usedTokens: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPurchasedTokens: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["admin", "vendor", "customer"],
      default: "customer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },

    /*
    =========================================
    Google Authentication
    =========================================
    */

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },

    virtualTryOn: {
      type: virtualTryOnSchema,
      default: () => ({}),
    },
  },

  {
    timestamps: true,
  },
);

userSchema.pre("save", function () {
  this.fullName = `${this.firstName} ${this.lastName}`.trim();
});

/*
=========================================
MongoDB Indexes
=========================================
*/

userSchema.index({
  role: 1,
});

userSchema.index({
  isVerified: 1,
});

userSchema.index({
  isBlocked: 1,
});

userSchema.index({
  createdAt: -1,
});

module.exports = mongoose.model("User", userSchema);