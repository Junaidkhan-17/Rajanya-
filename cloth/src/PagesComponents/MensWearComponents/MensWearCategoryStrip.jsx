import "./MensWearCategoryStrip.css";

import { motion } from "framer-motion";

import { mensWearCategoriesData } from "./MensWearCategoryData";

import {
  useMensWear,
  MENS_WEAR_ACTIONS,
} from "../../contexts/MensWearContext";

const MensWearCategoryStrip = () => {
  const {
  state,
  dispatch,
  categoryCounts,
} = useMensWear();

  const handleCategoryClick = (
  category
) => {
  dispatch({
    type:
      MENS_WEAR_ACTIONS.SET_ACTIVE_CATEGORY,

    payload:
      state.filters.activeCategory ===
      category.name
        ? ""
        : category.name,
  });
};

  return (
    <section className="mens-category-strip-section">
      <div className="container">
        <div className="mens-category-strip">
          {mensWearCategoriesData.map(
            (category, index) => (
              <motion.div
                key={category.id}
                className={`mens-category-item ${
                  state.filters
                    .activeCategory ===
                  category.name
                    ? "mens-category-active"
                    : ""
                }`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                viewport={{
                  once: true,
                }}
                onClick={() =>
                  handleCategoryClick(
                    category
                  )
                }
              >
                <div className="mens-category-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="mens-category-image"
                  />
                </div>

                <div className="mens-category-content">
                  <h4>
                    {category.name}
                  </h4>

                  <span>
  {categoryCounts?.[
    category.name
  ] || 0}{" "}
  Products
</span>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default MensWearCategoryStrip;