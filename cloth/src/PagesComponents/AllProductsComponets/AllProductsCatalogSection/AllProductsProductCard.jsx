import "./AllProductsProductCard.css";

import { useNavigate } from "react-router-dom";

import { Heart, Eye, Share2 } from "lucide-react";

import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";

const AllProductsProductCard = ({ product }) => {
  const { state, dispatch, toggleWishlist } = useProductLiveData();
  const navigate = useNavigate();

  const isWishlisted = state.wishlist.includes(product._id);
  const isCompared = state.compare.includes(product._id);

  /* ======================================
     PRODUCT IMAGE
  ====================================== */

  const productImage =
    product.mainImage ||
    product.thumbnailImage ||
    product.galleryImages?.[0] ||
    product.images?.[0] ||
    "";

  /* ======================================
     WISHLIST
  ====================================== */

  const handleWishlist = async (e) => {
    e.stopPropagation();
    await toggleWishlist(product._id);
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

  const handleCompare = (e) => {
    e.stopPropagation();

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

  const handleQuickView = (e) => {
    e.stopPropagation();

    dispatch({
      type: PRODUCT_ACTIONS.ADD_TO_RECENTLY_VIEWED,
      payload: product._id,
    });

    console.log("Quick View Product:", product._id);
  };

  /* ======================================
     SHARE
  ====================================== */

  const handleShare = async (e) => {
    e.stopPropagation();

    const shareUrl =
      window.location.origin + "/products/" + product.slug;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        alert("Product link copied.");
      }
    } catch (error) {
      /*
       * User cancelling the native share
       * dialog should not create an error
       * experience.
       */

      if (error?.name !== "AbortError") {
        console.log(error);
      }
    }
  };

  /* ======================================
     BOOK NOW
  ====================================== */

  const handleBookNow = (e) => {
    e.stopPropagation();
    handleProductDetails();
  };

  /* ======================================
     RATING
  ====================================== */

  const rating = Number(product.rating) || 0;
  const reviewsCount = Number(product.reviewsCount) || 0;

  /* ======================================
     PRICING
  ====================================== */

  const rentalPrice =
    Number(product.rentalOptions?.[0]?.price) || 0;

  const originalPrice =
    Number(product.originalPrice) || 0;

  /* ======================================
     RENDER
  ====================================== */

  return (
    <article className="all-products-card-main">
      {/* ======================================
          IMAGE
      ====================================== */}

      <div
        className="all-products-card-image-wrapper"
        onClick={handleProductDetails}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleProductDetails();
          }
        }}
        aria-label={`View ${product.name}`}
      >
        {productImage ? (
          <img
            src={productImage}
            alt={product.name}
            className="all-products-card-image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="all-products-card-image-placeholder">
            <span>No Image</span>
          </div>
        )}

        {/* ======================================
            ACTION ICONS
        ====================================== */}

        <div className="all-products-card-actions">
          {/* Wishlist */}

          <button
            type="button"
            onClick={handleWishlist}
            className={`all-products-card-icon-btn ${
              isWishlisted
                ? "all-products-card-icon-active"
                : ""
            }`}
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={isWishlisted}
          >
            <Heart
              size={18}
              strokeWidth={1.8}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>

          {/* Quick View */}

          <button
            type="button"
            onClick={handleQuickView}
            className="all-products-card-icon-btn"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye size={18} strokeWidth={1.8} />
          </button>

          {/* Share */}

          <button
            type="button"
            onClick={handleShare}
            className="all-products-card-icon-btn"
            aria-label={`Share ${product.name}`}
          >
            <Share2 size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="all-products-card-content">
        {/* Product title */}

        <h3
          className="all-products-card-title"
          onClick={handleProductDetails}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleProductDetails();
            }
          }}
        >
          {product.name}
        </h3>

        {/* Category */}

        <span className="all-products-card-category">
          {typeof product.category === "object"
            ? product.category?.name || "-"
            : product.category || "-"}
        </span>

        {/* ======================================
            RATING
        ====================================== */}

        <div className="all-products-card-rating">
          <i
            className="bi bi-star-fill"
            aria-hidden="true"
          />

          <span>{rating.toFixed(1)}</span>

          <small>({reviewsCount})</small>
        </div>

        {/* ======================================
            FOOTER
        ====================================== */}

        <div className="all-products-card-footer">
          {/* Price */}

          <div className="all-products-card-price-wrapper">
            <strong>
              ₹{rentalPrice.toLocaleString("en-IN")}
            </strong>

            {originalPrice > 0 && (
              <span>
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Booking */}

          <button
            type="button"
            onClick={handleBookNow}
            className="all-products-card-rent-btn"
          >
            Book For Rent
          </button>
        </div>
      </div>
    </article>
  );
};

export default AllProductsProductCard;