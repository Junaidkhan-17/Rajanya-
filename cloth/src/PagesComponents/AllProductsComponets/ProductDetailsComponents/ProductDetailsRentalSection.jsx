import "./ProductDetailsRentalSection.css";

const ProductDetailsRentalSection = ({
  product,
  selectedRentalOption,
  setSelectedRentalOption,
}) => {
  return (
    <div className="product-details-rental-section">
      <h4 className="rental-section-title">Rental Duration</h4>

      <div className="rental-duration-list">
        {product.rentalOptions?.map((option) => (
          <button
            key={option.days}
            type="button"
            className={`rental-duration-btn ${
              selectedRentalOption?.days === option.days ? "active" : ""
            }`}
            onClick={() => {
              console.log("Clicked:", option);
              setSelectedRentalOption(option);
            }}
          >
            {option.days} Days
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsRentalSection;