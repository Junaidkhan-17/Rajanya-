const multer = require(
  "multer"
);

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: async (
      req,
      file
    ) => ({
      folder:
        "rajanya/products",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      public_id: `${Date.now()}-${
        file.originalname
      }`,
    }),
  });

const upload = multer({
  storage,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },

  fileFilter: (
    req,
    file,
    cb
  ) => {
    const allowedTypes =
      /jpeg|jpg|png|webp/;

    const extname =
      allowedTypes.test(
        file.mimetype
      );

    if (extname) {
      return cb(null, true);
    }

    cb(
      new Error(
        "Only image files are allowed."
      )
    );
  },
});

module.exports = upload;