import "./Footer.css";

import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="rajanya-footer-main">
      {/* Top Contact Row */}
      <motion.div
        className="rajanya-footer-top-row"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="rajanya-footer-intro">
          <h3>Get in touch with us</h3>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <div className="rajanya-footer-contact-group">
          <div className="rajanya-footer-contact-item">
            <div className="rajanya-footer-icon">
              <i className="bi bi-geo-alt" aria-hidden="true"></i>
            </div>

            <div className="rajanya-footer-contact-text">
              <h6>Address:</h6>
              <p>Nagpur, Maharashtra</p>
            </div>
          </div>

          <div className="rajanya-footer-contact-item">
            <div className="rajanya-footer-icon">
              <i className="bi bi-telephone" aria-hidden="true"></i>
            </div>

            <div className="rajanya-footer-contact-text">
              <h6>Phone:</h6>
              <p>(321) 578 393 4937</p>
            </div>
          </div>

          <div className="rajanya-footer-contact-item">
            <div className="rajanya-footer-icon">
              <i className="bi bi-clock" aria-hidden="true"></i>
            </div>

            <div className="rajanya-footer-contact-text">
              <h6>Opening hours</h6>
              <p>9AM - 5PM / 10AM - 3PM</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="rajanya-footer-divider"></div>

      {/* Middle Links */}
      <motion.div
        className="rajanya-footer-links-row"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="rajanya-footer-column">
          <h4>Rent By Categories</h4>
          <a href="/">Bridal Collection</a>
          <a href="/">Ethnic Wear</a>
          <a href="/">Lehengas</a>
          <a href="/">Festive Wear</a>
          <a href="/">Designer Dresses</a>
          <a href="/">Reception Collection</a>
          <a href="/">Wedding Collection</a>
        </div>

        <div className="rajanya-footer-column">
          <h4>Useful Links</h4>
          <a href="/">Help Center</a>
          <a href="/">Returns & Refunds</a>
          <a href="/">Newsletter</a>
          <a href="/">Status</a>
          <a href="/">Testimonials</a>
        </div>

        <div className="rajanya-footer-column">
          <h4>Account</h4>
          <a href="/">Wishlist</a>
          <a href="/">Brand Assets</a>
          <a href="/">Support</a>
          <a href="/">Recommendations</a>
        </div>

        <div className="rajanya-footer-column">
          <h4>About Company</h4>
          <a href="/">All Products</a>
          <a href="/">Locations</a>
          <a href="/">Design Services</a>
          <a href="/">How it Works</a>
          <a href="/">Customers</a>
        </div>
      </motion.div>

      <div className="rajanya-footer-divider"></div>

      {/* Bottom */}
      <div className="rajanya-footer-bottom-row">
        <div className="rajanya-footer-copyright">
          © 2026 - WebDock Studio LLP
        </div>

        <div className="rajanya-footer-socials">
          <a href="/" aria-label="Facebook">
            <i className="bi bi-facebook" aria-hidden="true"></i>
          </a>

          <a href="/" aria-label="Twitter X">
            <i className="bi bi-twitter-x" aria-hidden="true"></i>
          </a>

          <a href="/" aria-label="Instagram">
            <i className="bi bi-instagram" aria-hidden="true"></i>
          </a>

          <a href="/" aria-label="LinkedIn">
            <i className="bi bi-linkedin" aria-hidden="true"></i>
          </a>

          <a href="/" aria-label="Medium">
            <i className="bi bi-medium" aria-hidden="true"></i>
          </a>
        </div>

        <div className="rajanya-footer-policy-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">Site Map</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;