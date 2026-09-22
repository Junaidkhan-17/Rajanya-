import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuth, AUTH_ACTIONS } from "../../contexts/AuthContext";
import { useProductLiveData } from "../../contexts/ProductLiveDataContext";
import rajanyalogo from "../../assets/rajanyalogo.png";
import "./Navbar.css";

const Navbar = () => {
  const navbarRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const { state, dispatch, getUserInitials } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { state: productState } = useProductLiveData();

  const wishlistCount = productState.wishlist.length;

  const user = state.user;

  /* ==========================================
     DYNAMIC USER INFORMATION
  ========================================== */

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "User";

  const userEmail = user?.email || "";


  /* ==========================================
     MOBILE MENU
  ========================================== */

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  /* ==========================================
     PROFILE DROPDOWN
  ========================================== */

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };


  /* ==========================================
     OUTSIDE CLICK
  ========================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isProfileDropdownOpen]);


  /* ==========================================
     ESC KEY
  ========================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);


  /* ==========================================
     LOGIN
  ========================================== */

  const handleLoginClick = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);

    dispatch({
      type: AUTH_ACTIONS.OPEN_LOGIN_MODAL,
    });
  };


  /* ==========================================
     DESKTOP PROFILE CLICK
  ========================================== */

  const handleProfileClick = () => {
    if (!state.isAuthenticated) {
      handleLoginClick();
      return;
    }

    setIsProfileDropdownOpen((prev) => !prev);
  };


  /* ==========================================
     LOGOUT
  ========================================== */

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);

    dispatch({
      type: AUTH_ACTIONS.LOGOUT,
    });
  };


  /* ==========================================
     MOBILE PROFILE CLICK
  ========================================== */

  const handleMobileProfileClick = () => {
    if (!state.isAuthenticated) {
      handleLoginClick();
      return;
    }

    setIsProfileDropdownOpen((prev) => !prev);
  };


  /* ==========================================
     MOBILE NAVIGATION CLICK
  ========================================== */

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };


  return (
    <motion.nav
      ref={navbarRef}
      className="main-navbar-wrapper"
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <div className="container">
        <div className="main-navbar-content">

          {/* ==========================================
              LOGO
          ========================================== */}

          <div className="main-navbar-logo">
            <NavLink
              to="/"
              onClick={handleMobileNavClick}
              className="navbar-logo-link"
            >
              <img
                src={rajanyalogo}
                className="logo"
                alt="Rajanya"
              />
            </NavLink>
          </div>


          {/* ==========================================
              SEARCH
          ========================================== */}

          <div className="main-navbar-search">
            <input
              type="text"
              placeholder="Search"
              aria-label="Search products"
            />

            <button
              type="button"
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>


          {/* ==========================================
              NAVIGATION
          ========================================== */}

          <ul
            className={`main-navbar-links ${
              isMobileMenuOpen ? "mobile-menu-open" : ""
            }`}
          >
            <li>
              <NavLink
                to="/"
                onClick={handleMobileNavClick}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/collection"
                onClick={handleMobileNavClick}
              >
                All Product
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/womens-wear"
                onClick={handleMobileNavClick}
              >
                Women's Wear
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/mens-wear"
                onClick={handleMobileNavClick}
              >
                Men's Wear
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Contact-Us"
                onClick={handleMobileNavClick}
              >
                Contact Us
              </NavLink>
            </li>


            {/* ==========================================
                MOBILE AUTHENTICATION
            ========================================== */}

            <li className="mobile-auth-item">

              {!state.isAuthenticated ? (
                <button
                  type="button"
                  className="mobile-navbar-profile-button"
                  onClick={handleMobileProfileClick}
                >
                  <i className="bi bi-person-circle"></i>

                  <span>
                    Login / Sign Up
                  </span>
                </button>
              ) : (
                <div className="mobile-profile-container">

                  <button
                    type="button"
                    className={`mobile-navbar-profile-button ${
                      isProfileDropdownOpen
                        ? "mobile-profile-active"
                        : ""
                    }`}
                    onClick={handleMobileProfileClick}
                    aria-expanded={isProfileDropdownOpen}
                  >
                    <span className="mobile-navbar-user-initials">
                      {getUserInitials()}
                    </span>

                    <span className="mobile-navbar-profile-name">
                      {userName}
                    </span>

                    <i
                      className={`bi ${
                        isProfileDropdownOpen
                          ? "bi-chevron-up"
                          : "bi-chevron-down"
                      }`}
                    ></i>
                  </button>


                  {/* ==========================================
                      MOBILE PROFILE DROPDOWN
                  ========================================== */}

                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        className="mobile-profile-dropdown"
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          y: -5,
                        }}
                        transition={{
                          duration: 0.22,
                        }}
                      >

                        {/* USER INFORMATION */}

                        <div className="mobile-profile-user">

                          <div className="mobile-profile-avatar">
                            {getUserInitials()}
                          </div>

                          <div className="mobile-profile-user-info">
                            <h5>
                              {userName}
                            </h5>

                            <p>
                              {userEmail}
                            </p>
                          </div>

                        </div>


                        {/* DIVIDER */}

                        <div className="mobile-profile-divider"></div>


                        {/* MY BOOKING */}

                        <NavLink
                          to="/my-bookings"
                          className="mobile-profile-booking"
                          onClick={handleMobileNavClick}
                        >
                          <i className="bi bi-calendar2-check"></i>

                          <span>
                            My Booking
                          </span>
                        </NavLink>


                        {/* DIVIDER */}

                        <div className="mobile-profile-divider"></div>


                        {/* LOGOUT */}

                        <div className="mobile-profile-logout-wrapper">
                          <button
                            type="button"
                            className="mobile-profile-logout"
                            onClick={handleLogout}
                          >
                            <i className="bi bi-box-arrow-right"></i>

                            <span>
                              Logout
                            </span>
                          </button>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )}

            </li>
          </ul>


          {/* ==========================================
              ACTION ICONS
          ========================================== */}

          <div className="main-navbar-actions">

            {/* ==========================================
                DESKTOP PROFILE / LOGIN
            ========================================== */}

            <div
              className="navbar-profile-wrapper"
              ref={profileDropdownRef}
            >

              {!state.isAuthenticated ? (
                <button
                  type="button"
                  className="navbar-login-button"
                  onClick={handleLoginClick}
                >
                  <i className="bi bi-person-circle"></i>

                  <span>
                    Login
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className={`navbar-profile-button ${
                    isProfileDropdownOpen
                      ? "profile-active"
                      : ""
                  }`}
                  onClick={handleProfileClick}
                  aria-label="Open profile menu"
                  aria-expanded={isProfileDropdownOpen}
                >
                  <span className="navbar-user-initials">
                    {getUserInitials()}
                  </span>
                </button>
              )}


              {/* ==========================================
                  DESKTOP PROFILE DROPDOWN
              ========================================== */}

              <AnimatePresence>
                {state.isAuthenticated &&
                  isProfileDropdownOpen && (
                    <motion.div
                      className="navbar-profile-dropdown"
                      initial={{
                        opacity: 0,
                        y: -10,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >

                      {/* USER INFORMATION */}

                      <div className="profile-dropdown-user">

                        <div className="profile-dropdown-avatar">
                          {getUserInitials()}
                        </div>

                        <div className="profile-dropdown-user-info">

                          <h5>
                            {userName}
                          </h5>

                          <p>
                            {userEmail}
                          </p>

                        </div>

                      </div>


                      {/* DIVIDER */}

                      <div className="profile-dropdown-divider"></div>


                      {/* MY BOOKING */}

                      <NavLink
                        to="/my-bookings"
                        className="profile-dropdown-booking"
                        onClick={closeProfileDropdown}
                      >
                        My Booking
                      </NavLink>


                      {/* DIVIDER */}

                      <div className="profile-dropdown-divider"></div>


                      {/* LOGOUT */}

                      <div className="profile-dropdown-logout-wrapper">
                        <button
                          type="button"
                          className="profile-dropdown-logout"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right"></i>

                          <span>
                            Logout
                          </span>
                        </button>
                      </div>

                    </motion.div>
                  )}
              </AnimatePresence>

            </div>


            {/* ==========================================
                WISHLIST
            ========================================== */}

            <NavLink
              to="/wishlist"
              className="navbar-wishlist-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsProfileDropdownOpen(false);
              }}
              aria-label="Wishlist"
            >
              <i className="bi bi-heart"></i>

              {wishlistCount > 0 && (
                <span className="navbar-wishlist-badge">
                  {wishlistCount}
                </span>
              )}
            </NavLink>


            {/* ==========================================
                MOBILE HAMBURGER
            ========================================== */}

            <button
              type="button"
              className="navbar-mobile-menu-toggle"
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev);
                setIsProfileDropdownOpen(false);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <i
                className={
                  isMobileMenuOpen
                    ? "bi bi-x-lg"
                    : "bi bi-list"
                }
              ></i>
            </button>

          </div>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;