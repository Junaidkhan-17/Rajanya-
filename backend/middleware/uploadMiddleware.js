const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "rajanya/products",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    public_id: `${Date.now()}-${file.originalname
      .replace(/\.[^/.]+$/, "")
      .replace(/\s+/g, "-")}`,
  }),
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid = allowedTypes.test(file.mimetype);

  if (isValid) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, JPEG, PNG and WEBP image files are allowed."));
},
});

module.exports = upload;