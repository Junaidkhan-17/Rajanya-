const Category = require("../models/Category");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const generateSlug = (text) => text.toLowerCase().trim().replace(/\s+/g, "-");

/*
========================================
Create Category
========================================
*/

exports.createCategory = async (req, res) => {
  try {
    const {
      name,
      parentCategory,
      gender,
      description,
      image,
      isActive,
      isFeatured,
      showOnHomepage,
      showInNavigation,
      displayOrder,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    if (!gender) {
      return res.status(400).json({
        success: false,
        message: "Gender is required",
      });
    }

    const slug = generateSlug(name);

    const existingCategory = await Category.findOne({
      $or: [
        {
          name: {
            $regex: new RegExp(`^${name}$`, "i"),
          },
        },
        {
          slug,
        },
      ],
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      parentCategory,
      slug,
      gender,
      description,
      image,
      isActive,
      isFeatured,
      showOnHomepage,
      showInNavigation,
      displayOrder,
      seoTitle,
      seoDescription,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Get All Categories
========================================
*/

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },

      {
        $addFields: {
          productsCount: {
            $size: "$products",
          },
        },
      },

      {
        $project: {
          products: 0,
        },
      },

      {
        $sort: {
          displayOrder: 1,
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Get Featured Categories
========================================
*/

exports.getFeaturedCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      isActive: true,
      isFeatured: true,
    }).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Featured categories fetched successfully.",
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Get Category By ID
========================================
*/

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Get Category By Slug
========================================
*/

exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      slug,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Update Category
========================================
*/

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const {
      name,
      parentCategory,
      gender,
      description,
      image,
      isActive,
      isFeatured,
      showOnHomepage,
      showInNavigation,
      displayOrder,
      seoTitle,
      seoDescription,
    } = req.body;

    /*
    ========================================
    Update Name + Generate Slug
    ========================================
    */

    if (name && name !== category.name) {
      const slug = generateSlug(name);

      const existingCategory = await Category.findOne({
        $or: [
          {
            name: {
              $regex: new RegExp(`^${name}$`, "i"),
            },
          },
          {
            slug,
          },
        ],
        _id: {
          $ne: id,
        },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists",
        });
      }

      category.name = name;
      category.slug = slug;
    }

    /*
    ========================================
    Update Category Fields
    ========================================
    */

    if (gender !== undefined) {
      category.gender = gender;
    }

    if (parentCategory !== undefined) {
      category.parentCategory = parentCategory;
    }

    if (description !== undefined) {
      category.description = description;
    }

    if (image !== undefined) {
      category.image = image;
    }

    if (isActive !== undefined) {
      category.isActive = isActive;
    }

    if (isFeatured !== undefined) {
      category.isFeatured = isFeatured;
    }

    if (showOnHomepage !== undefined) {
      category.showOnHomepage = showOnHomepage;
    }

    if (showInNavigation !== undefined) {
      category.showInNavigation = showInNavigation;
    }

    if (displayOrder !== undefined) {
      category.displayOrder = displayOrder;
    }

    if (seoTitle !== undefined) {
      category.seoTitle = seoTitle;
    }

    if (seoDescription !== undefined) {
      category.seoDescription = seoDescription;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Delete Category
========================================
*/

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const productExists = await Product.exists({
      category: id,
    });

    if (productExists) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete category because it is assigned to one or more products.",
      });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};
