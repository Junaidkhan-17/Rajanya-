const mongoose = require("mongoose");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const Payment = require("../models/Payment");
const Product = require("../models/Product");
const User = require("../models/User");
const VirtualTryOn = require("../models/VirtualTryOn");

/*
========================================
Razorpay Configuration
========================================
*/

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/*
========================================
Create Payment Order
========================================
*/

/*
========================================
Create Payment Order
========================================
*/

exports.createPaymentOrder = async (req, res) => {
  try {
    /*
    ========================================
    Get Product ID
    ========================================
    */

    const { productId } = req.body;

    /*
    ========================================
    Validate Product ID
    ========================================
    */

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    /*
    ========================================
    Validate MongoDB ObjectId
    ========================================
    */

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID",
      });
    }

    /*
    ========================================
    Verify Authenticated User
    ========================================
    */

    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /*
    ========================================
    Check User Status
    ========================================
    */

    if (existingUser.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support.",
      });
    }

    /*
    ========================================
    Verify Product
    ========================================
    */

    const existingProduct = await Product.findById(productId)
      .populate("category", "name slug")
      .populate("occasion", "name slug");

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    /*
    ========================================
    Check Product Availability
    ========================================
    */

    if (existingProduct.availabilityStatus !== "available") {
      return res.status(400).json({
        success: false,
        message: "This product is currently unavailable for Virtual Try-On.",
      });
    }

    /*
    ========================================
    Check Product Stock
    ========================================
    */

    if (existingProduct.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "This product is currently out of stock.",
      });
    }

    /*
    ========================================
    Check Existing Pending Payment
    ========================================
    */

    const existingPendingPayment = await Payment.findOne({
      "customer.userId": existingUser._id,
      "product.productId": existingProduct._id,
      "payment.paymentStatus": "pending",
    });

    if (existingPendingPayment) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending payment for this product.",
        paymentId: existingPendingPayment._id,
        razorpayOrderId: existingPendingPayment.gateway?.orderId || "",
      });
    }

    /*
    ========================================
    Generate Payment Number
    ========================================
    */

    const paymentNumber = `PAY-${Date.now()}${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    /*
    ========================================
    Virtual Try-On Pricing
    ========================================
    */

    const amount = 50;
    const amountInPaise = amount * 100;
    const currency = "INR";
    const tokensPurchased = 2;

    /*
    ========================================
    Create Razorpay Order
    ========================================
    */

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: paymentNumber,

      notes: {
        paymentNumber,
        paymentFor: "virtual_try_on",
        userId: existingUser._id.toString(),
        productId: existingProduct._id.toString(),
        tokensPurchased: tokensPurchased.toString(),
      },

      partial_payment: false,
    });

    /*
    ========================================
    Verify Razorpay Order
    ========================================
    */

    if (!razorpayOrder?.id) {
      return res.status(500).json({
        success: false,
        message: "Failed to create Razorpay order.",
      });
    }

    /*
    ========================================
    Create MongoDB Payment Record
    ========================================
    */

    const payment = await Payment.create({
      payment: {
        paymentNumber,

        paymentFor: "virtual_try_on",

        paymentStatus: "pending",

        paymentMethod: "",

        paymentGateway: "Razorpay",

        currency: "INR",
      },

      customer: {
        userId: existingUser._id,

        fullName: existingUser.fullName,

        email: existingUser.email,

        phone: existingUser.phone || "",
      },

      product: {
        productId: existingProduct._id,

        productName: existingProduct.name,

        productSlug: existingProduct.slug,

        productCategory: existingProduct.category?.name || "",

        productOccasion:
          existingProduct.occasion?.map((occasion) => occasion.name) || [],

        productGender: existingProduct.gender,

        productBrand: existingProduct.brand,

        productImage:
          existingProduct.mainImage ||
          existingProduct.thumbnailImage ||
          existingProduct.galleryImages?.[0] ||
          "",

        productUrl: `/products/${existingProduct.slug}`,
      },

      virtualTryOn: {
        amountPaid: amount,

        tokensPurchased,

        tokensCredited: false,

        creditedAt: null,
      },

      gateway: {
        orderId: razorpayOrder.id,

        paymentId: "",

        transactionId: "",

        paymentSignature: "",

        gatewayResponse: razorpayOrder,
      },
    });

    /*
    ========================================
    Return Success Response
    ========================================
    */

    return res.status(201).json({
      success: true,

      message: "Razorpay order created successfully.",

      paymentId: payment._id,

      paymentNumber,

      razorpayOrderId: razorpayOrder.id,

      amount,

      amountInPaise,

      currency,

      tokensPurchased,

      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Payment Order Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Verify Payment
========================================
*/

/*
========================================
Verify Razorpay Payment
========================================
*/

exports.verifyPayment = async (req, res) => {
  try {
    /*
    ========================================
    Get Razorpay Payment Details
    ========================================
    */

    const {
      paymentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    /*
    ========================================
    Validate Required Fields
    ========================================
    */

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required.",
      });
    }

    if (!razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Razorpay Order ID is required.",
      });
    }

    if (!razorpay_payment_id) {
      return res.status(400).json({
        success: false,
        message: "Razorpay Payment ID is required.",
      });
    }

    if (!razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Razorpay signature is required.",
      });
    }

    /*
    ========================================
    Validate MongoDB Payment ID
    ========================================
    */

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Payment ID.",
      });
    }

    /*
    ========================================
    Verify Authenticated User
    ========================================
    */

    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    /*
    ========================================
    Check User Status
    ========================================
    */

    if (existingUser.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support.",
      });
    }

    /*
    ========================================
    Find MongoDB Payment
    ========================================
    */

    const existingPayment = await Payment.findById(paymentId);

    if (!existingPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    /*
    ========================================
    Verify Payment Owner
    ========================================
    */

    if (
      existingPayment.customer.userId.toString() !== existingUser._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to verify this payment.",
      });
    }

    /*
    ========================================
    Verify Payment Type
    ========================================
    */

    if (existingPayment.payment.paymentFor !== "virtual_try_on") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment type.",
      });
    }

    /*
    ========================================
    Verify Razorpay Order ID
    ========================================
    */

    if (existingPayment.gateway?.orderId !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Razorpay Order ID does not match the payment record.",
      });
    }

    /*
    ========================================
    Prevent Duplicate Verification
    ========================================
    */

    if (existingPayment.payment.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment has already been verified.",
        payment: existingPayment,
      });
    }

    /*
    ========================================
    Prevent Duplicate Token Credit
    ========================================
    */

    if (existingPayment.virtualTryOn.tokensCredited) {
      return res.status(400).json({
        success: false,
        message: "Virtual Try-On tokens have already been credited.",
      });
    }

    /*
    ========================================
    Verify Razorpay Signature
    ========================================
    */

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(generatedSignature, "utf8"),
      Buffer.from(razorpay_signature, "utf8"),
    );

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay payment signature.",
      });
    }

    /*
    ========================================
    Fetch Razorpay Payment
    ========================================
    */

    const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);

    /*
    ========================================
    Verify Razorpay Payment Order
    ========================================
    */

    if (razorpayPayment.order_id !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Razorpay payment does not belong to this order.",
      });
    }

    /*
    ========================================
    Verify Payment Amount
    ========================================
    */

    const expectedAmountInPaise = existingPayment.virtualTryOn.amountPaid * 100;

    if (razorpayPayment.amount !== expectedAmountInPaise) {
      return res.status(400).json({
        success: false,
        message: "Razorpay payment amount does not match the expected amount.",
      });
    }

    /*
    ========================================
    Verify Currency
    ========================================
    */

    if (razorpayPayment.currency !== existingPayment.payment.currency) {
      return res.status(400).json({
        success: false,
        message: "Razorpay payment currency does not match.",
      });
    }

    /*
    ========================================
    Verify Captured Payment
    ========================================
    */

    if (razorpayPayment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: `Payment is not captured. Current Razorpay status: ${razorpayPayment.status}`,
      });
    }

    /*
    ========================================
    Update Payment Information
    ========================================
    */

    existingPayment.payment.paymentStatus = "paid";

    existingPayment.payment.paymentMethod = razorpayPayment.method
      ? razorpayPayment.method.toUpperCase()
      : "Razorpay";

    existingPayment.payment.paymentGateway = "Razorpay";

    existingPayment.payment.paymentCompletedAt = new Date();

    /*
    ========================================
    Update Gateway Information
    ========================================
    */

    existingPayment.gateway.orderId = razorpay_order_id;

    existingPayment.gateway.paymentId = razorpay_payment_id;

    existingPayment.gateway.transactionId = razorpay_payment_id;

    existingPayment.gateway.paymentSignature = razorpay_signature;

    existingPayment.gateway.gatewayResponse = razorpayPayment;

    /*
    ========================================
    Find Virtual Try-On Account
    ========================================
    */

    let virtualTryOn = await VirtualTryOn.findOne({
      user: existingPayment.customer.userId,
    });

    /*
    ========================================
    Create Token Account
    ========================================
    */

    if (!virtualTryOn) {
      virtualTryOn = await VirtualTryOn.create({
        user: existingPayment.customer.userId,

        availableTokens: existingPayment.virtualTryOn.tokensPurchased,

        totalPurchased: existingPayment.virtualTryOn.tokensPurchased,

        totalUsed: 0,

        lastPurchaseAt: new Date(),

        isActive: true,
      });
    } else {
      /*
      ========================================
      Check Token Account Status
      ========================================
      */

      if (!virtualTryOn.isActive) {
        return res.status(403).json({
          success: false,
          message: "Virtual Try-On account is inactive.",
        });
      }

      /*
      ========================================
      Credit Purchased Tokens
      ========================================
      */

      virtualTryOn.availableTokens +=
        existingPayment.virtualTryOn.tokensPurchased;

      virtualTryOn.totalPurchased +=
        existingPayment.virtualTryOn.tokensPurchased;

      virtualTryOn.lastPurchaseAt = new Date();

      await virtualTryOn.save();
    }

    /*
    ========================================
    Mark Tokens As Credited
    ========================================
    */

    existingPayment.virtualTryOn.tokensCredited = true;

    existingPayment.virtualTryOn.creditedAt = new Date();

    /*
    ========================================
    Save Payment
    ========================================
    */

    await existingPayment.save();

    /*
    ========================================
    Return Success Response
    ========================================
    */

    return res.status(200).json({
      success: true,

      message:
        "Payment verified successfully. 2 Virtual Try-On tokens have been credited.",

      paymentId: existingPayment._id,

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId: razorpay_payment_id,

      paymentStatus: existingPayment.payment.paymentStatus,

      amount: existingPayment.virtualTryOn.amountPaid,

      tokensCredited: existingPayment.virtualTryOn.tokensPurchased,

      virtualTryOn,
    });
  } catch (error) {
    console.error("Verify Razorpay Payment Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Create Razorpay QR Payment
========================================
*/

exports.createPaymentQR = async (req, res) => {
  try {
    /*
    ========================================
    Get Product ID
    ========================================
    */

    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    /*
    ========================================
    Validate Product ID
    ========================================
    */

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID.",
      });
    }

    /*
    ========================================
    Verify Authenticated User
    ========================================
    */

    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    /*
    ========================================
    Check User Status
    ========================================
    */

    if (existingUser.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support.",
      });
    }

    /*
    ========================================
    Find Product
    ========================================
    */

    const existingProduct = await Product.findById(productId)
      .populate("category", "name slug")
      .populate("occasion", "name slug");

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    /*
    ========================================
    IMPORTANT:
    Do NOT check rental stock here.

    Virtual Try-On payment is separate
    from rental booking availability.
    ========================================
    */

    /*
    ========================================
    Check Existing Pending QR Payment
    ========================================
    */

    const existingPendingPayment = await Payment.findOne({
      "customer.userId": existingUser._id,
      "product.productId": existingProduct._id,
      "payment.paymentStatus": "pending",
      "payment.paymentFor": "virtual_try_on",
    });

    if (existingPendingPayment) {
      const existingQR = existingPendingPayment.gateway?.qrImageUrl;

      const existingQRId = existingPendingPayment.gateway?.qrCodeId;

      if (existingQR && existingQRId) {
        return res.status(200).json({
          success: true,
          message: "An active payment QR already exists.",
          paymentId: existingPendingPayment._id,
          paymentNumber: existingPendingPayment.payment.paymentNumber,
          qrCodeId: existingQRId,
          qrImageUrl: existingQR,
          qrStatus: existingPendingPayment.gateway?.qrStatus || "active",
          amount: existingPendingPayment.virtualTryOn.amountPaid,
          amountInPaise: existingPendingPayment.virtualTryOn.amountPaid * 100,
          currency: existingPendingPayment.payment.currency,
          tokensPurchased: existingPendingPayment.virtualTryOn.tokensPurchased,
        });
      }
    }

    /*
    ========================================
    Generate Payment Number
    ========================================
    */

    const paymentNumber = `PAY-${Date.now()}${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    /*
    ========================================
    Virtual Try-On Pricing
    ========================================
    */

    const amount = 50;

    const amountInPaise = amount * 100;

    const currency = "INR";

    const tokensPurchased = 2;

    /*
    ========================================
    Create Razorpay Dynamic QR
    ========================================
    */

    const closeBy = Math.floor(Date.now() / 1000) + 2 * 60 * 60;

    const razorpayQR = await razorpay.qrCode.create({
      type: "upi_qr",

      name: "Rajanya Virtual Try-On",

      usage: "single_use",

      fixed_amount: true,

      payment_amount: amountInPaise,

      description: `Rajanya Virtual Try-On - ${paymentNumber}`,

      close_by: closeBy,

      notes: {
        paymentNumber,

        paymentFor: "virtual_try_on",

        userId: existingUser._id.toString(),

        productId: existingProduct._id.toString(),

        tokensPurchased: tokensPurchased.toString(),
      },
    });

    /*
    ========================================
    Verify Razorpay QR Response
    ========================================
    */

    if (!razorpayQR?.id) {
      return res.status(500).json({
        success: false,
        message: "Razorpay QR Code was not created.",
      });
    }

    if (!razorpayQR?.image_url) {
      return res.status(500).json({
        success: false,
        message: "Razorpay QR image URL was not returned.",
      });
    }

    /*
    ========================================
    Create MongoDB Payment Record
    ========================================
    */

    const payment = await Payment.create({
      payment: {
        paymentNumber,

        paymentFor: "virtual_try_on",

        paymentStatus: "pending",

        paymentMethod: "",

        paymentGateway: "Razorpay",

        currency: "INR",
      },

      customer: {
        userId: existingUser._id,

        fullName: existingUser.fullName,

        email: existingUser.email,

        phone: existingUser.phone || "",
      },

      product: {
        productId: existingProduct._id,

        productName: existingProduct.name,

        productSlug: existingProduct.slug,

        productCategory: existingProduct.category?.name || "",

        productOccasion:
          existingProduct.occasion?.map((occasion) => occasion.name) || [],

        productGender: existingProduct.gender,

        productBrand: existingProduct.brand,

        productImage:
          existingProduct.mainImage ||
          existingProduct.thumbnailImage ||
          existingProduct.galleryImages?.[0] ||
          "",

        productUrl: `/products/${existingProduct.slug}`,
      },

      virtualTryOn: {
        amountPaid: amount,

        tokensPurchased: tokensPurchased,

        tokensCredited: false,

        creditedAt: null,
      },

      gateway: {
        orderId: "",

        paymentId: "",

        transactionId: "",

        paymentSignature: "",

        qrCodeId: razorpayQR.id,

        qrImageUrl: razorpayQR.image_url,

        qrStatus: razorpayQR.status || "active",

        gatewayResponse: razorpayQR,
      },
    });

    /*
    ========================================
    Return QR Information
    ========================================
    */

    return res.status(201).json({
      success: true,

      message: "Razorpay payment QR created successfully.",

      paymentId: payment._id,

      paymentNumber,

      qrCodeId: razorpayQR.id,

      qrImageUrl: razorpayQR.image_url,

      qrStatus: razorpayQR.status || "active",

      closeBy: razorpayQR.close_by || closeBy,

      amount,

      amountInPaise,

      currency,

      tokensPurchased,
    });
  } catch (error) {
    console.error("Create Razorpay QR Error:", error);

    return res.status(500).json({
      success: false,

      message:
        error?.error?.description ||
        error?.error?.reason ||
        error?.message ||
        "Unable to create Razorpay payment QR.",

      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Get Payment Status
========================================
*/

const getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment ID.",
      });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    /*
    ========================================
    Ownership Check
    ========================================
    */

    if (payment.customer?.userId?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this payment.",
      });
    }

    /*
    ========================================
    If MongoDB Already Says Paid
    ========================================
    */

    if (
      payment.payment?.paymentStatus === "paid" ||
      payment.virtualTryOn?.tokensCredited === true
    ) {
      return res.status(200).json({
        success: true,
        paymentStatus: payment.payment.paymentStatus,
        qrStatus: payment.gateway?.qrStatus || "",
        tokensCredited: payment.virtualTryOn?.tokensCredited || false,
        tokensPurchased: payment.virtualTryOn?.tokensPurchased || 0,
        amount: payment.virtualTryOn?.amountPaid || 0,
      });
    }

    /*
    ========================================
    Razorpay QR API Fallback
    ========================================

    Webhook is the primary confirmation mechanism.

    If the webhook has not reached our server yet,
    ask Razorpay directly whether this QR has
    received a captured payment.
    ========================================
    */

    if (
      payment.gateway?.qrCodeId &&
      payment.payment?.paymentStatus === "pending"
    ) {
      try {
        const qrPayments = await razorpay.qrCode.fetchAllPayments(
          payment.gateway.qrCodeId,
          {
            count: 10,
          },
        );

        const payments = Array.isArray(qrPayments?.items)
          ? qrPayments.items
          : [];

        /*
        ========================================
        Find Valid Captured ₹50 Payment
        ========================================
        */

        const capturedPayment = payments.find((razorpayPayment) => {
          return (
            Number(razorpayPayment.amount) === 5000 &&
            razorpayPayment.currency === "INR" &&
            (razorpayPayment.status === "captured" ||
              razorpayPayment.captured === true)
          );
        });

        /*
        ========================================
        Payment Found
        ========================================
        */

        if (capturedPayment) {
          /*
          ========================================
          Verify Again Before Crediting

          We intentionally do NOT directly credit
          tokens here.

          Instead, we use the same verified payment
          data and process the database transaction.
          ========================================
          */

          const paymentIdFromRazorpay = capturedPayment.id;

          const amountInPaise = Number(capturedPayment.amount);

          const currency = capturedPayment.currency;

          if (amountInPaise === 5000 && currency === "INR") {
            const session = await mongoose.startSession();

            try {
              await session.withTransaction(async () => {
                const paymentToUpdate = await Payment.findById(
                  payment._id,
                ).session(session);

                if (!paymentToUpdate) {
                  throw new Error("Payment disappeared while processing.");
                }

                /*
                  ==================================
                  Duplicate Protection
                  ==================================
                  */

                if (paymentToUpdate.virtualTryOn.tokensCredited === true) {
                  return;
                }

                /*
                  ==================================
                  Find/Create VTO Account
                  ==================================
                  */

                let virtualTryOn = await VirtualTryOn.findOne({
                  user: paymentToUpdate.customer.userId,
                }).session(session);

                if (!virtualTryOn) {
                  virtualTryOn = new VirtualTryOn({
                    user: paymentToUpdate.customer.userId,

                    availableTokens:
                      paymentToUpdate.virtualTryOn.tokensPurchased,

                    totalPurchased:
                      paymentToUpdate.virtualTryOn.tokensPurchased,

                    totalUsed: 0,

                    lastPurchaseAt: new Date(),

                    isActive: true,
                  });
                } else {
                  if (virtualTryOn.isActive === false) {
                    throw new Error("Virtual Try-On account is inactive.");
                  }

                  virtualTryOn.availableTokens +=
                    paymentToUpdate.virtualTryOn.tokensPurchased;

                  virtualTryOn.totalPurchased +=
                    paymentToUpdate.virtualTryOn.tokensPurchased;

                  virtualTryOn.lastPurchaseAt = new Date();
                }

                /*
                  ==================================
                  Update Payment
                  ==================================
                  */

                paymentToUpdate.payment.paymentStatus = "paid";

                paymentToUpdate.payment.paymentMethod = "UPI";

                paymentToUpdate.payment.paymentGateway = "Razorpay";

                paymentToUpdate.payment.paymentCompletedAt = new Date();

                paymentToUpdate.gateway.paymentId = paymentIdFromRazorpay;

                paymentToUpdate.gateway.transactionId = paymentIdFromRazorpay;

                paymentToUpdate.gateway.qrStatus = "paid";

                paymentToUpdate.gateway.gatewayResponse = capturedPayment;

                paymentToUpdate.virtualTryOn.tokensCredited = true;

                paymentToUpdate.virtualTryOn.creditedAt = new Date();

                await virtualTryOn.save({
                  session,
                });

                await paymentToUpdate.save({
                  session,
                });
              });
            } finally {
              await session.endSession();
            }
          }
        }
      } catch (razorpayError) {
        /*
        ========================================
        Important:
        ========================================

        If Razorpay API verification fails,
        don't fail the frontend polling request.

        The webhook may still arrive normally.
        ========================================
        */

        console.error(
          "Razorpay QR status fallback error:",
          razorpayError?.error?.description ||
            razorpayError?.message ||
            razorpayError,
        );
      }
    }

    /*
    ========================================
    Re-fetch Payment
    ========================================
    */

    const latestPayment = await Payment.findById(payment._id);

    return res.status(200).json({
      success: true,

      paymentStatus: latestPayment?.payment?.paymentStatus || "pending",

      qrStatus: latestPayment?.gateway?.qrStatus || "",

      tokensCredited: latestPayment?.virtualTryOn?.tokensCredited || false,

      tokensPurchased: latestPayment?.virtualTryOn?.tokensPurchased || 0,

      amount: latestPayment?.virtualTryOn?.amountPaid || 0,
    });
  } catch (error) {
    console.error("Get Payment Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment status.",
    });
  }
};

/*
========================================
Handle Razorpay QR Webhook
========================================
*/

exports.handleRazorpayWebhook = async (req, res) => {
  try {
    /*
    ========================================
    Get Webhook Signature
    ========================================
    */

    const webhookSignature = req.headers["x-razorpay-signature"];

    if (!webhookSignature) {
      return res.status(400).json({
        success: false,
        message: "Razorpay webhook signature is missing.",
      });
    }

    /*
    ========================================
    Get Raw Webhook Body
    ========================================

    server.js uses express.raw() for this
    endpoint, so req.body is a Buffer.
    ========================================
    */

    const rawBody = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(
          typeof req.body === "string" ? req.body : JSON.stringify(req.body),
        );

    /*
    ========================================
    Verify Webhook Signature
    ========================================
    */

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    /*
    ========================================
    Prevent Invalid Signature Length Error
    ========================================
    */

    if (expectedSignature.length !== webhookSignature.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay webhook signature.",
      });
    }

    /*
    ========================================
    Compare Signatures Safely
    ========================================
    */

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf8"),
      Buffer.from(webhookSignature, "utf8"),
    );

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay webhook signature.",
      });
    }

    /*
    ========================================
    Parse Webhook Body
    ========================================
    */

    let webhookData;

    try {
      webhookData = JSON.parse(rawBody.toString("utf8"));
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay webhook payload.",
      });
    }

    /*
    ========================================
    Get Event Information
    ========================================
    */

    const eventName = webhookData?.event || "";

    const eventId = req.headers["x-razorpay-event-id"] || "";

    console.log(
      `Razorpay Webhook Received: ${eventName}`,
      eventId ? `(Event ID: ${eventId})` : "",
    );

    /*
    ========================================
    Ignore Events We Do Not Need
    ========================================

    For our Dynamic QR flow, the primary event
    is qr_code.credited.
    ========================================
    */

    if (eventName !== "qr_code.credited" && eventName !== "payment.captured") {
      return res.status(200).json({
        success: true,
        message: "Webhook received and ignored.",
        event: eventName,
      });
    }

    /*
    ========================================
    Extract Payment Entity
    ========================================
    */

    const paymentEntity = webhookData?.payload?.payment?.entity;

    if (!paymentEntity) {
      return res.status(400).json({
        success: false,
        message: "Payment information is missing from webhook.",
      });
    }

    /*
    ========================================
    Extract QR Code Entity
    ========================================
    */

    const qrCodeEntity = webhookData?.payload?.qr_code?.entity;

    /*
    ========================================
    Get Razorpay IDs
    ========================================
    */

    const razorpayPaymentId = paymentEntity.id || "";

    const razorpayOrderId = paymentEntity.order_id || "";

    const razorpayQrCodeId = qrCodeEntity?.id || "";

    /*
    ========================================
    Validate Razorpay Payment ID
    ========================================
    */

    if (!razorpayPaymentId) {
      return res.status(400).json({
        success: false,
        message: "Razorpay Payment ID is missing.",
      });
    }

    /*
    ========================================
    Verify Payment Amount
    ========================================

    Rajanya VTO payment:
    ₹50 = 5000 paise
    ========================================
    */

    const expectedAmountInPaise = 5000;

    if (Number(paymentEntity.amount) !== expectedAmountInPaise) {
      console.error("Razorpay webhook amount mismatch:", {
        received: paymentEntity.amount,
        expected: expectedAmountInPaise,
        razorpayPaymentId,
      });

      return res.status(400).json({
        success: false,
        message:
          "Webhook payment amount does not match the expected ₹50 VTO payment.",
      });
    }

    /*
    ========================================
    Verify Currency
    ========================================
    */

    if (paymentEntity.currency !== "INR") {
      return res.status(400).json({
        success: false,
        message: "Webhook payment currency is invalid.",
      });
    }

    /*
    ========================================
    Verify Payment Status
    ========================================
    */

    if (
      paymentEntity.status !== "captured" &&
      paymentEntity.captured !== true
    ) {
      return res.status(400).json({
        success: false,
        message: "Webhook payment has not been captured.",
      });
    }

    /*
    ========================================
    Find Rajanya Payment
    ========================================

    QR payments are identified using the
    Razorpay QR Code ID.

    For the old Standard Checkout flow,
    we can fall back to Razorpay Order ID.
    ========================================
    */

    let existingPayment = null;

    if (razorpayQrCodeId) {
      existingPayment = await Payment.findOne({
        "gateway.qrCodeId": razorpayQrCodeId,
        "payment.paymentFor": "virtual_try_on",
      });
    }

    /*
    ========================================
    Fallback:
    Standard Razorpay Order ID
    ========================================
    */

    if (!existingPayment && razorpayOrderId) {
      existingPayment = await Payment.findOne({
        "gateway.orderId": razorpayOrderId,
        "payment.paymentFor": "virtual_try_on",
      });
    }

    /*
    ========================================
    Fallback:
    Existing Razorpay Payment ID
    ========================================

    This helps if the webhook is retried
    after the payment ID was already stored.
    ========================================
    */

    if (!existingPayment) {
      existingPayment = await Payment.findOne({
        "gateway.paymentId": razorpayPaymentId,
        "payment.paymentFor": "virtual_try_on",
      });
    }

    /*
    ========================================
    Rajanya Payment Not Found
    ========================================
    */

    if (!existingPayment) {
      console.error("Rajanya payment record not found for Razorpay webhook:", {
        razorpayPaymentId,
        razorpayOrderId,
        razorpayQrCodeId,
      });

      /*
      Return 200 so Razorpay does not repeatedly
      retry an event that does not belong to
      a Rajanya payment record.
      */

      return res.status(200).json({
        success: true,
        message: "Webhook received, but no matching Rajanya payment was found.",
      });
    }

    /*
    ========================================
    Verify Payment Type
    ========================================
    */

    if (existingPayment.payment.paymentFor !== "virtual_try_on") {
      return res.status(400).json({
        success: false,
        message: "Invalid Rajanya payment type.",
      });
    }

    /*
    ========================================
    Verify Expected Amount From DB
    ========================================
    */

    const expectedPaymentAmount =
      Number(existingPayment.virtualTryOn.amountPaid) * 100;

    if (Number(paymentEntity.amount) !== expectedPaymentAmount) {
      console.error("Payment amount mismatch against Rajanya database:", {
        razorpayPaymentId,
        received: paymentEntity.amount,
        expected: expectedPaymentAmount,
      });

      return res.status(400).json({
        success: false,
        message: "Payment amount does not match the Rajanya payment record.",
      });
    }

    /*
    ========================================
    Prevent Duplicate Token Credit
    ========================================

    Razorpay can retry webhook events.

    If tokens were already credited,
    do not credit them again.
    ========================================
    */

    if (existingPayment.virtualTryOn.tokensCredited === true) {
      console.log(
        "Duplicate Razorpay webhook ignored. Tokens already credited:",
        existingPayment._id.toString(),
      );

      return res.status(200).json({
        success: true,
        message: "Payment was already processed.",
        paymentId: existingPayment._id,
        tokensCredited: true,
      });
    }

    /*
    ========================================
    Find Virtual Try-On Account
    ========================================
    */

    let virtualTryOn = await VirtualTryOn.findOne({
      user: existingPayment.customer.userId,
    });

    /*
    ========================================
    Create Session
    ========================================
    */

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      /*
      ========================================
      Re-check Payment Inside Transaction
      ========================================
      */

      const paymentInTransaction = await Payment.findById(
        existingPayment._id,
      ).session(session);

      if (!paymentInTransaction) {
        throw new Error("Payment record was not found during transaction.");
      }

      /*
      ========================================
      Duplicate Protection Inside Transaction
      ========================================
      */

      if (paymentInTransaction.virtualTryOn.tokensCredited === true) {
        await session.commitTransaction();

        return res.status(200).json({
          success: true,
          message: "Payment was already processed.",
          paymentId: paymentInTransaction._id,
          tokensCredited: true,
        });
      }

      /*
      ========================================
      Find / Create VTO Account
      ========================================
      */

      let virtualTryOnInTransaction = await VirtualTryOn.findOne({
        user: paymentInTransaction.customer.userId,
      }).session(session);

      /*
      ========================================
      Create VTO Account
      ========================================
      */

      if (!virtualTryOnInTransaction) {
        virtualTryOnInTransaction = new VirtualTryOn({
          user: paymentInTransaction.customer.userId,

          availableTokens: paymentInTransaction.virtualTryOn.tokensPurchased,

          totalPurchased: paymentInTransaction.virtualTryOn.tokensPurchased,

          totalUsed: 0,

          lastPurchaseAt: new Date(),

          isActive: true,
        });

        await virtualTryOnInTransaction.save({
          session,
        });
      } else {
        /*
        ========================================
        Verify VTO Account Status
        ========================================
        */

        if (!virtualTryOnInTransaction.isActive) {
          await session.abortTransaction();

          return res.status(403).json({
            success: false,
            message: "Virtual Try-On account is inactive.",
          });
        }

        /*
        ========================================
        Credit Exactly 2 Tokens
        ========================================
        */

        virtualTryOnInTransaction.availableTokens +=
          paymentInTransaction.virtualTryOn.tokensPurchased;

        virtualTryOnInTransaction.totalPurchased +=
          paymentInTransaction.virtualTryOn.tokensPurchased;

        virtualTryOnInTransaction.lastPurchaseAt = new Date();

        await virtualTryOnInTransaction.save({
          session,
        });
      }

      /*
      ========================================
      Update Payment Status
      ========================================
      */

      paymentInTransaction.payment.paymentStatus = "paid";

      paymentInTransaction.payment.paymentMethod = paymentEntity.method
        ? paymentEntity.method.toUpperCase()
        : "UPI";

      paymentInTransaction.payment.paymentGateway = "Razorpay";

      paymentInTransaction.payment.paymentCompletedAt = new Date();

      /*
      ========================================
      Update Razorpay Gateway Data
      ========================================
      */

      if (razorpayOrderId) {
        paymentInTransaction.gateway.orderId = razorpayOrderId;
      }

      paymentInTransaction.gateway.paymentId = razorpayPaymentId;

      paymentInTransaction.gateway.transactionId = razorpayPaymentId;

      if (razorpayQrCodeId) {
        paymentInTransaction.gateway.qrCodeId = razorpayQrCodeId;
      }

      if (qrCodeEntity?.status) {
        paymentInTransaction.gateway.qrStatus = qrCodeEntity.status;
      }

      /*
      ========================================
      Save Complete Razorpay Response
      ========================================
      */

      paymentInTransaction.gateway.gatewayResponse = webhookData;

      /*
      ========================================
      Mark Tokens As Credited
      ========================================
      */

      paymentInTransaction.virtualTryOn.tokensCredited = true;

      paymentInTransaction.virtualTryOn.creditedAt = new Date();

      /*
      ========================================
      Save Payment
      ========================================
      */

      await paymentInTransaction.save({
        session,
      });

      /*
      ========================================
      Commit Transaction
      ========================================
      */

      await session.commitTransaction();

      /*
      ========================================
      Return Success
      ========================================
      */

      console.log("Razorpay QR payment processed successfully:", {
        paymentId: paymentInTransaction._id.toString(),

        razorpayPaymentId,

        razorpayQrCodeId,

        amount: paymentInTransaction.virtualTryOn.amountPaid,

        tokensCredited: paymentInTransaction.virtualTryOn.tokensPurchased,
      });

      return res.status(200).json({
        success: true,

        message: "Razorpay QR payment processed successfully.",

        paymentId: paymentInTransaction._id,

        razorpayPaymentId,

        qrCodeId: razorpayQrCodeId,

        paymentStatus: paymentInTransaction.payment.paymentStatus,

        amount: paymentInTransaction.virtualTryOn.amountPaid,

        tokensCredited: paymentInTransaction.virtualTryOn.tokensPurchased,
      });
    } catch (transactionError) {
      /*
      ========================================
      Rollback Transaction
      ========================================
      */

      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      throw transactionError;
    } finally {
      /*
      ========================================
      End Session
      ========================================
      */

      await session.endSession();
    }
  } catch (error) {
    console.error("Razorpay Webhook Error:", error);

    /*
    ========================================
    Return 500
    ========================================

    Razorpay can retry failed webhook delivery.
    ========================================
    */

    return res.status(500).json({
      success: false,

      message: "Razorpay webhook processing failed.",

      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  createPaymentOrder: exports.createPaymentOrder,
  verifyPayment: exports.verifyPayment,
  createPaymentQR: exports.createPaymentQR,
  getPaymentStatus,
  handleRazorpayWebhook: exports.handleRazorpayWebhook,
};
