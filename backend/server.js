require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const mongoose = require("mongoose");

const express = require("express");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const categoryRoutes = require("./routes/categoryRoutes");

const productRoutes = require("./routes/productRoutes");

const wishlistRoutes = require("./routes/wishlistRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const occasionRoutes = require("./routes/occasionRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

const virtualTryOnRoutes = require("./routes/virtualTryOnRoutes");

const cloudinaryTestRoutes = require("./routes/cloudinaryTestRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const path = require("path");

const connectDB = require("./config/db");

const {
  handleRazorpayWebhook,
} = require("./controllers/paymentController");


/*
========================================
Connect MongoDB
========================================
*/

connectDB();


/*
========================================
Create Express App
========================================
*/

const app = express();


/*
========================================
CORS
========================================
*/

app.use(cors());


/*
========================================
Razorpay Webhook
========================================

IMPORTANT:
This route MUST come before
express.json().

Razorpay webhook signature verification
requires the original raw request body.
========================================
*/

app.post(
  "/api/payments/webhook",
  express.raw({
    type: "application/json",
  }),
  handleRazorpayWebhook
);


/*
========================================
Body Parsers
========================================
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


/*
========================================
Serve Uploaded Images
========================================
*/

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


/*
========================================
Cookie Parser
========================================
*/

app.use(cookieParser());


/*
========================================
API Routes
========================================
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/wishlist",
  wishlistRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/occasions",
  occasionRoutes
);

app.use(
  "/api/virtual-try-on",
  virtualTryOnRoutes
);

app.use(
  "/api/cloudinary",
  cloudinaryTestRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);


/*
========================================
Root Route
========================================
*/

app.get(
  "/",
  (req, res) => {
    res.send(
      "Rajanya Backend Running..."
    );
  }
);


/*
========================================
Health Check
========================================
*/

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Rajanya Backend Running",
    });
  }
);


/*
========================================
404 Handler
========================================
*/

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }
);


/*
========================================
Global Error Handler
========================================
*/

app.use(
  (err, req, res, next) => {
    console.error(err);

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
    });
  }
);


/*
========================================
Start Server
========================================
*/

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on ${PORT}`
    );
  }
);