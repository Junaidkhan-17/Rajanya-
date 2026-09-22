import { motion } from "framer-motion";
import "./AIStylingTrustSection.css";
import aimodel from "../../assets/aimodel.png";

// import beforeModelImage from "../../assets/before-model.png";
// import outfitImage from "../../assets/outfit-image.png";

const features = [
  {
    icon: "bi-badge-ar",
    title: "Realistic AI Try-On",
  },
  {
    icon: "bi-lightning-charge-fill",
    title: "Instant Outfit Preview",
  },
  {
    icon: "bi-bullseye",
    title: "Personalized Recommendations",
  },
  {
    icon: "bi-bag-check-fill",
    title: "Reduce Wrong Purchases",
  },
  {
    icon: "bi-handbag-fill",
    title: "Shop With Confidence",
  },
];

const AIStylingTrustSection = () => {
  return (
    <section className="ai-styling-trust-main">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-lg-5">
            <motion.div
              className="ai-styling-image-section"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="ai-styling-stats-card"></div>

              <img
                src={aimodel}
                alt="AI fashion styling model"
                className="ai-main-model-image"
              />

              <div className="ai-outfit-floating-card">
                <h3>40%</h3>
                <p>Reduction in product returns globally.</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="col-lg-7">
            <motion.div
              className="ai-styling-content-section"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="ai-styling-title">
                Why Thousands Trust
                <br />
                Our <span>AI Styling</span> .
              </h2>

              <p className="ai-styling-description">
                We make online fashion shopping smarter, easier, and more fun
                — helping you choose outfits with confidence.
              </p>

              <div className="ai-styling-feature-list">
                {features.map((item, index) => (
                  <motion.div
                    key={index}
                    className="ai-styling-feature-item"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.12,
                      duration: 0.5,
                    }}
                  >
                    <div className="ai-styling-feature-icon">
                      <i
                        className={`bi ${item.icon}`}
                        aria-hidden="true"
                      ></i>
                    </div>

                    <span>{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStylingTrustSection;