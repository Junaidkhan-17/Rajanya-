import "./AllProductsSortBar.css";
import { motion } from "framer-motion";
import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";

import { allProductsCategoriesData } from "../AllProductsHeroData";

const AllProductsSortBar = () => {
  const {
    state,
    sortedProducts,
  } = useProductLiveData();

  const { dispatch } = useProductLiveData();

  const handleSortChange = (event) => {
    dispatch({
      type: PRODUCT_ACTIONS.SET_SORT,
      payload: event.target.value,
    });
  };

  return (
    <div className="all-products-sortbar-main">
      {/* Product Count */}

      <div className="all-products-sortbar-results">
        <span>
          Showing{" "}
          <strong>{sortedProducts.length}</strong>{" "}
          Products
        </span>
      </div>

      {/* Sorting */}

      <div className="all-products-sortbar-right">
        <label
          htmlFor="all-products-sort"
          className="all-products-sortbar-label-sort"
        >
          Sort By:
        </label>

        <select
          id="all-products-sort"
          value={state.sortBy}
          onChange={handleSortChange}
          className="all-products-sortbar-select"
        >
          <option value="default">
            Default Sorting
          </option>

          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="popular">
            Popular
          </option>

          <option value="featured">
            Featured
          </option>

          <option value="priceLowToHigh">
            Price: Low To High
          </option>

          <option value="priceHighToLow">
            Price: High To Low
          </option>

          <option value="highestRated">
            Highest Rated
          </option>
        </select>
      </div>
    </div>
  );
};

export default AllProductsSortBar;