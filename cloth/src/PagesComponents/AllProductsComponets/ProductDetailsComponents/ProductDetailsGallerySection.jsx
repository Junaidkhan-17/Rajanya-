import "./ProductDetailsGallerySection.css";

import { useEffect, useState } from "react";


const ProductDetailsGallerySection = ({
  product,
}) => {

  const images =
  product?.images || [];

  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (images.length) {
      setActiveImage(images[0]);
    }
  }, [images]);

  if (!product) {
    return null;
  }

  return (
    <div className="product-details-gallery">

      <div className="product-details-main-image">

        <img
          src={activeImage}
          alt={product.name}
        />

      </div>

      <div className="product-details-thumbnails">

        {images.map((image, index) => (
          <button
            key={index}
            className={`product-details-thumbnail ${
              activeImage === image
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveImage(image)
            }
          >
            <img
              src={image}
              alt={`${product.name}-${index}`}
            />
          </button>
        ))}

      </div>

    </div>
  );
};

export default ProductDetailsGallerySection;