import "./ContactAnimatedText.css";

function AnimatedText() {
  return (
    <div className="contact-hero-container">
      <svg
        viewBox="0 0 1200 250"
        className="contact-hero-svg"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="contact-text-base"
        >
          Contact's Us
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="contact-text-light"
        >
          Contact's Us
        </text>
      </svg>
    </div>
  );
}

export default AnimatedText;