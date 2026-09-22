import "./VirtualTryOnUnlockDrawer.css";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowLeft,
  Sparkles,
  X,
  ShieldCheck,
  EyeOff,
  Loader2,
  CreditCard,
  QrCode,
  CheckCircle2,
} from "lucide-react";

import aiPreview from "../../assets/AI/ai-preview.png";

import { useAuth, AUTH_ACTIONS } from "../../contexts/AuthContext";

import api from "../../services/api";

const VirtualTryOnUnlockDrawer = ({ isOpen, onClose, bookingData }) => {
  const { dispatch } = useAuth();

  const drawerRef = useRef(null);

  const paymentPollingRef = useRef(null);

  /*
  ========================================
  Virtual Try-On Pricing
  ========================================
  */

  const VIRTUAL_TRY_ON_PRICE = 50;

  const VIRTUAL_TRY_ON_TOKENS = 2;

  /*
  ========================================
  Local Payment State
  ========================================
  */

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [paymentError, setPaymentError] = useState("");

  const [qrImageUrl, setQrImageUrl] = useState("");

  const [paymentId, setPaymentId] = useState("");

  const [paymentNumber, setPaymentNumber] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");

  /*
  ========================================
  Product Information
  ========================================
  */

  const product = bookingData?.product;

  const productImage =
    product?.images?.[0] || product?.mainImage || product?.thumbnailImage;

  const productName =
    bookingData?.productName || product?.name || "Designer Outfit";

  /*
  ========================================
  Stop Payment Polling
  ========================================
  */

  const stopPaymentPolling = () => {
    if (paymentPollingRef.current) {
      clearInterval(paymentPollingRef.current);

      paymentPollingRef.current = null;
    }
  };

  /*
  ========================================
  Reset Payment State
  ========================================
  */

  const resetPaymentState = () => {
    stopPaymentPolling();

    setIsProcessingPayment(false);

    setPaymentError("");

    setQrImageUrl("");

    setPaymentId("");

    setPaymentNumber("");

    setPaymentStatus("");
  };

  /*
  ========================================
  Cleanup
  ========================================
  */

  useEffect(() => {
    return () => {
      stopPaymentPolling();
    };
  }, []);

  /*
  ========================================
  Reset When Drawer Opens
  ========================================
  */

  useEffect(() => {
    if (!isOpen) {
      stopPaymentPolling();

      return;
    }

    resetPaymentState();
  }, [isOpen]);

  /*
  ========================================
  ESC CLOSE
  ========================================
  */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !isProcessingPayment) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose, isProcessingPayment]);

  /*
  ========================================
  BODY SCROLL LOCK
  ========================================
  */

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

  /*
  ========================================
  CLICK OUTSIDE CLOSE
  ========================================
  */

  const handleOverlayClick = (e) => {
    if (isProcessingPayment) {
      return;
    }

    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  /*
  ========================================
  Payment Success
  ========================================
  */

  const handlePaymentSuccess = (successfulPaymentId) => {
    stopPaymentPolling();

    setIsProcessingPayment(false);

    setPaymentStatus("paid");

    setPaymentError("");

    dispatch({
      type: AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_DRAWER,
    });

    dispatch({
      type: AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD,
      payload: {
        ...bookingData,
        tokens: VIRTUAL_TRY_ON_TOKENS,
        paymentId: successfulPaymentId,
        paymentNumber,
      },
    });

    dispatch({
      type: AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER,
    });
  };

  /*
  ========================================
  Check Payment Status
  ========================================
  */

  const checkPaymentStatus = async (currentPaymentId) => {
    try {
      const response = await api.get(`/payments/${currentPaymentId}/status`);

      const data = response.data;

      if (!data?.success) {
        return;
      }

      const currentStatus = data.paymentStatus;

      setPaymentStatus(currentStatus);

      /*
      ========================================
      Payment Successful
      ========================================
      */

      if (currentStatus === "paid" || data.tokensCredited === true) {
        handlePaymentSuccess(currentPaymentId);

        return;
      }

      /*
      ========================================
      Payment Failed / Cancelled
      ========================================
      */

      if (
        currentStatus === "failed" ||
        currentStatus === "cancelled" ||
        currentStatus === "refunded"
      ) {
        stopPaymentPolling();

        setIsProcessingPayment(false);

        setPaymentError("Payment was not completed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Status Check Error:", error);

      /*
      Do not immediately show an error.

      The payment may still be processing.
      We continue polling.
      */
    }
  };

  /*
  ========================================
  Start Payment Status Polling
  ========================================
  */

  const startPaymentPolling = (currentPaymentId) => {
    stopPaymentPolling();

    /*
    Check immediately.
    */

    checkPaymentStatus(currentPaymentId);

    /*
    Then check every 2 seconds.
    */

    paymentPollingRef.current = setInterval(() => {
      checkPaymentStatus(currentPaymentId);
    }, 2000);
  };

  /*
  ========================================
  Create Dynamic Razorpay QR
  ========================================
  */

  const handleRazorpayPayment = async () => {
    try {
      setIsProcessingPayment(true);

      setPaymentError("");

      setQrImageUrl("");

      setPaymentId("");

      setPaymentNumber("");

      setPaymentStatus("creating");

      /*
      ========================================
      Product ID
      ========================================
      */

      const productId = product?._id || product?.id;

      /*
      ========================================
      Validate Product Information
      ========================================
      */

      if (!productId) {
        throw new Error(
          "Product information is missing. Please go back and try again.",
        );
      }

      /*
      ========================================
      IMPORTANT

      DO NOT CHECK PRODUCT STOCK HERE.

      Virtual Try-On payment is independent
      from rental availability.
      ========================================
      */

      /*
      ========================================
      Create Dynamic Razorpay QR

      POST /api/payments/create-qr
      ========================================
      */

      const response = await api.post("/payments/create-qr", {
        productId,
      });

      const qrData = response.data;

      /*
      ========================================
      Validate Response
      ========================================
      */

      if (!qrData?.success) {
        throw new Error(qrData?.message || "Unable to create Razorpay QR.");
      }

      if (!qrData.paymentId) {
        throw new Error("Payment record was not created.");
      }

      if (!qrData.qrCodeId) {
        throw new Error("Razorpay QR Code ID was not returned.");
      }

      if (!qrData.qrImageUrl) {
        throw new Error("Razorpay QR image was not returned.");
      }

      /*
      ========================================
      Store QR Information
      ========================================
      */

      setPaymentId(qrData.paymentId);

      setPaymentNumber(qrData.paymentNumber || "");

      setQrImageUrl(qrData.qrImageUrl);

      setPaymentStatus(qrData.qrStatus || "active");

      setIsProcessingPayment(false);

      /*
      ========================================
      Start Payment Monitoring

      Backend webhook will mark the payment
      as paid after Razorpay confirms payment.
      ========================================
      */

      startPaymentPolling(qrData.paymentId);
    } catch (error) {
      console.error("Razorpay QR Payment Error:", error);

      stopPaymentPolling();

      setIsProcessingPayment(false);

      setPaymentStatus("");

      setPaymentError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create payment QR. Please try again.",
      );
    }
  };

  /*
  ========================================
  Close Drawer
  ========================================
  */

  const handleClose = () => {
    if (isProcessingPayment) {
      return;
    }

    stopPaymentPolling();

    onClose?.();
  };

  /*
  ========================================
  Do Not Render
  ========================================
  */

  if (!isOpen || !bookingData) {
    return null;
  }

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
            {/* =========================
                HEADER
            ========================== */}

            <div className="virtual-try-header">
              <button
                type="button"
                className="virtual-try-back-btn"
                onClick={handleClose}
                disabled={isProcessingPayment}
                aria-label="Back"
              >
                <ArrowLeft size={22} />
              </button>

              <div className="virtual-try-title-box">
                <h2>Unlock Virtual Try-On</h2>

                <p>
                  Complete your payment and see how this outfit looks on you
                  before booking.
                </p>
              </div>

              <button
                type="button"
                className="virtual-try-close-btn"
                onClick={handleClose}
                disabled={isProcessingPayment}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* =========================
                HERO
            ========================== */}

            <div className="virtual-try-hero">
              <h3>See The Magic Before You Unlock It</h3>

              <p>
                Experience how our AI transforms your look in seconds. Complete
                the payment to unlock your personalized virtual try-on and see
                this outfit on yourself before booking.
              </p>
            </div>

            {/* =========================
                SHOWCASE
            ========================== */}

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

            {/* =========================
                PAYMENT SECTION
            ========================== */}

            <div className="virtual-payment-section">
              <h3>Secure Razorpay Payment</h3>

              <p>
                Scan the QR code using any supported UPI app to securely
                complete your ₹50 activation.
              </p>

              {/* =========================
                  PAYMENT CARD
              ========================== */}

              <div className="virtual-payment-card">
                {qrImageUrl ? (
                  <>
                    {/* =========================
                        QR CODE
                    ========================== */}

                    <div className="virtual-payment-qr-code">
                      <img src={qrImageUrl} alt="Razorpay UPI Payment QR" />
                    </div>

                    {/* =========================
                        QR STATUS
                    ========================== */}

                    {paymentStatus === "paid" ? (
                      <div className="virtual-payment-success">
                        <CheckCircle2 size={24} />

                        <span>Payment received successfully</span>
                      </div>
                    ) : (
                      <>
                        <h2>₹{VIRTUAL_TRY_ON_PRICE}</h2>

                        <span>SCAN & PAY WITH ANY UPI APP</span>

                        <small>
                          After payment, your QR payment will be verified
                          automatically.
                        </small>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* =========================
                        DEFAULT PAYMENT ICON
                    ========================== */}

                    <div className="virtual-payment-qr">
                      <QrCode size={42} />
                    </div>

                    <h2>₹{VIRTUAL_TRY_ON_PRICE} Only</h2>

                    <span>ONE-TIME ACTIVATION FEE</span>

                    <small>
                      Unlocks {VIRTUAL_TRY_ON_TOKENS} Virtual Try-On generations
                    </small>
                  </>
                )}
              </div>

              {/* =========================
                  PAYMENT NUMBER
              ========================== */}

              {paymentNumber && (
                <div className="virtual-payment-number">
                  Payment ID: <strong>{paymentNumber}</strong>
                </div>
              )}

              {/* =========================
                  PAYMENT PROCESSING
              ========================== */}

              {qrImageUrl && paymentStatus !== "paid" && (
                <div className="virtual-payment-waiting">
                  <Loader2 size={18} className="virtual-payment-spinner" />

                  <span>Waiting for payment confirmation...</span>
                </div>
              )}

              {/* =========================
                  PAYMENT ERROR
              ========================== */}

              {paymentError && (
                <div className="virtual-payment-error" role="alert">
                  {paymentError}
                </div>
              )}

              {/* =========================
                  PAYMENT BUTTONS
              ========================== */}

              <div className="virtual-payment-buttons">
                {!qrImageUrl && (
                  <button
                    type="button"
                    className="virtual-payment-btn"
                    onClick={handleRazorpayPayment}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2
                          size={18}
                          className="virtual-payment-spinner"
                        />
                        CREATING PAYMENT QR...
                      </>
                    ) : (
                      <>
                        <CreditCard size={18} />
                        PAY ₹{VIRTUAL_TRY_ON_PRICE} & TRY
                      </>
                    )}
                  </button>
                )}

                {qrImageUrl && (
                  <button
                    type="button"
                    className="virtual-payment-btn"
                    onClick={() => {
                      checkPaymentStatus(paymentId);
                    }}
                    disabled={!paymentId || isProcessingPayment}
                  >
                    <Loader2 size={18} className="virtual-payment-spinner" />
                    CHECK PAYMENT STATUS
                  </button>
                )}

                <button
                  type="button"
                  className="virtual-back-product-btn"
                  onClick={handleClose}
                  disabled={isProcessingPayment}
                >
                  BACK TO PRODUCT
                </button>
              </div>
            </div>

            <hr className="virtual-divider" />

            {/* =========================
                SECURITY INFORMATION
            ========================== */}

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

            {/* =========================
                IMPORTANT NOTE
            ========================== */}

            <div className="virtual-container">
              <div className="virtual-important-note">
                <h4>Important Notes</h4>

                <p>
                  After successful payment, you will be redirected to the
                  virtual fitting room immediately. Ensure you are in a well-lit
                  area for the best AI fitting accuracy. The ₹50 activation fee
                  unlocks 2 Virtual Try-On generations.
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
