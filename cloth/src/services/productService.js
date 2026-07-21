import api from "./api";

/* ==========================================
   GET ALL PRODUCTS
========================================== */

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

/* ==========================================
   GET FEATURED PRODUCTS
========================================== */

export const getFeaturedProducts = async () => {
  const response = await api.get("/products/featured");
  return response.data;
};

/* ==========================================
   GET TRENDING PRODUCTS
========================================== */

export const getTrendingProducts = async () => {
  const response = await api.get("/products/trending");
  return response.data;
};

/* ==========================================
   GET RECOMMENDED PRODUCTS
========================================== */

export const getRecommendedProducts = async () => {
  const response = await api.get("/products/recommended");
  return response.data;
};

/* ==========================================
   GET PRODUCT BY SLUG
========================================== */

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

/* ==========================================
   GET RELATED PRODUCTS
========================================== */

export const getRelatedProducts = async (productId) => {
  const response = await api.get(
    `/products/related/${productId}`
  );

  return response.data;
};