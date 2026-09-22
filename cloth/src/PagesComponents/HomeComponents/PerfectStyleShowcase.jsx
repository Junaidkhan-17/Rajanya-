import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import "./PerfectStyleShowcase.css";

import one from "../../assets/one.png";
import two from "../../assets/two.png";
import three from "../../assets/three.png";
import four from "../../assets/four.png";

const PerfectStyleShowcase = () => {
  return (
    <section className="perfect-style-showcase-main">
      <div className="container">
        <motion.div
          className="perfect-style-showcase-wrapper"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Side */}
          <div className="perfect-style-showcase-left">
            <h2 className="perfect-style-showcase-title">
              Choose Your <span>Perfect Style</span>
            </h2>

            <p className="perfect-style-showcase-description">
              Browse collections based on occasions, trends, and fashion
              preferences. Try outfits virtually and find your ideal look
              before booking or purchasing.
            </p>

            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.02}
            >
              <div className="perfect-style-image-wrapper">
                <img
                  src={one}
                  alt="Lehengas"
                  className="perfect-style-image"
                />

                <div className="perfect-style-category-card">
                  <h5>Lehengas</h5>
                  <span>15 products</span>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Right Side */}
          <div className="perfect-style-showcase-right">
            <Tilt
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
            >
              <div className="perfect-style-image-wrapper">
                <img
                  src={three}
                  alt=""
                  className="perfect-style-image"
                />

                <div className="perfect-style-category-card">
                  <h5>Lehengas</h5>
                  <span>24 products</span>
                </div>
              </div>
            </Tilt>

            <div className="perfect-style-bottom-grid">
              <Tilt
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
              >
                <div className="perfect-style-image-wrapper">
                  <img
                    src={two}
                    alt=""
                    className="perfect-style-image"
                  />

                  <div className="perfect-style-category-card">
                    <h5>Lehengas</h5>
                    <span>30 products</span>
                  </div>
                </div>
              </Tilt>

              <Tilt
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
              >
                <div className="perfect-style-image-wrapper">
                  <img
                    src={four}
                    alt=""
                    className="perfect-style-image"
                  />

                  <div className="perfect-style-category-card">
                    <h5>Lehengas</h5>
                    <span>24 products</span>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerfectStyleShowcase;