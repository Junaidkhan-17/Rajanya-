import "./ProductDetailsActionsSection.css";
import { Heart } from "lucide-react";
import {
  useAuth,
  AUTH_ACTIONS,
} from "../../../contexts/AuthContext";
import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext";
/* ======================================
     WISHLIST
  ====================================== */

const ProductDetailsActionsSection = ({
  product,
  bookingPayload,
}) => {
    const {
  state,
  dispatch,
} = useAuth();

const {
  state: productState,
  dispatch: productDispatch,
} = useProductLiveData();

const isWishlisted =
  productState.wishlist.includes(
    product._id
  );

const handleBookNow = () => {
  if (!state.isAuthenticated) {
    dispatch({
      type:
        AUTH_ACTIONS.OPEN_CREATE_ACCOUNT_MODAL,
    });

    return;
  }

  dispatch({
    type:
      AUTH_ACTIONS.SET_BOOK_FOR_RENT_PAYLOAD,

    payload: bookingPayload,
  });

  dispatch({
    type:
      AUTH_ACTIONS.OPEN_BOOK_FOR_RENT_MODAL,
  });
};


const handleVirtualTryOn = () => {
  if (!state.isAuthenticated) {
    dispatch({
      type:
        AUTH_ACTIONS.OPEN_CREATE_ACCOUNT_MODAL,
    });

    return;
  }

  dispatch({
    type:
      AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_PAYLOAD,
    payload: bookingPayload,
  });

  dispatch({
    type:
      AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_DRAWER,
  });
};



const handleWishlist = () => {
  productDispatch({
    type: isWishlisted
      ? PRODUCT_ACTIONS.REMOVE_FROM_WISHLIST
      : PRODUCT_ACTIONS.ADD_TO_WISHLIST,

    payload: product._id,
  });
};


  return (
    <div className="product-details-actions-section">
      <button
        className="virtual-try-on-btn"
        onClick={handleVirtualTryOn}
      >
        ✦ Pay & Try Virtual Try-On
      </button>

      <button
        className="book-rent-btn"
        onClick={handleBookNow}
      >
        Book For Rent
      </button>

      <button
  className={`wishlist-btn ${
    isWishlisted
      ? "wishlist-btn-active"
      : ""
  }`}
  onClick={handleWishlist}
>
  <Heart
    size={20}
    fill={
      isWishlisted
        ? "currentColor"
        : "none"
    }
  />
</button>
    </div>
  );
};

export default ProductDetailsActionsSection;
