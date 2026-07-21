import {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";

import { mensWearCatalogData }
from "../PagesComponents/MensWearComponents/MensWearCatalogData";
/* ==================================================
   CONTEXT
================================================== */

const MensWearContext = createContext();

/* ==================================================
   INITIAL STATE
================================================== */

const initialState = {
  products: mensWearCatalogData,

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

  wishlist: [],

  compare: [],

  recentlyViewed: [],

  loading: false,

  error: null,
};

/* ==================================================
   ACTIONS
================================================== */

export const MENS_WEAR_ACTIONS = {
  SET_PRODUCTS: "SET_PRODUCTS",

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

  ADD_TO_RECENTLY_VIEWED: "ADD_TO_RECENTLY_VIEWED",

  SET_LOADING: "SET_LOADING",

  SET_ERROR: "SET_ERROR",
};

/* ==================================================
   REDUCER
================================================== */

const productReducer = (state, action) => {
  switch (action.type) {
    case MENS_WEAR_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case MENS_WEAR_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };

    case MENS_WEAR_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        currentPage: 1,
      };

    case MENS_WEAR_ACTIONS.CLEAR_FILTERS:
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

      case MENS_WEAR_ACTIONS.SET_ACTIVE_CATEGORY:
  return {
    ...state,

    filters: {
      ...state.filters,
      activeCategory:
        action.payload,
    },

    currentPage: 1,
  };

    case MENS_WEAR_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload,
        currentPage: 1,
      };

    case MENS_WEAR_ACTIONS.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case MENS_WEAR_ACTIONS.NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case MENS_WEAR_ACTIONS.PREVIOUS_PAGE:
      return {
        ...state,
        currentPage:
          state.currentPage > 1
            ? state.currentPage - 1
            : 1,
      };

    case MENS_WEAR_ACTIONS.FIRST_PAGE:
      return {
        ...state,
        currentPage: 1,
      };

    case MENS_WEAR_ACTIONS.LAST_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case MENS_WEAR_ACTIONS.ADD_TO_WISHLIST:
  return {
    ...state,

    wishlist: state.wishlist.includes(
      action.payload
    )
      ? state.wishlist.filter(
          (id) => id !== action.payload
        )
      : [
          ...state.wishlist,
          action.payload,
        ],
  };

    case MENS_WEAR_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item !== action.payload
        ),
      };

    case MENS_WEAR_ACTIONS.ADD_TO_COMPARE:
      return {
        ...state,
        compare: [
          ...state.compare,
          action.payload,
        ],
      };

    case MENS_WEAR_ACTIONS.REMOVE_FROM_COMPARE:
      return {
        ...state,
        compare: state.compare.filter(
          (item) => item !== action.payload
        ),
      };

    case MENS_WEAR_ACTIONS.ADD_TO_RECENTLY_VIEWED:
      return {
        ...state,
        recentlyViewed: [
          action.payload,
          ...state.recentlyViewed.filter(
            (item) => item !== action.payload
          ),
        ].slice(0, 10),
      };

    case MENS_WEAR_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case MENS_WEAR_ACTIONS.SET_ERROR:
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

export const MensWearProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    productReducer,
    initialState
  );


  /* ==========================================
     SEARCH
  ========================================== */

  const searchedProducts = useMemo(() => {
    return state.products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(state.search.toLowerCase())
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
        state.filters.materials.includes(
          product.material
        );

      const categoryMatch =
  !state.filters.activeCategory ||
  product.category ===
    state.filters.activeCategory;

      const displayPrice =
  product.rentalOptions?.[0]?.price || 0;

const priceMatch =
  displayPrice >=
    state.filters.priceRange[0] &&
  displayPrice <=
    state.filters.priceRange[1];

      return (
  materialMatch &&
  categoryMatch &&
  priceMatch
);
    });
  }, [
    searchedProducts,
    state.filters,
  ]);

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
    return products.sort(
      (a, b) => b.bookingCount - a.bookingCount
    );

  case "featured":
    return products.sort(
      (a, b) => Number(b.featured) - Number(a.featured)
    );

  case "priceLowToHigh":
  return products.sort(
    (a, b) =>
      (a.rentalOptions?.[0]?.price || 0) -
      (b.rentalOptions?.[0]?.price || 0)
  );

case "priceHighToLow":
  return products.sort(
    (a, b) =>
      (b.rentalOptions?.[0]?.price || 0) -
      (a.rentalOptions?.[0]?.price || 0)
  );

  case "highestRated":
    return products.sort(
      (a, b) => b.rating - a.rating
    );

  default:
    return products;
}
  }, [filteredProducts, state.sortBy]);

  /* ==========================================
     PAGINATION
  ========================================== */

  const totalPages = Math.ceil(
    sortedProducts.length /
      state.itemsPerPage
  );

  const paginatedProducts = useMemo(() => {
    const start =
      (state.currentPage - 1) *
      state.itemsPerPage;

    const end =
      start + state.itemsPerPage;

    return sortedProducts.slice(
      start,
      end
    );
  }, [
    sortedProducts,
    state.currentPage,
    state.itemsPerPage,
  ]);

 const categoryCounts = useMemo(() => {
  return state.products.reduce(
    (acc, product) => {
      const category = product.category;

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category]++;

      return acc;
    },
    {}
  );
}, [state.products]);

/* ==========================================
   DYNAMIC CATEGORIES
========================================== */

const categories = Object.keys(
  categoryCounts
);

/* ==========================================
   PRODUCT DETAILS HELPERS
========================================== */

const getProductBySlug = (slug) => {
  return state.products.find(
    (product) => product.slug === slug
  );
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
     *************
  ========================================== */

console.log(
  "ACTIVE CATEGORY:",
  state.filters.activeCategory
);
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

    categories,

    getProductBySlug,
  };

  return (
    <MensWearContext.Provider
      value={value}
    >
      {children}
    </MensWearContext.Provider>
  );
};

/* ==================================================
   CUSTOM HOOK
================================================== */

export const useMensWear = () => {
  const context = useContext(
    MensWearContext
  );

  if (!context) {
    throw new Error(
      "useMensWear must be used inside MensWearProvider"
    );
  }

  return context;
};