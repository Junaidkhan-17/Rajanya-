import MensWear from "../../Pages/MensWear/MensWear";
import "./ContactShowroomSection.css";

import { motion } from "framer-motion";

const ContactShowroomSection = () => {
  return (
    <section className="contact-showroom-section">

      <div className="container">

        <motion.div
          className="contact-showroom-wrapper"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
        >

          {/* ==========================
              HEADING
          ========================== */}

          <div className="contact-showroom-heading">

            <h2>
              Aura <span>Atelier</span> & <span>Showrooms</span>
            </h2>

            <p>
              Experience the tactile luxury of our curated
              collections at our flagship locations. We invite
              you to explore the intersection of heritage
              craftsmanship and modern innovation.
            </p>

          </div>

          {/* ==========================
              GOOGLE MAP
          ========================== */}

          <motion.div
            className="contact-showroom-map"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
          >

            <iframe
              title="Rajanya Showroom Location"
              src="https://www.google.com/maps?q=Nagpur,Maharashtra&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

          </motion.div>

          {/* ==========================
              CONTACT INFORMATION
          ========================== */}

          <motion.div
            className="contact-showroom-info"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
          >

            {/* Address */}

            <div className="contact-showroom-card">
              <span>
                ADDRESS
              </span>

              <h4>
                Rajanya Rental Shop,
              </h4>

              <p>
                Nagpur, Maharashtra
              </p>

            </div>

            {/* Phone */}

            <div className="contact-showroom-card-phone">

              <span className="contact-showroom-card-phone-one">
                PHONE
              </span>

              <a href="tel:+919876543210">
                +91 98765 43210
              </a>

              <a href="tel:+919876543211">
                +91 98765 43211
              </a>

            </div>

            {/* Email */}

            <div className="contact-showroom-card-email">

              <span className="contact-showroom-card-email-one">
                EMAIL
              </span>

              <a href="mailto:concierge@rajanya.com">
                concierge@rajanya.com
              </a>

              <a href="mailto:atelier@rajanya.com">
                atelier@rajanya.com
              </a>

            </div>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
};

export default ContactShowroomSection;