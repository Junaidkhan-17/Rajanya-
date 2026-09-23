const VirtualTryOn = require("../models/VirtualTryOn");
const Product = require("../models/Product");
const Payment = require("../models/Payment");

const cloudinary = require("../config/cloudinary");

const {
  createFitRoomTryOnTask,
  getFitRoomTaskStatus,
} = require("../services/fitroomService");

/*
========================================
Get My Virtual Try-On Tokens
========================================
*/

exports.getMyTokens = async (req, res) => {
  try {
    const userId = req.user.id;

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
    });

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Virtual Try-On token details fetched successfully.",

      tokens: {
        availableTokens: virtualTryOn.availableTokens,
        totalPurchased: virtualTryOn.totalPurchased,
        totalUsed: virtualTryOn.totalUsed,
        lastPurchaseAt: virtualTryOn.lastPurchaseAt,
        lastUsedAt: virtualTryOn.lastUsedAt,
      },
    });
  } catch (error) {
    console.error("Get My Tokens Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Get My Uploaded Image
========================================
*/

exports.getMyUploadedImage = async (req, res) => {
  try {
    const userId = req.user.id;

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
    });

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    if (!virtualTryOn.uploadedImage) {
      return res.status(404).json({
        success: false,
        message: "No uploaded image found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Uploaded image fetched successfully.",

      image: {
        imageUrl: virtualTryOn.uploadedImage,
        originalName: virtualTryOn.uploadedImageOriginalName,
        uploadedAt: virtualTryOn.uploadedAt,
      },
    });
  } catch (error) {
    console.error("Get My Uploaded Image Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Use Virtual Try-On Token
========================================
*/

exports.useToken = async (req, res) => {
  try {
    const userId = req.user.id;

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
    });

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    if (!virtualTryOn.isActive) {
      return res.status(403).json({
        success: false,
        message: "Virtual Try-On account is inactive.",
      });
    }

    if (virtualTryOn.availableTokens <= 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Virtual Try-On tokens.",
      });
    }

    const updatedVirtualTryOn = await VirtualTryOn.findOneAndUpdate(
      {
        user: userId,
        isActive: true,
        availableTokens: { $gt: 0 },
      },

      {
        $inc: {
          availableTokens: -1,
          totalUsed: 1,
        },

        $set: {
          lastUsedAt: new Date(),
        },
      },

      {
        returnDocument: "after",
      },
    );

    if (!updatedVirtualTryOn) {
      return res.status(400).json({
        success: false,
        message: "Unable to use Virtual Try-On token.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Virtual Try-On token used successfully.",

      tokens: {
        availableTokens: updatedVirtualTryOn.availableTokens,
        totalPurchased: updatedVirtualTryOn.totalPurchased,
        totalUsed: updatedVirtualTryOn.totalUsed,
        lastPurchaseAt: updatedVirtualTryOn.lastPurchaseAt,
        lastUsedAt: updatedVirtualTryOn.lastUsedAt,
      },
    });
  } catch (error) {
    console.error("Use Token Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Upload Virtual Try-On Image
========================================
*/

exports.uploadVirtualTryOnImage = async (req, res) => {
  console.log("========== UPLOAD CONTROLLER HIT ==========");

  try {
    /*
    ========================================
    Check Uploaded Image
    ========================================
    */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    /*
    ========================================
    Get Authenticated User
    ========================================
    */

    const userId = req.user.id;

    console.log("Authenticated User ID:", userId);

    /*
    ========================================
    Find Existing Virtual Try-On Account
    ========================================
    */

    let virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
    });

    console.log(
      "Virtual Try-On Account:",
      virtualTryOn ? virtualTryOn._id : "NOT FOUND",
    );

    /*
    ========================================
    Create Virtual Try-On Account
    ========================================

    Development initialization:
    New customers receive 2 temporary
    Virtual Try-On tokens for testing.

    Later this will be replaced by
    verified payment/token purchase flow.
    ========================================
    */

    if (!virtualTryOn) {
      console.log("No Virtual Try-On account found.");

      console.log(
        "Creating Virtual Try-On account with 0 tokens for user:",
        userId,
      );

      virtualTryOn = await VirtualTryOn.create({
        user: userId,

        availableTokens: 0,

        totalPurchased: 0,

        totalUsed: 0,

        isActive: true,
      });

      console.log("Virtual Try-On account created:", virtualTryOn._id);

      console.log(
        "Initial Virtual Try-On tokens:",
        virtualTryOn.availableTokens,
      );
    }

    /*
    ========================================
    Check Account Status
    ========================================
    */

    if (!virtualTryOn.isActive) {
      return res.status(403).json({
        success: false,
        message: "Virtual Try-On account is inactive.",
      });
    }

    /*
    ========================================
    Delete Previous Cloudinary Image
    ========================================

    If the customer already had an uploaded
    image and uploads a new one, remove the
    previous Cloudinary asset.
    ========================================
    */

    if (
      virtualTryOn.uploadedImagePublicId &&
      virtualTryOn.uploadedImagePublicId !== req.file.filename
    ) {
      try {
        await cloudinary.uploader.destroy(virtualTryOn.uploadedImagePublicId, {
          resource_type: "image",
        });

        console.log(
          "Previous VTO image deleted from Cloudinary:",
          virtualTryOn.uploadedImagePublicId,
        );
      } catch (cloudinaryError) {
        console.error(
          "Failed to delete previous Cloudinary VTO image:",
          cloudinaryError.message,
        );
      }
    }

    /*
    ========================================
    Get Cloudinary Image Information
    ========================================
    */

    const uploadedImageUrl = req.file.path;

    const uploadedImagePublicId = req.file.filename;

    /*
    ========================================
    Validate Cloudinary URL
    ========================================
    */

    if (!uploadedImageUrl) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary image URL was not generated.",
      });
    }

    /*
    ========================================
    Update Uploaded Image Information
    ========================================
    */

    virtualTryOn.uploadedImage = uploadedImageUrl;

    virtualTryOn.uploadedImagePublicId = uploadedImagePublicId;

    virtualTryOn.uploadedImageOriginalName = req.file.originalname;

    virtualTryOn.uploadedAt = new Date();

    await virtualTryOn.save();

    /*
    ========================================
    Log Upload Information
    ========================================
    */

    console.log("========================================");
    console.log("VIRTUAL TRY-ON IMAGE UPLOADED");
    console.log("User ID:", userId);
    console.log("Virtual Try-On ID:", virtualTryOn._id);
    console.log("Original File:", req.file.originalname);
    console.log("Cloudinary Public ID:", uploadedImagePublicId);
    console.log("Cloudinary URL:", uploadedImageUrl);
    console.log("Available Tokens:", virtualTryOn.availableTokens);
    console.log("========================================");

    /*
    ========================================
    Return Uploaded Image
    ========================================
    */

    return res.status(200).json({
      success: true,

      message: "Image uploaded successfully.",

      image: {
        fileName: uploadedImagePublicId,

        originalName: req.file.originalname,

        mimeType: req.file.mimetype,

        size: req.file.size,

        imageUrl: uploadedImageUrl,
      },

      tokens: {
        availableTokens: virtualTryOn.availableTokens,

        totalPurchased: virtualTryOn.totalPurchased,

        totalUsed: virtualTryOn.totalUsed,
      },
    });
  } catch (error) {
    console.error("========================================");

    console.error("Upload Virtual Try-On Image Error:");

    console.error(error);

    console.error("========================================");

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Generate Virtual Try-On
========================================

FitRoom integration.

Customer image:
Cloudinary HTTPS URL

Product garment:
Product.virtualTryOnImage
(Cloudinary HTTPS URL)
========================================
*/

exports.generateVirtualTryOn = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.body;

    /*
    ========================================
    Validate Product ID
    ========================================
    */

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    /*
    ========================================
    Get Customer Virtual Try-On Account
    ========================================
    */

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
      isActive: true,
    });

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    /*
    ========================================
    Check Available Generations
    ========================================

    IMPORTANT:
    We do NOT deduct a token here.

    The existing /use-token endpoint handles
    token deduction separately.

    This prevents double token deduction.
    ========================================
    */

    if (virtualTryOn.availableTokens <= 0) {
      return res.status(403).json({
        success: false,
        message: "No Virtual Try-On generations available.",
      });
    }

    /*
    ========================================
    Get Product
    ========================================
    */

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    /*
    ========================================
    Check Customer Uploaded Image
    ========================================
    */

    if (!virtualTryOn.uploadedImage) {
      return res.status(400).json({
        success: false,
        message: "Please upload your photo before generating a Virtual Try-On.",
      });
    }

    /*
    ========================================
    Check Product Try-On Image
    ========================================
    */

    if (!product.virtualTryOnImage) {
      return res.status(400).json({
        success: false,
        message: "Virtual Try-On image is not available for this product.",
      });
    }

    /*
    ========================================
    Customer Model Image
    ========================================

    Since customer images are now stored
    directly on Cloudinary, this is already
    a public HTTPS URL.

    No localhost conversion is required.
    ========================================
    */

    const modelImageUrl = virtualTryOn.uploadedImage;

    /*
    ========================================
    Product Garment Image
    ========================================
    */

    const clothImageUrl = product.virtualTryOnImage;

    /*
    ========================================
    Log FitRoom Image URLs
    ========================================
    */

    console.log("========================================");
    console.log("FITROOM IMAGE URLS");
    console.log("Model Image:", modelImageUrl);
    console.log("Cloth Image:", clothImageUrl);
    console.log("========================================");

    /*
    ========================================
    Create FitRoom Task
    ========================================
    */

    const fitRoomResponse = await createFitRoomTryOnTask({
      modelImage: modelImageUrl,

      clothImage: clothImageUrl,

      clothType: "full_set",

      hdMode: false,
    });

    /*
    ========================================
    Check FitRoom Response
    ========================================
    */

    if (!fitRoomResponse.success) {
      return res.status(502).json({
        success: false,

        message:
          fitRoomResponse.message ||
          "Unable to create FitRoom Virtual Try-On task.",
      });
    }

    /*
    ========================================
    Validate Task ID
    ========================================
    */

    if (!fitRoomResponse.taskId) {
      return res.status(502).json({
        success: false,
        message: "FitRoom did not return a task ID.",
      });
    }

    /*
    ========================================
    Return Task Information
    ========================================
    */

    return res.status(200).json({
      success: true,

      message: "FitRoom Virtual Try-On task created successfully.",

      taskId: fitRoomResponse.taskId,

      productId: product._id,

      productName: product.name,

      status: fitRoomResponse.data?.status || "CREATED",
    });
  } catch (error) {
    console.error("Generate Virtual Try-On Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Virtual Try-On.",
    });
  }
};

/*
========================================
Get FitRoom Try-On Task Status
========================================
*/

exports.getFitRoomTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "FitRoom task ID is required.",
      });
    }

    const fitRoomResponse = await getFitRoomTaskStatus(taskId);

    if (!fitRoomResponse.success) {
      return res.status(502).json({
        success: false,

        message:
          fitRoomResponse.message || "Unable to get FitRoom task status.",
      });
    }

    return res.status(200).json({
      success: true,

      taskId,

      data: fitRoomResponse.data,
    });
  } catch (error) {
    console.error("Get FitRoom Task Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get FitRoom task status.",
    });
  }
};

/*
========================================
Finalize Successful Virtual Try-On
========================================

Called only after FitRoom returns
COMPLETED and the frontend receives
the generated image URL.

Flow:

FitRoom result
      ↓
Cloudinary
      ↓
MongoDB generatedImage
      ↓
History entry
      ↓
Consume 1 token
========================================
*/

exports.finalizeVirtualTryOn = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId, generatedImageUrl, taskId, paymentId } = req.body;

    /*
    ========================================
    Validate Request
    ========================================
    */

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    if (!generatedImageUrl) {
      return res.status(400).json({
        success: false,
        message: "Generated Virtual Try-On image URL is required.",
      });
    }

    /*
    ========================================
    Get Virtual Try-On Account
    ========================================
    */

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
      isActive: true,
    });

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    /*
    ========================================
    Check Available Token
    ========================================
    */

    if (virtualTryOn.availableTokens <= 0) {
      return res.status(403).json({
        success: false,
        message: "No Virtual Try-On tokens available.",
      });
    }

    /*
    ========================================
    Get Product
    ========================================
    */

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    /*
    ========================================
    Validate Uploaded Customer Image
    ========================================
    */

    if (!virtualTryOn.uploadedImage) {
      return res.status(400).json({
        success: false,
        message: "Customer Virtual Try-On image was not found.",
      });
    }

    /*
    ========================================
    Upload FitRoom Result To Cloudinary
    ========================================

    FitRoom's signed URL can be temporary.

    We therefore create a permanent
    Rajanya Cloudinary copy.
    ========================================
    */

    console.log("========================================");
    console.log("VTO FINALIZE: UPLOADING RESULT");
    console.log("FitRoom Task ID:", taskId || "Not provided");
    console.log("FitRoom Result URL:", generatedImageUrl);
    console.log("========================================");

    const cloudinaryResult = await cloudinary.uploader.upload(
      generatedImageUrl,
      {
        folder: "rajanya/virtual-try-on/results",
        resource_type: "image",
      },
    );

    const permanentGeneratedImage = cloudinaryResult?.secure_url;

    if (!permanentGeneratedImage) {
      return res.status(500).json({
        success: false,
        message: "Failed to create permanent Virtual Try-On image.",
      });
    }

    /*
    ========================================
    Create History Record
    ========================================
    */

    const historyEntry = {
      product: product._id,
      productName: product.name,
      uploadedImage: virtualTryOn.uploadedImage,
      generatedImage: permanentGeneratedImage,
      generatedAt: new Date(),
      tokensUsed: 1,
      paymentId: paymentId || null,
    };

    /*
    ========================================
    Consume 1 Token + Save Result
    ========================================

    availableTokens > 0 is intentionally
    part of the update condition so the
    token cannot become negative.
    ========================================
    */

    const updatedVirtualTryOn = await VirtualTryOn.findOneAndUpdate(
      {
        user: userId,
        isActive: true,
        availableTokens: { $gt: 0 },
      },
      {
        $inc: {
          availableTokens: -1,
          totalUsed: 1,
        },

        $set: {
          generatedImage: permanentGeneratedImage,
          generatedAt: new Date(),
          lastUsedAt: new Date(),
        },

        $push: {
          history: historyEntry,
        },
      },
      {
        new: true,
      },
    );

    /*
    ========================================
    Token Update Failed
    ========================================
    */

    if (!updatedVirtualTryOn) {
      return res.status(400).json({
        success: false,
        message: "Unable to finalize Virtual Try-On or consume token.",
      });
    }

    /*
    ========================================
    Success Logs
    ========================================
    */

    console.log("========================================");
    console.log("VIRTUAL TRY-ON FINALIZED SUCCESSFULLY");
    console.log("User ID:", userId);
    console.log("Product:", product.name);
    console.log("FitRoom Task ID:", taskId || "Not provided");
    console.log("Generated Image:", permanentGeneratedImage);
    console.log("Remaining Tokens:", updatedVirtualTryOn.availableTokens);
    console.log("========================================");

    /*
    ========================================
    Success Response
    ========================================
    */

    return res.status(200).json({
      success: true,

      message: "Virtual Try-On generated and finalized successfully.",

      generatedImage: permanentGeneratedImage,

      product: {
        productId: product._id,
        productName: product.name,
      },

      taskId: taskId || null,

      tokens: {
        availableTokens: updatedVirtualTryOn.availableTokens,

        totalPurchased: updatedVirtualTryOn.totalPurchased,

        totalUsed: updatedVirtualTryOn.totalUsed,

        lastUsedAt: updatedVirtualTryOn.lastUsedAt,
      },

      history: {
        saved: true,
        historyId:
          updatedVirtualTryOn.history[updatedVirtualTryOn.history.length - 1]
            ?._id || null,
      },
    });
  } catch (error) {
    console.error("========================================");

    console.error("Finalize Virtual Try-On Error:");

    console.error(error);

    console.error("========================================");

    return res.status(500).json({
      success: false,
      message: "Failed to finalize Virtual Try-On.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Get Latest Generated Virtual Try-On
========================================
*/

exports.getLatestGeneratedVirtualTryOn = async (req, res) => {
  try {
    const userId = req.user.id;

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
    }).populate("history.product", "name");

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    if (!virtualTryOn.generatedImage) {
      return res.status(404).json({
        success: false,
        message: "No generated Virtual Try-On image found.",
      });
    }

    const latestHistory =
      virtualTryOn.history?.length > 0
        ? virtualTryOn.history[virtualTryOn.history.length - 1]
        : null;

    return res.status(200).json({
      success: true,

      message: "Latest generated Virtual Try-On fetched successfully.",

      data: {
        generatedImage: virtualTryOn.generatedImage,

        generatedAt: virtualTryOn.generatedAt,

        productId:
          latestHistory?.product?._id || latestHistory?.product || null,

        productName:
          latestHistory?.product?.name || latestHistory?.productName || "",
      },
    });
  } catch (error) {
    console.error("Get Latest Virtual Try-On Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Get Virtual Try-On History
========================================
*/

exports.getVirtualTryOnHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
    });

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    const history = [...virtualTryOn.history].sort(
      (a, b) => new Date(b.generatedAt) - new Date(a.generatedAt),
    );

    return res.status(200).json({
      success: true,

      message: "Virtual Try-On history fetched successfully.",

      totalHistory: history.length,

      data: history,
    });
  } catch (error) {
    console.error("Get Virtual Try-On History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Delete Virtual Try-On History
========================================
*/

exports.deleteVirtualTryOnHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const { historyId } = req.params;

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
    });

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    const historyExists = virtualTryOn.history.some(
      (item) => item._id.toString() === historyId,
    );

    if (!historyExists) {
      return res.status(404).json({
        success: false,
        message: "History record not found.",
      });
    }

    virtualTryOn.history = virtualTryOn.history.filter(
      (item) => item._id.toString() !== historyId,
    );

    await virtualTryOn.save();

    return res.status(200).json({
      success: true,

      message: "Virtual Try-On history deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Virtual Try-On History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/*
========================================
Delete Uploaded Virtual Try-On Image
========================================

Cloudinary deletion.

The customer image is no longer stored
inside /uploads/virtual-try-on.
========================================
*/

exports.deleteUploadedVirtualTryOnImage = async (req, res) => {
  try {
    const userId = req.user.id;

    const virtualTryOn = await VirtualTryOn.findOne({
      user: userId,
    });

    if (!virtualTryOn) {
      return res.status(404).json({
        success: false,
        message: "Virtual Try-On account not found.",
      });
    }

    if (!virtualTryOn.uploadedImage) {
      return res.status(404).json({
        success: false,
        message: "No uploaded image found.",
      });
    }

    /*
    ========================================
    Delete Image From Cloudinary
    ========================================
    */

    if (virtualTryOn.uploadedImagePublicId) {
      try {
        const cloudinaryResult = await cloudinary.uploader.destroy(
          virtualTryOn.uploadedImagePublicId,
          {
            resource_type: "image",
          },
        );

        console.log("Cloudinary Delete Result:", cloudinaryResult);
      } catch (cloudinaryError) {
        console.error("Cloudinary Delete Error:", cloudinaryError.message);

        return res.status(500).json({
          success: false,
          message: "Unable to delete image from Cloudinary.",
        });
      }
    }

    /*
    ========================================
    Clear Database Fields
    ========================================
    */

    virtualTryOn.uploadedImage = null;

    virtualTryOn.uploadedImagePublicId = null;

    virtualTryOn.uploadedImageOriginalName = null;

    virtualTryOn.uploadedAt = null;

    await virtualTryOn.save();

    /*
    ========================================
    Success Response
    ========================================
    */

    return res.status(200).json({
      success: true,
      message: "Uploaded image deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Uploaded Virtual Try-On Image Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
/*
========================================
Admin - Get All Virtual Try-On Requests
========================================

Returns:

1. All Virtual Try-On accounts/history
2. Real dashboard statistics
3. Real VTO payment revenue

Statistics are calculated from the
actual MongoDB collections.

VirtualTryOn:
- Total requests
- Completed requests
- Pending requests
- Failed requests

Payment:
- Successful VTO payment revenue
========================================
*/

exports.getAllVirtualTryOnRequests = async (req, res) => {
  try {
    /*
    ========================================
    Get All Virtual Try-On Accounts
    ========================================
    */

    const virtualTryOns = await VirtualTryOn.find()
      .populate({
        path: "user",
        select: "firstName lastName fullName email phone profileImage",
      })
      .populate({
        path: "history.product",
        select: "name slug brand mainImage thumbnailImage",
      })
      .populate({
        path: "history.paymentId",
        select: "payment virtualTryOn gateway createdAt",
      })
      .sort({
        updatedAt: -1,
      });

    /*
    ========================================
    Build Request Statistics
    ========================================

    Each history item represents one
    completed Virtual Try-On generation.

    We intentionally calculate statistics
    from history[] because that is the
    request/result data currently persisted
    by the application.
    ========================================
    */

    let totalRequests = 0;
    let completedRequests = 0;
    let pendingRequests = 0;
    let failedRequests = 0;

    virtualTryOns.forEach((virtualTryOn) => {
      const history = Array.isArray(virtualTryOn.history)
        ? virtualTryOn.history
        : [];

      history.forEach((historyItem) => {
        totalRequests += 1;

        /*
        ----------------------------------------
        Completed
        ----------------------------------------

        A generatedImage means FitRoom
        successfully generated and the
        result was finalized into MongoDB.
        */

        if (historyItem.generatedImage) {
          completedRequests += 1;
        } else {
          /*
          ----------------------------------------
          Current schema has no explicit
          pending/processing/failed status.

          Therefore an entry without a
          generated image is treated as
          pending rather than inventing a
          failed state.
          ----------------------------------------
          */

          pendingRequests += 1;
        }
      });
    });

    /*
    ========================================
    Get Real VTO Revenue
    ========================================

    Revenue comes ONLY from:

    payment.paymentFor = virtual_try_on
    payment.paymentStatus = paid

    We do NOT calculate revenue from
    totalPurchased because development/
    testing tokens may exist there.
    ========================================
    */

    const paidPayments = await Payment.find({
      "payment.paymentFor": "virtual_try_on",
      "payment.paymentStatus": "paid",
    }).select(
      "virtualTryOn.amountPaid payment.paymentStatus payment.paymentFor",
    );

    const revenue = paidPayments.reduce((total, payment) => {
      return total + Number(payment.virtualTryOn?.amountPaid || 0);
    }, 0);

    /*
    ========================================
    Statistics Object
    ========================================
    */

    const stats = {
      totalRequests,
      pendingRequests,
      completedRequests,
      failedRequests,
      revenue,
    };

    /*
    ========================================
    Admin Response
    ========================================
    */

    return res.status(200).json({
      success: true,

      count: virtualTryOns.length,

      data: virtualTryOns,

      stats,
    });
  } catch (error) {
    console.error("Failed to fetch Virtual Try-On requests:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch Virtual Try-On requests.",
    });
  }
};
