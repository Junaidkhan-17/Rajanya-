const express = require("express");

const router = express.Router();

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const {
  getMyTokens,
  getMyUploadedImage,
  useToken,
  uploadVirtualTryOnImage,
  generateVirtualTryOn,
  getFitRoomTaskStatus,
  getLatestGeneratedVirtualTryOn,
  getVirtualTryOnHistory,
  deleteVirtualTryOnHistory,
  deleteUploadedVirtualTryOnImage,
  getAllVirtualTryOnRequests,
  finalizeVirtualTryOn,
} = require("../controllers/virtualTryOnController");

const upload = require("../middleware/virtualTryOnUploadMiddleware");

router.get("/test", (req, res) => {
  return res.json({
    success: true,
    message: "Virtual Try-On Route Working",
  });
});

/*
========================================
Upload Virtual Try-On Image
========================================


router.post(
  "/upload",
  protect,
  upload.single("image"),
  uploadVirtualTryOnImage
);
*/
router.post(
  "/upload",

  (req, res, next) => {
    console.log("========== UPLOAD HIT ==========");
    next();
  },

  protect,

  (req, res, next) => {
    console.log("========== AFTER PROTECT ==========");
    next();
  },

  upload.single("image"),

  (req, res, next) => {
    console.log("========== AFTER MULTER ==========");

    console.log(req.file);

    next();
  },

  uploadVirtualTryOnImage,
);
/*
========================================
Customer APIs
========================================
*/

router.get("/my-tokens", protect, getMyTokens);

/*
========================================
Get My Uploaded Image
========================================
*/

router.get("/my-image", protect, getMyUploadedImage);

/*
========================================
Delete Uploaded Virtual Try-On Image
========================================
*/

router.delete("/image", protect, deleteUploadedVirtualTryOnImage);

router.post("/generate", protect, generateVirtualTryOn);

router.post("/finalize", protect, finalizeVirtualTryOn);

router.get("/status/:taskId", protect, getFitRoomTaskStatus);

router.get("/latest", protect, getLatestGeneratedVirtualTryOn);

/*
========================================
Get Virtual Try-On History
========================================
*/

router.get("/history", protect, getVirtualTryOnHistory);

/*
========================================
Delete Virtual Try-On History
========================================
*/

router.delete("/history/:historyId", protect, deleteVirtualTryOnHistory);

router.post("/use-token", protect, useToken);

/*
========================================
Admin APIs
========================================
*/

router.get(
  "/admin/requests",
  protect,
  authorizeRoles("admin"),
  getAllVirtualTryOnRequests,
);

module.exports = router;
