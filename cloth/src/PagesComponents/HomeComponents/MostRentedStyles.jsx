import { useMemo } from "react";
import { motion } from "framer-motion";
import { useProductLiveData } from "../../contexts/ProductLiveDataContext";
import "./MostRentedStyles.css";

/* =========================================================
   SHUFFLE
   ========================================================= */

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

/* =========================================================
   GENDER
   ========================================================= */

const getProductGender = (product) => {
  const gender = String(
    product?.gender || ""
  )
    .trim()
    .toLowerCase();

  if (gender === "women") {
    return "women";
  }

  if (gender === "men") {
    return "men";
  }

  return "";
};

/* =========================================================
   IMAGE
   ========================================================= */

const resolveImageValue = (imageValue) => {
  if (!imageValue) {
    return "";
  }

  /* Direct URL/string */
  if (typeof imageValue === "string") {
    return imageValue.trim();
  }

  /* Object-based image */
  if (typeof imageValue === "object") {
    return (
      imageValue.url ||
      imageValue.secure_url ||
      imageValue.imageUrl ||
      imageValue.src ||
      imageValue.path ||
      ""
    );
  }

  return "";
};

const getProductImage = (product) => {
  /* =====================================================
     1. MAIN IMAGE
     ===================================================== */

  const mainImage = resolveImageValue(
    product?.mainImage
  );

  if (mainImage) {
    return mainImage;
  }

  /* =====================================================
     2. THUMBNAIL IMAGE
     ===================================================== */

  const thumbnailImage = resolveImageValue(
    product?.thumbnailImage
  );

  if (thumbnailImage) {
    return thumbnailImage;
  }

  /* =====================================================
     3. GALLERY IMAGES
     ===================================================== */

  if (
    Array.isArray(product?.galleryImages) &&
    product.galleryImages.length > 0
  ) {
    for (const galleryImage of product.galleryImages) {
      const resolvedGalleryImage =
        resolveImageValue(galleryImage);

      if (resolvedGalleryImage) {
        return resolvedGalleryImage;
      }
    }
  }

  return "";
};

/* =========================================================
   RENTAL PRICE
   ========================================================= */

const getRentalPrice = (product) => {
  if (
    Array.isArray(product?.rentalOptions) &&
    product.rentalOptions.length > 0
  ) {
    const firstOption = product.rentalOptions[0];

    const price =
      typeof firstOption === "object"
        ? firstOption?.price
        : firstOption;

    if (Number(price) > 0) {
      return `₹${Number(price).toLocaleString("en-IN")}`;
    }
  }

  if (Number(product?.rentalPrice) > 0) {
    return `₹${Number(product.rentalPrice).toLocaleString("en-IN")}`;
  }

  if (Number(product?.price) > 0) {
    return `₹${Number(product.price).toLocaleString("en-IN")}`;
  }

  return "Price on request";
};

/* =========================================================
   ORIGINAL PRICE
   ========================================================= */

const getOriginalPrice = (product) => {
  const originalPrice =
    product?.originalPrice ??
    product?.mrp ??
    product?.sellingPrice;

  if (Number(originalPrice) <= 0) {
    return "";
  }

  return `₹${Number(originalPrice).toLocaleString("en-IN")}`;
};

/* =========================================================
   CATEGORY
   ========================================================= */

const getProductCategory = (product) => {
  if (product?.category?.name) {
    return product.category.name;
  }

  if (product?.categoryData?.name) {
    return product.categoryData.name;
  }

  if (typeof product?.category === "string") {
    return product.category;
  }

  if (
    Array.isArray(product?.occasion) &&
    product.occasion.length > 0
  ) {
    const firstOccasion = product.occasion[0];

    if (typeof firstOccasion === "string") {
      return firstOccasion;
    }

    if (firstOccasion?.name) {
      return firstOccasion.name;
    }
  }

  return "Luxury Fashion";
};

/* =========================================================
   PRODUCT CARD
   ========================================================= */

const ProductCard = ({ product, index }) => {
  const image = getProductImage(product);
  const rentalPrice = getRentalPrice(product);
  const originalPrice = getOriginalPrice(product);
  const category = getProductCategory(product);

  return (
    <div className="col-lg-4 col-md-4 col-sm-6">
      <motion.div
        className="most-rented-style-card"
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
        }}
      >
        {/* IMAGE */}
        <div className="most-rented-style-image-wrapper">
          {image ? (
            <img
              src={image}
              alt={
                product?.name ||
                "Rajanya luxury fashion product"
              }
              className="most-rented-style-image"
              loading="lazy"
            />
          ) : (
            <div className="most-rented-style-image-placeholder">
              <span>No Image Available</span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="most-rented-style-content">
          <h3 className="most-rented-style-name">
            {product?.name || "Luxury Fashion"}
          </h3>

          <p className="most-rented-style-category">
            {category}
          </p>

          <div className="most-rented-style-footer">
            <div className="most-rented-style-price-area">
              <span className="most-rented-style-price">
                {rentalPrice}
              </span>

              {originalPrice && (
                <span className="most-rented-style-old-price">
                  {originalPrice}
                </span>
              )}
            </div>

            <button
              type="button"
              className="most-rented-style-book-btn"
            >
              Book For Rent
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const MostRentedStyles = () => {
  const { state } = useProductLiveData();

  const products = Array.isArray(state?.products)
    ? state.products
    : [];

    console.log(
  "🔥 MOST RENTED PRODUCTS:",
  products,
);

console.log(
  "🔥 MOST RENTED FIRST PRODUCT:",
  products[0],
);

console.log("🔥 PRODUCT KEYS:", Object.keys(products[0] || {}));

console.log("🔥 IMAGE DATA:", {
  image: products[0]?.image,
  images: products[0]?.images,
  productImages: products[0]?.productImages,
  imageUrl: products[0]?.imageUrl,
  thumbnail: products[0]?.thumbnail,
  photos: products[0]?.photos,
  media: products[0]?.media,
});

  /* -------------------------------------------------------
     Select exactly 3 random products per gender
     ------------------------------------------------------- */

  const { womenProducts, menProducts } = useMemo(() => {
    const women = products.filter(
      (product) => getProductGender(product) === "women"
    );

    const men = products.filter(
      (product) => getProductGender(product) === "men"
    );

    return {
      womenProducts: shuffleArray(women).slice(0, 3),
      menProducts: shuffleArray(men).slice(0, 3),
    };
  }, [products]);

  return (
    <section className="most-rented-styles-main">
      <div className="container">

        {/* =================================================
            HEADER
            ================================================= */}

        <div className="most-rented-styles-header">
          <div className="most-rented-styles-heading-area">
            <h2 className="most-rented-styles-title">
              <span>Most Rented</span> Styles This Week
            </h2>

            <p className="most-rented-styles-description">
              Discover the outfits everyone is choosing for
              weddings, parties, festivals, and special
              occasions. Rent premium fashion pieces at a
              fraction of the purchase cost and look your best
              for every event.
            </p>
          </div>

          <button
            type="button"
            className="most-rented-styles-see-all-btn"
          >
            <span>See All</span>

            <i
              className="bi bi-arrow-right"
              aria-hidden="true"
            ></i>
          </button>
        </div>

        {/* =================================================
            WOMEN'S WEAR
            ================================================= */}

        {womenProducts.length > 0 && (
          <div className="most-rented-gender-section">
            <div className="most-rented-gender-heading">
              <span className="most-rented-gender-line"></span>

              <h3>Women's Wear</h3>

              <span className="most-rented-gender-line"></span>
            </div>

            <div className="row g-4">
              {womenProducts.map((product, index) => (
                <ProductCard
                  key={product?._id || product?.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* =================================================
            MEN'S WEAR
            ================================================= */}

        {menProducts.length > 0 && (
          <div className="most-rented-gender-section most-rented-men-section">
            <div className="most-rented-gender-heading">
              <span className="most-rented-gender-line"></span>

              <h3>Men's Wear</h3>

              <span className="most-rented-gender-line"></span>
            </div>

            <div className="row g-4">
              {menProducts.map((product, index) => (
                <ProductCard
                  key={product?._id || product?.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
            ================================================= */}

        {womenProducts.length === 0 &&
          menProducts.length === 0 && (
            <div className="most-rented-styles-empty-state">
              <p>
                Luxury styles will appear here soon.
              </p>
            </div>
          )}
      </div>
    </section>
  );
};

export default MostRentedStyles;