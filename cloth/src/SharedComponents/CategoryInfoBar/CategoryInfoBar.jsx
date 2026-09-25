import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";

import { categoryLinks } from "./CategoryInfoBarData";

import "./CategoryInfoBar.css";

const CategoryInfoBar = () => {
  return (
    <motion.div
      className="category-info-bar-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="category-info-bar-content">
          {/* ==========================================
              CATEGORIES
              ========================================== */}
          <nav
            className="category-info-bar-categories"
            aria-label="Fashion categories"
          >
            {categoryLinks.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="category-info-bar-link"
              >
                <span
                  className="category-info-bar-link-icon"
                  aria-hidden="true"
                >
                  <FaStar />
                </span>

                <span className="category-info-bar-link-text">
                  {item.title}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* ==========================================
              CONTACT INFORMATION
              ========================================== */}
          <div className="category-info-bar-contact">
            {/* Address */}
            {/* Address */}
<div className="category-info-bar-contact-item">
  <div
    className="category-info-bar-contact-icon"
    aria-hidden="true"
  >
    <i className="bi bi-geo-alt" />
  </div>

  <div className="category-info-bar-contact-details">
    <h6>Address:</h6>

    <a
      href="https://maps.app.goo.gl/M13JA6qZLPokhR2P8"
      target="_blank"
      rel="noopener noreferrer"
      className="category-info-bar-address-link"
      aria-label="Open Rajanya address in Google Maps"
    >
      Nagpur, Maharashtra
    </a>
  </div>
</div>

            {/* Phone */}
            <div className="category-info-bar-contact-item">
              <div
                className="category-info-bar-contact-icon"
                aria-hidden="true"
              >
                <i className="bi bi-telephone" />
              </div>

              <div className="category-info-bar-contact-details">
                <h6>Phone:</h6>

                <a
                  href="tel:+919695299863"
                  className="category-info-bar-phone-link"
                  aria-label="Call Rajanya at +91 96952 99863"
                >
                  +91 96952 99863
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryInfoBar;