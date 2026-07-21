import "./ProductDetailsTopSection.css";
import { useState } from "react";
import ProductDetailsGallerySection from "./ProductDetailsGallerySection";
import ProductDetailsInfoSection from "./ProductDetailsInfoSection";
import ProductDetailsPricingSection from "./ProductDetailsPricingSection";
import ProductDetailsRentalSection from "./ProductDetailsRentalSection";
import ProductDetailsVariantsSection from "./ProductDetailsVariantsSection";
import ProductDetailsActionsSection from "./ProductDetailsActionsSection";
import RentalIncludesCard from "./RentalIncludesCard";
//import ProductDetailsTabsSection from "./ProductDetailsTabsSection";

const ProductDetailsTopSection = ({ product }) => {
  console.log("PRODUCT OBJECT =>", product);
  const [selectedRentalOption, setSelectedRentalOption] = useState(
    product.rentalOptions?.[0] || null,
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const bookingPayload = {
    product,

    productId: product._id,

    productName: product.name,

    selectedSize,

    rentalDuration: selectedRentalOption?.days,

    rentalPrice: selectedRentalOption?.price,

    securityDeposit: product.securityDeposit,

    startDate: "",

    returnDate: "",
  };

  return (
    <section className="product-details-top-section">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <ProductDetailsGallerySection product={product} />
          </div>

          <div className="col-lg-6">
            <div className="product-details-right-content">
              <ProductDetailsInfoSection product={product} />

              <ProductDetailsRentalSection
                product={product}
                selectedRentalOption={selectedRentalOption}
                setSelectedRentalOption={setSelectedRentalOption}
              />
              <ProductDetailsPricingSection
                product={product}
                selectedRentalOption={selectedRentalOption}
              />

              <ProductDetailsVariantsSection
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />

              <ProductDetailsActionsSection
                product={product}
                bookingPayload={bookingPayload}
              />

              <RentalIncludesCard product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsTopSection;
