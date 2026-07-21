import api from "./api";

/* ==========================================
   REGISTER
========================================== */

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

/* ==========================================
   LOGIN
========================================== */

export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

/* ==========================================
   GET PROFILE
========================================== */

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

/* ==========================================
   LOGOUT
========================================== */

export const logoutUser = () => {
  localStorage.removeItem("rajanya_token");
  localStorage.removeItem("rajanya_user");
};