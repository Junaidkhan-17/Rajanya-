import "./ContactGetInTouchSection.css";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";

const ContactGetInTouchSection = () => {
  /* ==========================================
     REACT HOOK FORM
  ========================================== */

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  /* ==========================================
     SUBMIT HANDLER
  ========================================== */

  const onSubmit = async (data) => {
    try {
      console.log("Contact Form:", data);

      /*
        Future Backend Flow

        contactService.sendMessage(data);

      */

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="contact-get-touch-section">

      <div className="container">

        <motion.div
          className="contact-get-touch-wrapper"
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

          {/* ============================
              HEADING
          ============================ */}

          <div className="contact-touch-heading">

            <h2>
              Get in <span>Touch</span>
            </h2>

            <p>
              Whether you're looking for a bespoke fitting
              or have an inquiry about our latest
              collection, our curators are ready to assist
              you in navigating the world of Rajanya.
            </p>

          </div>

          {/* ============================
              CONTACT FORM
          ============================ */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="contact-touch-form"
          >

            {/* Full Name */}

            <div className="contact-touch-form-group">

              <label>
                YOUR NAME *
              </label>

              <input
                type="text"
                placeholder="Full name"
                {...register("fullName", {
                  required:
                    "Full Name is required",
                })}
              />

              {errors.fullName && (
                <small>
                  {errors.fullName.message}
                </small>
              )}

            </div>

            {/* Email */}

            <div className="contact-touch-form-group">

              <label>
                YOUR EMAIL *
              </label>

              <input
                type="email"
                placeholder="email@address.com"
                {...register("email", {
                  required:
                    "Email is required",

                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                    message:
                      "Enter a valid email",
                  },
                })}
              />

              {errors.email && (
                <small>
                  {errors.email.message}
                </small>
              )}

            </div>

            {/* Subject */}

            <div className="contact-touch-form-group contact-full-width">

              <label>
                SUBJECT
              </label>

              <input
                type="text"
                placeholder="How can we help?"
                {...register("subject")}
              />

            </div>

            {/* Message */}

            <div className="contact-touch-form-group contact-full-width">

              <label>
                YOUR MESSAGE *
              </label>

              <textarea
                rows="7"
                placeholder="Write your message here..."
                {...register("message", {
                  required:
                    "Message is required",
                })}
              />

              {errors.message && (
                <small>
                  {errors.message.message}
                </small>
              )}

            </div>

            {/* Button */}

            <div className="contact-full-width">

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-touch-submit-btn"
              >

                {isSubmitting
                  ? "Sending..."
                  : "SEND MESSAGE"}

                <ArrowRight
                  size={18}
                />

              </button>

            </div>

          </form>

        </motion.div>

      </div>

    </section>
  );
};

export default ContactGetInTouchSection;