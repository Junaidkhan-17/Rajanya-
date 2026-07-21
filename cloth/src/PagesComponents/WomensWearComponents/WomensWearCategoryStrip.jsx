import "./WomensWearCategoryStrip.css";

import { motion } from "framer-motion";

import { womensWearCategoriesData } from "./WomensWearCategoryData";

import { useWomensWear, WOMENS_WEAR_ACTIONS } from "../../contexts/WomensWearContext";

const WomensWearCategoryStrip = () => {
  const { state, dispatch, categoryCounts } = useWomensWear();

  const handleCategoryClick = (category) => {
    dispatch({
      type: WOMENS_WEAR_ACTIONS.SET_ACTIVE_CATEGORY,

      payload:
        state.filters.activeCategory === category.name ? "" : category.name,
    });
  };

  return (
    <section className="womens-category-strip-section">
      <div className="container">
        <div className="womens-category-strip">
          {womensWearCategoriesData.map((category, index) => (
            <motion.div
              key={category.id}
              className={`womens-category-item ${
                state.filters.activeCategory === category.name
                  ? "womens-category-active"
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
              onClick={() => handleCategoryClick(category)}
            >
              <div className="womens-category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="womens-category-image"
                />
              </div>

              <div className="womens-category-content">
                <h4>{category.name}</h4>

                <span>{categoryCounts?.[category.name] || 0} Products</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WomensWearCategoryStrip;
