const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/authorizeRoles");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getDashboardStats,
);

module.exports = router;
