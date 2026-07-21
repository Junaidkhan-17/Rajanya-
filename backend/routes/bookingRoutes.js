const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middleware/authMiddleware");

const authorizeRoles = require(
  "../middleware/authorizeRoles"
);

const {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

/*
========================================
Customer APIs
========================================
*/

router.post(
  "/",
  protect,
  createBooking
);

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);

router.get(
  "/:id",
  protect,
  getBookingById
);

/*
========================================
Admin APIs
========================================
*/

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllBookings
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateBooking
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteBooking
);

module.exports = router;