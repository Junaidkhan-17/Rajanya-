const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "https://rajanya-beryl.vercel.app";

/* =========================================================
   GOOGLE AUTHENTICATION HELPER
========================================================= */

const authenticateGoogleCredential = async (credential) => {
  if (!credential) {
    const error = new Error(
      "Google credential is required"
    );

    error.statusCode = 400;

    throw error;
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const {
    sub: googleId,
    email,
    email_verified,
    given_name,
    family_name,
    name,
    picture,
  } = payload;

  if (!googleId || !email) {
    const error = new Error(
      "Invalid Google account information"
    );

    error.statusCode = 401;

    throw error;
  }

  if (!email_verified) {
    const error = new Error(
      "Google email is not verified"
    );

    error.statusCode = 401;

    throw error;
  }

  const normalizedEmail = email
    .toLowerCase()
    .trim();

  let user = await User.findOne({
    googleId,
  });

  /*
   * If the Google ID does not exist,
   * try matching the existing Rajanya
   * account by email.
   */
  if (!user) {
    user = await User.findOne({
      email: normalizedEmail,
    });
  }

  /* =====================================================
     EXISTING USER
  ===================================================== */

  if (user) {
    if (user.isBlocked) {
      const error = new Error(
        "Your account has been blocked"
      );

      error.statusCode = 403;

      throw error;
    }

    /*
     * Link Google account to existing
     * Rajanya account if required.
     */
    if (!user.googleId) {
      user.googleId = googleId;
    }

    user.authProvider = "google";

    if (!user.profileImage && picture) {
      user.profileImage = picture;
    }

    if (!user.firstName) {
      user.firstName =
        given_name ||
        name?.split(" ")[0] ||
        "Google";
    }

    if (!user.lastName) {
      user.lastName =
        family_name ||
        name?.split(" ").slice(1).join(" ") ||
        "User";
    }

    user.isVerified = true;

    user.lastLogin = new Date();

    await user.save();
  }

  /* =====================================================
     NEW GOOGLE USER
  ===================================================== */

  else {
    const randomPassword =
      crypto.randomBytes(32).toString("hex");

    const hashedPassword =
      await bcrypt.hash(randomPassword, 10);

    user = await User.create({
      firstName:
        given_name ||
        name?.split(" ")[0] ||
        "Google",

      lastName:
        family_name ||
        name?.split(" ").slice(1).join(" ") ||
        "User",

      email: normalizedEmail,

      password: hashedPassword,

      profileImage: picture || "",

      role: "customer",

      isVerified: true,

      authProvider: "google",

      googleId,

      lastLogin: new Date(),
    });
  }

  /* =====================================================
     GENERATE NORMAL RAJANYA JWT
  ===================================================== */

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  const userData = user.toObject();

  delete userData.password;

  return {
    token,
    user: userData,
  };
};

/* =========================================================
   REGISTER
========================================================= */

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields",
      });
    }

    const normalizedEmail = email
      .toLowerCase()
      .trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role: "customer",
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    const userData = user.toObject();

    delete userData.password;

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      token,
      user: userData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   LOGIN
========================================================= */

exports.login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and Password are required",
      });
    }

    const normalizedEmail = email
      .toLowerCase()
      .trim();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    const userData = user.toObject();

    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   GET PROFILE
========================================================= */

exports.getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

/* =========================================================
   EXISTING GOOGLE LOGIN
========================================================= */

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const result =
      await authenticateGoogleCredential(
        credential
      );

    return res.status(200).json({
      success: true,
      message:
        "Google Login Successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.log(
      "Google Login Error:",
      error
    );

    return res.status(
      error.statusCode || 401
    ).json({
      success: false,
      message:
        error.message ||
        "Google authentication failed",
    });
  }
};

/* =========================================================
   GOOGLE REDIRECT LOGIN
========================================================= */

exports.googleRedirectLogin = async (
  req,
  res
) => {
  try {
    const {
      credential,
      g_csrf_token,
    } = req.body;

    /*
     * Google sends the CSRF token:
     *
     * 1. In the request body
     * 2. In the g_csrf_token cookie
     *
     * Both values must match.
     */

    const cookieHeader =
      req.headers.cookie || "";

    let csrfCookie = null;

    const cookies =
      cookieHeader.split(";");

    for (const cookie of cookies) {
      const trimmedCookie =
        cookie.trim();

      if (
        trimmedCookie.startsWith(
          "g_csrf_token="
        )
      ) {
        csrfCookie =
          decodeURIComponent(
            trimmedCookie.substring(
              "g_csrf_token=".length
            )
          );

        break;
      }
    }

    if (
      !g_csrf_token ||
      !csrfCookie ||
      g_csrf_token !== csrfCookie
    ) {
      console.error(
        "Google redirect CSRF validation failed"
      );

      return res.redirect(
        `${FRONTEND_URL}/#google_error=${encodeURIComponent(
          "Google authentication security validation failed."
        )}`
      );
    }

    /*
     * Authenticate the Google credential
     * using the same logic as the existing
     * Google login endpoint.
     */

    const result =
      await authenticateGoogleCredential(
        credential
      );

    /*
     * Create a SHORT-LIVED handoff token.
     *
     * This is NOT the normal Rajanya JWT.
     *
     * It exists only to transfer the successful
     * Google authentication back to the frontend.
     */

    const handoffToken =
      jwt.sign(
        {
          id: result.user._id,
          role: result.user.role,
          type:
            "google_redirect_handoff",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "60s",
        }
      );

    /*
     * Use URL fragment instead of query string.
     *
     * The fragment is not sent back to the
     * backend in subsequent HTTP requests.
     */

    return res.redirect(
      `${FRONTEND_URL}/#google_handoff=${encodeURIComponent(
        handoffToken
      )}`
    );
  } catch (error) {
    console.log(
      "Google Redirect Login Error:",
      error
    );

    return res.redirect(
      `${FRONTEND_URL}/#google_error=${encodeURIComponent(
        error.message ||
          "Google authentication failed."
      )}`
    );
  }
};

/* =========================================================
   GOOGLE REDIRECT HANDOFF EXCHANGE
========================================================= */

exports.exchangeGoogleRedirectToken =
  async (req, res) => {
    try {
      const {
        handoffToken,
      } = req.body;

      if (!handoffToken) {
        return res.status(400).json({
          success: false,
          message:
            "Google authentication handoff is missing",
        });
      }

      const decoded =
        jwt.verify(
          handoffToken,
          process.env.JWT_SECRET
        );

      if (
        decoded.type !==
          "google_redirect_handoff" ||
        !decoded.id
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid Google authentication handoff",
        });
      }

      const user =
        await User.findById(
          decoded.id
        );

      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            "User account no longer exists",
        });
      }

      if (user.isBlocked) {
        return res.status(403).json({
          success: false,
          message:
            "Your account has been blocked",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn:
            process.env.JWT_EXPIRE,
        }
      );

      const userData =
        user.toObject();

      delete userData.password;

      return res.status(200).json({
        success: true,
        message:
          "Google Login Successful",
        token,
        user: userData,
      });
    } catch (error) {
      console.log(
        "Google Handoff Exchange Error:",
        error
      );

      return res.status(401).json({
        success: false,
        message:
          "Google authentication session expired. Please try again.",
      });
    }
  };