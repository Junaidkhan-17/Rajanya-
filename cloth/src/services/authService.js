import api from "./api";

/* =========================================================
   REGISTER
========================================================= */

export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

/* =========================================================
   NORMAL LOGIN
========================================================= */

export const loginUser = async (loginData) => {
  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response.data;
};

/* =========================================================
   EXISTING GOOGLE LOGIN
========================================================= */

export const googleLoginUser = async (credential) => {
  const response = await api.post(
    "/auth/google",
    {
      credential,
    }
  );

  return response.data;
};

/* =========================================================
   GOOGLE REDIRECT HANDOFF EXCHANGE
========================================================= */

export const exchangeGoogleRedirectToken =
  async (handoffToken) => {
    const response = await api.post(
      "/auth/google/redirect/exchange",
      {
        handoffToken,
      }
    );

    return response.data;
  };

/* =========================================================
   GET PROFILE
========================================================= */

export const getProfile = async () => {
  const response = await api.get(
    "/auth/profile"
  );

  return response.data;
};

/* =========================================================
   LOGOUT
========================================================= */

export const logoutUser = () => {
  localStorage.removeItem(
    "rajanya_token"
  );

  localStorage.removeItem(
    "rajanya_user"
  );
};