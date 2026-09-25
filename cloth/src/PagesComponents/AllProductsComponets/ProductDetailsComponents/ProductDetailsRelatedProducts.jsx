import "./ProductDetailsRelatedProducts.css";

import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

import { useProductLiveData } from "../../../contexts/ProductLiveDataContext";

import AllProductsProductCard from "../AllProductsCatalogSection/AllProductsProductCard";

const ProductDetailsRelatedProducts = ({ currentProduct }) => {
  const navigate = useNavigate();

  const { state } = useProductLiveData();

  const relatedProducts = useMemo(() => {
    const sameCategory = state.products.filter(
      (product) =>
        product._id !== currentProduct._id &&
        product.category === currentProduct.category &&
        product.collectionType === currentProduct.collectionType,
    );

    const fallbackProducts = state.products.filter(
      (product) =>
        product._id !== currentProduct._id &&
        product.collectionType === currentProduct.collectionType,
    );

    const products =
      sameCategory.length >= 8 ? sameCategory : fallbackProducts;

    return products.slice(0, 12);
  }, [state.products, currentProduct]);

  if (!relatedProducts.length) {
    return null;
  }

  return (
    <section className="related-products-section">
      <div className="container">
        <div className="related-products-header">
          <div className="related-products-heading-wrapper">
            <span className="related-products-label">
              CURATED RECOMMENDATIONS
            </span>

            <h2>You May Also Like</h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/collection")}
            className="related-products-view-all-btn"
          >
            View All Products
          </button>
        </div>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1.15,
              spaceBetween: 14,
            },

            375: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },

            576: {
              slidesPerView: 2,
              spaceBetween: 18,
            },

            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },

            992: {
              slidesPerView: 3,
              spaceBetween: 22,
            },

            1200: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <AllProductsProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductDetailsRelatedProducts;