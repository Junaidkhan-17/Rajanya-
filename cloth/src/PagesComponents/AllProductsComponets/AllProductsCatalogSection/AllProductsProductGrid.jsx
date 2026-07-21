import "./AllProductsProductGrid.css";

import { motion } from "framer-motion";

import { useProductLiveData } from "../../../contexts/ProductLiveDataContext";

import AllProductsProductCard from "./AllProductsProductCard";

const AllProductsProductGrid = () => {
  const {
    paginatedProducts,
    sortedProducts,
    state,
  } = useProductLiveData();

  /* ==========================================
     EMPTY STATE
  ========================================== */

  if (!paginatedProducts.length) {
    return (
      <div className="all-products-empty-state">
        <div className="all-products-empty-icon">
          <i className="bi bi-search"></i>
        </div>

        <h3>No Products Found</h3>

        <p>
          No products match your current search,
          filters, or sorting criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="all-products-grid-wrapper">
      {/* Product Count */}
{/*}
      <div className="all-products-grid-top-info">
        <span>
          Showing{" "}
          <strong>
            {paginatedProducts.length}
          </strong>{" "}
          of{" "}
          <strong>
            {sortedProducts.length}
          </strong>{" "}
          products
        </span>
      </div>
*/}
      {/* Products Grid */}

      <div className="row g-4">
        {paginatedProducts.map(
          (product, index) => (
            <motion.div
              key={product._id}
              className="col-xl-4 col-lg-6 col-md-6 col-sm-6"
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <AllProductsProductCard
                product={product}
              />
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default AllProductsProductGrid;