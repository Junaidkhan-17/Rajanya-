const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Existing User
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role: "customer",
    });

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    );

    // Remove Password
    const userData = user.toObject();
    delete userData.password;

    // Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
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
      },
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

exports.getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
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
      return res.status(401).json({
        success: false,
        message: "Invalid Google account information",
      });
    }

    if (!email_verified) {
      return res.status(401).json({
        success: false,
        message: "Google email is not verified",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ email: normalizedEmail });
    }

    if (user) {
      if (user.isBlocked) {
        return res.status(403).json({
          success: false,
          message: "Your account has been blocked",
        });
      }

      if (!user.googleId) {
        user.googleId = googleId;
      }

      user.authProvider = "google";

      if (!user.profileImage && picture) {
        user.profileImage = picture;
      }

      if (!user.firstName) {
        user.firstName = given_name || name?.split(" ")[0] || "Google";
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
    } else {
      const randomPassword = crypto.randomBytes(32).toString("hex");

      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        firstName: given_name || name?.split(" ")[0] || "Google",
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

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    );

    const userData = user.toObject();

    delete userData.password;

    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.log("Google Login Error:", error);

    return res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};