require("dotenv").config();

const mongoose = require("mongoose");
const crypto = require("crypto");

const Payment = require("../models/Payment");

const WEBHOOK_URL =
  "https://g7hsa2x57wu1.shares.zrok.io/api/payments/webhook";

const PAYMENT_NUMBER =
  "PAY-17895505230622331";

const runTest = async () => {
  try {
    console.log("\n========================================");
    console.log("Rajanya Razorpay Webhook Test");
    console.log("========================================\n");

    /*
    ========================================
    Validate Environment
    ========================================
    */

    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing from .env",
      );
    }

    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
      throw new Error(
        "RAZORPAY_WEBHOOK_SECRET is missing from .env",
      );
    }

    /*
    ========================================
    Connect MongoDB
    ========================================
    */

    await mongoose.connect(
      process.env.MONGO_URI,
    );

    console.log("MongoDB connected.");

    /*
    ========================================
    Find Existing Pending Payment
    ========================================
    */

    const payment =
      await Payment.findOne({
        "payment.paymentNumber":
          PAYMENT_NUMBER,
      });

    if (!payment) {
      throw new Error(
        `Payment not found: ${PAYMENT_NUMBER}`,
      );
    }

    console.log("\nPayment found:");
    console.log(
      "Mongo Payment ID:",
      payment._id.toString(),
    );
    console.log(
      "Payment Number:",
      payment.payment.paymentNumber,
    );
    console.log(
      "Payment Status:",
      payment.payment.paymentStatus,
    );
    console.log(
      "QR Code ID:",
      payment.gateway?.qrCodeId,
    );
    console.log(
      "Amount:",
      payment.virtualTryOn.amountPaid,
    );
    console.log(
      "Tokens:",
      payment.virtualTryOn.tokensPurchased,
    );
    console.log(
      "Tokens Credited:",
      payment.virtualTryOn.tokensCredited,
    );

    /*
    ========================================
    Safety Checks
    ========================================
    */

    if (
      payment.payment.paymentStatus !==
      "pending"
    ) {
      throw new Error(
        `Payment is not pending. Current status: ${payment.payment.paymentStatus}`,
      );
    }

    if (
      payment.virtualTryOn.tokensCredited ===
      true
    ) {
      throw new Error(
        "Tokens are already credited for this payment.",
      );
    }

    if (
      Number(
        payment.virtualTryOn.amountPaid,
      ) !== 50
    ) {
      throw new Error(
        "Payment amount is not ₹50.",
      );
    }

    if (
      Number(
        payment.virtualTryOn.tokensPurchased,
      ) !== 2
    ) {
      throw new Error(
        "This payment does not contain exactly 2 VTO tokens.",
      );
    }

    if (
      !payment.gateway?.qrCodeId
    ) {
      throw new Error(
        "QR Code ID is missing from the payment.",
      );
    }

    /*
    ========================================
    Create Synthetic Razorpay Payment ID
    ========================================
    
    This is only for integration testing.
    It is NOT a real Razorpay payment.
    ========================================
    */

    const testPaymentId =
      `pay_test_${Date.now()}`;

    /*
    ========================================
    Create QR Credited Webhook Payload
    ========================================
    */

    const webhookPayload = {
      entity: "event",

      account_id:
        "acc_test_rajanya",

      event:
        "qr_code.credited",

      contains: [
        "payment",
        "qr_code",
      ],

      payload: {
        payment: {
          entity: {
            id: testPaymentId,

            entity: "payment",

            amount: 5000,

            currency: "INR",

            status: "captured",

            order_id: null,

            method: "upi",

            captured: true,

            vpa: "test@upi",

            email:
              payment.customer?.email ||
              "",

            contact:
              payment.customer?.phone ||
              "",

            notes: {
              paymentNumber:
                payment.payment
                  .paymentNumber,

              paymentFor:
                "virtual_try_on",

              userId:
                payment.customer
                  .userId
                  .toString(),

              productId:
                payment.product
                  .productId
                  .toString(),

              tokensPurchased:
                payment.virtualTryOn
                  .tokensPurchased
                  .toString(),
            },

            created_at:
              Math.floor(
                Date.now() / 1000,
              ),
          },
        },

        qr_code: {
          entity: {
            id:
              payment.gateway
                .qrCodeId,

            entity: "qr_code",

            type: "upi_qr",

            usage: "single_use",

            fixed_amount: true,

            payment_amount: 5000,

            status: "active",

            payments_amount_received:
              5000,

            payments_count_received: 1,

            description:
              `Rajanya Virtual Try-On - ${payment.payment.paymentNumber}`,

            notes: {
              paymentNumber:
                payment.payment
                  .paymentNumber,

              paymentFor:
                "virtual_try_on",

              userId:
                payment.customer
                  .userId
                  .toString(),

              productId:
                payment.product
                  .productId
                  .toString(),

              tokensPurchased:
                payment.virtualTryOn
                  .tokensPurchased
                  .toString(),
            },
          },
        },
      },

      created_at:
        Math.floor(
          Date.now() / 1000,
        ),
    };

    /*
    ========================================
    Convert Payload To Raw JSON
    ========================================
    */

    const rawBody =
      JSON.stringify(
        webhookPayload,
      );

    /*
    ========================================
    Generate Razorpay Webhook Signature
    ========================================
    */

    const signature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_WEBHOOK_SECRET,
        )
        .update(rawBody)
        .digest("hex");

    console.log(
      "\nSending webhook to:",
    );

    console.log(
      WEBHOOK_URL,
    );

    console.log(
      "\nSynthetic Razorpay Payment ID:",
      testPaymentId,
    );

    console.log(
      "QR Code ID:",
      payment.gateway.qrCodeId,
    );

    console.log(
      "Webhook Event:",
      webhookPayload.event,
    );

    /*
    ========================================
    Send Webhook
    ========================================
    */

    const response =
      await fetch(
        WEBHOOK_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "X-Razorpay-Signature":
              signature,

            "X-Razorpay-Event-Id":
              `evt_test_${Date.now()}`,
          },

          body: rawBody,
        },
      );

    const responseText =
      await response.text();

    console.log(
      "\n========================================",
    );

    console.log(
      "Webhook HTTP Status:",
      response.status,
    );

    console.log(
      "Webhook Response:",
    );

    console.log(
      responseText,
    );

    console.log(
      "========================================\n",
    );

    /*
    ========================================
    Check Final MongoDB State
    ========================================
    */

    await payment.constructor
      .findById(payment._id);

    const updatedPayment =
      await Payment.findById(
        payment._id,
      );

    console.log(
      "Final Payment Status:",
      updatedPayment.payment
        .paymentStatus,
    );

    console.log(
      "Tokens Credited:",
      updatedPayment.virtualTryOn
        .tokensCredited,
    );

    console.log(
      "Tokens Purchased:",
      updatedPayment.virtualTryOn
        .tokensPurchased,
    );

    /*
    ========================================
    Check VTO Account
    ========================================
    */

    const VirtualTryOn =
      require("../models/VirtualTryOn");

    const virtualTryOn =
      await VirtualTryOn.findOne({
        user:
          updatedPayment.customer
            .userId,
      });

    if (virtualTryOn) {
      console.log(
        "Available VTO Tokens:",
        virtualTryOn.availableTokens,
      );

      console.log(
        "Total Purchased:",
        virtualTryOn.totalPurchased,
      );

      console.log(
        "Total Used:",
        virtualTryOn.totalUsed,
      );
    } else {
      console.log(
        "VirtualTryOn account not found.",
      );
    }

    console.log(
      "\nWebhook integration test completed.",
    );
  } catch (error) {
    console.error(
      "\nWebhook Test Error:",
      error.message,
    );
  } finally {
    await mongoose.disconnect();
  }
};

runTest();