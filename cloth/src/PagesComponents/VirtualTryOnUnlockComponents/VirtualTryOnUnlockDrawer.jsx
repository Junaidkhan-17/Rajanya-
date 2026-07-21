import "./VirtualTryOnUnlockDrawer.css";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  X,
  ShieldCheck,
  EyeOff,
} from "lucide-react";

import aiPreview from "../../assets/AI/ai-preview.png";
import qrimage from "../../assets/QR/qrimage.jpeg";
import {
  useAuth,
  AUTH_ACTIONS,
} from "../../contexts/AuthContext";

const VirtualTryOnUnlockDrawer = ({ isOpen, onClose, bookingData }) => {
  const { dispatch } = useAuth();
  const drawerRef = useRef(null);

  const VIRTUAL_TRY_ON_PRICE = 49;
  const product = bookingData?.product;
  const productImage = product?.images?.[0];
  const productName =
    bookingData?.productName || product?.name || "Designer Outfit";

  /* =========================
     ESC CLOSE
  ========================= */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  /* =========================
     BODY SCROLL LOCK
  ========================= */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  /* =========================
     CLICK OUTSIDE CLOSE
  ========================= */

  const handleOverlayClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      onClose?.();
    }
  };
const handlePaymentSuccess = () => {
  dispatch({
    type:
      AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_DRAWER,
  });

  dispatch({
    type:
      AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD,
    payload: {
      ...bookingData,
      tokens: 2,
    },
  });

  dispatch({
    type:
      AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER,
  });
};

  if (!isOpen || !bookingData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="virtual-try-overlay"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={drawerRef}
            className="virtual-try-drawer"
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* =====================
                HEADER
            ====================== */}

            <div className="virtual-try-header">
              <button className="virtual-try-back-btn" onClick={onClose}>
                <ArrowLeft size={22} />
              </button>

              <div className="virtual-try-title-box">
                <h2>Unlock Virtual Try-On</h2>

                <p>
                  Complete your payment and see how this outfit looks on you
                  before booking.
                </p>
              </div>

              <button className="virtual-try-close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            {/* =====================
                HERO
            ====================== */}

            <div className="virtual-try-hero">
              <h3>See The Magic Before You Unlock It</h3>

              <p>
                Experience how our AI transforms your look in seconds. Complete
                the payment to unlock your personalized virtual try-on and see
                this outfit on yourself before booking.
              </p>
            </div>

            {/* =====================
                SHOWCASE
            ====================== */}

            <div className="virtual-try-showcase">
              {/* LEFT */}

              <motion.div
                className="virtual-preview-card"
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
              >
                <div className="virtual-preview-image-box">
                  <img src={productImage || aiPreview} alt={productName} />
                </div>

                <span>Current Outfit</span>
              </motion.div>

              {/* CENTER */}

              <motion.div
                className="virtual-magic-icon"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles size={40} />
              </motion.div>

              {/* RIGHT */}

              <motion.div
                className="virtual-preview-card"
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
              >
                <div className="virtual-preview-image-box">
                  <img src={aiPreview} alt="AI Preview" />
                </div>

                <span>AI Preview</span>
              </motion.div>
            </div>
            {/* =====================
    PAYMENT SECTION
===================== */}
          
            <div className="virtual-payment-section">
              <h3>Secure UPI Payment</h3>

              <p>Scan the QR code with any UPI app to unlock your session.</p>

              <div className="virtual-payment-card">
                <div className="virtual-payment-qr">
                  <img src={qrimage} alt="UPI QR Code" />
                </div>

                <h2>₹{VIRTUAL_TRY_ON_PRICE} Only</h2>

                <span>ONE-TIME ACTIVATION FEE</span>
              </div>
              <div className="virtual-payment-buttons">
                <button className="virtual-payment-btn"
                onClick={handlePaymentSuccess}>
                  I HAVE COMPLETED PAYMENT
                </button>

                <button className="virtual-back-product-btn" onClick={onClose}>
                  BACK TO PRODUCT
                </button>
              </div>
            </div>

            <hr className="virtual-divider" />
            <div className="payment-card-info">
              <div className="demo-info">
                <div className="demo-info-icon" data-atropos-offset="5">
                  <ShieldCheck size={36} />
                </div>

                <div className="demo-info-content" data-atropos-offset="15">
                  <h3>SECURE ENCRYPTION</h3>
                  <p>BANK-GRADE SECURITY PROTOCOLS</p>
                </div>
              </div>

              <div className="demo-info">
                <div className="demo-info-icon" data-atropos-offset="5">
                  <EyeOff size={36} />
                </div>

                <div className="demo-info-content" data-atropos-offset="15">
                  <h3>PRIVACY FIRST</h3>
                  <p>IMAGES ARE NEVER STORED LOCALLY</p>
                </div>
              </div>
            </div>
          
            <div className="virtual-container">
            <div className="virtual-important-note">
              <h4>Important Notes</h4>

              <p>
                After payment, you will be redirected to the virtual fitting
                room immediately. Ensure you are in a well-lit area for the best
                AI fitting accuracy. The ₹99 fee is valid for a single session
                across all variations of the Canary Charm collection.
              </p>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VirtualTryOnUnlockDrawer;
