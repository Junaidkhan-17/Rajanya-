const express = require("express");

const router = express.Router();

const cloudinary = require("../config/cloudinary");

router.get("/test", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();

    return res.status(200).json({
      success: true,
      message: "Cloudinary connection successful.",
      status: result.status,
    });
  } catch (error) {
    console.error("========== CLOUDINARY ERROR ==========");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("HTTP Code:", error.http_code);
    console.error("Name:", error.name);
    console.error("Full Error:", error);
    console.error("======================================");

    return res.status(500).json({
      success: false,
      message: "Cloudinary connection failed.",
      error: error.message,
      code: error.code || null,
      http_code: error.http_code || null,
    });
  }
});

module.exports = router;