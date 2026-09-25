import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import "./AllProductsCategoryStrip.css";

import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";

/* ==================================================
   HELPERS
================================================== */

const normalizeValue = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const getCategoryName = (category) => {
  if (!category) return "";

  if (typeof category === "object") {
    return category.name || category.categoryName || category.title || "";
  }

  return String(category);
};

const getProductImage = (product) => {
  return (
    product?.mainImage ||
    product?.thumbnailImage ||
    product?.galleryImages?.[0] ||
    product?.images?.[0] ||
    ""
  );
};

/* ==================================================
   COMPONENT
================================================== */

const AllProductsCategoryStrip = () => {
  const { state, dispatch } = useProductLiveData();

  const location = useLocation();

  const sliderRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /* ==================================================
     DETERMINE CURRENT COLLECTION / GENDER
  ================================================== */

  const currentGender = useMemo(() => {
    const pathname = location.pathname.toLowerCase().replace(/\/+$/, "");

    if (pathname === "/mens-wear" || pathname === "/men-wear") {
      return "men";
    }

    if (pathname === "/womens-wear" || pathname === "/women-wear") {
      return "women";
    }

    return "";
  }, [location.pathname]);

  /* ==================================================
     FILTER PRODUCTS BY CURRENT GENDER
  ================================================== */

  const genderFilteredProducts = useMemo(() => {
    const products = Array.isArray(state.products) ? state.products : [];

    /*
     * ALL PRODUCTS PAGE
     *
     * Return every backend product.
     */
    if (!currentGender) {
      return products;
    }

    /*
     * MEN'S / WOMEN'S PAGE
     *
     * Include:
     * - matching gender
     * - unisex
     */
    return products.filter((product) => {
      const productGender = normalizeValue(product?.gender);

      return (
        productGender === currentGender || productGender === "unisex"
      );
    });
  }, [state.products, currentGender]);

  /* ==================================================
     REAL CATEGORY DATA
  ================================================== */

  const categoryItems = useMemo(() => {
    const backendCategories = Array.isArray(state.categories)
      ? state.categories
      : [];

    /*
     * No backend categories yet.
     */
    if (!backendCategories.length) {
      return [];
    }

    /*
     * --------------------------------------------------
     * FILTER ACTIVE + GENDER APPROPRIATE CATEGORIES
     * --------------------------------------------------
     */

    const filteredCategories = backendCategories.filter((category) => {
      /*
       * Only active categories should appear.
       */
      if (category?.isActive === false) {
        return false;
      }

      const categoryGender = normalizeValue(category?.gender);

      /*
       * ALL PRODUCTS PAGE
       *
       * Show Men + Women + Unisex.
       */
      if (!currentGender) {
        return (
          categoryGender === "men" ||
          categoryGender === "women" ||
          categoryGender === "unisex"
        );
      }

      /*
       * MEN'S PAGE
       *
       * Men + Unisex.
       */
      if (currentGender === "men") {
        return (
          categoryGender === "men" ||
          categoryGender === "unisex"
        );
      }

      /*
       * WOMEN'S PAGE
       *
       * Women + Unisex.
       */
      if (currentGender === "women") {
        return (
          categoryGender === "women" ||
          categoryGender === "unisex"
        );
      }

      return true;
    });

    /*
     * MAP REAL BACKEND CATEGORIES
     */

    const mappedCategories = filteredCategories
      .map((category) => {
        const categoryName = getCategoryName(category);

        if (!categoryName) {
          return null;
        }

        const normalizedCategoryName =
          normalizeValue(categoryName);

        /*
         * ------------------------------------------------
         * FIND ACTUAL PRODUCTS BELONGING TO CATEGORY
         * ------------------------------------------------
         *
         * We calculate the count from state.products.
         *
         * This means:
         *
         * MongoDB products
         *       ↓
         * actual category count
         */

        const matchingProducts = genderFilteredProducts.filter(
          (product) => {
            /*
             * Primary category.
             */
            const productCategoryName = getCategoryName(
              product?.category,
            );

            /*
             * Occasion is also populated from the
             * category in your backend.
             */
            const productOccasions = Array.isArray(
              product?.occasion,
            )
              ? product.occasion
              : [];

            const categoryMatches =
              normalizeValue(productCategoryName) ===
              normalizedCategoryName;

            const occasionMatches = productOccasions.some(
              (occasion) =>
                normalizeValue(getCategoryName(occasion)) ===
                normalizedCategoryName,
            );

            return categoryMatches || occasionMatches;
          },
        );

        /*
         * IMPORTANT:
         *
         * If there are no actual products for
         * this category in the current collection,
         * don't display the category.
         */
        if (matchingProducts.length === 0) {
          return null;
        }

        /* ==========================================
             FIND REAL PRODUCT IMAGE
           ========================================== */

        const representativeProduct = matchingProducts.find(
          (product) => Boolean(getProductImage(product)),
        );

        /*
         * IMPORTANT:
         *
         * MongoDB category image is the PRIMARY
         * source.
         *
         * Product image is the fallback.
         *
         * No static demo category image is used.
         */

        const categoryImage =
          category?.image ||
          getProductImage(representativeProduct) ||
          "";

        return {
          id:
            category?._id ||
            category?.id ||
            categoryName,

          name: categoryName,

          slug:
            category?.slug ||
            normalizeValue(categoryName).replace(/\s+/g, "-"),

          image: categoryImage,

          /*
           * REAL count from actual products.
           */
          count: matchingProducts.length,

          gender: category?.gender || "",

          displayOrder:
            Number(category?.displayOrder) || 0,
        };
      })
      .filter(Boolean);

    /*
     * --------------------------------------------------
     * SORT BY ADMIN DISPLAY ORDER
     * --------------------------------------------------
     *
     * Categories with lower displayOrder appear first.
     * If the same order is used, name is the fallback.
     */

    return mappedCategories.sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }

      return a.name.localeCompare(b.name);
    });
  }, [
    state.categories,
    genderFilteredProducts,
    currentGender,
  ]);

  /* ==================================================
     SLIDER SCROLL STATE
  ================================================== */

  const updateScrollState = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScroll =
      slider.scrollWidth - slider.clientWidth;

    setCanScrollLeft(slider.scrollLeft > 5);

    setCanScrollRight(
      slider.scrollLeft < maxScroll - 5,
    );
  };

  /* ==================================================
     SLIDER EVENT LISTENERS
  ================================================== */

  useEffect(() => {
    updateScrollState();

    const slider = sliderRef.current;

    if (!slider) return;

    const handleScroll = () => {
      updateScrollState();
    };

    const handleResize = () => {
      updateScrollState();
    };

    slider.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      slider.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, [categoryItems]);

  /* ==================================================
     SLIDER CONTROLS
  ================================================== */

  const scrollCategories = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const scrollAmount = Math.max(
      slider.clientWidth * 0.72,
      260,
    );

    slider.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,

      behavior: "smooth",
    });
  };

  /* ==================================================
     CATEGORY CLICK
  ================================================== */

  const handleCategoryClick = (categoryName) => {
    /*
     * Empty string means All Categories.
     */
    dispatch({
      type: PRODUCT_ACTIONS.SET_ACTIVE_CATEGORY,
      payload: categoryName,
    });
  };

  /* ==================================================
     EMPTY STATE
  ================================================== */

  if (!categoryItems.length) {
    return null;
  }

  /* ==================================================
     RENDER
  ================================================== */

  return (
    <section className="all-products-category-strip-main">
      <div className="container-fluid">
        <div className="all-products-category-strip-wrapper">
          {/* ==========================================
              LEFT SLIDER BUTTON
          ========================================== */}

          <button
            type="button"
            className={`all-products-category-slider-control all-products-category-slider-control-left ${
              !canScrollLeft
                ? "all-products-category-slider-control-disabled"
                : ""
            }`}
            onClick={() => scrollCategories("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll categories left"
          >
            <span aria-hidden="true">&#10094;</span>
          </button>

          {/* ==========================================
              CATEGORY SLIDER
          ========================================== */}

          <motion.div
            ref={sliderRef}
            className="all-products-category-strip"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {categoryItems.map((category) => {
              const isActive =
                state.filters.activeCategory ===
                category.name;

              const productLabel =
                category.count === 1
                  ? "product"
                  : "products";

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  className={`all-products-category-item ${
                    isActive
                      ? "all-products-category-active"
                      : ""
                  }`}
                  onClick={() =>
                    handleCategoryClick(category.name)
                  }
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-pressed={isActive}
                >
                  {/* ==================================
                        CATEGORY IMAGE
                    ================================== */}

                  <div className="all-products-category-image-wrapper">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={`${category.name} category`}
                        className="all-products-category-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="all-products-category-image-placeholder">
                        <span>
                          {category.name
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ==================================
                        CATEGORY CONTENT
                    ================================== */}

                  <div className="all-products-category-content">
                    <h4>{category.name}</h4>

                    <span>
                      {category.count} {productLabel}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* ==========================================
              RIGHT SLIDER BUTTON
          ========================================== */}

          <button
            type="button"
            className={`all-products-category-slider-control all-products-category-slider-control-right ${
              !canScrollRight
                ? "all-products-category-slider-control-disabled"
                : ""
            }`}
            onClick={() => scrollCategories("right")}
            disabled={!canScrollRight}
            aria-label="Scroll categories right"
          >
            <span aria-hidden="true">&#10095;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllProductsCategoryStrip;