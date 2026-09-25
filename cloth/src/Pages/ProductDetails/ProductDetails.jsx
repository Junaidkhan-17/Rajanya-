import "./ProductDetails.css";

import { useParams } from "react-router-dom";

import { useProductLiveData } from "../../contexts/ProductLiveDataContext";

//import { useMensWear } from "../../contexts/MensWearContext";

//import { useWomensWear } from "../../contexts/WomensWearContext";

import ProductDetailsTopSection from "../../PagesComponents/AllProductsComponets/ProductDetailsComponents/ProductDetailsTopSection";
import ProductDetailsTabsSection from "../../PagesComponents/AllProductsComponets/ProductDetailsComponents/ProductDetailsTabsSection";
import ProductDetailsRelatedProducts from "../../PagesComponents/AllProductsComponets/ProductDetailsComponents/ProductDetailsRelatedProducts";
import WhyChooseRajanyaSection from "../../PagesComponents/AllProductsComponets/ProductDetailsComponents/WhyChooseRajanyaSection";

const ProductDetails = () => {
  const { slug } = useParams();

  const { getProductBySlug } = useProductLiveData();
  /*
const {
  getProductBySlug: getMensProductBySlug,
} = useMensWear();

const {
  getProductBySlug: getWomensProductBySlug,
} = useWomensWear();
*/
  const product = getProductBySlug(slug);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <div className="product-details-page">
      <ProductDetailsTopSection product={product} />

      <ProductDetailsTabsSection product={product} />

      <ProductDetailsRelatedProducts currentProduct={product} />

      <WhyChooseRajanyaSection />
    </div>
  );
};

export default ProductDetails;
