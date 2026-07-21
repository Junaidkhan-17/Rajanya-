import "./MensWearSidebarFilters.css";

import {
  useMensWear,
  MENS_WEAR_ACTIONS,
} from "../../contexts/MensWearContext";

const MensWearSidebarFilters = () => {
  const { state, dispatch } =
    useMensWear();

  /* ===========================
     PRICE FILTER
  =========================== */

  const handlePriceChange = (e) => {
    dispatch({
      type: MENS_WEAR_ACTIONS.SET_FILTERS,
      payload: {
        priceRange: [0, Number(e.target.value)],
      },
    });
  };

  /* ===========================
     MATERIAL FILTER
  =========================== */

  const handleMaterialToggle = (
    material
  ) => {
    const currentMaterials =
      state.filters.materials;

    const updatedMaterials =
      currentMaterials.includes(material)
        ? currentMaterials.filter(
            (item) => item !== material
          )
        : [
            ...currentMaterials,
            material,
          ];

    dispatch({
      type: MENS_WEAR_ACTIONS.SET_FILTERS,
      payload: {
        materials: updatedMaterials,
      },
    });
  };

  /* ===========================
     MOST BOOKED PRODUCTS
  =========================== */

  const mostBookedProducts = [
    ...state.products,
  ]
    .sort(
      (a, b) =>
        b.bookingCount -
        a.bookingCount
    )
    .slice(0, 5);

  return (
    <aside className="mens-sidebar-main">
      {/* PRICE */}

      <div className="mens-filter-block">
        <h4 className="mens-filter-title">
          Filter by Price
        </h4>

        <input
          type="range"
          min="0"
          max="10000"
          value={
            state.filters.priceRange[1]
          }
          onChange={handlePriceChange}
          className="mens-price-slider"
        />

        <p className="mens-price-value">
          ₹
          {
            state.filters.priceRange[0]
          }{" "}
          - ₹
          {
            state.filters.priceRange[1]
          }
        </p>
      </div>

      {/* MATERIAL */}

      <div className="mens-filter-block">
        <h4 className="mens-filter-title">
          Filter by Material
        </h4>

        {[
          "Silk",
          "Velvet",
          "Poly-Cotton",
        ].map((material) => (
          <label
            key={material}
            className="mens-checkbox-row"
          >
            <input
              type="checkbox"
              checked={state.filters.materials.includes(
                material
              )}
              onChange={() =>
                handleMaterialToggle(
                  material
                )
              }
            />

            <span>{material}</span>

            <small>
              {
                state.products.filter(
                  (product) =>
                    product.material ===
                    material
                ).length
              }
            </small>
          </label>
        ))}
      </div>

      {/* MOST BOOKED */}

      <div className="mens-filter-block">
        <h4 className="mens-filter-title">
          Most Booked Outfits
        </h4>

        {mostBookedProducts.map(
          (product) => (
            <div
              key={product._id}
              className="mens-booked-item"
            >
              <img
                src={
                  product.images?.[0]
                }
                alt={product.name}
                className="mens-booked-image"
              />

              <div className="mens-booked-content">
                <h5>
                  {product.name}
                </h5>

                <p>
                  ₹
                  {product
                    .rentalOptions?.[0]
                    ?.price || 0}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* CLEAR FILTERS */}

      <button
        className="mens-clear-filter-btn"
        onClick={() =>
          dispatch({
            type: MENS_WEAR_ACTIONS.CLEAR_FILTERS,
          })
        }
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default MensWearSidebarFilters;