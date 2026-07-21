import "./WomenAnimatedText.css";

function AnimatedText() {
  return (
    <div className="women-hero-container">
      <svg
        viewBox="0 0 1200 250"
        className="women-hero-svg"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="women-text-base"
        >
          women's wear
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="women-text-light"
        >
          women's wear
        </text>
      </svg>
    </div>
  );
}

export default AnimatedText;