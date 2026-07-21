import "./ContactHeroSection.css";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ContactAnimatedText from "./ContactAnimatedText";
import contacthero from "../../assets/contacthero.png";
import { ChevronRight } from "lucide-react";

const ContactHeroSection = () => {
  return (
    <section className="contact-hero-section">

      <div className="container">

        <motion.div
          className="contact-hero-banner"
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
        >

          {/* Background Image */}

          <img
            src={contacthero}
            alt="Rajanya Contact Banner"
            className="contact-hero-image"
            loading="lazy"
          />

          {/* Overlay */}

          <div className="contact-hero-overlay"></div>

          {/* Content */}

          <div className="contact-hero-content">

            <motion.h1
              initial={{
                y: 40,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
            >
              <ContactAnimatedText />
            </motion.h1>

            <motion.div
              className="contact-hero-breadcrumb"
              initial={{
                y: 20,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.35,
                duration: 0.5,
              }}
              viewport={{
                once: true,
              }}
            >

              <Link to="/">
                Home
              </Link>

              <ChevronRight size={18} color="white" className="arrow"/>

              <span className="contact-hero-current-page">
                Contact Us
              </span>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default ContactHeroSection;