const multer = require("multer");
const path = require("path");

/*
========================================
Local Storage Configuration
========================================
*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/virtual-try-on");
  },

  filename: function (req, file, cb) {
    const uniqueFileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueFileName);
  },
});

/*
========================================
Image File Validation
========================================
*/

/*
========================================
Image File Validation
========================================
*/

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/octet-stream",
  ];

  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const extension = path.extname(file.originalname).toLowerCase();

  const isValidMimeType = allowedMimeTypes.includes(file.mimetype);

  const isValidExtension = allowedExtensions.includes(extension);

  if (isValidMimeType && isValidExtension) {
    return cb(null, true);
  }

  return cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));
};

/*
========================================
Multer Upload Configuration
========================================
*/

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

/*
========================================
Export Upload Middleware
========================================
*/

module.exports = upload;
