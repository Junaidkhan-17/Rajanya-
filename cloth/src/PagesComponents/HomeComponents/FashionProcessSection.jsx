import { motion } from "framer-motion";
import "./FashionProcessSection.css";

const processSteps = [
  {
    id: 1,
    icon: "bi-camera",
    title: "📸 Upload Your Photo",
    description:
      "Add your picture and let our smart AI prepare your personalized fitting experience.",
    bgClass: "fashion-process-icon-purple",
  },
  {
    id: 2,
    icon: "bi-bag",
    title: "👕 Pick Your Favorite Outfit",
    description:
      "Explore trending fashion and choose styles that match your vibe.",
    bgClass: "fashion-process-icon-lavender",
  },
  {
    id: 3,
    icon: "bi-stars",
    title: "✨ Watch The Magic Happen",
    description:
      "See realistic outfit previews on yourself before placing your order.",
    bgClass: "fashion-process-icon-blue",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.2,
      ease: "easeOut",
    },
  }),
};

const FashionProcessSection = () => {
  return (
    <section className="fashion-process-main">

      <div className="container">

        {/* Heading */}

        <motion.div
          className="fashion-process-heading-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="fashion-process-title">
            <span>Your New Way</span> To Shop Fashion.
          </h2>

          <p className="fashion-process-subtitle">
            Try clothes in seconds with our intelligent AI dressing room.
          </p>
        </motion.div>

        {/* Process Cards */}

        <div className="row">

          {processSteps.map((step, index) => (
            <div
              className="col-lg-4 col-md-6"
              key={step.id}
            >
              <motion.div
                className="fashion-process-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              >

                <div
                  className={`fashion-process-icon-box ${step.bgClass}`}
                >
                  <i className={`bi ${step.icon}`}></i>
                </div>

                <h3 className="fashion-process-card-title">
                  {step.title}
                </h3>

                <p className="fashion-process-card-description">
                  {step.description}
                </p>

              </motion.div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FashionProcessSection;