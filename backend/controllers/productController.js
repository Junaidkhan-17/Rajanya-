const Product = require("../models/Product");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    console.log("🔥 NEW createProduct CONTROLLER HIT");
    const {
      name,
      description,
      shortDescription,
      category,
      gender,
      brand,
      tags,
      mainImage,
      thumbnailImage,
      galleryImages,
      virtualTryOnImage,
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
*/
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
      occasion: [category],
      gender,
      brand,
      tags,
      mainImage,
      virtualTryOnImage,
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
    const query = {};

    /*
    ==========================
    SEARCH
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
    CATEGORY FILTER
    ==========================
    */

    if (req.query.category) {
      query.category = req.query.category;
    }

    /*
    ==========================
    OCCASION FILTER
    ==========================
    */

    if (req.query.occasion) {
      query.occasion = req.query.occasion;
    }

    /*
    ==========================
    GENDER FILTER
    ==========================
    */

    if (req.query.gender) {
      query.gender = req.query.gender;
    }

    /*
    ==========================
    FEATURED FILTER
    ==========================
    */

    if (req.query.featured) {
      query.isFeatured = req.query.featured === "true";
    }

    /*
    ==========================
    TRENDING FILTER
    ==========================
    */

    if (req.query.trending) {
      query.isTrending = req.query.trending === "true";
    }

    /*
    ==========================
    RECOMMENDED FILTER
    ==========================
    */

    if (req.query.recommended) {
      query.isRecommended = req.query.recommended === "true";
    }

    /*
    ==========================
    AVAILABILITY FILTER
    ==========================
    */

    if (req.query.availability) {
      query.availabilityStatus = req.query.availability;
    }

    /*
    ==========================
    PRICE FILTER
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
    SORTING
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
        break;
    }

    /*
    ==================================================
    PAGINATION
    ==================================================

    IMPORTANT:

    If page/limit are NOT provided:
    → return ALL matching products.

    If page/limit ARE provided:
    → use backend pagination.
    ==================================================
    */

    const hasPagination =
      req.query.page !== undefined ||
      req.query.limit !== undefined;

    let productsQuery = Product.find(query)
      .populate("category", "name slug")
      .populate("occasion", "name slug")
      .sort(sort);

    const total = await Product.countDocuments(query);

    let page = 1;
    let limit = total || 1;
    let totalPages = 1;

    if (hasPagination) {
      page = Math.max(Number(req.query.page) || 1, 1);
      limit = Math.max(Number(req.query.limit) || 12, 1);

      const skip = (page - 1) * limit;

      productsQuery = productsQuery
        .skip(skip)
        .limit(limit);

      totalPages = Math.ceil(total / limit);
    }

    const products = await productsQuery;

    /*
    ==========================
    RESPONSE
    ==========================
    */

    res.status(200).json({
      success: true,

      total,

      page,

      totalPages,

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

exports.getProductStats = async (req, res) => {
  try {
    /*
    ========================================
    TOTAL PRODUCTS
    ========================================
    */

    const totalProducts = await Product.countDocuments();

    /*
    ========================================
    CATEGORIES USED

    Count unique category references that
    are actually used by products.
    ========================================
    */

    const categoriesUsedResult = await Product.aggregate([
      {
        $match: {
          category: {
            $exists: true,
            $ne: null,
          },
        },
      },
      {
        $group: {
          _id: "$category",
        },
      },
      {
        $count: "total",
      },
    ]);

    const categoriesUsed =
      categoriesUsedResult[0]?.total || 0;

    /*
    ========================================
    FEATURED PRODUCTS
    ========================================
    */

    const featuredProducts = await Product.countDocuments({
      isFeatured: true,
    });

    /*
    ========================================
    ACTIVE PRODUCTS

    Product schema uses availabilityStatus.

    Everything except "discontinued" is
    considered active.
    ========================================
    */

    const activeProducts = await Product.countDocuments({
      availabilityStatus: {
        $ne: "discontinued",
      },
    });

    /*
    ========================================
    CURRENT MONTH
    ========================================
    */

    const now = new Date();

    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const nextMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    /*
    ========================================
    PRODUCTS ADDED THIS MONTH
    ========================================
    */

    const productsThisMonth =
      await Product.countDocuments({
        createdAt: {
          $gte: monthStart,
          $lt: nextMonthStart,
        },
      });

    /*
    ========================================
    FEATURED PRODUCTS ADDED THIS MONTH
    ========================================
    */

    const featuredThisMonth =
      await Product.countDocuments({
        isFeatured: true,
        createdAt: {
          $gte: monthStart,
          $lt: nextMonthStart,
        },
      });

    /*
    ========================================
    ACTIVE PERCENTAGE
    ========================================
    */

    const activePercentage =
      totalProducts > 0
        ? Math.round(
            (activeProducts / totalProducts) * 100
          )
        : 0;

    /*
    ========================================
    RESPONSE
    ========================================
    */

    return res.status(200).json({
      success: true,

      stats: {
        totalProducts,
        categoriesUsed,
        featuredProducts,
        activeProducts,
        productsThisMonth,
        featuredThisMonth,
        activePercentage,
      },
    });
  } catch (error) {
    console.error(
      "Get Product Stats Error:",
      error
    );

    return res.status(500).json({
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

      // Occasion always matches Category
      req.body.occasion = [req.body.category];
    }

    /*
========================================
Occasion Validation
========================================


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
*/
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
