const express = require("express");

const router = express.Router();

const {
  createOccasion,
  getOccasions,
  getOccasionById,
  getOccasionBySlug,
  updateOccasion,
  deleteOccasion,
} = require("../controllers/occasionController");

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/authorizeRoles");

/*
========================================
Public Routes
========================================
*/

router.get("/", getOccasions);

router.get("/slug/:slug", getOccasionBySlug);

router.get("/:id", getOccasionById);

/*
========================================
Admin Routes
========================================
*/

router.post("/", protect, authorizeRoles("admin"), createOccasion);

router.put("/:id", protect, authorizeRoles("admin"), updateOccasion);

router.delete("/:id", protect, authorizeRoles("admin"), deleteOccasion);

module.exports = router;
