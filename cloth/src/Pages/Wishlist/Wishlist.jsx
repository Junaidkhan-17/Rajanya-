import "./Wishlist.css";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@animateicons/react/lucide";

import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../contexts/ProductLiveDataContext";

const Wishlist = () => {
  const navigate = useNavigate();

  const { dispatch, wishlistProducts } = useProductLiveData();

  const [sortBy, setSortBy] = useState("default");

  /* ===========================
      REMOVE FROM WISHLIST
  =========================== */

  const handleRemove = (e, productId) => {
    e.stopPropagation();

    dispatch({
      type: PRODUCT_ACTIONS.REMOVE_FROM_WISHLIST,
      payload: productId,
    });
  };

  /* ===========================
      PRODUCT DETAILS
  =========================== */

  const handleProductDetails = (product) => {
    dispatch({
      type: PRODUCT_ACTIONS.ADD_TO_RECENTLY_VIEWED,
      payload: product._id,
    });

    navigate(`/products/${product.slug}`);
  };

  /* ===========================
      SORTING
  =========================== */
  const sortedWishlistProducts = useMemo(() => {
    const products = [...wishlistProducts];

    switch (sortBy) {
      case "newest":
        return [...products].reverse();

      case "priceLowToHigh":
        return products.sort(
          (a, b) =>
            (a.rentalOptions?.[0]?.price || 0) -
            (b.rentalOptions?.[0]?.price || 0),
        );

      case "priceHighToLow":
        return products.sort(
          (a, b) =>
            (b.rentalOptions?.[0]?.price || 0) -
            (a.rentalOptions?.[0]?.price || 0),
        );

      case "highestRated":
        return products.sort((a, b) => b.rating - a.rating);

      default:
        return products;
    }
  }, [wishlistProducts, sortBy]);

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        {/* Header */}

        <div className="wishlist-header">
          <div>
            <h2>My Wishlist</h2>
            <p>Your favorite style, saved just for you</p>
          </div>

          <button className="wishlist-close-btn" onClick={() => navigate(-1)}>
            <XIcon size={27} duration={1} color="#000000ff" />
          </button>
        </div>

        {/* Top Bar */}

        <div className="wishlist-top-bar">
          <h3>MY FAVORITE</h3>

          <select
            className="wishlist-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default sorting</option>

            <option value="newest">Newest</option>

            <option value="priceLowToHigh">Price Low To High</option>

            <option value="priceHighToLow">Price High To Low</option>

            <option value="highestRated">Highest Rated</option>
          </select>
        </div>

        {/* Product Grid */}

        {/* Product Grid */}

        {wishlistProducts.length === 0 ? (
          <div className="wishlist-empty">
            <i className="bi bi-heart"></i>

            <h3>Your Wishlist Is Empty</h3>

            <p>
              Start exploring our luxury collection and save your favorite
              outfits.
            </p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {sortedWishlistProducts.map((product) => (
              <div className="wishlist-card" key={product._id}>
                {/* IMAGE */}

                <div
                  className="wishlist-card-image"
                  onClick={() => handleProductDetails(product)}
                >
                  <img src={product.images?.[0]} alt={product.name} />

                  <button
                    className="wishlist-heart-btn"
                    onClick={(e) => handleRemove(e, product._id)}
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                </div>

                {/* CONTENT */}

                <div className="wishlist-card-content">
                  <h4>{product.name.toUpperCase()}</h4>

                  <span>{product.category.toUpperCase()}</span>

                  <div className="wishlist-card-footer">
                    <div className="wishlist-price">
                      <strong>₹{product.rentalOptions?.[0]?.price || 0}</strong>

                      <small>₹{product.originalPrice}</small>
                    </div>

                    <button
                      className="wishlist-rent-btn"
                      onClick={() => handleProductDetails(product)}
                    >
                      Book For Rent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
