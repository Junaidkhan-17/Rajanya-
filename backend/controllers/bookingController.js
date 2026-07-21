const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Product = require("../models/Product");
const User = require("../models/User");

exports.createBooking = async (req, res) => {
  try {
    const { user, address, rental, product } = req.body;

    /* ==========================
       VALIDATION
    ========================== */

    if (!user || !address || !rental || !product) {
      return res.status(400).json({
        success: false,
        message: "Booking information is incomplete",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(product.productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    /* ==========================
       AUTHENTICATED USER
    ========================== */

    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* ==========================
       PRODUCT
    ========================== */

    const existingProduct = await Product.findById(product.productId).populate(
      "category",
      "name slug",
    ).populate(
    "occasion",
    "name slug"
  );

    console.log("Product Occasion:", existingProduct.occasion);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    /* ==========================
       SIZE VALIDATION
    ========================== */

    if (!existingProduct.sizes.includes(product.selectedSize)) {
      return res.status(400).json({
        success: false,
        message: "Selected size is not available",
      });
    }

    /* ==========================
       RENTAL OPTION VALIDATION
    ========================== */

    const rentalOption = existingProduct.rentalOptions.find(
      (option) => option.days === product.rentalDuration,
    );

    if (!rentalOption) {
      return res.status(400).json({
        success: false,
        message: "Invalid rental duration",
      });
    }

    /* ==========================
       DATE VALIDATION
    ========================== */

    const startDate = new Date(rental.startDate);

    const returnDate = new Date(rental.returnDate);

    const today = new Date();

today.setHours(0, 0, 0, 0);

if (startDate < today) {
  return res.status(400).json({
    success: false,
    message: "Start date cannot be in the past",
  });
}

    /* ==========================
       BOOKING ID
    ========================== */

    const bookingId =
  `RAJ${Date.now()
    .toString()
    .slice(-8)}`;
    /* ==========================
       PRICING
    ========================== */

    const rentalAmount = rentalOption.price;

    const securityDeposit = existingProduct.securityDeposit;

    const totalAmount = rentalAmount + securityDeposit;

    /* ==========================
       CREATE BOOKING
    ========================== */

    const booking = await Booking.create({
      bookingId,

      user: {
        userId: existingUser._id,

        fullName: user.fullName,

        email: user.email,

        mobileNumber: user.mobileNumber,
      },

      address,

      rental: {
        startDate,

        returnDate,
      },

      product: {
        productId: existingProduct._id,

        productName: existingProduct.name,

        productSlug: existingProduct.slug,

        productCategory: existingProduct.category?.name || "",

        productOccasion: existingProduct.occasion.map(
  (occasion) => occasion.name
),

productGender:
  existingProduct.gender || "Women",

        productBrand: existingProduct.brand || "",

        productImage: existingProduct.mainImage || "",

        productUrl: `/products/${existingProduct.slug}`,

        selectedSize: product.selectedSize,

        rentalDuration: rentalOption.days,

        rentalPrice: rentalOption.price,

        securityDeposit,
      },

      pricing: {
        rentalAmount,

        securityDeposit,

        totalAmount,
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      "user.userId": req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    /* ==========================
         VALIDATE BOOKING ID
      ========================== */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    /* ==========================
         FIND BOOKING
      ========================== */

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    /* ==========================
         AUTHORIZATION
      ========================== */

    const isOwner = booking.user.userId.toString() === req.user.id;

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this booking",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const {
      bookingStatus,
      paymentStatus,
      paymentMethod,
      paymentId,
      cancellationReason,
      admin,
    } = req.body;

    if (bookingStatus !== undefined) {
      booking.bookingStatus = bookingStatus;
    }

    if (paymentStatus !== undefined) {
      booking.paymentStatus = paymentStatus;
    }

    if (paymentMethod !== undefined) {
      booking.paymentMethod = paymentMethod;
    }

    if (paymentId !== undefined) {
      booking.paymentId = paymentId;
    }

    if (cancellationReason !== undefined) {
      booking.cancellationReason = cancellationReason;
    }

    if (admin?.notes !== undefined) {
      booking.admin.notes = admin.notes;

      booking.admin.updatedBy = req.user.id;

      booking.admin.updatedAt = new Date();
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    /* ==========================
         VALIDATE BOOKING ID
      ========================== */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    /* ==========================
         FIND BOOKING
      ========================== */

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    /* ==========================
         DELETE BOOKING
      ========================== */

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
