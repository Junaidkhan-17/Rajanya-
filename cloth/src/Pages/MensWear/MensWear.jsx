import "./MensWear.css";

import { MensWearProvider } from "../../contexts/MensWearContext";

import MensWearHeroSection from "../../PagesComponents/MensWearComponents/MensWearHeroSection";
import MensWearSidebarFilters from "../../PagesComponents/MensWearComponents/MensWearSidebarFilters";
import AllProductsProductCard from "../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsProductCard";
import MensWearCategoryStrip from "../../PagesComponents/MensWearComponents/MensWearCategoryStrip";
import AllProductsPagination from "../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsPagination";

import { useMensWear, MENS_WEAR_ACTIONS } from "../../contexts/MensWearContext";

const MensWearContent = () => {
  const { state, dispatch, paginatedProducts, totalPages } = useMensWear();
  return (
    <main className="mens-wear-page">
      <MensWearHeroSection />

      <MensWearCategoryStrip />

      <div className="container mt-5">
        <div className="row">
          {/* Sidebar */}

          <div className="col-lg-3">
            <MensWearSidebarFilters />
          </div>

          {/* Products */}

          <div className="col-lg-9">
            <div className="row g-4">
              {paginatedProducts.map((product) => (
                <div key={product._id} className="col-lg-4 col-md-6">
                  <AllProductsProductCard product={product} />
                </div>
              ))}
            </div>
            <AllProductsPagination
              state={state}
              dispatch={dispatch}
              totalPages={totalPages}
              actions={MENS_WEAR_ACTIONS}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

const MensWear = () => {
  return (
    <MensWearProvider>
      <MensWearContent />
    </MensWearProvider>
  );
};

export default MensWear;
