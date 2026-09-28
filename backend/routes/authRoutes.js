const express = require("express");

const {
  register,
  login,
  getProfile,
  googleLogin,
  googleRedirectLogin,
  exchangeGoogleRedirectToken,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================================================
   REGISTER
========================================================= */

router.post("/register", register);

/* =========================================================
   LOGIN
========================================================= */

router.post("/login", login);

/* =========================================================
   EXISTING GOOGLE LOGIN
========================================================= */

router.post("/google", googleLogin);

/* =========================================================
   GOOGLE REDIRECT LOGIN
========================================================= */

/*
 * Google sends the credential using:
 *
 * Content-Type:
 * application/x-www-form-urlencoded
 *
 * Therefore this route explicitly parses
 * URL-encoded request bodies.
 */

router.post(
  "/google/redirect",
  express.urlencoded({ extended: false }),
  googleRedirectLogin
);

/* =========================================================
   GOOGLE REDIRECT HANDOFF EXCHANGE
========================================================= */

/*
 * The frontend calls this endpoint after
 * Google redirects back to Rajanya.
 */

router.post(
  "/google/redirect/exchange",
  exchangeGoogleRedirectToken
);

/* =========================================================
   PROFILE
========================================================= */

router.get(
  "/profile",
  protect,
  getProfile
);

module.exports = router;