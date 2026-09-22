import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";

import { getAllCategories } from "../services/categoryService";
import { getAllProducts } from "../services/productService";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

/* ==================================================
   CONTEXT
================================================== */

const ProductLiveDataContext = createContext();

/* ==================================================
   INITIAL STATE
================================================== */

const initialState = {
  /*
   * IMPORTANT:
   * This array will contain ALL products returned by MongoDB.
   */
  products: [],

  categories: [],

  reviews: [],

  search: "",

  collectionType: "all",

  filters: {
    materials: [],
    categories: [],
    activeCategory: "",

    /*
     * Do NOT hardcode [0, 10000].
     * It will be initialized after backend products load.
     */
    priceRange: [0, 0],
  },

  /*
   * Dynamic price boundary calculated from backend products.
   */
  priceRangeBounds: {
    min: 0,
    max: 0,
  },

  sortBy: "default",

  /*
   * Frontend pagination.
   * This DOES NOT limit how many products are loaded.
   */
  currentPage: 1,

  itemsPerPage: 6,

  wishlist: (() => {
    try {
      return JSON.parse(localStorage.getItem("rajanya_wishlist")) || [];
    } catch {
      return [];
    }
  })(),

  compare: [],

  recentlyViewed: [],

  loading: false,

  error: null,
};

/* ==================================================
   ACTIONS
================================================== */

export const PRODUCT_ACTIONS = {
  SET_PRODUCTS: "SET_PRODUCTS",

  SET_CATEGORIES: "SET_CATEGORIES",

  SET_SEARCH: "SET_SEARCH",

  SET_FILTERS: "SET_FILTERS",

  SET_ACTIVE_CATEGORY: "SET_ACTIVE_CATEGORY",

  SET_PRICE_RANGE_BOUNDS: "SET_PRICE_RANGE_BOUNDS",

  CLEAR_FILTERS: "CLEAR_FILTERS",

  SET_SORT: "SET_SORT",

  SET_PAGE: "SET_PAGE",

  NEXT_PAGE: "NEXT_PAGE",

  PREVIOUS_PAGE: "PREVIOUS_PAGE",

  FIRST_PAGE: "FIRST_PAGE",

  LAST_PAGE: "LAST_PAGE",

  SET_WISHLIST: "SET_WISHLIST",

  ADD_TO_WISHLIST: "ADD_TO_WISHLIST",

  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",

  ADD_TO_COMPARE: "ADD_TO_COMPARE",

  REMOVE_FROM_COMPARE: "REMOVE_FROM_COMPARE",

  ADD_REVIEW: "ADD_REVIEW",

  UPDATE_REVIEW: "UPDATE_REVIEW",

  DELETE_REVIEW: "DELETE_REVIEW",

  SET_REVIEWS: "SET_REVIEWS",

  ADD_TO_RECENTLY_VIEWED: "ADD_TO_RECENTLY_VIEWED",

  SET_LOADING: "SET_LOADING",

  SET_ERROR: "SET_ERROR",

  SET_COLLECTION_TYPE: "SET_COLLECTION_TYPE",
};

/* ==================================================
   REDUCER
================================================== */

const productReducer = (state, action) => {
  switch (action.type) {
    /* ==========================================
       PRODUCTS
    ========================================== */

    case PRODUCT_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    /* ==========================================
       CATEGORIES
    ========================================== */

    case PRODUCT_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    /* ==========================================
       SEARCH
    ========================================== */

    case PRODUCT_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };

    /* ==========================================
       FILTERS
    ========================================== */

    case PRODUCT_ACTIONS.SET_FILTERS:
      return {
        ...state,

        filters: {
          ...state.filters,
          ...action.payload,
        },

        currentPage: 1,
      };

    /* ==========================================
       ACTIVE CATEGORY
    ========================================== */

    case PRODUCT_ACTIONS.SET_ACTIVE_CATEGORY:
      return {
        ...state,

        filters: {
          ...state.filters,
          activeCategory: action.payload,
        },

        currentPage: 1,
      };

    /* ==========================================
       PRICE RANGE BOUNDS
    ========================================== */

    case PRODUCT_ACTIONS.SET_PRICE_RANGE_BOUNDS:
      return {
        ...state,

        priceRangeBounds: action.payload,

        /*
         * Only initialize the selected range when
         * products are first loaded.
         */
        filters: {
          ...state.filters,

          priceRange: [
            action.payload.min,
            action.payload.max,
          ],
        },
      };

    /* ==========================================
       CLEAR FILTERS
    ========================================== */

    case PRODUCT_ACTIONS.CLEAR_FILTERS:
      return {
        ...state,

        filters: {
          materials: [],
          categories: [],
          activeCategory: "",

          /*
           * Reset to the ACTUAL backend product range.
           */
          priceRange: [
            state.priceRangeBounds.min,
            state.priceRangeBounds.max,
          ],
        },

        currentPage: 1,
      };

    /* ==========================================
       COLLECTION TYPE
    ========================================== */

    case PRODUCT_ACTIONS.SET_COLLECTION_TYPE:
      return {
        ...state,

        collectionType: action.payload,

        currentPage: 1,
      };

    /* ==========================================
       SORT
    ========================================== */

    case PRODUCT_ACTIONS.SET_SORT:
      return {
        ...state,

        sortBy: action.payload,

        currentPage: 1,
      };

    /* ==========================================
       PAGINATION
    ========================================== */

    case PRODUCT_ACTIONS.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case PRODUCT_ACTIONS.NEXT_PAGE:
      return {
        ...state,

        currentPage:
          state.currentPage + 1,
      };

    case PRODUCT_ACTIONS.PREVIOUS_PAGE:
      return {
        ...state,

        currentPage:
          state.currentPage > 1
            ? state.currentPage - 1
            : 1,
      };

    case PRODUCT_ACTIONS.FIRST_PAGE:
      return {
        ...state,
        currentPage: 1,
      };

    case PRODUCT_ACTIONS.LAST_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    /* ==========================================
       REVIEWS
    ========================================== */

    case PRODUCT_ACTIONS.ADD_REVIEW:
      return {
        ...state,

        reviews: [
          action.payload,
          ...state.reviews,
        ],
      };

    case PRODUCT_ACTIONS.UPDATE_REVIEW:
      return {
        ...state,

        reviews: state.reviews.map((review) =>
          review.id === action.payload.id
            ? action.payload
            : review,
        ),
      };

    case PRODUCT_ACTIONS.DELETE_REVIEW:
      return {
        ...state,

        reviews: state.reviews.filter(
          (review) =>
            review.id !== action.payload,
        ),
      };

    case PRODUCT_ACTIONS.SET_REVIEWS:
      return {
        ...state,

        reviews: action.payload,
      };

    /* ==========================================
       WISHLIST
    ========================================== */

    case PRODUCT_ACTIONS.SET_WISHLIST:
      return {
        ...state,

        wishlist: action.payload,
      };

    case PRODUCT_ACTIONS.ADD_TO_WISHLIST:
      return {
        ...state,

        wishlist: state.wishlist.includes(
          action.payload,
        )
          ? state.wishlist.filter(
              (id) => id !== action.payload,
            )
          : [
              ...state.wishlist,
              action.payload,
            ],
      };

    case PRODUCT_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,

        wishlist: state.wishlist.filter(
          (item) => item !== action.payload,
        ),
      };

    /* ==========================================
       COMPARE
    ========================================== */

    case PRODUCT_ACTIONS.ADD_TO_COMPARE:
      return {
        ...state,

        compare: [
          ...state.compare,
          action.payload,
        ],
      };

    case PRODUCT_ACTIONS.REMOVE_FROM_COMPARE:
      return {
        ...state,

        compare: state.compare.filter(
          (item) => item !== action.payload,
        ),
      };

    /* ==========================================
       RECENTLY VIEWED
    ========================================== */

    case PRODUCT_ACTIONS.ADD_TO_RECENTLY_VIEWED:
      return {
        ...state,

        recentlyViewed: [
          action.payload,

          ...state.recentlyViewed.filter(
            (item) => item !== action.payload,
          ),
        ].slice(0, 10),
      };

    /* ==========================================
       LOADING
    ========================================== */

    case PRODUCT_ACTIONS.SET_LOADING:
      return {
        ...state,

        loading: action.payload,
      };

    /* ==========================================
       ERROR
    ========================================== */

    case PRODUCT_ACTIONS.SET_ERROR:
      return {
        ...state,

        error: action.payload,
      };

    default:
      return state;
  }
};

/* ==================================================
   PROVIDER
================================================== */

export const ProductLiveDataProvider = ({
  children,
}) => {
  console.log(
    "✅ ProductLiveDataProvider Mounted",
  );

  const [state, dispatch] = useReducer(
    productReducer,
    initialState,
  );

  /* ==========================================
     LOAD PRODUCTS FROM BACKEND
  ========================================== */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch({
          type: PRODUCT_ACTIONS.SET_LOADING,
          payload: true,
        });

        /*
         * IMPORTANT:
         *
         * getAllProducts() calls:
         *
         * GET /products
         *
         * After our backend change this returns
         * ALL MongoDB products.
         */
        const response =
          await getAllProducts();

        const categoryResponse =
          await getAllCategories();

        const backendProducts =
          Array.isArray(response?.products)
            ? response.products
            : [];

        console.log(
          "📦 Backend Product Count:",
          backendProducts.length,
        );

        console.log(
          "📦 Backend Product Response:",
          response,
        );

        /* ==========================================
           MAP BACKEND PRODUCTS
        ========================================== */

        const mappedProducts =
          backendProducts.map((product) => ({
            ...product,

            /* ===========================
               CATEGORY
            =========================== */

            category:
              product.category?.name || "",

            categoryData:
              product.category || null,

            /* ===========================
               OCCASION
            =========================== */

            occasion:
              Array.isArray(product.occasion)
                ? product.occasion
                    .map(
                      (item) =>
                        item?.name || item,
                    )
                    .filter(Boolean)
                : [],

            occasionData:
              product.occasion || [],

            /* ===========================
               MATERIAL
            =========================== */

            material:
              Array.isArray(
                product.materials,
              )
                ? product.materials[0] || ""
                : product.materials || "",

            /* ===========================
               FLAGS
            =========================== */

            featured:
              Boolean(product.isFeatured),

            trending:
              Boolean(product.isTrending),

            recommended:
              Boolean(product.isRecommended),
          }));

        console.log(
          "📦 Mapped Products Count:",
          mappedProducts.length,
        );

        console.log(
          "📦 Mapped Products:",
          mappedProducts,
        );

        /* ==========================================
           CALCULATE REAL PRICE RANGE
        ========================================== */

        const rentalPrices =
          mappedProducts
            .map(
              (product) =>
                Number(
                  product.rentalOptions?.[0]
                    ?.price,
                ) || 0,
            )
            .filter(
              (price) => price >= 0,
            );

        const originalPrices =
          mappedProducts
            .map(
              (product) =>
                Number(
                  product.originalPrice,
                ) || 0,
            )
            .filter(
              (price) => price >= 0,
            );

        /*
         * Use rental price as the primary
         * catalog price because the product
         * catalog is a rental platform.
         *
         * If no rental prices exist, fall back
         * to originalPrice.
         */

        const priceSource =
          rentalPrices.some(
            (price) => price > 0,
          )
            ? rentalPrices
            : originalPrices;

        const minPrice =
          priceSource.length > 0
            ? Math.min(...priceSource)
            : 0;

        const maxPrice =
          priceSource.length > 0
            ? Math.max(...priceSource)
            : 0;

        console.log(
          "💰 Dynamic Price Range:",
          {
            minPrice,
            maxPrice,
          },
        );

        /* ==========================================
           UPDATE PRODUCTS
        ========================================== */

        dispatch({
          type: PRODUCT_ACTIONS.SET_PRODUCTS,
          payload: mappedProducts,
        });

        /* ==========================================
           UPDATE PRICE RANGE
        ========================================== */

        dispatch({
          type:
            PRODUCT_ACTIONS.SET_PRICE_RANGE_BOUNDS,
          payload: {
            min: minPrice,
            max: maxPrice,
          },
        });

        /* ==========================================
           UPDATE CATEGORIES
        ========================================== */

        dispatch({
          type: PRODUCT_ACTIONS.SET_CATEGORIES,
          payload:
            Array.isArray(
              categoryResponse?.categories,
            )
              ? categoryResponse.categories
              : [],
        });

        console.log(
          "📂 Categories:",
          categoryResponse?.categories,
        );
      } catch (error) {
        console.error(
          "❌ Failed to load products:",
          error,
        );

        dispatch({
          type: PRODUCT_ACTIONS.SET_ERROR,
          payload:
            "Unable to load products.",
        });
      } finally {
        dispatch({
          type: PRODUCT_ACTIONS.SET_LOADING,
          payload: false,
        });
      }
    };

    loadProducts();
  }, []);

  /* ==========================================
     LOAD WISHLIST FROM BACKEND
  ========================================== */

  useEffect(() => {
    console.log(
      "🔥 Wishlist useEffect triggered",
    );

    const loadWishlist = async () => {
      try {
        const token =
          localStorage.getItem(
            "rajanya_token",
          );

        if (!token) {
          return;
        }

        const response =
          await getWishlist();

        dispatch({
          type:
            PRODUCT_ACTIONS.SET_WISHLIST,

          payload:
            response?.wishlist?.map(
              (item) =>
                item.product._id,
            ) || [],
        });
      } catch (error) {
        console.error(
          "Failed to load wishlist:",
          error,
        );
      }
    };

    loadWishlist();
  }, []);

  /* ==========================================
     SAVE WISHLIST
  ========================================== */

  useEffect(() => {
    localStorage.setItem(
      "rajanya_wishlist",
      JSON.stringify(state.wishlist),
    );
  }, [state.wishlist]);

  /* ==========================================
     TOGGLE WISHLIST
  ========================================== */

  const toggleWishlist = async (
    productId,
  ) => {
    try {
      const isWishlisted =
        state.wishlist.includes(productId);

      if (isWishlisted) {
        await removeFromWishlist(productId);

        dispatch({
          type:
            PRODUCT_ACTIONS.REMOVE_FROM_WISHLIST,

          payload: productId,
        });
      } else {
        await addToWishlist(productId);

        dispatch({
          type:
            PRODUCT_ACTIONS.ADD_TO_WISHLIST,

          payload: productId,
        });
      }
    } catch (error) {
      console.error(
        "Wishlist update failed:",
        error,
      );
    }
  };

  /* ==========================================
     SEARCH
  ========================================== */

  const searchedProducts = useMemo(() => {
    const searchTerm =
      state.search
        ?.trim()
        .toLowerCase() || "";

    if (!searchTerm) {
      return state.products;
    }

    return state.products.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(searchTerm),
    );
  }, [
    state.products,
    state.search,
  ]);

  /* ==========================================
     FILTERS
  ========================================== */

  const filteredProducts = useMemo(() => {
    return searchedProducts.filter(
      (product) => {
        /* ===========================
           COLLECTION TYPE
        =========================== */

        const collectionMatch =
          state.collectionType === "all"
            ? true
            : state.collectionType ===
                "women"
              ? product.gender === "Women"
              : state.collectionType ===
                  "men"
                ? product.gender ===
                  "Men"
                : true;

        /* ===========================
           MATERIAL
        =========================== */

        const materialMatch =
          state.filters.materials.length ===
            0 ||
          state.filters.materials.includes(
            product.material,
          );

        /* ===========================
           CATEGORY
        =========================== */

        /*
         * Keep the existing behavior:
         * activeCategory currently matches
         * the mapped occasion value.
         */

        const categoryMatch =
          !state.filters.activeCategory ||
          product.occasion?.includes(
            state.filters.activeCategory,
          );

        /* ===========================
           PRICE
        =========================== */

        const displayPrice =
          Number(
            product.rentalOptions?.[0]
              ?.price,
          ) || 0;

        const priceMatch =
          displayPrice >=
            state.filters.priceRange[0] &&
          displayPrice <=
            state.filters.priceRange[1];

        return (
          collectionMatch &&
          materialMatch &&
          categoryMatch &&
          priceMatch
        );
      },
    );
  }, [
    searchedProducts,
    state.filters,
    state.collectionType,
  ]);

  /* ==========================================
     SORTING
  ========================================== */

  const sortedProducts = useMemo(() => {
    const products = [
      ...filteredProducts,
    ];

    switch (state.sortBy) {
      case "newest":
        return [
          ...products,
        ].sort(
          (a, b) =>
            new Date(
              b.createdAt || 0,
            ) -
            new Date(
              a.createdAt || 0,
            ),
        );

      case "oldest":
        return [
          ...products,
        ].sort(
          (a, b) =>
            new Date(
              a.createdAt || 0,
            ) -
            new Date(
              b.createdAt || 0,
            ),
        );

      case "popular":
        return products.sort(
          (a, b) =>
            (b.bookingCount || 0) -
            (a.bookingCount || 0),
        );

      case "featured":
        return products.sort(
          (a, b) =>
            Number(b.featured) -
            Number(a.featured),
        );

      case "priceLowToHigh":
        return products.sort(
          (a, b) =>
            (Number(
              a.rentalOptions?.[0]
                ?.price,
            ) || 0) -
            (Number(
              b.rentalOptions?.[0]
                ?.price,
            ) || 0),
        );

      case "priceHighToLow":
        return products.sort(
          (a, b) =>
            (Number(
              b.rentalOptions?.[0]
                ?.price,
            ) || 0) -
            (Number(
              a.rentalOptions?.[0]
                ?.price,
            ) || 0),
        );

      case "highestRated":
        return products.sort(
          (a, b) =>
            (Number(b.rating) || 0) -
            (Number(a.rating) || 0),
        );

      default:
        return products;
    }
  }, [
    filteredProducts,
    state.sortBy,
  ]);

  /* ==========================================
     PAGINATION
  ========================================== */

  const totalPages =
    Math.ceil(
      sortedProducts.length /
        state.itemsPerPage,
    ) || 1;

  /*
   * Protect current page if filters reduce
   * the number of available pages.
   */

  useEffect(() => {
    if (
      state.currentPage >
        totalPages
    ) {
      dispatch({
        type:
          PRODUCT_ACTIONS.SET_PAGE,
        payload: totalPages,
      });
    }
  }, [
    state.currentPage,
    totalPages,
  ]);

  const paginatedProducts =
    useMemo(() => {
      const start =
        (state.currentPage - 1) *
        state.itemsPerPage;

      const end =
        start +
        state.itemsPerPage;

      return sortedProducts.slice(
        start,
        end,
      );
    }, [
      sortedProducts,
      state.currentPage,
      state.itemsPerPage,
    ]);

  /* ==========================================
     CATEGORY COUNTS
  ========================================== */

  const categoryCounts = useMemo(() => {
    return state.products.reduce(
      (acc, product) => {
        const occasions =
          Array.isArray(
            product.occasion,
          )
            ? product.occasion
            : [];

        occasions.forEach(
          (occasion) => {
            if (!acc[occasion]) {
              acc[occasion] = 0;
            }

            acc[occasion] += 1;
          },
        );

        return acc;
      },
      {},
    );
  }, [state.products]);

  /* ==========================================
     WISHLIST PRODUCTS
  ========================================== */

  const wishlistProducts =
    useMemo(() => {
      return state.products.filter(
        (product) =>
          state.wishlist.includes(
            product._id,
          ),
      );
    }, [
      state.products,
      state.wishlist,
    ]);

  /* ==========================================
     PRODUCT DETAILS HELPER
  ========================================== */

  const getProductBySlug = (
    slug,
  ) => {
    return state.products.find(
      (product) =>
        product.slug === slug,
    );
  };

  /* ==========================================
     CONTEXT VALUE
  ========================================== */

  const value = {
    state,

    dispatch,

    toggleWishlist,

    filteredProducts,

    sortedProducts,

    paginatedProducts,

    totalPages,

    categoryCounts,

    getProductBySlug,

    wishlistProducts,

    /*
     * Convenient access for filter UI.
     */
    priceRangeBounds:
      state.priceRangeBounds,

    maxRentalPrice:
      state.priceRangeBounds.max,
  };

  return (
    <ProductLiveDataContext.Provider
      value={value}
    >
      {children}
    </ProductLiveDataContext.Provider>
  );
};

/* ==================================================
   CUSTOM HOOK
================================================== */

export const useProductLiveData =
  () => {
    const context =
      useContext(
        ProductLiveDataContext,
      );

    if (!context) {
      throw new Error(
        "useProductLiveData must be used inside ProductLiveDataProvider",
      );
    }

    return context;
  };