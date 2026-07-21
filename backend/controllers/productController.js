const Product = require("../models/Product");
const Category = require("../models/Category");
const Occasion = require("../models/Occasion");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      shortDescription,
      category,
      occasion,
      gender,
      brand,
      tags,
      mainImage,
      thumbnailImage,
      galleryImages,
      originalPrice,
      securityDeposit,
      rentalOptions,
      sizes,
      colors,
      materials,
      stock,
      isFeatured,
      isTrending,
      isRecommended,
      availabilityStatus,
      seoTitle,
      seoDescription,
      rentalIncludes,
      careInstructions,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Product name and category are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    /*
========================================
Occasion Validation
========================================
*/

    if (!occasion || !Array.isArray(occasion) || occasion.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one occasion is required",
      });
    }

    for (const occasionId of occasion) {
      if (!mongoose.Types.ObjectId.isValid(occasionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid occasion ID",
        });
      }

      const occasionExists = await Occasion.findById(occasionId);

      if (!occasionExists) {
        return res.status(404).json({
          success: false,
          message: "Occasion not found",
        });
      }
    }

    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    const existingProduct = await Product.findOne({
      slug,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    const product = await Product.create({
      name,
      slug,
      description,
      shortDescription,
      category,
      occasion,
      gender,
      brand,
      tags,
      mainImage,
      thumbnailImage,
      galleryImages,
      originalPrice,
      securityDeposit,
      rentalOptions,
      sizes,
      colors,
      materials,
      stock,
      isFeatured,
      isTrending,
      isRecommended,
      availabilityStatus,
      seoTitle,
      seoDescription,
      rentalIncludes,
      careInstructions,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    const query = {};

    /*
    ==========================
    Search
    ==========================
    */

    if (req.query.search) {
      query.$or = [
        {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          shortDescription: {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ];
    }

    /*
    ==========================
    Category Filter
    ==========================
    */

    if (req.query.category) {
      query.category = req.query.category;
    }

    /*
    ==========================
    Occasion Filter
    ==========================
    */

    if (req.query.occasion) {
      query.occasion = req.query.occasion;
    }

    /*
==========================
Gender Filter
==========================
*/

if (req.query.gender) {
  query.gender = req.query.gender;
}

    /*
    ==========================
    Featured Filter
    ==========================
    */

    if (req.query.featured) {
      query.isFeatured = req.query.featured === "true";
    }

    /*
    ==========================
    Trending Filter
    ==========================
    */

    if (req.query.trending) {
      query.isTrending = req.query.trending === "true";
    }

    /*
    ==========================
    Recommended Filter
    ==========================
    */

    if (req.query.recommended) {
      query.isRecommended = req.query.recommended === "true";
    }

    /*
    ==========================
    Availability Filter
    ==========================
    */

    if (req.query.availability) {
      query.availabilityStatus = req.query.availability;
    }

    /*
    ==========================
    Price Filter
    ==========================
    */

    if (req.query.minPrice || req.query.maxPrice) {
      query.originalPrice = {};

      if (req.query.minPrice) {
        query.originalPrice.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        query.originalPrice.$lte = Number(req.query.maxPrice);
      }
    }

    /*
    ==========================
    Sorting
    ==========================
    */

    let sort = {
      createdAt: -1,
    };

    switch (req.query.sort) {
      case "oldest":
        sort = {
          createdAt: 1,
        };
        break;

      case "priceLow":
        sort = {
          originalPrice: 1,
        };
        break;

      case "priceHigh":
        sort = {
          originalPrice: -1,
        };
        break;

      case "popular":
        sort = {
          bookingCount: -1,
        };
        break;

      default:
        sort = {
          createdAt: -1,
        };
    }

    /*
    ==========================
    Total Count
    ==========================
    */

    const total = await Product.countDocuments(query);

    /*
    ==========================
    Products
    ==========================
    */

    const products = await Product.find(query)
      .populate("category", "name slug")
      .populate("occasion", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    /*
    ==========================
    Response
    ==========================
    */

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
    })
      .populate("category", "name slug")
      .populate("occasion", "name slug")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isTrending: true,
    })
      .populate("category", "name slug")
      .populate("occasion", "name slug")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isRecommended: true,
    })
      .populate("category", "name slug")
      .populate("occasion", "name slug")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const products = await Product.find({
      category: product.category,
      _id: {
        $ne: product._id,
      },
    })
      .populate("category", "name slug")
      .populate("occasion", "name slug")
      .limit(8);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id)
      .populate("category", "name slug")
      .populate("occasion", "name slug");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      slug,
    })
      .populate("category", "name slug")
      .populate("occasion", "name slug");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Category Validation
    if (req.body.category) {
      if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      const categoryExists = await Category.findById(req.body.category);

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    /*
========================================
Occasion Validation
========================================
*/

    if (req.body.occasion) {
      if (!Array.isArray(req.body.occasion) || req.body.occasion.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one occasion is required",
        });
      }

      for (const occasionId of req.body.occasion) {
        if (!mongoose.Types.ObjectId.isValid(occasionId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid occasion ID",
          });
        }

        const occasionExists = await Occasion.findById(occasionId);

        if (!occasionExists) {
          return res.status(404).json({
            success: false,
            message: "Occasion not found",
          });
        }
      }
    }

    // Name & Slug Validation
    if (req.body.name) {
      const slug = req.body.name.toLowerCase().trim().replace(/\s+/g, "-");

      const existingProduct = await Product.findOne({
        slug,
        _id: { $ne: id },
      });

      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: "Product with this name already exists",
        });
      }

      req.body.slug = slug;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("category", "name slug")
      .populate("occasion", "name slug");

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadProductImage = async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(503).json({
        success: false,
        message: "Cloudinary is not configured yet.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(503).json({
        success: false,
        message: "Cloudinary is not configured yet.",
      });
    }

    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "public_id is required",
      });
    }

    await cloudinary.uploader.destroy(public_id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
