const express = require("express");
const router = express.Router();

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const authorizeRoles = require(
  "../middleware/authorizeRoles"
);

const {
  createCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} = require(
  "../controllers/categoryController"
);

router.get("/", getCategories);

router.get(
  "/slug/:slug",
  getCategoryBySlug
);

router.get(
  "/:id",
  getCategoryById
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createCategory
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteCategory
);

module.exports = router;