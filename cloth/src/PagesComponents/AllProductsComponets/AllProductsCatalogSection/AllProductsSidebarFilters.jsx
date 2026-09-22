import { useEffect, useMemo } from "react";

import "./AllProductsSidebarFilters.css";

import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";

const AllProductsSidebarFilters = () => {
  const { state, dispatch, maxRentalPrice, } = useProductLiveData();


  /*
   * Keep the Context price range synchronized with
   * the real maximum product rental price.
   *
   * This removes the old hardcoded ₹10,000 limitation.
   */
  useEffect(() => {
    if (!state.products.length) {
      return;
    }

    const currentMax = Number(state.filters.priceRange?.[1]);

    if (!Number.isFinite(currentMax) || currentMax !== maxRentalPrice) {
      dispatch({
        type: PRODUCT_ACTIONS.SET_FILTERS,
        payload: {
          priceRange: [0, maxRentalPrice],
        },
      });
    }
  }, [state.products, state.filters.priceRange, maxRentalPrice, dispatch]);

  /* ==================================================
     PRICE FILTER
  ================================================== */

  const handlePriceChange = (event) => {
    const selectedPrice = Number(event.target.value);

    dispatch({
      type: PRODUCT_ACTIONS.SET_FILTERS,
      payload: {
        priceRange: [0, selectedPrice],
      },
    });
  };

  /* ==================================================
     MATERIAL FILTER
  ================================================== */

  const materialOptions = useMemo(() => {
    const materialMap = new Map();

    state.products.forEach((product) => {
      const material = String(product?.material || "").trim();

      if (!material) {
        return;
      }

      materialMap.set(material, (materialMap.get(material) || 0) + 1);
    });

    return Array.from(materialMap.entries())
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [state.products]);

  const handleMaterialToggle = (material) => {
    const currentMaterials = state.filters.materials || [];

    const updatedMaterials = currentMaterials.includes(material)
      ? currentMaterials.filter((item) => item !== material)
      : [...currentMaterials, material];

    dispatch({
      type: PRODUCT_ACTIONS.SET_FILTERS,
      payload: {
        materials: updatedMaterials,
      },
    });
  };

  /* ==================================================
     MOST BOOKED OUTFITS
  ================================================== */

  const mostBookedProducts = useMemo(() => {
    return [...state.products]
      .sort(
        (a, b) =>
          (Number(b?.bookingCount) || 0) - (Number(a?.bookingCount) || 0),
      )
      .slice(0, 5);
  }, [state.products]);

  /* ==================================================
     IMAGE HELPER
  ================================================== */

  const getProductImage = (product) => {
    return (
      product?.mainImage ||
      product?.thumbnailImage ||
      product?.galleryImages?.[0] ||
      product?.images?.[0] ||
      ""
    );
  };

  /* ==================================================
     PRICE FORMATTER
  ================================================== */

  const formatPrice = (value) => {
    const numericValue = Number(value) || 0;

    return numericValue.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  /* ==================================================
     CURRENT PRICE
  ================================================== */

  const currentPrice = Number(state.filters.priceRange?.[1]) || maxRentalPrice;

  return (
    <aside className="all-products-sidebar-main">
      {/* ==================================================
          PRICE FILTER
      ================================================== */}

      <div className="all-products-filter-block all-products-price-filter-block">
        <h4 className="all-products-filter-title">Filter by price</h4>

        <div className="all-products-price-slider-wrapper">
          <input
  type="range"
  min="0"
  max={maxRentalPrice}
  value={state.filters.priceRange[1]}
  onChange={(e) =>
    dispatch({
      type: PRODUCT_ACTIONS.SET_FILTERS,
      payload: {
        priceRange: [
          state.filters.priceRange[0],
          Number(e.target.value),
        ],
      },
    })
  }
  className="all-products-price-slider"
/>

          <div className="all-products-price-range-labels">
            <span>₹0</span>

            <span>₹{formatPrice(maxRentalPrice)}</span>
          </div>
        </div>

        <p className="all-products-price-value">
          Price: ₹0 - ₹{formatPrice(currentPrice)}
        </p>
      </div>

      {/* ==================================================
          MATERIAL FILTER
      ================================================== */}

      <div className="all-products-filter-block all-products-material-filter-block">
        <h4 className="all-products-filter-title">Filter by material</h4>

        {materialOptions.length > 0 ? (
          <div className="all-products-material-list">
            {materialOptions.map((material) => {
              const isSelected = state.filters.materials.includes(
                material.name,
              );

              return (
                <label
                  key={material.name}
                  className={`all-products-checkbox-row ${
                    isSelected ? "all-products-checkbox-row-active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleMaterialToggle(material.name)}
                  />

                  <span>{material.name}</span>

                  <small>{material.count}</small>
                </label>
              );
            })}
          </div>
        ) : (
          <p className="all-products-filter-empty">
            No material data available.
          </p>
        )}
      </div>

      {/* ==================================================
          MOST BOOKED OUTFITS
      ================================================== */}

      <div className="all-products-filter-block all-products-most-booked-block">
        <h4 className="all-products-filter-title-booked">
          Most Booked Outfits
        </h4>

        {mostBookedProducts.length > 0 ? (
          <div className="all-products-booked-list">
            {mostBookedProducts.map((product) => {
              const productImage = getProductImage(product);

              const rentalPrice =
                Number(product?.rentalOptions?.[0]?.price) || 0;

              const originalPrice = Number(product?.originalPrice) || 0;

              return (
                <div key={product._id} className="all-products-booked-item">
                  <div className="all-products-booked-image-wrapper">
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={product.name}
                        className="all-products-booked-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="all-products-booked-image-placeholder">
                        <span>
                          {product?.name?.charAt(0)?.toUpperCase() || "R"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="all-products-booked-content">
                    <h5>{product.name}</h5>

                    <p>
                      ₹{formatPrice(rentalPrice)}
                      {originalPrice > rentalPrice && (
                        <span>₹{formatPrice(originalPrice)}</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="all-products-filter-empty">No products available.</p>
        )}
      </div>

      {/* ==================================================
          CLEAR FILTERS
      ================================================== */}

      <button
        type="button"
        className="all-products-clear-filter-btn"
        onClick={() =>
          dispatch({
            type: PRODUCT_ACTIONS.CLEAR_FILTERS,
          })
        }
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default AllProductsSidebarFilters;
