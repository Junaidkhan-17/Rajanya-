require("dotenv").config();

const http = require("http");
const crypto = require("crypto");

/*
========================================
CONFIGURATION
========================================
*/

const WEBHOOK_URL = "http://localhost:5000/api/payments/webhook";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

/*
========================================
CURRENT RAJANYA PAYMENT
========================================
*/

const PAYMENT_ID = "6aae1e11aab0e2311e9bf6d9";
const QR_CODE_ID = "qr_TdmTDl7nQ5YTDD";
/*
========================================
SIMULATED TEST PAYMENT ID
========================================
*/

const RAZORPAY_PAYMENT_ID = "pay_test_1789796031283";

/*
========================================
VALIDATE WEBHOOK SECRET
========================================
*/

if (!WEBHOOK_SECRET) {
  console.error(
    "❌ RAZORPAY_WEBHOOK_SECRET is missing from backend/.env",
  );

  process.exit(1);
}

/*
========================================
SIMULATED RAZORPAY WEBHOOK
========================================

Represents:

₹50
INR
UPI
captured
QR payment
========================================
*/

const payload = {
  entity: "event",

  account_id: "acc_test_rajanya",

  event: "qr_code.credited",

  contains: ["payment", "qr_code"],

  payload: {
    payment: {
      entity: {
        id: RAZORPAY_PAYMENT_ID,

        entity: "payment",

        amount: 5000,

        currency: "INR",

        status: "captured",

        method: "upi",

        captured: true,

        order_id: null,

        description: "Rajanya Virtual Try-On Test Payment",

        notes: {
          paymentFor: "virtual_try_on",

          paymentId: PAYMENT_ID,

          qrCodeId: QR_CODE_ID,

          tokensPurchased: "2",
        },
      },
    },

    qr_code: {
      entity: {
        id: QR_CODE_ID,

        entity: "qr_code",

        status: "closed",

        usage: "single_use",

        type: "upi_qr",

        payment_amount: 5000,

        fixed_amount: true,

        payments_amount_received: 5000,

        payments_count_received: 1,
      },
    },
  },

  created_at: Math.floor(Date.now() / 1000),
};

/*
========================================
RAW BODY
========================================
*/

const rawBody = JSON.stringify(payload);

/*
========================================
GENERATE WEBHOOK SIGNATURE
========================================
*/

const signature = crypto
  .createHmac("sha256", WEBHOOK_SECRET)
  .update(rawBody)
  .digest("hex");

/*
========================================
SEND WEBHOOK
========================================
*/

const request = http.request(
  WEBHOOK_URL,
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      "Content-Length": Buffer.byteLength(rawBody),

      "x-razorpay-signature": signature,

      "x-razorpay-event-id": `evt_test_${Date.now()}`,
    },
  },
  (response) => {
    let responseData = "";

    response.on("data", (chunk) => {
      responseData += chunk;
    });

    response.on("end", () => {
      console.log("\n========================================");
      console.log("RAJANYA VTO WEBHOOK TEST RESULT");
      console.log("========================================");

      console.log("HTTP Status:", response.statusCode);

      console.log("\nResponse:");

      try {
        console.log(
          JSON.stringify(JSON.parse(responseData), null, 2),
        );
      } catch {
        console.log(responseData);
      }

      console.log("\n========================================");

      if (response.statusCode === 200) {
        console.log("✅ Webhook test request completed.");
      } else {
        console.log("❌ Webhook test failed.");
      }

      console.log("========================================\n");
    });
  },
);

request.on("error", (error) => {
  console.error("\n❌ Unable to connect to Rajanya backend.");

  console.error(error.message);

  console.error(
    "\nMake sure your backend server is running on port 5000.",
  );
});

/*
========================================
SEND REQUEST
========================================
*/

request.write(rawBody);

request.end();

console.log("\n========================================");
console.log("RAJANYA VTO WEBHOOK TEST");
console.log("========================================");

console.log("Payment ID:", PAYMENT_ID);

console.log("QR Code ID:", QR_CODE_ID);

console.log(
  "Simulated Razorpay Payment ID:",
  RAZORPAY_PAYMENT_ID,
);

console.log("Amount: ₹50");

console.log("Tokens: 2");

console.log("Event: qr_code.credited");

console.log("========================================\n");