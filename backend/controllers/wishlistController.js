const mongoose = require(
  "mongoose"
);

const Wishlist = require(
  "../models/Wishlist"
);

const Product = require(
  "../models/Product"
);

exports.addToWishlist =
  async (req, res) => {
    try {
      const { productId } =
        req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          productId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid product ID",
        });
      }

      const product =
        await Product.findById(
          productId
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      const exists =
        await Wishlist.findOne({
          user: req.user.id,
          product:
            productId,
        });

      if (exists) {
        return res.status(400).json({
          success: false,
          message:
            "Product already in wishlist",
        });
      }

      const wishlist =
        await Wishlist.create({
          user: req.user.id,
          product:
            productId,
        });

      res.status(201).json({
        success: true,
        message:
          "Product added to wishlist",
        wishlist,
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


exports.getWishlist =
  async (req, res) => {
    try {
      const wishlist =
        await Wishlist.find({
          user: req.user.id,
        })
          .populate({
  path: "product",
  select:
    "name slug mainImage thumbnailImage originalPrice rentalOptions rating availabilityStatus category",
  populate: {
    path: "category",
    select: "name slug",
  },
})
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count:
          wishlist.length,
        wishlist,
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

exports.removeFromWishlist =
  async (req, res) => {
    try {
      const { productId } =
        req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          productId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid product ID",
        });
      }

      const wishlist =
        await Wishlist.findOne({
          user: req.user.id,
          product:
            productId,
        });

      if (!wishlist) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found in wishlist",
        });
      }

      await wishlist.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Product removed from wishlist",
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