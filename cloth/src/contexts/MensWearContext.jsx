import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";

import { getProducts } from "../services/productService";

const MensWearContext = createContext();

const initialState = {
  products: [],

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

const productReducer = (state, action) => {
  switch (action.type) {
    case MENS_WEAR_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload || [],
        error: null,
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

    case MENS_WEAR_ACTIONS.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        filters: {
          ...state.filters,
          activeCategory: action.payload,
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
        currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1,
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
        wishlist: state.wishlist.includes(action.payload)
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload],
      };

    case MENS_WEAR_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item !== action.payload),
      };

    case MENS_WEAR_ACTIONS.ADD_TO_COMPARE:
      return {
        ...state,
        compare: state.compare.includes(action.payload)
          ? state.compare
          : [...state.compare, action.payload],
      };

    case MENS_WEAR_ACTIONS.REMOVE_FROM_COMPARE:
      return {
        ...state,
        compare: state.compare.filter((item) => item !== action.payload),
      };

    case MENS_WEAR_ACTIONS.ADD_TO_RECENTLY_VIEWED:
      return {
        ...state,
        recentlyViewed: [
          action.payload,
          ...state.recentlyViewed.filter((item) => item !== action.payload),
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

export const MensWearProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({
          type: MENS_WEAR_ACTIONS.SET_LOADING,
          payload: true,
        });

        dispatch({
          type: MENS_WEAR_ACTIONS.SET_ERROR,
          payload: null,
        });

        const response = await getProducts({
          gender: "Men",
          page: 1,
          limit: 100,
        });

        if (response?.success) {
          dispatch({
            type: MENS_WEAR_ACTIONS.SET_PRODUCTS,
            payload: response.products || [],
          });
        } else {
          dispatch({
            type: MENS_WEAR_ACTIONS.SET_PRODUCTS,
            payload: [],
          });

          dispatch({
            type: MENS_WEAR_ACTIONS.SET_ERROR,
            payload: response?.message || "Failed to load products.",
          });
        }
      } catch (error) {
        console.error("Failed to fetch Men's Wear products:", error);

        dispatch({
          type: MENS_WEAR_ACTIONS.SET_PRODUCTS,
          payload: [],
        });

        dispatch({
          type: MENS_WEAR_ACTIONS.SET_ERROR,
          payload:
            error?.response?.data?.message ||
            error?.message ||
            "Failed to load products.",
        });
      } finally {
        dispatch({
          type: MENS_WEAR_ACTIONS.SET_LOADING,
          payload: false,
        });
      }
    };

    fetchProducts();
  }, []);

  const searchedProducts = useMemo(() => {
    const searchTerm = state.search.trim().toLowerCase();

    if (!searchTerm) {
      return state.products;
    }

    return state.products.filter((product) =>
      product?.name?.toLowerCase().includes(searchTerm),
    );
  }, [state.products, state.search]);

  const filteredProducts = useMemo(() => {
    return searchedProducts.filter((product) => {
      const genderMatch = product?.gender?.toLowerCase() === "men";

      const productMaterials = Array.isArray(product?.materials)
        ? product.materials
        : [];

      const materialMatch =
        state.filters.materials.length === 0 ||
        productMaterials.some((material) =>
          state.filters.materials.includes(material),
        );

      const categoryName =
        typeof product?.category === "object"
          ? product.category?.name
          : product?.category;

      const categoryMatch =
        !state.filters.activeCategory ||
        categoryName === state.filters.activeCategory;

      const displayPrice = Number(product?.rentalOptions?.[0]?.price) || 0;

      const minPrice = Number(state.filters.priceRange?.[0]) || 0;

      const maxPrice = Number(state.filters.priceRange?.[1]) || 10000;

      const priceMatch = displayPrice >= minPrice && displayPrice <= maxPrice;

      return genderMatch && materialMatch && categoryMatch && priceMatch;
    });
  }, [searchedProducts, state.filters]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (state.sortBy) {
      case "newest":
        return products.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );

      case "oldest":
        return products.sort(
          (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
        );

      case "popular":
        return products.sort(
          (a, b) => (b.bookingCount || 0) - (a.bookingCount || 0),
        );

      case "featured":
        return products.sort(
          (a, b) => Number(b.isFeatured) - Number(a.isFeatured),
        );

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
        return products.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      default:
        return products;
    }
  }, [filteredProducts, state.sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / state.itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage;

    const end = start + state.itemsPerPage;

    return sortedProducts.slice(start, end);
  }, [sortedProducts, state.currentPage, state.itemsPerPage]);

  const categoryCounts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      const category =
        typeof product?.category === "object"
          ? product.category?.name
          : product?.category;

      if (!category) {
        return acc;
      }

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category]++;

      return acc;
    }, {});
  }, [filteredProducts]);

  const categories = Object.keys(categoryCounts);

  const getProductBySlug = (slug) => {
    return state.products.find((product) => product.slug === slug);
  };

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
    <MensWearContext.Provider value={value}>
      {children}
    </MensWearContext.Provider>
  );
};

export const useMensWear = () => {
  const context = useContext(MensWearContext);

  if (!context) {
    throw new Error("useMensWear must be used inside MensWearProvider");
  }

  return context;
};
