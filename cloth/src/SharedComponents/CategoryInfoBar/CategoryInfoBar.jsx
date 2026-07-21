import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

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

          {/* Categories */}

          <div className="category-info-bar-categories">

            {categoryLinks.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="category-info-bar-link"
              >
                <span className="category-info-bar-link-icon">
                  {item.icon}
                </span>

                <span className="category-info-bar-link-text">
                  {item.title}
                </span>
              </NavLink>
            ))}

          </div>

          {/* Contact Info */}

          <div className="category-info-bar-contact">

            <div className="category-info-bar-contact-item">

              <div className="category-info-bar-contact-icon">
                <i className="bi bi-geo-alt"></i>
              </div>

              <div>
                <h6>Address:</h6>
                <p>Nagpur, Maharashtra</p>
              </div>

            </div>

            <div className="category-info-bar-contact-item">

              <div className="category-info-bar-contact-icon">
                <i className="bi bi-telephone"></i>
              </div>

              <div>
                <h6>Phone:</h6>
                <p>578-393-4937</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default CategoryInfoBar;