const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const occasionRoutes = require("./routes/occasionRoutes");

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/occasions", occasionRoutes);

app.get("/", (req, res) => {
  res.send("Rajanya Backend Running...");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Rajanya Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
