import "./ProductDetailsVariantsSection.css";

const ProductDetailsVariantsSection = ({
  product,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className="product-details-variants-section">
      <div className="variant-header">
        <h4 className="variant-title">
          Select Size
        </h4>

        <button
          type="button"
          className="size-guide-btn"
        >
          Size Guide
        </button>
      </div>

      <div className="size-options">
        {product.sizes?.map((size) => (
          <button
            key={size}
            type="button"
            className={`size-btn ${
              selectedSize === size
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSelectedSize(size)
            }
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsVariantsSection;