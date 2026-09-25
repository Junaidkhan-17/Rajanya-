import "./ProductDetailsInfoSection.css";

import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

const ProductDetailsInfoSection = ({ product }) => {
  return (
    <div className="product-details-info-section">
      {/* Breadcrumb */}
      <div className="product-details-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/collection">All Products</Link>
        <span>›</span>
        <Link to="/collection">{product.category}</Link>
        <span>›</span>
        <span className="active-product">
          {product.name}
        </span>
      </div>

      {/* Category */}
      <div className="product-details-category">
        {product.category} Collection
      </div>

      {/* Product Name */}
      <h1 className="product-details-title">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="product-details-rating">
        <div className="product-details-stars">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>

        <span className="product-details-rating-text">
          ({product.rating} Stars /{" "}
          {product.reviewsCount} Reviews)
        </span>
      </div>

      {/* Description */}
      <p className="product-details-description">
        {product.description}
      </p>
    </div>
  );
};

export default ProductDetailsInfoSection;