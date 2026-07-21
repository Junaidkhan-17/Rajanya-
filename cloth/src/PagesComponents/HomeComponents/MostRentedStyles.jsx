import { motion } from "framer-motion";
import { mostRentedStylesData } from "./MostRentedStylesData";

import "./MostRentedStyles.css";

const MostRentedStyles = () => {
  return (
    <section className="most-rented-styles-main">

      <div className="container">

        {/* Header */}

        <div className="most-rented-styles-header">

          <div className="most-rented-styles-heading-area">

            <h2 className="most-rented-styles-title">
              <span>Most Rented</span> Styles This Week
            </h2>

            <p className="most-rented-styles-description">
              Discover the outfits everyone is choosing for weddings,
              parties, festivals, and special occasions.
              Rent premium fashion pieces at a fraction of the purchase
              cost and look your best for every event.
            </p>

          </div>

          <button className="most-rented-styles-see-all-btn">
            See All
            <i className="bi bi-arrow-right"></i>
          </button>

        </div>

        {/* Products */}

        <div className="row g-4">

          {mostRentedStylesData.map((product, index) => (
            <div
              className="col-lg-4 col-md-6"
              key={product.id}
            >
              <motion.div
                className="most-rented-style-card"
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
              >

                <div className="most-rented-style-image-wrapper">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="most-rented-style-image"
                  />

                </div>

                <div className="most-rented-style-content">

                  <h3 className="most-rented-style-name">
                    {product.name}
                  </h3>

                  <p className="most-rented-style-category">
                    {product.category}
                  </p>

                  <div className="most-rented-style-footer">

                    <div className="most-rented-style-price-area">

                      <span className="most-rented-style-price">
                        {product.price}
                      </span>

                      <span className="most-rented-style-old-price">
                        {product.oldPrice}
                      </span>

                    </div>

                    <button className="most-rented-style-book-btn">
                      Book For Rent
                    </button>

                  </div>

                </div>

              </motion.div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default MostRentedStyles;