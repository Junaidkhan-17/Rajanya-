import "./WomensWearCategoryStrip.css";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../contexts/ProductLiveDataContext";

/* =========================================================
   HELPERS
========================================================= */

const normalizeValue = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const getCategoryName = (category) => {
  if (!category) return "";

  if (typeof category === "object") {
    return (
      category.name ||
      category.categoryName ||
      category.title ||
      ""
    );
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

/* =========================================================
   COMPONENT
========================================================= */

const WomensWearCategoryStrip = () => {
  const { state, dispatch } = useProductLiveData();

  const sliderRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(false);

  /* =========================================================
     WOMEN'S PRODUCTS
     
     Women + Unisex
  ========================================================= */

  const womensProducts = useMemo(() => {
    const products = Array.isArray(state.products)
      ? state.products
      : [];

    return products.filter((product) => {
      const productGender = normalizeValue(
        product?.gender
      );

      return (
        productGender === "women" ||
        productGender === "unisex"
      );
    });
  }, [state.products]);

  /* =========================================================
     REAL WOMEN'S CATEGORIES
  ========================================================= */

  const categoryItems = useMemo(() => {
    const backendCategories = Array.isArray(
      state.categories
    )
      ? state.categories
      : [];

    if (!backendCategories.length) {
      return [];
    }

    /* =====================================================
       FILTER CATEGORIES

       Women's Wear:
       - Women
       - Unisex

       Inactive categories are hidden.
    ===================================================== */

    const womensCategories =
      backendCategories.filter((category) => {
        if (category?.isActive === false) {
          return false;
        }

        const categoryGender = normalizeValue(
          category?.gender
        );

        return (
          categoryGender === "women" ||
          categoryGender === "unisex"
        );
      });

    /* =====================================================
       MAP REAL CATEGORY DATA
    ===================================================== */

    const mappedCategories =
      womensCategories
        .map((category) => {
          const categoryName =
            getCategoryName(category);

          if (!categoryName) {
            return null;
          }

          const normalizedCategoryName =
            normalizeValue(categoryName);

          /* =================================================
             FIND ACTUAL PRODUCTS FOR THIS CATEGORY
          ================================================= */

          const matchingProducts =
            womensProducts.filter((product) => {
              /* ---------------------------------------------
                 PRIMARY CATEGORY
              --------------------------------------------- */

              const productCategoryName =
                getCategoryName(
                  product?.category
                );

              const categoryMatches =
                normalizeValue(
                  productCategoryName
                ) === normalizedCategoryName;

              /* ---------------------------------------------
                 OCCASION

                 Your backend currently sets:

                 occasion: [category]

                 So we support this as well.
              --------------------------------------------- */

              const productOccasions =
                Array.isArray(product?.occasion)
                  ? product.occasion
                  : [];

              const occasionMatches =
                productOccasions.some(
                  (occasion) =>
                    normalizeValue(
                      getCategoryName(
                        occasion
                      )
                    ) === normalizedCategoryName
                );

              return (
                categoryMatches ||
                occasionMatches
              );
            });

          /* =================================================
             DON'T SHOW EMPTY CATEGORIES
          ================================================= */

          if (!matchingProducts.length) {
            return null;
          }

          /* =================================================
             FIND PRODUCT IMAGE FALLBACK
          ================================================= */

          const representativeProduct =
            matchingProducts.find((product) =>
              Boolean(
                getProductImage(product)
              )
            );

          /* =================================================
             IMAGE PRIORITY

             1. MongoDB Category.image
             2. Actual product image
          ================================================= */

          const categoryImage =
            category?.image ||
            getProductImage(
              representativeProduct
            ) ||
            "";

          return {
            id:
              category?._id ||
              category?.id ||
              categoryName,

            name: categoryName,

            slug:
              category?.slug ||
              normalizeValue(
                categoryName
              ).replace(/\s+/g, "-"),

            image: categoryImage,

            count: matchingProducts.length,

            gender:
              category?.gender || "",

            displayOrder:
              Number(
                category?.displayOrder
              ) || 0,
          };
        })
        .filter(Boolean);

    /* =====================================================
       ADMIN DISPLAY ORDER
    ===================================================== */

    return mappedCategories.sort(
      (a, b) => {
        if (
          a.displayOrder !==
          b.displayOrder
        ) {
          return (
            a.displayOrder -
            b.displayOrder
          );
        }

        return a.name.localeCompare(
          b.name
        );
      }
    );
  }, [
    state.categories,
    womensProducts,
  ]);

  /* =========================================================
     SLIDER SCROLL STATE
  ========================================================= */

  const updateScrollState = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const maxScroll =
      slider.scrollWidth -
      slider.clientWidth;

    setCanScrollLeft(
      slider.scrollLeft > 5
    );

    setCanScrollRight(
      slider.scrollLeft <
        maxScroll - 5
    );
  };

  /* =========================================================
     SLIDER LISTENERS
  ========================================================= */

  useEffect(() => {
    updateScrollState();

    const slider = sliderRef.current;

    if (!slider) {
      return undefined;
    }

    const handleScroll = () => {
      updateScrollState();
    };

    const handleResize = () => {
      updateScrollState();
    };

    slider.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      slider.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [categoryItems]);

  /* =========================================================
     SLIDER CONTROLS
  ========================================================= */

  const scrollCategories = (direction) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const scrollAmount = Math.max(
      slider.clientWidth * 0.72,
      260
    );

    slider.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,
      behavior: "smooth",
    });
  };

  /* =========================================================
     CATEGORY CLICK
  ========================================================= */

  const handleCategoryClick = (
    categoryName
  ) => {
    dispatch({
      type:
        PRODUCT_ACTIONS.SET_ACTIVE_CATEGORY,

      payload:
        state.filters.activeCategory ===
        categoryName
          ? ""
          : categoryName,
    });
  };

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!categoryItems.length) {
    return null;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="womens-category-strip-section">
      <div className="container">
        <div className="womens-category-strip-wrapper">

          {/* =================================================
              LEFT CONTROL
          ================================================= */}

          <button
            type="button"
            className={`womens-category-slider-control womens-category-slider-control-left ${
              !canScrollLeft
                ? "womens-category-slider-control-disabled"
                : ""
            }`}
            onClick={() =>
              scrollCategories("left")
            }
            disabled={!canScrollLeft}
            aria-label="Scroll women's categories left"
          >
            <span aria-hidden="true">
              &#10094;
            </span>
          </button>

          {/* =================================================
              CATEGORY SLIDER
          ================================================= */}

          <motion.div
            ref={sliderRef}
            className="womens-category-strip"
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
            {categoryItems.map(
              (category) => {
                const isActive =
                  state.filters
                    .activeCategory ===
                  category.name;

                const productLabel =
                  category.count === 1
                    ? "Product"
                    : "Products";

                return (
                  <motion.button
                    key={category.id}
                    type="button"
                    className={`womens-category-item ${
                      isActive
                        ? "womens-category-active"
                        : ""
                    }`}
                    onClick={() =>
                      handleCategoryClick(
                        category.name
                      )
                    }
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 20,
                      },

                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    aria-pressed={isActive}
                  >
                    {/* =====================================
                        IMAGE
                    ===================================== */}

                    <div className="womens-category-image-wrapper">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={`${category.name} category`}
                          className="womens-category-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="womens-category-image-placeholder">
                          <span>
                            {category.name
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* =====================================
                        CONTENT
                    ===================================== */}

                    <div className="womens-category-content">
                      <h4>
                        {category.name}
                      </h4>

                      <span>
                        {category.count}{" "}
                        {productLabel}
                      </span>
                    </div>
                  </motion.button>
                );
              }
            )}
          </motion.div>

          {/* =================================================
              RIGHT CONTROL
          ================================================= */}

          <button
            type="button"
            className={`womens-category-slider-control womens-category-slider-control-right ${
              !canScrollRight
                ? "womens-category-slider-control-disabled"
                : ""
            }`}
            onClick={() =>
              scrollCategories("right")
            }
            disabled={!canScrollRight}
            aria-label="Scroll women's categories right"
          >
            <span aria-hidden="true">
              &#10095;
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WomensWearCategoryStrip;