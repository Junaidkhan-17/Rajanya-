
import { useMemo } from "react";
import { motion } from "framer-motion";

import "./MensWearCategoryStrip.css";
import {
  useMensWear,
  MENS_WEAR_ACTIONS,
} from "../../contexts/MensWearContext";

const normalizeValue = (value) =>
  String(value ?? "").trim().toLowerCase();

const getCategoryName = (category) => {
  if (category && typeof category === "object") {
    return String(
      category.name ||
        category.categoryName ||
        category.title ||
        "",
    ).trim();
  }

  return String(category ?? "").trim();
};

const getImageUrl = (image) => {
  if (typeof image === "string") {
    return image.trim();
  }

  if (image && typeof image === "object") {
    return String(
      image.url ||
        image.secure_url ||
        image.src ||
        image.path ||
        "",
    ).trim();
  }

  return "";
};

const getProductImage = (product) => {
  if (!product) return "";

  const candidates = [
    product.mainImage,
    product.thumbnailImage,
    product.thumbnail,
    product.image,
    product.productImage,
    product.galleryImages,
    product.images,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      for (const item of candidate) {
        const url = getImageUrl(item);
        if (url) return url;
      }
    } else {
      const url = getImageUrl(candidate);
      if (url) return url;
    }
  }

  return "";
};

const getCreatedAt = (product) => {
  const timestamp = new Date(product?.createdAt || 0).getTime();

  return Number.isFinite(timestamp) ? timestamp : 0;
};

const MensWearCategoryStrip = () => {
  const { state, dispatch } = useMensWear();

  const categoryItems = useMemo(() => {
    const products = Array.isArray(state.products)
      ? state.products
      : [];

    // Men's Wear contains Men products only.
    const menProducts = products.filter(
      (product) => normalizeValue(product?.gender) === "men",
    );

    const categoryMap = new Map();

    menProducts.forEach((product) => {
      const name = getCategoryName(product?.category);
      const key = normalizeValue(name);

      if (!key) return;

      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          id:
            typeof product.category === "object"
              ? String(product.category?._id || product.category?.id || key)
              : key,
          name,
          products: [],
        });
      }

      categoryMap.get(key).products.push(product);
    });

    return Array.from(categoryMap.values())
      .map((category) => {
        const newestFirst = [...category.products].sort(
          (a, b) => getCreatedAt(b) - getCreatedAt(a),
        );

        // Use the newest product that actually has an image.
        const latestProductWithImage = newestFirst.find(
          (product) => Boolean(getProductImage(product)),
        );

        return {
          id: category.id,
          name: category.name,
          count: category.products.length,
          image: getProductImage(latestProductWithImage),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [state.products]);

  const handleCategoryClick = (categoryName) => {
    const isActive =
      normalizeValue(state.filters.activeCategory) ===
      normalizeValue(categoryName);

    dispatch({
      type: MENS_WEAR_ACTIONS.SET_ACTIVE_CATEGORY,
      payload: isActive ? "" : categoryName,
    });
  };

  if (categoryItems.length === 0) return null;

  return (
    <section className="mens-category-strip-section">
      <div className="container">
        <div className="mens-category-strip">
          {categoryItems.map((category, index) => {
            const isActive =
              normalizeValue(state.filters.activeCategory) ===
              normalizeValue(category.name);

            return (
              <motion.div
                key={category.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                className={`mens-category-item ${
                  isActive ? "mens-category-active" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                onClick={() => handleCategoryClick(category.name)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    handleCategoryClick(category.name);
                  }
                }}
              >
                <div className="mens-category-image-wrapper">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={`${category.name} category`}
                      className="mens-category-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="mens-category-image-placeholder">
                      <span>
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mens-category-content">
                  <h4>{category.name}</h4>
                  <span>
                    {category.count}{" "}
                    {category.count === 1 ? "Product" : "Products"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MensWearCategoryStrip;
