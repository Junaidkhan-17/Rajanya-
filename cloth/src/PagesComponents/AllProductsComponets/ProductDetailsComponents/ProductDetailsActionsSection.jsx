import "./ProductDetailsActionsSection.css";

import { useState } from "react";

import { Heart } from "lucide-react";

import { useAuth, AUTH_ACTIONS } from "../../../contexts/AuthContext";

import { useProductLiveData } from "../../../contexts/ProductLiveDataContext";

import api from "../../../services/api";

const ProductDetailsActionsSection = ({ product, bookingPayload }) => {
  const { state, dispatch } = useAuth();

  const { state: productState, toggleWishlist } = useProductLiveData();

  const [isCheckingVirtualTryOn, setIsCheckingVirtualTryOn] = useState(false);

  const isWishlisted = productState.wishlist.includes(product._id);

  /**
   * ========================================
   * Book For Rent
   * ========================================
   */

  const handleBookNow = () => {
    const bookForRentPayload = {
      ...bookingPayload,

      product: {
        ...(bookingPayload?.product || {}),
        ...product,

        rentalOptions:
          product?.rentalOptions ||
          bookingPayload?.product?.rentalOptions ||
          [],
      },
    };

    console.log("BOOK FOR RENT PAYLOAD:", bookForRentPayload);

    if (!state.isAuthenticated) {
      dispatch({
        type: AUTH_ACTIONS.SET_BOOK_FOR_RENT_PAYLOAD,
        payload: bookForRentPayload,
      });

      dispatch({
        type: AUTH_ACTIONS.OPEN_LOGIN_MODAL,
      });

      return;
    }

    dispatch({
      type: AUTH_ACTIONS.SET_BOOK_FOR_RENT_PAYLOAD,
      payload: bookForRentPayload,
    });

    dispatch({
      type: AUTH_ACTIONS.SET_PENDING_ACTION,
      payload: "bookForRent",
    });

    dispatch({
      type: AUTH_ACTIONS.OPEN_BOOK_FOR_RENT_MODAL,
    });
  };

  const handleVirtualTryOn = async () => {
    /**
     * ========================================
     * Prevent Duplicate Requests
     * ========================================
     */

    if (isCheckingVirtualTryOn) {
      return;
    }

    /**
     * ========================================
     * Authentication Check
     * ========================================
     */

    if (!state.isAuthenticated) {
      dispatch({
        type: AUTH_ACTIONS.OPEN_LOGIN_MODAL,
      });

      return;
    }

    /**
     * ========================================
     * Start Token Check
     * ========================================
     */

    setIsCheckingVirtualTryOn(true);

    try {
      /**
       * ========================================
       * Get Customer VTO Token Balance
       * ========================================
       */

      const response = await api.get("/virtual-try-on/my-tokens");

      const availableTokens =
        response?.data?.tokens?.availableTokens;

      console.log(
        "Virtual Try-On Available Tokens:",
        availableTokens,
      );

      /**
       * ========================================
       * CASE 1:
       *
       * Customer already has VTO tokens.
       *
       * Open Studio directly.
       *
       * No Razorpay QR.
       * No additional payment.
       * ========================================
       */

      if (
        response?.data?.success &&
        typeof availableTokens === "number" &&
        availableTokens > 0
      ) {
        dispatch({
          type: AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD,
          payload: bookingPayload,
        });

        dispatch({
          type: AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER,
        });

        return;
      }

      /**
       * ========================================
       * CASE 2:
       *
       * Customer has ZERO VTO tokens.
       *
       * Open Razorpay Payment Drawer.
       *
       * Razorpay Drawer handles:
       *
       * ₹50 payment
       *      ↓
       * Razorpay verification
       *      ↓
       * 2 VTO tokens credited
       *      ↓
       * Studio opens
       * ========================================
       */

      dispatch({
        type: AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_PAYLOAD,
        payload: bookingPayload,
      });

      dispatch({
        type: AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_DRAWER,
      });
    } catch (error) {
      /**
       * ========================================
       * CASE 3:
       *
       * VTO account does not exist yet.
       *
       * Treat the customer as having
       * zero available tokens.
       *
       * Open Razorpay Payment Drawer.
       * ========================================
       */

      if (error?.response?.status === 404) {
        console.log(
          "Virtual Try-On account not found. Opening payment drawer.",
        );

        dispatch({
          type: AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_PAYLOAD,
          payload: bookingPayload,
        });

        dispatch({
          type: AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_DRAWER,
        });

        return;
      }

      /**
       * ========================================
       * Other API Errors
       * ========================================
       */

      console.error(
        "Virtual Try-On Token Check Error:",
        error,
      );

      alert(
        error?.response?.data?.message ||
          "Unable to check your Virtual Try-On tokens. Please try again.",
      );
    } finally {
      /**
       * ========================================
       * Finish Token Check
       * ========================================
       */

      setIsCheckingVirtualTryOn(false);
    }
  };

  /**
   * ========================================
   * Wishlist
   * ========================================
   */

  const handleWishlist = async () => {
    if (!state.isAuthenticated) {
      dispatch({
        type: AUTH_ACTIONS.OPEN_LOGIN_MODAL,
      });

      return;
    }

    await toggleWishlist(product._id);
  };

  /**
   * ========================================
   * Render
   * ========================================
   */

  return (
    <div className="product-details-actions-section">
      <button
        type="button"
        className="virtual-try-on-btn"
        onClick={handleVirtualTryOn}
        disabled={isCheckingVirtualTryOn}
      >
        {isCheckingVirtualTryOn
          ? "Checking Try-On..."
          : "✦ Pay & Try Virtual Try-On"}
      </button>

      <button
        type="button"
        className="book-rent-btn"
        onClick={handleBookNow}
      >
        Book For Rent
      </button>

      <button
        type="button"
        className={`wishlist-btn ${
          isWishlisted ? "wishlist-btn-active" : ""
        }`}
        onClick={handleWishlist}
        aria-label={
          isWishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        <Heart
          size={20}
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
};

export default ProductDetailsActionsSection;