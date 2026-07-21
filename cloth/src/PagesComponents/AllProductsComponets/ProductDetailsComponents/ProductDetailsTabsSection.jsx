import "./ProductDetailsTabsSection.css";
import { Star } from "lucide-react";

import { useState, useMemo } from "react";

import { useForm } from "react-hook-form";
import reviewService from "../../../services/reviewService";
import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetailsTabsSection = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  const { state, dispatch } = useProductLiveData();

  const [selectedRating, setSelectedRating] = useState(5);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const productReviews = useMemo(() => {
    const contextReviews = state.reviews.filter(
      (review) => review.productId === product._id,
    );

    const originalReviews = product.reviews || [];

    return [...contextReviews, ...originalReviews].sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
    );
  }, [state.reviews, product]);

  const handleReviewSubmit = async (data) => {
    const imageFile = data.image?.[0] || null;

    /* ==========================
     REVIEW OBJECT
  ========================== */

    const newReview = {
      id: Date.now(),

      productId: product._id,

      customerName: data.customerName,

      email: data.email,

      image: imageFile,

      title: data.title,

      review: data.review,

      rating: selectedRating,

      date: new Date().toLocaleDateString(),

      createdAt: new Date().toISOString(),
    };

    /* ==========================
   SERVICE LAYER
========================== */

    await reviewService.createReview(newReview);

    console.log(newReview);

    /* ==========================
   CONTEXT API
========================== */

    dispatch({
      type: PRODUCT_ACTIONS.ADD_REVIEW,

      payload: newReview,
    });

    reset();

    setSelectedRating(5);
  };

  const tabs = [
    {
      id: "description",
      label: "DESCRIPTION",
    },
    {
      id: "fabric",
      label: "FABRIC & CARE",
    },
    {
      id: "reviews",
      label: `REVIEWS (${productReviews.length})`,
    },
  ];

  return (
    <section className="product-tabs-section">
      <div className="product-tabs-container">
        {/* ==========================
            TAB NAVIGATION
        ========================== */}

        <div className="product-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`product-tab-btn ${
                activeTab === tab.id ? "product-tab-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ==========================
            TAB CONTENT
        ========================== */}

        <AnimatePresence mode="wait">
          {/* DESCRIPTION */}

          {activeTab === "description" && (
            <motion.div
              key="description"
              className="product-tab-content"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
            >
              <h3 className="product-description-title">
                "{product?.productDescription?.title}"
              </h3>

              <div className="product-description-wrapper">
                <ul className="product-description-list">
                  {product?.productDescription?.content?.map((item, index) => (
                    <li key={index} className="product-description-text">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* FABRIC & CARE */}

          {activeTab === "fabric" && (
            <motion.div
              key="fabric"
              className="product-tab-content"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
            >
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="product-fabric-card">
                    <h4>Fabric Details</h4>

                    <ul>
                      {product?.fabricAndCare?.fabric?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="product-fabric-card">
                    <h4>Care Instructions</h4>

                    <ul>
                      {product?.fabricAndCare?.care?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* REVIEWS */}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              className="product-tab-content"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
            >
              <div className="row g-5">
                {/* LEFT SIDE */}

                <div className="col-lg-6">
                  <h3 className="product-review-section-title">
                    Customer Reviews
                  </h3>

                  {productReviews.length > 0 ? (
                    productReviews.map((review) => (
                      <div key={review.id} className="product-review-card">
                        <div className="product-review-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              fill={
                                star <= Math.round(review.rating)
                                  ? "#f59e0b"
                                  : "none"
                              }
                              color="#f59e0b"
                            />
                          ))}

                          <span className="product-review-rating">
                            {review.rating}
                          </span>
                        </div>

                        <h5>{review.customerName}</h5>

                        <span>{review.date}</span>

                        {review.title && <h6>{review.title}</h6>}
                        <p>{review.review}</p>
                        {review.image && (
                          <img
                            src={URL.createObjectURL(review.image)}
                            alt="Review"
                            className="product-review-image"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="product-review-empty">No Reviews Yet</div>
                  )}
                </div>

                {/* RIGHT SIDE */}

                <div className="col-lg-5">
                  <h3 className="product-review-section-title">
                    Write A Review
                  </h3>

                  <div className="product-review-form-wrapper">
                    <form onSubmit={handleSubmit(handleReviewSubmit)}>
                      {/* Rating */}

                      <label className="product-review-label">Rating</label>

                      <div className="product-rating-selector">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            className="product-rating-btn"
                            onClick={() => setSelectedRating(star)}
                          >
                            <Star
                              size={22}
                              fill={star <= selectedRating ? "#f59e0b" : "none"}
                              color="#f59e0b"
                            />
                          </button>
                        ))}
                      </div>

                      {/* Name */}

                      <div className="mb-3">
                        <label className="product-review-label">
                          Full Name
                        </label>

                        <input
                          type="text"
                          className="product-review-input"
                          placeholder="Enter Full Name"
                          {...register("customerName", {
                            required: "Name is required",
                          })}
                        />

                        {errors.customerName && (
                          <small className="product-review-error">
                            {errors.customerName.message}
                          </small>
                        )}
                      </div>

                      {/* Email */}

                      <div className="mb-3">
                        <label className="product-review-label">Email</label>

                        <input
                          type="email"
                          className="product-review-input"
                          placeholder="Enter Email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                        {errors.email && (
                          <small className="product-review-error">
                            {errors.email.message}
                          </small>
                        )}
                      </div>

                      {/* Review Title */}

                      <div className="mb-3">
                        <label className="product-review-label">
                          Review Title
                        </label>

                        <input
                          type="text"
                          className="product-review-input"
                          placeholder="Review Title"
                          {...register("title")}
                        />
                      </div>

                      {/* Message */}

                      <div className="mb-4">
                        <label className="product-review-label">
                          Review Message
                        </label>

                        <textarea
                          rows="5"
                          className="product-review-textarea"
                          placeholder="Write Your Review"
                          {...register("review", {
                            required: "Review is required",
                          })}
                        />
                        {errors.review && (
                          <small className="product-review-error">
                            {errors.review.message}
                          </small>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="product-review-label">
                          Upload Image
                        </label>

                        <input
                          type="file"
                          accept="image/*"
                          className="product-review-input"
                          {...register("image")}
                        />
                      </div>

                      <button
                        type="submit"
                        className="product-review-submit-btn"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductDetailsTabsSection;
