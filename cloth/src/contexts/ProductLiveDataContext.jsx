import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import { getAllCategories } from "../services/categoryService";
import { getAllProducts } from "../services/productService";

import { allProductsCatalogData } from "../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsCatalogData";

import { mensWearCatalogData }
from "../PagesComponents/MensWearComponents/MensWearCatalogData";

import { womensWearCatalogData }
from "../PagesComponents/WomensWearComponents/WomensWearCatalogData";

/* ==================================================
   GLOBAL PRODUCTS
================================================== */


const globalProducts = [

  ...allProductsCatalogData.map(
    (product) => ({
      ...product,
      collectionType: "all-products",
    })
  ),

  ...mensWearCatalogData.map(
    (product) => ({
      ...product,
      collectionType: "mens-wear",
    })
  ),

  ...womensWearCatalogData.map(
    (product) => ({
      ...product,
      collectionType: "womens-wear",
    })
  ),

];

/* ==================================================
   CONTEXT
================================================== */

const ProductLiveDataContext = createContext();

/* ==================================================
   INITIAL STATE
================================================== */

const initialState = {
  products: globalProducts,
  categories: [],
  reviews: [],

  search: "",

  filters: {
    materials: [],
    categories: [],
    activeCategory: "",
    priceRange: [0, 10000],
  },

  sortBy: "default",

  currentPage: 1,

  itemsPerPage: 6,

wishlist: (() => {
  try {
    return (
      JSON.parse(
        localStorage.getItem(
          "rajanya_wishlist"
        )
      ) || []
    );
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

  CLEAR_FILTERS: "CLEAR_FILTERS",

  SET_SORT: "SET_SORT",

  SET_PAGE: "SET_PAGE",

  NEXT_PAGE: "NEXT_PAGE",

  PREVIOUS_PAGE: "PREVIOUS_PAGE",

  FIRST_PAGE: "FIRST_PAGE",

  LAST_PAGE: "LAST_PAGE",

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
};

/* ==================================================
   REDUCER
================================================== */

const productReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case PRODUCT_ACTIONS.SET_CATEGORIES:
  return {
    ...state,
    categories: action.payload,
  };

    case PRODUCT_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };

    case PRODUCT_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        currentPage: 1,
      };

    case PRODUCT_ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          materials: [],
          categories: [],
          activeCategory: "",
          priceRange: [0, 10000],
        },
        currentPage: 1,
      };

    case PRODUCT_ACTIONS.SET_ACTIVE_CATEGORY:
      return {
        ...state,

        filters: {
          ...state.filters,
          activeCategory: action.payload,
        },

        currentPage: 1,
      };

    case PRODUCT_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload,
        currentPage: 1,
      };

    case PRODUCT_ACTIONS.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case PRODUCT_ACTIONS.NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case PRODUCT_ACTIONS.PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1,
      };

    case PRODUCT_ACTIONS.ADD_REVIEW:
      return {
        ...state,

        reviews: [action.payload, ...state.reviews],
      };

    case PRODUCT_ACTIONS.UPDATE_REVIEW:
      return {
        ...state,

        reviews: state.reviews.map((review) =>
          review.id === action.payload.id ? action.payload : review,
        ),
      };

    case PRODUCT_ACTIONS.DELETE_REVIEW:
      return {
        ...state,

        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };

    case PRODUCT_ACTIONS.SET_REVIEWS:
      return {
        ...state,

        reviews: action.payload,
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

    case PRODUCT_ACTIONS.ADD_TO_WISHLIST:
      return {
        ...state,

        wishlist: state.wishlist.includes(action.payload)
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload],
      };

    case PRODUCT_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item !== action.payload),
      };

    case PRODUCT_ACTIONS.ADD_TO_COMPARE:
      return {
        ...state,
        compare: [...state.compare, action.payload],
      };

    case PRODUCT_ACTIONS.REMOVE_FROM_COMPARE:
      return {
        ...state,
        compare: state.compare.filter((item) => item !== action.payload),
      };

    case PRODUCT_ACTIONS.ADD_TO_RECENTLY_VIEWED:
      return {
        ...state,
        recentlyViewed: [
          action.payload,
          ...state.recentlyViewed.filter((item) => item !== action.payload),
        ].slice(0, 10),
      };

    case PRODUCT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

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

export const ProductLiveDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

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

      const response = await getAllProducts();
      const categoryResponse = await getAllCategories();
      const mappedProducts = response.products.map((product) => ({
  ...product,

  /* Frontend Compatibility */
  category: product.category?.name || "",
  categoryData: product.category,

  material: product.materials?.[0] || "",

  featured: product.isFeatured,
  trending: product.isTrending,
  recommended: product.isRecommended,
}));

dispatch({
  type: PRODUCT_ACTIONS.SET_PRODUCTS,
  payload: mappedProducts,
});

dispatch({
  type: PRODUCT_ACTIONS.SET_CATEGORIES,
  payload: categoryResponse.categories,
});

console.log("Categories:", categoryResponse.categories);

    } catch (error) {
      console.error(
        "Failed to load products:",
        error
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
   SAVE WISHLIST
========================================== */

useEffect(() => {
  localStorage.setItem(
    "rajanya_wishlist",
    JSON.stringify(state.wishlist)
  );
}, [state.wishlist]);

  /* ==========================================
     SEARCH
  ========================================== */

  const searchedProducts = useMemo(() => {
    return state.products.filter((product) =>
      product.name.toLowerCase().includes(state.search.toLowerCase()),
    );
  }, [state.products, state.search]);

  /* ==========================================
     FILTERS
  ========================================== */

  const filteredProducts = useMemo(() => {
    console.log("Products:", searchedProducts);
    return searchedProducts.filter((product) => {
      const materialMatch =
        state.filters.materials.length === 0 ||
        state.filters.materials.includes(product.material);

      const categoryMatch =
        !state.filters.activeCategory ||
        product.category === state.filters.activeCategory;

      const displayPrice = product.rentalOptions?.[0]?.price || 0;

      const priceMatch =
        displayPrice >= state.filters.priceRange[0] &&
        displayPrice <= state.filters.priceRange[1];

      return materialMatch && categoryMatch && priceMatch;
    });
  }, [searchedProducts, state.filters]);

  /* ==========================================
     SORTING
  ========================================== */

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (state.sortBy) {
      case "newest":
        return [...products].reverse();

      case "oldest":
        return products;

      case "popular":
        return products.sort((a, b) => b.bookingCount - a.bookingCount);

      case "featured":
        return products.sort((a, b) => Number(b.featured) - Number(a.featured));

      case "priceLowToHigh":
        return products.sort(
          (a, b) =>
            (a.rentalOptions?.[0]?.price || 0) -
            (b.rentalOptions?.[0]?.price || 0),
        );

      case "priceHighToLow":
        return products.sort(
          (a, b) =>
            (b.rentalOptions?.[0]?.price || 0) -
            (a.rentalOptions?.[0]?.price || 0),
        );

      case "highestRated":
        return products.sort((a, b) => b.rating - a.rating);

      default:
        return products;
    }
  }, [filteredProducts, state.sortBy]);

  /* ==========================================
     PAGINATION
  ========================================== */

  const totalPages = Math.ceil(sortedProducts.length / state.itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage;

    const end = start + state.itemsPerPage;

    return sortedProducts.slice(start, end);
  }, [sortedProducts, state.currentPage, state.itemsPerPage]);

  const categoryCounts = useMemo(() => {
    return state.products.reduce((acc, product) => {
      const category = product.category;

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += 1;

      return acc;
    }, {});
  }, [state.products]);

    /* ==========================================
   WISHLIST PRODUCTS
========================================== */

const wishlistProducts = useMemo(() => {
  return state.products.filter((product) =>
    state.wishlist.includes(product._id)
  );
}, [state.products, state.wishlist]);

  /* ==========================================
   PRODUCT DETAILS HELPERS
========================================== */

  const getProductBySlug = (slug) => {
    return state.products.find((product) => product.slug === slug);
  };



  /* ==========================================
   DEBUG LOGS
========================================== */

  console.log("All Products:", state.products);
  console.log("Searched:", searchedProducts);
  console.log("Filtered:", filteredProducts);
  console.log("Sorted:", sortedProducts);
  console.log("Paginated:", paginatedProducts);

  /* ==========================================
     CONTEXT VALUE
  ========================================== */

  const value = {
    state,

    dispatch,

    filteredProducts,

    sortedProducts,

    paginatedProducts,

    totalPages,

    categoryCounts,

    getProductBySlug,

    wishlistProducts,

  };

  return (
    <ProductLiveDataContext.Provider value={value}>
      {children}
    </ProductLiveDataContext.Provider>
  );
};

/* ==================================================
   CUSTOM HOOK
================================================== */

export const useProductLiveData = () => {
  const context = useContext(ProductLiveDataContext);

  if (!context) {
    throw new Error(
      "useProductLiveData must be used inside ProductLiveDataProvider",
    );
  }

  return context;
};
