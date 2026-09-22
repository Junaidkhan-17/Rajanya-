import "./LimitedTimeDealsSection.css";

import { motion } from "framer-motion";

import { limitedTimeDealsData } from "./LimitedTimeDealsData";

function LimitedTimeDealsSection() {
  return (
    <section className="limited-time-deals-main">
      <div className="container-fluid">
        <motion.div
          className="limited-time-deals-header"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="limited-time-deals-header-content">
            <h2 className="limited-time-deals-title">
              <span>Limited</span>-<span>Time</span> Fashion Deals
            </h2>

            <p className="limited-time-deals-description">
              Enjoy exclusive savings on trending outfits and premium
              collections. Book your favorite look today and elevate your
              style for less.
            </p>
          </div>

          <button
            type="button"
            className="limited-time-deals-see-all-btn"
          >
            See All
            <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </button>
        </motion.div>

        <div className="row g-4">
          {limitedTimeDealsData.map((deal, index) => (
            <motion.div
              key={deal.id}
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <div
                className="limited-time-deal-card"
                style={{ background: deal.bgColor }}
              >
                <div className="limited-time-deal-image-wrapper">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="limited-time-deal-image"
                  />
                </div>

                <div className="limited-time-deal-content">
                  <h3>{deal.title}</h3>

                  <h4>{deal.discount}</h4>

                  <p>{deal.description}</p>

                  <button
                    type="button"
                    className="limited-time-deal-btn"
                  >
                    Browse Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LimitedTimeDealsSection;