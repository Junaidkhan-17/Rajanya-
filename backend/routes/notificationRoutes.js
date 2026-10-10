
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = require("../controllers/notificationController");

// All notification routes require an authenticated admin.
router.use(protect, authorizeRoles("admin"));

// GET /api/notifications/unread-count
// Keep this route before /:id routes.
router.get("/unread-count", getUnreadNotificationCount);

// GET /api/notifications
router.get("/", getNotifications);

// PATCH /api/notifications/read-all
router.patch("/read-all", markAllNotificationsAsRead);

// PATCH /api/notifications/:id/read
router.patch("/:id/read", markNotificationAsRead);

module.exports = router;
