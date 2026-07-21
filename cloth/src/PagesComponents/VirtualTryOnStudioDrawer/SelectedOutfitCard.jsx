import "./SelectedOutfitCard.css";
import { Star } from "lucide-react";

const SelectedOutfitCard = ({ product }) => {
  const productImage = product?.images?.[0];

  const productName =
    product?.name || "Designer Outfit";

  const productColor =
    product?.colors?.[0] || "Magenta";

  return (
    <div className="selected-outfit-card">
      <div className="selected-outfit-image">
        <img
          src={productImage}
          alt={productName}
        />
      </div>

      <div className="selected-outfit-content">
        <span className="selected-outfit-label">
          SELECTED OUTFIT
        </span>

        <h3>{productName}</h3>

        <div className="selected-outfit-color">
          <span className="selected-color-dot"></span>

          <p>{productColor}</p>
        </div>
      </div>

      <button className="selected-outfit-star">
        <Star
          size={18}
          fill="currentColor"
        />
      </button>
    </div>
  );
};

export default SelectedOutfitCard;