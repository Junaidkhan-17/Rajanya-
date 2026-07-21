import "./AllProductsSidebarFilters.css";

import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";

const AllProductsSidebarFilters = () => {
  const { state, dispatch } = useProductLiveData();

  /* ===========================
     PRICE FILTER
  =========================== */

  const handlePriceChange = (e) => {
    dispatch({
      type: PRODUCT_ACTIONS.SET_FILTERS,
      payload: {
        priceRange: [0, Number(e.target.value)],
      },
    });
  };

  /* ===========================
     MATERIAL FILTER
  =========================== */

  const handleMaterialToggle = (material) => {
    const currentMaterials = state.filters.materials;

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

  /* ===========================
     MOST BOOKED OUTFITS
  =========================== */

  const mostBookedProducts = [...state.products]
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 5);

  return (
    <aside className="all-products-sidebar-main">
      {/* ======================
          PRICE FILTER
      ====================== */}

      <div className="all-products-filter-block">
        <h4 className="all-products-filter-title">
          Filter by price
        </h4>

        <input
          type="range"
          min="0"
          max="10000"
          value={state.filters.priceRange[1]}
          onChange={handlePriceChange}
          className="all-products-price-slider"
        />

        <p className="all-products-price-value">
          Price: ${state.filters.priceRange[0]} - $
          {state.filters.priceRange[1]}
        </p>
      </div>

      {/* ======================
          MATERIAL FILTER
      ====================== */}

      <div className="all-products-filter-block">
        <h4 className="all-products-filter-title">
          Filter by material
        </h4>

        <label className="all-products-checkbox-row">
          <input
            type="checkbox"
            checked={state.filters.materials.includes(
              "Cotton"
            )}
            onChange={() =>
              handleMaterialToggle("Cotton")
            }
          />

          <span>Cotton</span>

          <small>
            {
              state.products.filter(
                (product) =>
                  product.material === "Cotton"
              ).length
            }
          </small>
        </label>

        <label className="all-products-checkbox-row">
          <input
            type="checkbox"
            checked={state.filters.materials.includes(
              "Fabric"
            )}
            onChange={() =>
              handleMaterialToggle("Fabric")
            }
          />

          <span>Fabric</span>

          <small>
            {
              state.products.filter(
                (product) =>
                  product.material === "Fabric"
              ).length
            }
          </small>
        </label>

        <label className="all-products-checkbox-row">
          <input
            type="checkbox"
            checked={state.filters.materials.includes(
              "Poly-Cotton"
            )}
            onChange={() =>
              handleMaterialToggle("Poly-Cotton")
            }
          />

          <span>Poly-Cotton</span>

          <small>
            {
              state.products.filter(
                (product) =>
                  product.material === "Poly-Cotton"
              ).length
            }
          </small>
        </label>
      </div>

      {/* ======================
          MOST BOOKED
      ====================== */}

      <div className="all-products-filter-block">
        <h4 className="all-products-filter-title-booked">
          Most Booked Outfits
        </h4>

        {mostBookedProducts.map((product) => (
          <div
            key={product._id}
            className="all-products-booked-item"
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="all-products-booked-image"
            />

            <div className="all-products-booked-content">
              <h5>{product.name}</h5>

              <p>
  $
  {(
    product.rentalOptions?.[0]?.price || 0
  ).toFixed(0)}

  <span>
    $
    {(product.originalPrice || 0).toFixed(0)}
  </span>
</p>
            </div>
          </div>
        ))}
      </div>

      {/* ======================
          CLEAR FILTERS
      ====================== */}

      <button
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