import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import AnimatedText from "./AnimatedText";
import { useNavigate } from "react-router-dom";

import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";
import bg3 from "../../assets/bg3.png";
import bg4 from "../../assets/bg4.png";
import bg5 from "../../assets/bg5.png";
import bg6 from "../../assets/bg6.png";
import bg7 from "../../assets/bg7.png";
import bg8 from "../../assets/bg8.png";
import bg9 from "../../assets/bg9.png";

const heroImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((previousImage) => {
        return (previousImage + 1) % heroImages.length;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-hero-main">
      {/* BACKGROUND IMAGE SLIDESHOW */}
      <div className="home-hero-background" aria-hidden="true">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            className={`home-hero-slide ${
              activeImage === index ? "active" : ""
            }`}
            loading="eager"
            fetchPriority={index === 0 ? "high" : "auto"}
            draggable="false"
          />
        ))}
      </div>

      {/* HERO OVERLAY */}
      <motion.div
        className="home-hero-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        aria-hidden="true"
      />

      {/* HERO CONTENT */}
      <div className="home-hero-content-wrapper">
        <motion.div
          className="home-hero-content"
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <h1 className="home-hero-title">
            <AnimatedText />
          </h1>

          <div className="home-hero-divider" aria-hidden="true" />

          <p className="home-hero-description">
            A timeless and sustainable wardrobe, where each ensemble is designed
            with perfection and tailored to last.
          </p>

          <motion.button
            type="button"
            className="home-hero-book-button"
            onClick={() => navigate("/collection")}
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Book for Rent
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
