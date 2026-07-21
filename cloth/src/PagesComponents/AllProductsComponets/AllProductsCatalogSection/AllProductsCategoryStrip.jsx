import { motion } from "framer-motion";

import "./AllProductsCategoryStrip.css";

import { allProductsCategoriesData } from "./AllProductsCatalogData";

import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";

const AllProductsCategoryStrip = () => {
  const { state, dispatch, categoryCounts, } =
    useProductLiveData();

  const handleCategoryClick = (
    categoryName
  ) => {
    dispatch({
    type:
      PRODUCT_ACTIONS.SET_ACTIVE_CATEGORY,
    payload: categoryName,
  });
  };

  return (
    <section className="all-products-category-strip-main">
      <div className="container-fluid">
        <motion.div
          className="all-products-category-strip"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {allProductsCategoriesData.map(
            (category) => (
              <motion.button
                key={category.id}
                className={`all-products-category-item ${
                  state.filters
                    .activeCategory ===
                  category.name
                    ? "all-products-category-active"
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
                    y: 30,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <div className="all-products-category-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="all-products-category-image"
                  />
                </div>

                <div className="all-products-category-content">
                  <h4>
                    {category.name}
                  </h4>

                  <span>
                     {categoryCounts[
    category.name
  ] || 0} products
                  </span>
                </div>
              </motion.button>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AllProductsCategoryStrip;