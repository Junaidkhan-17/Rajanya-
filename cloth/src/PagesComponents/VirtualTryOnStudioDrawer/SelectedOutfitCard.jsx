import "./SelectedOutfitCard.css";

import { Star } from "lucide-react";

const SelectedOutfitCard = ({ product }) => {
  /*
  =========================================================
  PRODUCT IMAGE
  =========================================================

  Rajanya product structure uses:

  1. mainImage
  2. thumbnailImage
  3. galleryImages[0]
  4. images[0] - fallback for older frontend/demo data
  =========================================================
  */

  const productImage =
    product?.mainImage ||
    product?.thumbnailImage ||
    product?.galleryImages?.[0] ||
    product?.images?.[0] ||
    "";

  const productName =
    product?.name || "Designer Outfit";

  const productColor =
    product?.colors?.[0] || "Magenta";

  return (
    <div className="selected-outfit-card">

      {/* =================================================
          SELECTED PRODUCT IMAGE
          ================================================= */}

      <div className="selected-outfit-image">
        {productImage ? (
          <img
            src={productImage}
            alt={productName}
          />
        ) : (
          <div className="selected-outfit-image-placeholder">
            <span>No Image</span>
          </div>
        )}
      </div>

      {/* =================================================
          PRODUCT INFORMATION
          ================================================= */}

      <div className="selected-outfit-content">

        <span className="selected-outfit-label">
          SELECTED OUTFIT
        </span>

        <h3>{productName}</h3>

        <div className="selected-outfit-color">
          <span
            className="selected-color-dot"
            aria-hidden="true"
          />

          <p>{productColor}</p>
        </div>

      </div>

      {/* =================================================
          STAR
          ================================================= */}

      <button
        type="button"
        className="selected-outfit-star"
        aria-label="Selected outfit"
      >
        <Star
          size={18}
          fill="currentColor"
        />
      </button>

    </div>
  );
};

export default SelectedOutfitCard;