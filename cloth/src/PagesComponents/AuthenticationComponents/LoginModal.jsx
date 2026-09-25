import "./LoginModal.css";

import { useCallback, useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import { motion, AnimatePresence } from "framer-motion";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
} from "react-icons/fa";

import { useAuth, AUTH_ACTIONS } from "../../contexts/AuthContext";

const LoginModal = () => {
  const { state, dispatch, login, loginWithGoogle } = useAuth();

  const modalRef = useRef(null);
  const googleButtonRef = useRef(null);
  const googleInitializedRef = useRef(false);

  // Google Identity Services refs
const [showPassword, setShowPassword] = useState(false);
const [googleLoading, setGoogleLoading] = useState(false);
const [googleError, setGoogleError] = useState("");



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
  };

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
        "Unable to sign in with Google. Please try again.";

      setGoogleError(message);
    } finally {
      setGoogleLoading(false);
    }
  },
  [loginWithGoogle],
);

  /* ==========================================
     GOOGLE IDENTITY SERVICES INITIALIZATION
  ========================================== */

  useEffect(() => {
  if (!state.showLoginModal) return;

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    setGoogleError(
      "Google Sign-In is not configured. Please try again later.",
    );
    return;
  }

  let cancelled = false;
  let retryTimer;

  const setupGoogle = () => {
    if (cancelled) return;

    if (!window.google?.accounts?.id) {
      retryTimer = window.setTimeout(setupGoogle, 100);
      return;
    }

    try {
      if (!googleInitializedRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCredential,
          ux_mode: "popup",
          auto_select: false,
          use_fedcm_for_button: true,
        });

        googleInitializedRef.current = true;
      }

      if (!googleButtonRef.current) {
        retryTimer = window.setTimeout(setupGoogle, 100);
        return;
      }

      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: Math.min(
            googleButtonRef.current.offsetWidth || 400,
            400,
          ),
          logo_alignment: "left",
        },
      );
    } catch (error) {
      console.error("Google Sign-In setup error:", error);

      setGoogleError(
        "Unable to load Google Sign-In. Please try again.",
      );
    }
  };

  setupGoogle();

  return () => {
    cancelled = true;

    if (retryTimer) {
      window.clearTimeout(retryTimer);
    }
  };
}, [state.showLoginModal, handleGoogleCredential]);

  /* ==========================================
     RENDER GOOGLE BUTTON
  ========================================== */

  useEffect(() => {
    if (!state.showLoginModal) return;
    if (!googleInitializedRef.current) return;
    if (!googleButtonRef.current) return;

    if (!window.google?.accounts?.id) return;

    googleButtonRef.current.innerHTML = "";

    try {
      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: Math.min(
            googleButtonRef.current.offsetWidth || 400,
            400,
          ),
          logo_alignment: "left",
        },
      );
    } catch (error) {
      console.error("Google button render error:", error);

      setGoogleError(
        "Unable to load Google Sign-In. Please try again.",
      );
    }
  }, [state.showLoginModal, googleInitializedRef.current]);

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
    alert(
      "Forgot Password flow will be connected during backend integration.",
    );
  };

  /* ==========================================
     SUBMIT
  ========================================== */

  const onSubmit = async (data) => {
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

            <form
              className="login-form"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  <span className="field-error">
                    {errors.email.message}
                  </span>
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
                  <span className="field-error">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* OPTIONS */}

              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
                  />
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

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-submit-btn"
                disabled={isSubmitting || state.loading}
              >
                {state.loading ? "SIGNING IN..." : "SIGN IN"}
              </button>

              {/* DIVIDER */}

              <div className="or-divider">
                <span>OR</span>
              </div>

              {/* GOOGLE */}

              <div
                ref={googleButtonRef}
                className="google-btn-container"
              />

              {googleLoading && (
                <span className="google-loading">
                  Signing in with Google...
                </span>
              )}

              {googleError && (
                <span className="google-error">
                  {googleError}
                </span>
              )}

              {/* CREATE ACCOUNT */}

              <p className="signin-text">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={switchToCreateAccount}
                >
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