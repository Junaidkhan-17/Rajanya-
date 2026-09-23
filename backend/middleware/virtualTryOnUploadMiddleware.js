const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "rajanya/virtual-try-on",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    public_id: `vto-${Date.now()}-${file.originalname
      .replace(/\.[^/.]+$/, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "")}`,
  }),
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/octet-stream",
    ];

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    const extension = require("path").extname(file.originalname).toLowerCase();

    const isValidMimeType = allowedMimeTypes.includes(file.mimetype);

    const isValidExtension = allowedExtensions.includes(extension);

    if (isValidMimeType && isValidExtension) {
      return cb(null, true);
    }

    return cb(
      new Error("Only JPG, JPEG, PNG and WEBP image files are allowed."),
    );
  },
});

module.exports = upload;
