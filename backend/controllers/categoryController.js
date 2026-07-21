
const Category = require("../models/Category");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

exports.createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      isActive,
      isFeatured,
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

    const slug =
  generateSlug(name);

    const existingCategory = await Category.findOne({
  $or: [
    {
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    },
    { slug },
  ],
});

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category =
      await Category.create({
        name,
        slug,
        description,
        image,
        isActive,
        isFeatured,
        displayOrder,
        seoTitle,
        seoDescription,
      });

    res.status(201).json({
      success: true,
      message:
        "Category created successfully",
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

exports.getCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.find().sort({
        displayOrder: 1,
        createdAt: -1,
      });

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

exports.getCategoryById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category =
      await Category.findById(id);

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
exports.getCategoryBySlug =
  async (req, res) => {
    try {
      const { slug } = req.params;

      const category =
        await Category.findOne({
          slug,
        });

      if (!category) {
        return res.status(404).json({
          success: false,
          message:
            "Category not found",
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
        message:
          error.message,
      });
    }
  };

exports.updateCategory = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category =
      await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const {
      name,
      description,
      image,
      isActive,
      isFeatured,
      displayOrder,
      seoTitle,
      seoDescription,
    } = req.body;

    if (
      name &&
      name !== category.name
    ) {
      const slug = generateSlug(name);

const existingCategory = await Category.findOne({
  $or: [
    {
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    },
    { slug },
  ],
  _id: { $ne: id },
});

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message:
            "Category name already exists",
        });
      }

      category.name = name;

      category.slug = slug;
    }

    if (description !== undefined)
      category.description =
        description;

    if (image !== undefined)
      category.image = image;

    if (isActive !== undefined)
      category.isActive = isActive;

    if (isFeatured !== undefined)
      category.isFeatured =
        isFeatured;

    if (displayOrder !== undefined)
      category.displayOrder =
        displayOrder;

    if (seoTitle !== undefined)
      category.seoTitle = seoTitle;

    if (
      seoDescription !== undefined
    )
      category.seoDescription =
        seoDescription;

    await category.save();

    res.status(200).json({
  success: true,
  message:
    "Category updated successfully",
  category,
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update category",
    });
  }
};

exports.deleteCategory = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category =
      await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
      
    }
    const productExists =
  await Product.exists({
    category: id,
  });

if (productExists) {
  return res.status(400).json({
    success: false,
    message:
      "Cannot delete category because it is assigned to one or more products.",
  });
}
    await Category.findByIdAndDelete(
      id
    );

    res.status(200).json({
      success: true,
      message:
        "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete category",
    });
  }
};