const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided.",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "rajanya/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);

          return res.status(500).json({
            success: false,
            message: "Image upload failed.",
            error: error.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Image uploaded successfully.",
          image: {
            url: result.secure_url,
            public_id: result.public_id,
          },
        });
      },
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Upload Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed.",
      error: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};
