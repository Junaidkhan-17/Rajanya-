import "./WomensWearSidebarFilters.css";

import {
  useWomensWear,
  WOMENS_WEAR_ACTIONS,
} from "../../contexts/WomensWearContext";

const WomensWearSidebarFilters = () => {
  const { state, dispatch } =
    useWomensWear();

  /* ===========================
     PRICE FILTER
  =========================== */

  const handlePriceChange = (e) => {
    dispatch({
      type: WOMENS_WEAR_ACTIONS.SET_FILTERS,
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
      type: WOMENS_WEAR_ACTIONS.SET_FILTERS,
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
    <aside className="womens-sidebar-main">
      {/* PRICE */}

      <div className="womens-filter-block">
        <h4 className="womens-filter-title">
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
          className="womens-price-slider"
        />

        <p className="womens-price-value">
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

      <div className="womens-filter-block">
        <h4 className="womens-filter-title">
          Filter by Material
        </h4>

        {[
          "Silk",
          "Velvet",
          "Poly-Cotton",
        ].map((material) => (
          <label
            key={material}
            className="womens-checkbox-row"
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

      <div className="womens-filter-block">
        <h4 className="womens-filter-title">
          Most Booked Outfits
        </h4>

        {mostBookedProducts.map(
          (product) => (
            <div
              key={product._id}
              className="womens-booked-item"
            >
              <img
                src={
                  product.images?.[0]
                }
                alt={product.name}
                className="womens-booked-image"
              />

              <div className="womens-booked-content">
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
        className="womens-clear-filter-btn"
        onClick={() =>
          dispatch({
            type: WOMENS_WEAR_ACTIONS.CLEAR_FILTERS,
          })
        }
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default WomensWearSidebarFilters;