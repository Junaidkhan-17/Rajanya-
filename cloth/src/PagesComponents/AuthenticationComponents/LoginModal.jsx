import "./LoginModal.css";

import { useCallback, useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import { motion, AnimatePresence } from "framer-motion";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

import { useAuth, AUTH_ACTIONS } from "../../contexts/AuthContext";

const LoginModal = () => {
  const { state, dispatch, login, loginWithGoogle } = useAuth();

  const modalRef = useRef(null);

  const googleButtonRef = useRef(null);

  // Google Identity Services should be initialized only once.
  const googleInitializedRef = useRef(false);

  // Always point Google to the latest callback.
  const googleCredentialHandlerRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  const [googleError, setGoogleError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  /* ==========================================
     GOOGLE LOGIN CALLBACK
  ========================================== */

  const handleGoogleCredential = useCallback(
    async (response) => {
      try {
        setGoogleError("");

        if (!response?.credential) {
          throw new Error("Google credential was not received.");
        }

        setGoogleLoading(true);

        await loginWithGoogle(response.credential);

        closeModal();
      } catch (error) {
        console.error("Google Sign-In Error:", error);

        const message =
          error.response?.data?.message ||
          error.message ||
          "Unable to sign in with Google. Please try again.";

        setGoogleError(message);
      } finally {
        setGoogleLoading(false);
      }
    },
    [loginWithGoogle],
  );

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
  };

  /*
   * Keep the ref synchronized with the latest callback.
   *
   * Google itself is initialized only once, so we do not
   * re-initialize GIS every time React renders.
   */
  googleCredentialHandlerRef.current = handleGoogleCredential;

  /* ==========================================
     CLOSE MODAL
  ========================================== */

  const closeModal = () => {
    dispatch({
      type: AUTH_ACTIONS.CLOSE_LOGIN_MODAL,
    });

    dispatch({
      type: AUTH_ACTIONS.CLEAR_PENDING_ACTION,
    });

    dispatch({
      type: AUTH_ACTIONS.CLOSE_BOOK_FOR_RENT_MODAL,
    });

    reset();

    setGoogleError("");

    setGoogleLoading(false);

    setShowTerms(false);
    setTermsAccepted(false);
  };

  /* ==========================================
     GOOGLE IDENTITY SERVICES
  ========================================== */

  useEffect(() => {
    if (!state.showLoginModal) {
      return;
    }

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      setGoogleError(
        "Google Sign-In is not configured. Please try again later.",
      );

      return;
    }

    let cancelled = false;

    let retryTimer = null;

    const renderGoogleButton = () => {
      if (cancelled) {
        return;
      }

      if (!window.google?.accounts?.id) {
        retryTimer = window.setTimeout(renderGoogleButton, 100);
        return;
      }

      if (!googleButtonRef.current) {
        retryTimer = window.setTimeout(renderGoogleButton, 100);
        return;
      }

      try {
        /*
         * Initialize Google Identity Services exactly once.
         *
         * FedCM is enabled because the current Google GIS
         * documentation recommends FedCM for modern web apps,
         * including Chrome on Android.
         */
        if (!googleInitializedRef.current) {
          window.google.accounts.id.initialize({
            client_id: clientId,

            // Return the Google credential to the frontend callback.
            ux_mode: "popup",

            callback: (response) => {
              googleCredentialHandlerRef.current?.(response);
            },

            auto_select: false,
            use_fedcm_for_button: false,
            button_auto_select: false,
          });

          googleInitializedRef.current = true;
        }

        /*
         * Clear the container before rendering.
         * This prevents duplicate Google buttons when the
         * login modal is opened again.
         */
        googleButtonRef.current.innerHTML = "";

        const buttonWidth = Math.min(
          googleButtonRef.current.offsetWidth || 400,
          400,
        );

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: buttonWidth,
          logo_alignment: "left",
        });
      } catch (error) {
        console.error("Google Sign-In setup error:", error);

        setGoogleError("Unable to load Google Sign-In. Please try again.");
      }
    };

    renderGoogleButton();

    return () => {
      cancelled = true;

      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [state.showLoginModal]);

  /* ==========================================
     ESC CLOSE
  ========================================== */

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (state.showLoginModal) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [state.showLoginModal]);

  /* ==========================================
     OUTSIDE CLICK CLOSE
  ========================================== */

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  /* ==========================================
     SWITCH TO CREATE ACCOUNT
  ========================================== */

  const switchToCreateAccount = () => {
    dispatch({
      type: AUTH_ACTIONS.CLOSE_LOGIN_MODAL,
    });

    dispatch({
      type: AUTH_ACTIONS.OPEN_CREATE_ACCOUNT_MODAL,
    });
  };

  /* ==========================================
     FORGOT PASSWORD
  ========================================== */

  const handleForgotPassword = () => {
    alert("Forgot Password flow will be connected during backend integration.");
  };

  /* ==========================================
     SUBMIT
  ========================================== */

  const onSubmit = async (data) => {
    if (!termsAccepted) {
      setShowTerms(true);
      return;
    }
    try {
      const loginData = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      };

      await login(loginData);

      closeModal();
    } catch (error) {
      if (error.response?.data?.message) {
        const message = error.response.data.message;

        if (message === "Invalid Email or Password") {
          setError("password", {
            type: "manual",
            message: message,
          });
        } else {
          setError("email", {
            type: "manual",
            message: message,
          });
        }
      } else {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "Unable to login. Please try again.",
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {state.showLoginModal && (
        <motion.div
          className="login-overlay"
          onMouseDown={handleOverlayClick}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <motion.div
            ref={modalRef}
            className="login-modal"
            onMouseDown={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {/* HEADER */}

            <button
              type="button"
              className="login-close-btn"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            <AnimatePresence>
              {showTerms && (
                <motion.div
                  className="terms-overlay"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <div className="terms-header">
                    <h2>RAJANYA</h2>
                    <h3>Terms & Conditions</h3>
                    <p>Last Updated: 12 November 2026</p>
                  </div>

                  <div className="terms-scroll-content">
                    <h4>1. Introduction</h4>
                    <p>
                      Welcome to Rajanya, a luxury fashion rental platform that
                      connects customers with fashion vendors and provides
                      access to premium clothing and fashion rental services.
                    </p>
                    <p>
                      By accessing, registering, or using the Rajanya website,
                      you agree to these Terms & Conditions. If you do not
                      agree, please do not use our services.
                    </p>

                    <h4>2. Account Registration</h4>
                    <ul>
                      <li>
                        Users must provide accurate and complete registration
                        information.
                      </li>
                      <li>
                        Users are responsible for maintaining the
                        confidentiality of their login credentials.
                      </li>
                      <li>
                        Users must not create accounts using false identities or
                        another person's information without authorization.
                      </li>
                      <li>
                        Users are responsible for activities conducted through
                        their accounts.
                      </li>
                      <li>
                        Rajanya reserves the right to suspend accounts involved
                        in fraudulent or unauthorized activities, subject to
                        applicable law.
                      </li>
                    </ul>

                    <h4>3. Rental Services</h4>
                    <ul>
                      <li>
                        Rajanya provides access to fashion products available
                        for rental through its platform.
                      </li>
                      <li>
                        Product availability depends on the respective vendor.
                      </li>
                      <li>
                        Rental prices, duration, size, and other product details
                        will be displayed before booking.
                      </li>
                      <li>
                        Customers must review product descriptions and rental
                        conditions before confirming an order.
                      </li>
                      <li>
                        Rental products remain the property of their respective
                        owners or vendors.
                      </li>
                      <li>
                        Customers must use rented products responsibly and only
                        for their intended purpose.
                      </li>
                    </ul>

                    <h4>4. Booking and Payments</h4>
                    <ul>
                      <li>
                        Customers must provide accurate booking and delivery
                        information.
                      </li>
                      <li>
                        A rental booking will be considered confirmed only after
                        the required payment and booking confirmation.
                      </li>
                      <li>
                        Payments must be made through the payment methods
                        supported by Rajanya.
                      </li>
                      <li>
                        Customers should not share confidential payment
                        information with anyone.
                      </li>
                      <li>
                        Applicable rental charges, taxes, delivery fees,
                        deposits, and additional charges will be disclosed
                        before payment.
                      </li>
                    </ul>

                    <h4>5. Cancellation and Refund Policy</h4>
                    <ul>
                      <li>
                        Cancellation requests must be submitted through customer
                        support or the booking cancellation facility.
                      </li>
                      <li>
                        Refund eligibility depends on the applicable
                        cancellation policy and booking status.
                      </li>
                      <li>
                        Approved refunds will be processed through the
                        applicable payment method.
                      </li>
                      <li>
                        Refund processing timelines may depend on the payment
                        provider or bank.
                      </li>
                      <li>
                        Applicable non-refundable charges must be disclosed
                        before booking.
                      </li>
                    </ul>

                    <h4>6. Delivery and Return Policy</h4>
                    <ul>
                      <li>
                        Customers must provide a complete and accurate delivery
                        address.
                      </li>
                      <li>
                        Delivery timelines may vary depending on location and
                        vendor availability.
                      </li>
                      <li>
                        Customers must return rented products within the agreed
                        rental period.
                      </li>
                      <li>
                        Products must be returned using the approved return
                        process.
                      </li>
                      <li>
                        Customers should retain return or pickup confirmation
                        until the return is completed.
                      </li>
                    </ul>

                    <h4>7. Late Returns</h4>
                    <ul>
                      <li>
                        Customers must return products by the specified return
                        deadline.
                      </li>
                      <li>
                        Late returns may attract additional charges disclosed in
                        the applicable booking policy.
                      </li>
                      <li>
                        Continued non-return may result in further action in
                        accordance with the applicable rental agreement and law.
                      </li>
                    </ul>

                    <h4>8. Product Damage or Loss</h4>
                    <ul>
                      <li>
                        Customers are responsible for taking reasonable care of
                        rented products.
                      </li>
                      <li>
                        Customers must report accidental damage, loss, or other
                        issues promptly.
                      </li>
                      <li>
                        Normal wear and tear will be assessed separately from
                        damage caused by misuse or negligence.
                      </li>
                      <li>
                        Applicable repair or replacement charges must be
                        determined transparently and communicated to the
                        customer.
                      </li>
                    </ul>

                    <h4>9. Virtual Try-On Services</h4>
                    <ul>
                      <li>
                        Rajanya may provide AI-powered Virtual Try-On services
                        to help customers preview fashion products.
                      </li>
                      <li>
                        Virtual Try-On results are simulations and may not
                        perfectly represent actual appearance, fit, size, or
                        fabric.
                      </li>
                      <li>
                        Virtual Try-On credits or tokens may be purchased
                        through the platform.
                      </li>
                      <li>
                        The current token package provides 2 Virtual Try-On
                        generations for ₹50.
                      </li>
                      <li>
                        Tokens will be credited after successful payment
                        verification.
                      </li>
                      <li>
                        Each successful generation will consume one available
                        token.
                      </li>
                      <li>
                        Customers must upload only images they own or have
                        permission to use.
                      </li>
                      <li>
                        Users must not upload unlawful, abusive, or unauthorized
                        images.
                      </li>
                      <li>
                        Availability may depend on third-party service
                        providers.
                      </li>
                    </ul>

                    <h4>10. Vendor Responsibilities</h4>
                    <ul>
                      <li>
                        Vendors must provide accurate product descriptions,
                        images, prices, and availability.
                      </li>
                      <li>
                        Vendors are responsible for maintaining product quality
                        and condition.
                      </li>
                      <li>
                        Vendors must fulfil confirmed bookings according to
                        applicable policies.
                      </li>
                      <li>
                        Vendors must comply with applicable laws and platform
                        guidelines.
                      </li>
                      <li>
                        Rajanya may investigate complaints relating to vendor
                        listings or services.
                      </li>
                    </ul>

                    <h4>11. User Responsibilities and Prohibited Activities</h4>
                    <p>Users must not:</p>
                    <ul>
                      <li>
                        Use the platform for fraudulent or illegal activities.
                      </li>
                      <li>
                        Provide false registration or booking information.
                      </li>
                      <li>Attempt unauthorized access to the platform.</li>
                      <li>
                        Copy, distribute, or misuse platform content without
                        permission.
                      </li>
                      <li>
                        Interfere with platform security or functionality.
                      </li>
                      <li>
                        Misuse payment, booking, or Virtual Try-On services.
                      </li>
                    </ul>

                    <h4>12. Privacy and Personal Information</h4>
                    <p>
                      Rajanya may collect and process personal information
                      required to provide services, manage accounts, process
                      bookings, and communicate with customers.
                    </p>
                    <p>
                      Personal information will be handled according to the
                      Rajanya Privacy Policy and applicable data protection
                      laws.
                    </p>

                    <h4>13. Intellectual Property</h4>
                    <p>
                      All platform branding, logos, website design, graphics,
                      text, and original content are protected by applicable
                      intellectual property laws.
                    </p>

                    <h4>14. Limitation of Liability</h4>
                    <p>
                      Rajanya will take reasonable steps to maintain platform
                      availability and service quality. Nothing in these Terms
                      excludes liability that cannot legally be excluded.
                    </p>

                    <h4>15. Account Suspension and Termination</h4>
                    <p>
                      Rajanya may restrict or suspend accounts for violations of
                      these Terms, fraudulent activities, or misuse of the
                      platform, subject to applicable law.
                    </p>

                    <h4>16. Changes to These Terms</h4>
                    <p>
                      Updated terms will be published on the website with a
                      revised effective date. Material changes will be
                      communicated where required by applicable law.
                    </p>

                    <h4>17. Governing Law and Jurisdiction</h4>
                    <p>
                      These Terms & Conditions shall be governed by the laws of
                      India. Disputes shall be handled by competent courts or
                      authorities having jurisdiction, subject to applicable
                      consumer protection laws.
                    </p>

                    <h4>18. Contact Information</h4>
                    <p>
                      <strong>Brand:</strong> Rajanya rental by creativecluster studio
                    </p>
                    <p>
                      <strong>Website:</strong> https://rajanyabycc.com/
                    </p>
                    <p>
                      <strong>Email:</strong> rajanyarentalbyccstudio@gmail.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +917124534646
                    </p>
                    <p>
                      <strong>Registered Business Address:</strong> Rajanya by creativecluster studio, Upside Vinay motors Chota tajbagh road ,Nagpur
                    </p>

                    <p>
                      By registering for or using Rajanya, you acknowledge that
                      you have read and understood these Terms & Conditions and
                      agree to comply with them.
                    </p>
                  </div>

                  <div className="terms-footer">
                    <button
                      type="button"
                      className="terms-agree-btn"
                      onClick={handleAcceptTerms}
                    >
                      AGREE & CONTINUE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="login-header">
              <div className="login-logo">
                <h2>RAJANYA</h2>

                <span>VIRTUAL DRESSING ROOM</span>
              </div>

              <h3>Log In</h3>

              <div className="login-title-divider">
                <span className="divider-diamond">◇</span>
              </div>

              <p>Continue your fashion journey.</p>
            </div>

            {/* FORM */}

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              {/* EMAIL */}

              <div className="form-group">
                <label>Email Address</label>

                <div className="input-wrapper">
                  <FaEnvelope />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: "Email is required",

                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>

                {errors.email && (
                  <span className="field-error">{errors.email.message}</span>
                )}
              </div>

              {/* PASSWORD */}

              <div className="form-group">
                <label>Password</label>

                <div className="input-wrapper">
                  <FaLock />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.password && (
                  <span className="field-error">{errors.password.message}</span>
                )}
              </div>

              {/* OPTIONS */}

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" {...register("rememberMe")} />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="forgot-password-btn"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <div className="terms-trigger">
                <button type="button" onClick={() => setShowTerms(true)}>
                  {termsAccepted
                    ? "✓ Terms & Conditions Accepted"
                    : "Read Terms & Conditions"}
                </button>
              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-submit-btn"
                disabled={!termsAccepted || isSubmitting || state.loading}
              >
                {state.loading ? "SIGNING IN..." : "SIGN IN"}
              </button>

              {/* DIVIDER */}

              <div className="or-divider">
                <span>OR</span>
              </div>

              {/* GOOGLE */}

              <div ref={googleButtonRef} className="google-btn-container" />

              {googleLoading && (
                <span className="google-loading">
                  Signing in with Google...
                </span>
              )}

              {googleError && (
                <span className="google-error">{googleError}</span>
              )}

              {/* CREATE ACCOUNT */}

              <p className="signin-text">
                Don't have an account?{" "}
                <button type="button" onClick={switchToCreateAccount}>
                  Create Account
                </button>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
