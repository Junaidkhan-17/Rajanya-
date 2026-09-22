import "./TrendingRentalCollection.css";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trendingRentalCollectionData } from "./TrendingRentalCollectionData";

function TrendingRentalCollection() {
  return (
    <section className="trending-rental-collection-main">
      <div className="container-fluid">
        {/* Header */}
        <motion.div
          className="trending-rental-collection-header"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="trending-rental-collection-header-content">
            <h2 className="trending-rental-collection-title">
              <span>Trending</span> Rental Collection
            </h2>

            <p className="trending-rental-collection-description">
              Browse our best-performing rental outfits and discover premium
              fashion for every celebration without the commitment of buying.
            </p>
          </div>

          <button
            type="button"
            className="trending-rental-collection-see-all-btn"
          >
            See All
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </motion.div>

        {/* Cards */}
        <div className="row g-4">
          {trendingRentalCollectionData.map((item, index) => (
            <motion.div
              className="col-lg-4 col-md-6"
              key={item.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <div className="trending-rental-card-main">
                {/* Video */}
                <div className="trending-rental-card-image-wrapper">
                  <video
                    className="trending-rental-card-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source src={item.media} type="video/mp4" />
                  </video>

                  <div
                    className="trending-rental-card-overlay"
                    aria-hidden="true"
                  ></div>
                </div>

                {/* Content */}
                <div className="trending-rental-card-content">
                  <h3 className="trending-rental-card-title">
                    {item.name}
                  </h3>

                  <span className="trending-rental-card-category">
                    {item.category}
                  </span>

                  <div className="trending-rental-card-bottom">
                    <div className="trending-rental-card-price">
                      <strong>{item.price}</strong>
                      <small>{item.oldPrice}</small>
                    </div>

                    <button
                      type="button"
                      className="trending-rental-card-btn"
                    >
                      Book For Rent
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingRentalCollection;