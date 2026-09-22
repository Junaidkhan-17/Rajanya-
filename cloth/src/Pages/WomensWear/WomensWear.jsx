import "./WomensWear.css";
import { useEffect } from "react";
//import { WomensWearProvider } from "../../contexts/WomensWearContext";

import WomensWearHeroSection from "../../PagesComponents/WomensWearComponents/WomensWearHeroSection";
import WomensWearSidebarFilters from "../../PagesComponents/WomensWearComponents/WomensWearSidebarFilters";
import WomensWearCategoryStrip from "../../PagesComponents/WomensWearComponents/WomensWearCategoryStrip";

import AllProductsProductCard from "../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsProductCard";
import AllProductsPagination from "../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsPagination";

//import { useWomensWear,WOMENS_WEAR_ACTIONS,} from "../../contexts/WomensWearContext";
import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../contexts/ProductLiveDataContext";

//const WomensWearContent = () => {const {state,dispatch,paginatedProducts,totalPages,} = useWomensWear();
const WomensWearContent = () => {
const {
  state,
  dispatch,
  paginatedProducts,
  totalPages,
} = useProductLiveData();

useEffect(() => {
  dispatch({
    type: PRODUCT_ACTIONS.SET_COLLECTION_TYPE,
    payload: "women",
  });

  return () => {
    dispatch({
      type: PRODUCT_ACTIONS.SET_COLLECTION_TYPE,
      payload: "all",
    });
  };
}, [dispatch]);

console.log("Current Page:", state.currentPage);
console.log("Total Pages:", totalPages);
console.log(
  "Paginated Products:",
  paginatedProducts.length
);


  return (
    <main className="womens-wear-page">

      <WomensWearHeroSection />

      <WomensWearCategoryStrip />

      <div className="container mt-5">
        <div className="row">

          {/* Sidebar */}

          <div className="col-lg-3">
            <WomensWearSidebarFilters />
          </div>

          {/* Products */}

          <div className="col-lg-9">
            <div className="row g-4">

              {paginatedProducts.map(
                (product) => (
                  <div
                    key={product._id}
                    className="col-lg-4 col-md-6"
                  >
                    <AllProductsProductCard
                      product={product}
                    />
                  </div>
                )
              )}

            </div>
            <AllProductsPagination
  state={state}
  dispatch={dispatch}
  totalPages={totalPages}
  actions={PRODUCT_ACTIONS}
/>
          </div>

        </div>
      </div>

    </main>
  );
};
const WomensWear = () => {
  return <WomensWearContent />;
};

export default WomensWear;