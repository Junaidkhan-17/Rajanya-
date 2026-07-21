import "./CreateAccountModal.css";

import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import { motion, AnimatePresence } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
} from "react-icons/fa";

import { useAuth, AUTH_ACTIONS } from "../../contexts/AuthContext";

const CreateAccountModal = () => {
  const { state, dispatch, register: registerUser } = useAuth();

  const modalRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const passwordValue = watch("password");

  /* ==========================================
     CLOSE MODAL
  ========================================== */

  const closeModal = () => {
    dispatch({
      type: AUTH_ACTIONS.CLOSE_CREATE_ACCOUNT_MODAL,
    });

    reset();
  };

  /* ==========================================
     ESC KEY CLOSE
  ========================================== */

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (state.showCreateAccountModal) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [state.showCreateAccountModal]);

  /* ==========================================
     OUTSIDE CLICK CLOSE
  ========================================== */

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  /* ==========================================
     SWITCH TO LOGIN
  ========================================== */

  const switchToLogin = () => {
    dispatch({
      type: AUTH_ACTIONS.CLOSE_CREATE_ACCOUNT_MODAL,
    });

    dispatch({
      type: AUTH_ACTIONS.OPEN_LOGIN_MODAL,
    });
  };

  /* ==========================================
     SUBMIT
  ========================================== */

const onSubmit = async (data) => {
  try {
    const userData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
      phone: "",
    };

    await registerUser(userData);

    reset();
  } catch (error) {
    if (error.response?.data?.message) {
      setError("email", {
        type: "manual",
        message: error.response.data.message,
      });
    } else {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: "Something went wrong. Please try again.",
      });
    }
  }
};

  return (
    <AnimatePresence>
      {state.showCreateAccountModal && (
        <motion.div
          className="create-account-overlay"
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
            className="create-account-modal"
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

            <button className="create-account-close-btn" onClick={closeModal}>
              <FaTimes />
            </button>

            <div className="create-account-header">
              <div className="create-account-logo">
                <h2>RAJANYA</h2>

                <span>VIRTUAL DRESSING ROOM</span>
              </div>

              <h3>Create Account</h3>

              <div className="create-account-title-divider">
                <span className="divider-diamond">◇</span>
              </div>

              <p>Join Rajanya and start your fashion journey</p>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="create-account-form"
            >
              {/* FIRST NAME */}

              <div className="form-group">
                <label>First Name</label>

                <div className="input-wrapper">
                  <FaUser />

                  <input
                    type="text"
                    placeholder="Enter your first name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                </div>

                {errors.firstName && (
                  <span className="field-error">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              {/* LAST NAME */}

              <div className="form-group">
                <label>Last Name</label>

                <div className="input-wrapper">
                  <FaUser />

                  <input
                    type="text"
                    placeholder="Enter your last name"
                    {...register("lastName")}
                  />
                </div>
              </div>

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
                        message: "Please enter a valid email",
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
                    placeholder="Create password"
                    {...register("password", {
                      required: "Password is required",

                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
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

              {/* CONFIRM PASSWORD */}

              <div className="form-group">
                <label>Confirm Password</label>

                <div className="input-wrapper">
                  <FaLock />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",

                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <span className="field-error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* TERMS */}

              <div className="terms-wrapper">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: "You must accept the Terms & Conditions",
                  })}
                />

                <label htmlFor="terms">
                  I agree to the <a href="#">Terms & Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>

              {errors.terms && (
                <span className="field-error">{errors.terms.message}</span>
              )}

              {/* BUTTON */}

              <button
                type="submit"
                className="create-account-submit-btn"
                disabled={isSubmitting || state.loading}
              >
                {state.loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </button>

              {/* DIVIDER */}

              <div className="or-divider">
                <span>OR</span>
              </div>

              {/* GOOGLE */}

              <button type="button" className="google-btn">
                <i class="bi bi-google me-2"></i>

                Continue with Google
              </button>

              {/* LOGIN */}

              <p className="signin-text">
                Already have an account?{" "}
                <button type="button" onClick={switchToLogin}>
                  Sign In
                </button>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateAccountModal;
