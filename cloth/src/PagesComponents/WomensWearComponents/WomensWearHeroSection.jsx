import "./WomensWearHeroSection.css";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import womenhero from "../../assets/womenimage/womenhero.png";
import WomenAnimatedText from "./WomenAnimatedText";

function WomensWearHeroSection() {
  return (
    <section className="womens-wear-hero-main">
      <div className="container-fluid">
        <motion.div
          className="womens-wear-hero-banner"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={womenhero}
            alt="Women's Wear"
            className="womens-wear-hero-banner-image"
          />

          <div className="womens-wear-hero-banner-overlay"></div>

          <div className="womens-wear-hero-banner-content">
            <motion.h1
              className="womens-wear-hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
              }}
            >
              <WomenAnimatedText />
            </motion.h1>

            <motion.div
              className="womens-wear-hero-breadcrumb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
              }}
            >
              <span>HOME</span>

              <ChevronRight
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span>WOMEN'S WEAR</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WomensWearHeroSection;