// src/PagesComponents/AllProductsComponents/AllProductsHeroSection.jsx

import "./AllProductsHeroSection.css";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import producthero from "../../assets/producthero.png";
import ProductAnimatedText from "./ProductAnimatedText";

import { allProductsCategoriesData } from "./AllProductsHeroData";

function AllProductsHeroSection() {
  const handleCategoryClick = (category) => {
    console.log("Selected Category:", category.slug);

    // Future Context API Integration
    // dispatch({
    //   type: "SET_SELECTED_CATEGORY",
    //   payload: category.slug,
    // });
  };

  return (
    <section className="all-products-hero-main">
      <div className="container-fluid">
        {/* Hero Banner */}

        <motion.div
          className="all-products-hero-banner"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={producthero}
            alt="All Products"
            className="all-products-hero-banner-image"
          />

          {/* Overlay */}
          <div className="all-products-hero-banner-overlay"></div>

          {/* Content */}

          <div className="all-products-hero-banner-content">
            <motion.h1
              className="all-products-hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
              }}
            >
              <ProductAnimatedText/>
            </motion.h1>

            <motion.div
              className="all-products-hero-breadcrumb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
              }}
            >
              <span>HOME</span>

              <ChevronRight size={12} />

              <span>ALL PRODUCTS</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories */}

        
      </div>
    </section>
  );
}

export default AllProductsHeroSection;