import "./AllProductsCatalogSection.css";

import { motion } from "framer-motion";

import AllProductsSidebarFilters from "./AllProductsSidebarFilters";
import AllProductsSortBar from "./AllProductsSortBar";
import AllProductsProductGrid from "./AllProductsProductGrid";
import AllProductsPagination from "./AllProductsPagination";
import AllProductsCategoryStrip from "../../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsCategoryStrip";
import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";

const AllProductsCatalogSection = () => {
  const {
    state,
    dispatch,
    totalPages,
  } = useProductLiveData();
  return (
    <section className="all-products-catalog-main">
      <div className="container-fluid">
        <div className="row all-products-catalog-row">
          {/* ==========================================
              LEFT SIDEBAR
          ========================================== */}
          <AllProductsCategoryStrip />
          <motion.div
            className="col-xl-3 col-lg-4"
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="all-products-catalog-sidebar">
              <AllProductsSidebarFilters />
            </div>
          </motion.div>

          {/* ==========================================
              PRODUCT AREA
          ========================================== */}

          <motion.div
            className="col-xl-9 col-lg-8"
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
              duration: 0.6,
            }}
          >
            <div className="all-products-catalog-content">
              {/* Sort Bar */}

              <AllProductsSortBar />

              {/* Product Grid */}

              <AllProductsProductGrid />

              {/* Pagination */}

              <AllProductsPagination
  state={state}
  dispatch={dispatch}
  totalPages={totalPages}
  actions={PRODUCT_ACTIONS}
/>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AllProductsCatalogSection;