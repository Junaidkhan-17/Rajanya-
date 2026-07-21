import "./ContactFAQSection.css";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@animateicons/react/lucide";

import contactfaq from "../../assets/contactfaq.png";
const faqData = [
  {
    id: 1,
    question: "How does Rajanya Fashion Rental work?",
    answer:
      "Browse our luxury collection, choose your preferred outfit and rental duration, complete your booking, and we'll deliver it to your doorstep. After your event, simply return the outfit using our hassle-free return process. Every outfit is professionally cleaned and quality checked before delivery.",
  },

  {
    id: 2,
    question: "What rental durations are available?",
    answer:
      "Rajanya offers flexible rental durations including 3, 5, 7 and 10 days depending on the product. You can easily select your preferred duration directly from the product page before booking.",
  },

  {
    id: 3,
    question: "Are all outfits professionally cleaned?",
    answer:
      "Yes. Every outfit is professionally dry cleaned, sanitized and carefully inspected before being packed for delivery. Our quality team ensures every garment reaches you in premium condition.",
  },

  {
    id: 4,
    question: "How does Pay & Try Virtual Try-On work?",
    answer:
      "Every Virtual Try-On session requires a small payment. Once the payment is successfully completed, you'll immediately receive access to the AI-powered Virtual Try-On experience for that particular outfit.",
  },

  {
    id: 5,
    question: "Do you deliver across India?",
    answer:
      "Yes. Rajanya delivers designer rental outfits to most major cities across India. Delivery availability and estimated timelines are shown during checkout based on your location.",
  },

  {
    id: 6,
    question: "Can I cancel my booking?",
    answer:
      "Bookings can be cancelled or modified before dispatch according to our cancellation policy. Once an order has been shipped, modification options may be limited.",
  },
];

const ContactFAQSection = () => {
  const [activeFaq, setActiveFaq] = useState(1);

  const toggleFaq = (id) => {
    setActiveFaq((prev) => (prev === id ? null : id));
  };

  return (
    <section className="contact-faq-section">
      <div className="container">
        {/* ==========================
            SECTION HEADER
        ========================== */}

        <motion.div
          className="contact-faq-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
        >
          <h2>Frequently <span>Asked Questions</span></h2>

          <p>
            Common questions about rentals, delivery, returns, and our luxury
            fashion experience.
          </p>
        </motion.div>

        {/* ==========================
            CONTENT
        ========================== */}

        <div className="row align-items-start g-5">
          {/* LEFT */}

          <div className="col-lg-5">
            <motion.div
              className="contact-faq-image-wrapper"
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              viewport={{
                once: true,
              }}
            >
              <img
                src={contactfaq}
                alt="Rajanya FAQ"
                className="contact-faq-image"
              />
            </motion.div>
          </div>

          {/* RIGHT */}

          <div className="col-lg-7">
            <motion.div
              className="contact-faq-accordion"
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              viewport={{
                once: true,
              }}
            >
              {faqData.map((faq) => {
                const isOpen = activeFaq === faq.id;

                return (
                  <div key={faq.id} className="contact-faq-item">
                    <button
                      className="contact-faq-question"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span>{faq.question}</span>

                      {isOpen ? (
                        <XIcon size={24} duration={1} color="#ffffff" />
                      ) : (
                        <XIcon size={24} duration={1} color="#ffffff" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className="contact-faq-answer"
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                        >
                          <p>{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQSection;
