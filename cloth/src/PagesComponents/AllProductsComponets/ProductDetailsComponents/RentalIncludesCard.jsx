import "./RentalIncludesCard.css";

import { CheckCircle2 } from "lucide-react";

const RENTAL_INCLUDES = [
  "Dry Cleaning Included",
  "Free Alteration Support",
  "Damage Protection",
  "Delivery & Pickup Available",
];

const RentalIncludesCard = () => {
  return (
    <div className="rental-includes-card">
      <div className="rental-includes-header">
        <h5>RENTAL INCLUDES</h5>
      </div>

      <div className="rental-includes-grid">
        {RENTAL_INCLUDES.map((item, index) => (
          <div key={index} className="rental-includes-item">
            <CheckCircle2 size={18} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalIncludesCard;