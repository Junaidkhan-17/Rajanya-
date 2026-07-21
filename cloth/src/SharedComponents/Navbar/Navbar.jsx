import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AUTH_ACTIONS } from "../../contexts/AuthContext";
import "./Navbar.css";
import { useProductLiveData } from "../../contexts/ProductLiveDataContext";
import rajanyalogo from "../../assets/rajanyalogo.png";


const Navbar = () => {
  const navbarRef = useRef(null);
  const { state, dispatch, getUserInitials } = useAuth();

  const { state: productState } = useProductLiveData();

  const wishlistCount = productState.wishlist.length;

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
          {/* Logo */}

          <div className="main-navbar-logo">
            <img src={rajanyalogo} className="logo" alt="company-logo" />
          </div>

          {/* Search */}

          <div className="main-navbar-search">
            <input type="text" placeholder="Search" />

            <button type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>

          {/* Navigation */}

          <ul className="main-navbar-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/collection">
                All Product
                {/*<i className="bi bi-chevron-down ms-2"></i>*/}
              </NavLink>
            </li>

            <li>
              <NavLink to="/womens-wear">Women's Wear</NavLink>
            </li>

            <li>
              <NavLink to="/mens-wear">Men's Wear</NavLink>
            </li>

            <li>
              <NavLink to="/Contact-Us">Contact Us</NavLink>
            </li>
          </ul>

          {/* Action Icons */}

          <div className="main-navbar-actions">
            <button type="button" className="navbar-profile-button">
              {state.isAuthenticated ? (
                <span className="navbar-user-initials">
                  {getUserInitials()}
                </span>
              ) : (
                <i className="bi bi-person-circle"></i>
              )}
            </button>

            <NavLink
  to="/wishlist"
  className="navbar-wishlist-btn"
>
  <i className="bi bi-heart"></i>

  {wishlistCount > 0 && (
    <span className="navbar-wishlist-badge">
      {wishlistCount}
    </span>
  )}
</NavLink>

            <button type="button">
              <i className="bi bi-shuffle"></i>
            </button>
            {/*
            <button
              onClick={() =>
                dispatch({
                  type: AUTH_ACTIONS.OPEN_CREATE_ACCOUNT_MODAL,
                })
              }
            >
              Open Create Account
            </button>
            */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
