const Occasion = require("../models/Occasion");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

exports.createOccasion = async (req, res) => {
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
        message: "Occasion name is required",
      });
    }

    const slug = generateSlug(name);

    const existingOccasion = await Occasion.findOne({
  $or: [
    {
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    },
    { slug },
  ],
});

    if (existingOccasion) {
      return res.status(400).json({
        success: false,
        message: "Occasion already exists",
      });
    }

    const occasion = await Occasion.create({
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
      message: "Occasion created successfully",
      occasion,
    });
  } catch (error) {
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOccasions = async (req, res) => {
  try {
    const occasions = await Occasion.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: occasions.length,
      occasions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOccasionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid occasion ID",
      });
    }

    const occasion = await Occasion.findById(id);

    if (!occasion) {
      return res.status(404).json({
        success: false,
        message: "Occasion not found",
      });
    }

    res.status(200).json({
      success: true,
      occasion,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOccasionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const occasion = await Occasion.findOne({
      slug,
    });

    if (!occasion) {
      return res.status(404).json({
        success: false,
        message: "Occasion not found",
      });
    }

    res.status(200).json({
      success: true,
      occasion,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateOccasion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid occasion ID",
      });
    }

    const occasion = await Occasion.findById(id);

    if (!occasion) {
      return res.status(404).json({
        success: false,
        message: "Occasion not found",
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

    if (name && name !== occasion.name) {
      const slug = generateSlug(name);

      const existingOccasion = await Occasion.findOne({
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

      if (existingOccasion) {
        return res.status(400).json({
          success: false,
          message: "Occasion name already exists",
        });
      }

      occasion.name = name;
      occasion.slug = slug;
    }

    if (description !== undefined)
      occasion.description = description;

    if (image !== undefined)
      occasion.image = image;

    if (isActive !== undefined)
      occasion.isActive = isActive;

    if (isFeatured !== undefined)
      occasion.isFeatured = isFeatured;

    if (displayOrder !== undefined)
      occasion.displayOrder = displayOrder;

    if (seoTitle !== undefined)
      occasion.seoTitle = seoTitle;

    if (seoDescription !== undefined)
      occasion.seoDescription = seoDescription;

    await occasion.save();

    res.status(200).json({
      success: true,
      message: "Occasion updated successfully",
      occasion,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update occasion",
    });
  }
};

exports.deleteOccasion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid occasion ID",
      });
    }

    const occasion = await Occasion.findById(id);

    if (!occasion) {
      return res.status(404).json({
        success: false,
        message: "Occasion not found",
      });
    }

    const productExists = await Product.exists({
      occasion: id,
    });

    if (productExists) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete occasion because it is assigned to one or more products.",
      });
    }

    await Occasion.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Occasion deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete occasion",
    });
  }
};