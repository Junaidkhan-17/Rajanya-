import "./ProductDetailsGallerySection.css";

import { useEffect, useMemo, useState } from "react";

const ProductDetailsGallerySection = ({ product }) => {
  // ========================================
  // Build Gallery Images
  // ========================================

  const images = useMemo(() => {
    if (!product) return [];

    const productImages = Array.isArray(product.images) ? product.images : [];

    const galleryImages = Array.isArray(product.galleryImages)
      ? product.galleryImages
      : [];

    return [
      product.mainImage,
      product.thumbnailImage,
      ...productImages,
      ...galleryImages,
    ].filter(
      (image, index, array) => Boolean(image) && array.indexOf(image) === index,
    );
  }, [product]);

  // ========================================
  // Active Image
  // ========================================

  const [activeImage, setActiveImage] = useState("");

  // ========================================
  // Set First Valid Image
  // ========================================

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0]);
    } else {
      setActiveImage("");
    }
  }, [images]);

  // ========================================
  // Product Validation
  // ========================================

  if (!product) {
    return null;
  }

  return (
    <div className="product-details-gallery">
      {/* ========================================
          Main Image
          ======================================== */}

      <div className="product-details-main-image">
        {activeImage ? (
          <img src={activeImage} alt={product.name || "Product"} />
        ) : (
          <div className="product-details-image-placeholder">
            <span>No image available</span>
          </div>
        )}
      </div>

      {/* ========================================
          Thumbnails
          ======================================== */}

      {images.length > 0 && (
        <div className="product-details-thumbnails">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`product-details-thumbnail ${
                activeImage === image ? "active" : ""
              }`}
              onClick={() => setActiveImage(image)}
            >
              <img
                src={image}
                alt={`${product.name || "Product"}-${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailsGallerySection;
