const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/authorizeRoles");

const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getProductStats,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getTrendingProducts,
  getRecommendedProducts,
  getRelatedProducts,
  uploadProductImage,
  deleteProductImage,
} = require("../controllers/productController");

router.post(
  "/upload",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadProductImage,
);

router.post("/", protect, authorizeRoles("admin"), createProduct);

router.delete("/image", protect, authorizeRoles("admin"), deleteProductImage);

router.get("/", getProducts);

router.get("/stats", protect, authorizeRoles("admin"), getProductStats);

router.get("/featured", getFeaturedProducts);

router.get("/trending", getTrendingProducts);

router.get("/recommended", getRecommendedProducts);

router.get("/related/:id", getRelatedProducts);

router.get("/slug/:slug", getProductBySlug);

router.get("/:id", getProductById);

router.put("/:id", protect, authorizeRoles("admin"), updateProduct);

router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

module.exports = router;
