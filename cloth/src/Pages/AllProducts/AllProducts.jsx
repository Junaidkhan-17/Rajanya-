import "./AllProducts.css";

/* Hero Section */
import AllProductsHeroSection from "../../PagesComponents/AllProductsComponets/AllProductsHeroSection";
import AllProductsCatalogSection from "../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsCatalogSection";
import AllProductsCategoryStrip from "../../PagesComponents/AllProductsComponets/AllProductsCatalogSection/AllProductsCategoryStrip";
/* Product Listing */
//mport AllProductsFilterSection from "../../PagesComponents/AllProductsComponents/AllProductsFilterSection";
//import AllProductsGridSection from "../../PagesComponents/AllProductsComponents/AllProductsGridSection";

/* Future Sections */
//import AllProductsPagination from "../../PagesComponents/AllProductsComponents/AllProductsPagination";
//import RecentlyViewedProducts from "../../PagesComponents/AllProductsComponents/RecentlyViewedProducts";
//import RecommendedProducts from "../../PagesComponents/AllProductsComponents/RecommendedProducts";
//import ProductNewsletterBanner from "../../PagesComponents/AllProductsComponents/ProductNewsletterBanner";

const AllProducts = () => {
  return (
    <main className="all-products-page-main">

      {/* Hero Banner */}
      <AllProductsHeroSection />
      {/* Search + Filters + Sorting */}
      <AllProductsCatalogSection />

      {/* Product Grid 
      <AllProductsGridSection />
*/}
      {/* Pagination 
      <AllProductsPagination />
*/}
      {/* AI Recommendations
      <RecommendedProducts />
 */}
      {/* Recently Viewed 
      <RecentlyViewedProducts />
*/}
      {/* Newsletter 
      <ProductNewsletterBanner />
*/}
    </main>
  );
};

export default AllProducts;