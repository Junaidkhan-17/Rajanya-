import { motion } from "framer-motion";
import "./Hero.css";
import AnimatedText from "./AnimatedText";

import herovideo from "../../assets/video/herovideo.mp4";
//import homehero from "../../assets/homehero.png";

const HeroSection = () => {
  return (
    <section className="home-hero-main">

      <video
    className="home-hero-background-video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src={herovideo} type="video/mp4" />
  </video>

     {/* <img
        src={homehero}
        alt="Occasion Wear"
        className="home-hero-background-image"
      />
*/}
      {/* Right Fade Overlay */}
      <motion.div
        className="home-hero-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

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
            {<AnimatedText />}
          </h1>

          <div className="home-hero-divider"></div>

          <p className="home-hero-description">
            A timeless and sustainable wardrobe,
            where each ensemble is designed with perfection
            and tailored to last.
          </p>

          <motion.button
            className="home-hero-book-button"
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