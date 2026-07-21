import "./AllProductsProductCard.css";
import { useNavigate } from "react-router-dom";
import { Heart, Eye, GitCompare, Share2 } from "lucide-react";

import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";

const AllProductsProductCard = ({ product }) => {
  const { state, dispatch } = useProductLiveData();
  const navigate = useNavigate();
  const isWishlisted = state.wishlist.includes(product._id);

  const isCompared = state.compare.includes(product._id);

  /* ======================================
     WISHLIST
  ====================================== */

  const handleWishlist = (e) => {
    e.stopPropagation();

    dispatch({
      type: isWishlisted
        ? PRODUCT_ACTIONS.REMOVE_FROM_WISHLIST
        : PRODUCT_ACTIONS.ADD_TO_WISHLIST,

      payload: product._id,
    });
  };

  /* ======================================
     HANDLE PRODUCT DETAILS
  ====================================== */

  const handleProductDetails = () => {
    dispatch({
      type: PRODUCT_ACTIONS.ADD_TO_RECENTLY_VIEWED,

      payload: product._id,
    });

    navigate(`/products/${product.slug}`);
  };

  /* ======================================
     COMPARE
  ====================================== */

  const handleCompare = () => {
    dispatch({
      type: isCompared
        ? PRODUCT_ACTIONS.REMOVE_FROM_COMPARE
        : PRODUCT_ACTIONS.ADD_TO_COMPARE,

      payload: product._id,
    });
  };

  /* ======================================
     QUICK VIEW
  ====================================== */

  const handleQuickView = () => {
    dispatch({
      type: PRODUCT_ACTIONS.ADD_TO_RECENTLY_VIEWED,
      payload: product._id,
    });

    console.log("Quick View Product:", product._id);
  };

  /* ======================================
     SHARE
  ====================================== */

  const handleShare = async () => {
    const shareUrl = window.location.origin + "/products/" + product.slug;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);

        alert("Product link copied.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ======================================
     BOOK NOW
  ====================================== */

  const handleBookNow = () => {
    handleProductDetails();
  };

  return (
    <div className="all-products-card-main">
      {/* =========================
          IMAGE
      ========================= */}

      <div
        className="all-products-card-image-wrapper"
        onClick={handleProductDetails}
      >
        <img
          src={
  product.mainImage ||
  product.thumbnailImage ||
  product.galleryImages?.[0]
}
          alt={product.name}
          className="all-products-card-image"
          onLoad={(e) => {
            console.log(
              product.name,
              e.target.naturalWidth,
              e.target.naturalHeight,
            );
          }}
        />

        {/* Action Icons */}

        <div className="all-products-card-actions">
          <button
            onClick={handleWishlist}
            className={`all-products-card-icon-btn ${
              isWishlisted ? "all-products-card-icon-active" : ""
            }`}
          >
            <Heart size={18} />
          </button>

          <button
            onClick={handleQuickView}
            className="all-products-card-icon-btn"
          >
            <Eye size={18} />
          </button>

          <button onClick={handleShare} className="all-products-card-icon-btn">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <div className="all-products-card-content">
        <h3 className="all-products-card-title" onClick={handleProductDetails}>
          {product.name}
        </h3>
        <span className="all-products-card-category">{product.category}</span>
        {/* Rating */}

        <div className="all-products-card-rating">
          <i className="bi bi-star-fill"></i>

          <span>{product.rating}</span>

          <small>({product.reviewsCount})</small>
        </div>

        {/* Price */}

        <div className="all-products-card-footer">
          <div className="all-products-card-price-wrapper">
            <strong>${product.rentalOptions?.[0]?.price || 0}</strong>

            <span>${product.originalPrice}</span>
          </div>

          <button
            onClick={handleBookNow}
            className="all-products-card-rent-btn"
          >
            Book For Rent
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProductsProductCard;
