import "./MenAnimatedText.css";

function AnimatedText() {
  return (
    <div className="men-hero-container">
      <svg
        viewBox="0 0 1200 250"
        className="men-hero-svg"
        role="img"
        aria-label="Men's wear"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="men-text-base"
        >
          Men's wear
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="men-text-light"
        >
          Men's wear
        </text>
      </svg>
    </div>
  );
}

export default AnimatedText;