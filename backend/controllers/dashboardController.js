const Product = require("../models/Product");
const Category = require("../models/Category");
const VirtualTryOn = require("../models/VirtualTryOn");
const Payment = require("../models/Payment");

exports.getDashboardStats = async (req, res) => {
  try {
    // ========================================
    // Total Products
    // ========================================
    const totalProducts = await Product.countDocuments();

    // ========================================
    // Total Categories
    // ========================================
    const totalCategories = await Category.countDocuments();

    // ========================================
    // Virtual Try-On Requests
    // ========================================
    const virtualTryOnData = await VirtualTryOn.aggregate([
      {
        $project: {
          historyCount: {
            $size: {
              $ifNull: ["$history", []],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRequests: {
            $sum: "$historyCount",
          },
        },
      },
    ]);

    const virtualTryOnRequests =
      virtualTryOnData.length > 0
        ? virtualTryOnData[0].totalRequests
        : 0;

    // ========================================
    // Virtual Try-On Revenue
    // ========================================
    const virtualTryOnRevenueData = await Payment.aggregate([
      {
        $match: {
          "payment.paymentFor": "virtual_try_on",
          "payment.paymentStatus": "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$virtualTryOn.amountPaid",
          },
        },
      },
    ]);

    const virtualTryOnRevenue =
      virtualTryOnRevenueData.length > 0
        ? virtualTryOnRevenueData[0].totalRevenue
        : 0;

    // ========================================
    // Revenue Chart - Daily
    // ========================================
    const dailyRevenue = await Payment.aggregate([
      {
        $match: {
          "payment.paymentFor": "virtual_try_on",
          "payment.paymentStatus": "paid",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: {
                $ifNull: [
                  "$payment.paymentCompletedAt",
                  "$createdAt",
                ],
              },
            },
            month: {
              $month: {
                $ifNull: [
                  "$payment.paymentCompletedAt",
                  "$createdAt",
                ],
              },
            },
            day: {
              $dayOfMonth: {
                $ifNull: [
                  "$payment.paymentCompletedAt",
                  "$createdAt",
                ],
              },
            },
          },
          revenue: {
            $sum: "$virtualTryOn.amountPaid",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
          revenue: 1,
        },
      },
    ]);

    // ========================================
    // Revenue Chart - Weekly
    // ========================================
    const weeklyRevenue = await Payment.aggregate([
      {
        $match: {
          "payment.paymentFor": "virtual_try_on",
          "payment.paymentStatus": "paid",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $isoWeekYear: {
                $ifNull: [
                  "$payment.paymentCompletedAt",
                  "$createdAt",
                ],
              },
            },
            week: {
              $isoWeek: {
                $ifNull: [
                  "$payment.paymentCompletedAt",
                  "$createdAt",
                ],
              },
            },
          },
          revenue: {
            $sum: "$virtualTryOn.amountPaid",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.week": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          week: "$_id.week",
          revenue: 1,
        },
      },
    ]);

    // ========================================
    // Revenue Chart - Monthly
    // ========================================
    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          "payment.paymentFor": "virtual_try_on",
          "payment.paymentStatus": "paid",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: {
                $ifNull: [
                  "$payment.paymentCompletedAt",
                  "$createdAt",
                ],
              },
            },
            month: {
              $month: {
                $ifNull: [
                  "$payment.paymentCompletedAt",
                  "$createdAt",
                ],
              },
            },
          },
          revenue: {
            $sum: "$virtualTryOn.amountPaid",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          revenue: 1,
        },
      },
    ]);

    // ========================================
    // Revenue Chart - Yearly
    // ========================================
    const yearlyRevenue = await Payment.aggregate([
      {
        $match: {
          "payment.paymentFor": "virtual_try_on",
          "payment.paymentStatus": "paid",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: {
                $ifNull: [
                  "$payment.paymentCompletedAt",
                  "$createdAt",
                ],
              },
            },
          },
          revenue: {
            $sum: "$virtualTryOn.amountPaid",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          revenue: 1,
        },
      },
    ]);

    // ========================================
// Category Distribution
// ========================================
// ========================================
// Category Distribution
// Includes Men, Women, Unisex
// Preserves products with missing category references
// ========================================
const categoryDistribution = await Product.aggregate([
  // Lookup category but DON'T remove products
  // when the category reference cannot be resolved.
  {
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "categoryInfo",
    },
  },

  {
    $unwind: {
      path: "$categoryInfo",
      preserveNullAndEmptyArrays: true,
    },
  },

  // Normalize gender
  {
    $addFields: {
      genderGroup: {
        $switch: {
          branches: [
            {
              case: {
                $eq: ["$gender", "Men"],
              },
              then: "men",
            },
            {
              case: {
                $eq: ["$gender", "Women"],
              },
              then: "women",
            },
            {
              case: {
                $eq: ["$gender", "Unisex"],
              },
              then: "unisex",
            },
          ],
          default: "other",
        },
      },

      // If category lookup fails, keep the product
      // under Uncategorized.
      categoryNameForDashboard: {
        $ifNull: [
          "$categoryInfo.name",
          "Uncategorized",
        ],
      },
    },
  },

  // Group products by gender + category
  {
    $group: {
      _id: {
        gender: "$genderGroup",
        categoryName:
          "$categoryNameForDashboard",
      },

      productCount: {
        $sum: 1,
      },
    },
  },

  // Clean response
  {
    $project: {
      _id: 0,
      gender: "$_id.gender",
      categoryName: "$_id.categoryName",
      productCount: 1,
    },
  },

  // Highest product count first
  {
    $sort: {
      productCount: -1,
    },
  },
]);

    // ========================================
    // Dashboard Response
    // ========================================
    return res.status(200).json({
      success: true,

      stats: {
        products: {
          total: totalProducts,
        },

        categories: {
          total: totalCategories,
        },

        virtualTryOn: {
          requests: virtualTryOnRequests,
          revenue: virtualTryOnRevenue,
        },

        revenueChart: {
          daily: dailyRevenue,
          weekly: weeklyRevenue,
          monthly: monthlyRevenue,
          yearly: yearlyRevenue,
        },

        categoryDistribution: categoryDistribution,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};