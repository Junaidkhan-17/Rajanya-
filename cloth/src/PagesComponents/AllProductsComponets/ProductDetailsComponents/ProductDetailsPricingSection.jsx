import "./ProductDetailsPricingSection.css";

const ProductDetailsPricingSection = ({ product, selectedRentalOption }) => {
  const rentalPrice = selectedRentalOption?.price || 0;

  const discountPercentage = Math.round(
    ((product.originalPrice - rentalPrice) / product.originalPrice) * 100,
  );
  console.log("Pricing:", selectedRentalOption);

  return (
    <div className="product-details-pricing-section">
      <div className="product-pricing-wrapper">
        <span className="product-original-price">
          ₹{product.originalPrice?.toLocaleString()}
        </span>

        <span className="product-rental-price">
          ₹{rentalPrice.toLocaleString()}
        </span>

        <span className="product-rental-label">/ {selectedRentalOption?.days} DAYS RENT</span>

        <span className="product-discount-badge">
          {discountPercentage}% OFF
        </span>
      </div>
      {/*
      <div className="product-security-deposit">
        Security Deposit:
        <span>
          ₹{product.securityDeposit?.toLocaleString()}
        </span>
      </div>
*/}
    </div>
  );
};

export default ProductDetailsPricingSection;
