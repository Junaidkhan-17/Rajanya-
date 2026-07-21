// Product Images

import smallimg1 from "../../assets/smallimg1.png";
import smallimg2 from "../../assets/smallimg2.png";
import smallimg3 from "../../assets/smallimg3.png";
import smallimg4 from "../../assets/smallimg4.png";
import smallimg5 from "../../assets/smallimg5.png";

import dress1 from "../../assets/dress1.png";
import dress2 from "../../assets/dress2.png";
import dress3 from "../../assets/dress3.png";

export const womensWearCatalogData = [
  {
    _id: "women_001",

    name: "Royal Wedding Lehenga",

    slug: "royal-wedding-lehenga",

    description:
      "Premium handcrafted wedding lehenga designed for luxurious ceremonies and grand celebrations.",

    shortDescription:
      "Luxury wedding lehenga.",

    category: "Wedding",

    subCategory: "Lehenga",

    brand: "Rajanya",

    material: "Silk",

    tags: [
      "wedding",
      "lehenga",
      "premium",
    ],

    colors: [
      "Red",
      "Gold",
    ],

    sizes: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
    ],
    rentalIncludes: [
    "Dry Cleaning Included",
    "Free Alteration Support",
    "Damage Protection",
    "Delivery & Pickup Available",
  ],

    images: [
      dress1,
      smallimg1,
      smallimg2,
      smallimg3,
      smallimg4,
      smallimg5,
    ],

    videos: [],

    rentalOptions: [
      {
        days: 3,
        price: 4500,
      },
      {
        days: 5,
        price: 6500,
      },
      {
        days: 7,
        price: 8500,
      },
      {
        days: 10,
        price: 10500,
      },
    ],

    originalPrice: 35000,

    securityDeposit: 30,

    stock: 10,

    rating: 4.9,

    reviewsCount: 18,

    bookingCount: 210,

    featured: true,

    availabilityStatus: "available",

    vendorId: "vendor_001",

    seoTitle:
      "Royal Wedding Lehenga",

    seoDescription:
      "Premium wedding lehenga available for rent.",

    productDescription: {
      title:
        "Royal Wedding Lehenga",

      content: [
        "Premium handcrafted wedding lehenga.",
        "Designed for bridal and wedding occasions.",
        "Luxury embroidery and premium finishing.",
        "Comfortable fit for long ceremonies.",
        "Elegant traditional styling.",
      ],
    },

    fabricAndCare: {
      fabric: [
        "Premium Silk",
        "Hand Embroidery",
        "Luxury Lining",
      ],

      care: [
        "Dry Clean Only",
        "Store In Garment Cover",
        "Avoid Direct Sunlight",
      ],
    },

    reviews: [
      {
        id: 1,
        customerName:
          "Priya Sharma",

        rating: 5,

        date:
          "12 June 2026",

        review:
          "Beautiful lehenga with amazing quality.",
      },
    ],

    createdAt:
      "2026-01-01",

    updatedAt:
      "2026-01-01",
  },

  {
    _id: "women_002",

    name:
      "Reception Designer Gown",

    slug:
      "reception-designer-gown",

    description:
      "Elegant designer gown crafted for receptions and luxury evening events.",

    shortDescription:
      "Luxury reception gown.",

    category:
      "Reception",

    subCategory:
      "Gown",

    brand:
      "Rajanya",

    material:
      "Georgette",

    tags: [
      "reception",
      "gown",
    ],

    colors: [
      "Navy Blue",
    ],

    sizes: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
    ],
    rentalIncludes: [
    "Dry Cleaning Included",
    "Free Alteration Support",
    "Damage Protection",
    "Delivery & Pickup Available",
  ],

    images: [
      dress2,
      smallimg1,
      smallimg2,
      smallimg3,
      smallimg4,
      smallimg5,
    ],

    videos: [],

    rentalOptions: [
      {
        days: 3,
        price: 4000,
      },
      {
        days: 5,
        price: 5500,
      },
      {
        days: 7,
        price: 7500,
      },
      {
        days: 10,
        price: 9000,
      },
    ],

    originalPrice: 28000,

    securityDeposit: 25,

    stock: 12,

    rating: 4.8,

    reviewsCount: 12,

    bookingCount: 175,

    featured: true,

    availabilityStatus:
      "available",

    vendorId:
      "vendor_002",

    seoTitle:
      "Reception Designer Gown",

    seoDescription:
      "Premium reception gown available for rent.",

    productDescription: {
      title:
        "Reception Designer Gown",

      content: [
        "Luxury reception wear.",
        "Modern silhouette design.",
        "Perfect for evening events.",
        "Premium imported fabric.",
      ],
    },

    fabricAndCare: {
      fabric: [
        "Georgette",
        "Soft Lining",
      ],

      care: [
        "Dry Clean Only",
        "Handle With Care",
      ],
    },

    reviews: [],

    createdAt:
      "2026-01-01",

    updatedAt:
      "2026-01-01",
  },

  {
    _id: "women_003",
    name: "Party Wear Dress",
    slug: "party-wear-dress",
    category: "Party",
    material: "Net",
    images: [dress3, smallimg1,
      smallimg2,
      smallimg3,
      smallimg4,
      smallimg5,],
    rating: 4.7,
    reviewsCount: 8,
    bookingCount: 95,
    sizes: ["XS", "S", "M", "L", "XL"],
    rentalIncludes: [
    "Dry Cleaning Included",
    "Free Alteration Support",
    "Damage Protection",
    "Delivery & Pickup Available",
  ],
    rentalOptions: [
      { days: 3, price: 3500 },
      { days: 5, price: 5000 },
      { days: 7, price: 6500 },
    ],
    productDescription: {
      title: "Party Wear Dress",
      content: [
        "Stylish party outfit.",
        "Elegant design.",
        "Comfortable fitting.",
      ],
    },
    fabricAndCare: {
      fabric: ["Net", "Soft Lining"],
      care: ["Dry Clean Only"],
    },
    reviews: [],
  },

  {
  _id: "women_004",

  name: "Festive Anarkali Set",

  slug: "festive-anarkali-set",

  description:
    "Elegant festive anarkali set crafted for celebrations, family functions and festive occasions.",

  shortDescription:
    "Premium festive anarkali.",

  category: "Festive",

  subCategory: "Anarkali",

  brand: "Rajanya",

  material: "Silk",

  tags: [
    "festive",
    "anarkali",
    "traditional",
  ],

  colors: [
    "Mustard",
    "Gold",
  ],

  sizes: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ],
  rentalIncludes: [
    "Dry Cleaning Included",
    "Free Alteration Support",
    "Damage Protection",
    "Delivery & Pickup Available",
  ],

  images: [
    dress1,
    smallimg1,
      smallimg2,
      smallimg3,
      smallimg4,
      smallimg5,
  ],

  videos: [],

  rentalOptions: [
    {
      days: 3,
      price: 3000,
    },
    {
      days: 5,
      price: 4500,
    },
    {
      days: 7,
      price: 6000,
    },
    {
      days: 10,
      price: 7500,
    },
  ],

  originalPrice: 22000,

  securityDeposit: 20,

  stock: 15,

  rating: 4.8,

  reviewsCount: 6,

  bookingCount: 88,

  featured: true,

  availabilityStatus: "available",

  vendorId: "vendor_004",

  seoTitle:
    "Festive Anarkali Set",

  seoDescription:
    "Premium festive anarkali available for rent.",

  productDescription: {
    title:
      "Festive Anarkali Set",

    content: [
      "Perfect outfit for festive celebrations.",
      "Premium embroidery detailing.",
      "Comfortable fit and elegant flare.",
      "Traditional styling with modern touch.",
      "Suitable for day and evening events.",
    ],
  },

  fabricAndCare: {
    fabric: [
      "Premium Silk",
      "Soft Inner Lining",
      "Embroidered Work",
    ],

    care: [
      "Dry Clean Only",
      "Avoid Excessive Moisture",
      "Store In Garment Cover",
    ],
  },

  reviews: [
    {
      id: 1,
      customerName:
        "Neha Joshi",

      rating: 5,

      date:
        "14 June 2026",

      review:
        "Very comfortable and looked stunning during the festival.",
    },
  ],

  createdAt:
    "2026-01-01",

  updatedAt:
    "2026-01-01",
},

  {
  _id: "women_005",

  name: "Bridal Couture Lehenga",

  slug: "bridal-couture-lehenga",

  description:
    "Luxury bridal couture lehenga designed for brides seeking elegance and sophistication.",

  shortDescription:
    "Luxury bridal lehenga.",

  category: "Bridal",

  subCategory: "Wedding",

  brand: "Rajanya",

  material: "Velvet",

  tags: [
    "bridal",
    "wedding",
    "luxury",
  ],

  colors: [
    "Maroon",
    "Gold",
  ],

  sizes: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ],
  rentalIncludes: [
    "Dry Cleaning Included",
    "Free Alteration Support",
    "Damage Protection",
    "Delivery & Pickup Available",
  ],

  images: [
    dress2,
    smallimg1,
      smallimg2,
      smallimg3,
      smallimg4,
      smallimg5,
  ],

  videos: [],

  rentalOptions: [
    {
      days: 3,
      price: 6500,
    },
    {
      days: 5,
      price: 8500,
    },
    {
      days: 7,
      price: 11000,
    },
    {
      days: 10,
      price: 14000,
    },
  ],

  originalPrice: 50000,

  securityDeposit: 35,

  stock: 8,

  rating: 5,

  reviewsCount: 22,

  bookingCount: 245,

  featured: true,

  availabilityStatus: "available",

  vendorId: "vendor_005",

  seoTitle:
    "Bridal Couture Lehenga",

  seoDescription:
    "Luxury bridal couture lehenga available for rent.",

  productDescription: {
    title:
      "Bridal Couture Lehenga",

    content: [
      "Premium bridal couture collection.",
      "Intricate handcrafted embroidery.",
      "Designed for luxury wedding ceremonies.",
      "Rich velvet finish and elegant silhouette.",
      "Exceptional craftsmanship and detailing.",
    ],
  },

  fabricAndCare: {
    fabric: [
      "Premium Velvet",
      "Luxury Embroidery",
      "Soft Bridal Lining",
    ],

    care: [
      "Dry Clean Only",
      "Store Carefully",
      "Avoid Direct Heat Exposure",
    ],
  },

  reviews: [
    {
      id: 1,
      customerName:
        "Riya Patel",

      rating: 5,

      date:
        "18 June 2026",

      review:
        "Absolutely breathtaking bridal outfit. Everyone loved it.",
    },
  ],

  createdAt:
    "2026-01-01",

  updatedAt:
    "2026-01-01",
},

  {
  _id: "women_006",

  name: "Designer Lehenga Collection",

  slug: "designer-lehenga-collection",

  description:
    "Contemporary designer lehenga collection crafted for weddings, receptions and luxury celebrations.",

  shortDescription:
    "Designer lehenga collection.",

  category: "Lehenga",

  subCategory: "Designer",

  brand: "Rajanya",

  material: "Georgette",

  tags: [
    "lehenga",
    "designer",
    "partywear",
  ],

  colors: [
    "Pink",
    "Silver",
  ],

  sizes: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ],
  rentalIncludes: [
    "Dry Cleaning Included",
    "Free Alteration Support",
    "Damage Protection",
    "Delivery & Pickup Available",
  ],

  images: [
    dress3,
    smallimg1,
      smallimg2,
      smallimg3,
      smallimg4,
      smallimg5,
  ],

  videos: [],

  rentalOptions: [
    {
      days: 3,
      price: 4000,
    },
    {
      days: 5,
      price: 5500,
    },
    {
      days: 7,
      price: 7500,
    },
    {
      days: 10,
      price: 9500,
    },
  ],

  originalPrice: 32000,

  securityDeposit: 25,

  stock: 12,

  rating: 4.9,

  reviewsCount: 14,

  bookingCount: 162,

  featured: true,

  availabilityStatus: "available",

  vendorId: "vendor_006",

  seoTitle:
    "Designer Lehenga Collection",

  seoDescription:
    "Premium designer lehenga collection available for rent.",

  productDescription: {
    title:
      "Designer Lehenga Collection",

    content: [
      "Modern designer lehenga collection.",
      "Premium finishing and embroidery.",
      "Suitable for receptions and celebrations.",
      "Comfortable fit with elegant styling.",
      "Trending designer patterns.",
    ],
  },

  fabricAndCare: {
    fabric: [
      "Premium Georgette",
      "Designer Embroidery",
      "Soft Lining",
    ],

    care: [
      "Dry Clean Only",
      "Store In Garment Cover",
      "Handle Embroidery Carefully",
    ],
  },

  reviews: [
    {
      id: 1,
      customerName:
        "Anjali Mehta",

      rating: 5,

      date:
        "20 June 2026",

      review:
        "Beautiful designer outfit with excellent fitting and quality.",
    },
  ],

  createdAt:
    "2026-01-01",

  updatedAt:
    "2026-01-01",
},
{
  _id: "women_007",

  name: "Designer Lehenga Collection",

  slug: "designer-lehenga-collection",

  description:
    "Contemporary designer lehenga collection crafted for weddings, receptions and luxury celebrations.",

  shortDescription:
    "Designer lehenga collection.",

  category: "Lehenga",

  subCategory: "Designer",

  brand: "Rajanya",

  material: "Georgette",

  tags: [
    "lehenga",
    "designer",
    "partywear",
  ],

  colors: [
    "Pink",
    "Silver",
  ],

  sizes: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ],
  rentalIncludes: [
    "Dry Cleaning Included",
    "Free Alteration Support",
    "Damage Protection",
    "Delivery & Pickup Available",
  ],

  images: [
    dress3,
    smallimg1,
      smallimg2,
      smallimg3,
      smallimg4,
      smallimg5,
  ],

  videos: [],

  rentalOptions: [
    {
      days: 3,
      price: 4000,
    },
    {
      days: 5,
      price: 5500,
    },
    {
      days: 7,
      price: 7500,
    },
    {
      days: 10,
      price: 9500,
    },
  ],

  originalPrice: 32000,

  securityDeposit: 25,

  stock: 12,

  rating: 4.9,

  reviewsCount: 14,

  bookingCount: 162,

  featured: true,

  availabilityStatus: "available",

  vendorId: "vendor_006",

  seoTitle:
    "Designer Lehenga Collection",

  seoDescription:
    "Premium designer lehenga collection available for rent.",

  productDescription: {
    title:
      "Designer Lehenga Collection",

    content: [
      "Modern designer lehenga collection.",
      "Premium finishing and embroidery.",
      "Suitable for receptions and celebrations.",
      "Comfortable fit with elegant styling.",
      "Trending designer patterns.",
    ],
  },

  fabricAndCare: {
    fabric: [
      "Premium Georgette",
      "Designer Embroidery",
      "Soft Lining",
    ],

    care: [
      "Dry Clean Only",
      "Store In Garment Cover",
      "Handle Embroidery Carefully",
    ],
  },

  reviews: [
    {
      id: 1,
      customerName:
        "Anjali Mehta",

      rating: 5,

      date:
        "20 June 2026",

      review:
        "Beautiful designer outfit with excellent fitting and quality.",
    },
  ],

  createdAt:
    "2026-01-01",

  updatedAt:
    "2026-01-01",
},
];