import "./AnimatedText.css";

function AnimatedText() {
  return (
    <div className="hero-container">
      <svg
        viewBox="0 0 1200 250"
        className="hero-svg"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-base"
        >
          Occasion wear
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-light"
        >
          Occasion wear
        </text>
      </svg>
    </div>
  );
}

export default AnimatedText;