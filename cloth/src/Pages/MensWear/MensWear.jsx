import "./MensWear.css";

import { MensWearProvider } from "../../contexts/MensWearContext";

import MensWearHeroSection from "../../PagesComponents/MensWearComponents/MensWearHeroSection";
import MensWearSidebarFilters from "../../PagesComponents/MensWearComponents/MensWearSidebarFilters";

import AllProductsProductCard from "../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsProductCard";

import MensWearCategoryStrip from "../../PagesComponents/MensWearComponents/MensWearCategoryStrip";

import AllProductsPagination from "../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsPagination";

import {
  useMensWear,
  MENS_WEAR_ACTIONS,
} from "../../contexts/MensWearContext";

const MensWearContent = () => {
  const {
    state,
    dispatch,
    paginatedProducts,
    totalPages,
  } = useMensWear();

  const products = paginatedProducts || [];

  return (
    <main className="mens-wear-page">
      <MensWearHeroSection />

      <MensWearCategoryStrip />

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <MensWearSidebarFilters />
          </div>

          <div className="col-lg-9">
            {state?.loading ? (
              <div className="text-center py-5">
                <p className="text-muted mb-0">
                  Loading Men's Wear products...
                </p>
              </div>
            ) : state?.error ? (
              <div className="text-center py-5">
                <p className="text-danger mb-0">
                  {state.error}
                </p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="row g-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="col-lg-4 col-md-6"
                    >
                      <AllProductsProductCard
                        product={product}
                      />
                    </div>
                  ))}
                </div>

                <AllProductsPagination
                  state={state}
                  dispatch={dispatch}
                  totalPages={totalPages}
                  actions={MENS_WEAR_ACTIONS}
                />
              </>
            ) : (
              <div className="text-center py-5">
                <p className="text-muted mb-0">
                  No Men's Wear products found.
                </p>
              </div>
            )}
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