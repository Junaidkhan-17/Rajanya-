import "./RentalIncludesCard.css";
import { CheckCircle2 } from "lucide-react";

const RentalIncludesCard = ({
  product,
}) => {
  const rentalIncludes =
    product?.rentalIncludes || [
      "Dry Cleaning Included",
      "Free Alteration Support",
      "Damage Protection",
      "Delivery & Pickup Available",
    ];

  return (
    <div className="rental-includes-card">
      <div className="rental-includes-header">
        <h5>RENTAL INCLUDES</h5>
      </div>

      <div className="rental-includes-grid">
        {rentalIncludes.map(
          (item, index) => (
            <div
              key={index}
              className="rental-includes-item"
            >
              <CheckCircle2 size={18} />

              <span>{item}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RentalIncludesCard;