import "./MensWearHeroSection.css";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import menswearheroimage from "../../assets/menimage/menswearheroimage.png";
import MenAnimatedText from "./MenAnimatedText";

function MensWearHeroSection() {
  return (
    <section className="mens-wear-hero-main">
      <div className="container-fluid">
        <motion.div
          className="mens-wear-hero-banner"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={menswearheroimage}
            alt="Men's Wear"
            className="mens-wear-hero-banner-image"
          />

          <div className="mens-wear-hero-banner-overlay"></div>

          <div className="mens-wear-hero-banner-content">
            <motion.h1
              className="mens-wear-hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
              }}
            >
              <MenAnimatedText />
            </motion.h1>

            <motion.div
              className="mens-wear-hero-breadcrumb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.6,
              }}
            >
              <span>HOME</span>

              <ChevronRight
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span>MEN'S WEAR</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MensWearHeroSection;