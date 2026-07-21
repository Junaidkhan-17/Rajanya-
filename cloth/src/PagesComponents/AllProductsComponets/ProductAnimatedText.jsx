import "./ProductAnimatedText.css";

function ProductAnimatedText() {
  return (
    <div className="product-hero-container">
      <svg
        viewBox="0 0 1200 250"
        className="product-hero-svg"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="product-text-base"
        >
          All Products
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="product-text-light"
        >
          All Products
        </text>
      </svg>
    </div>
  );
}

export default ProductAnimatedText;