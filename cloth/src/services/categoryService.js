import api from "./api";

/* ==========================================
   GET ALL CATEGORIES
========================================== */

export const getAllCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

/* ==========================================
   GET FEATURED CATEGORIES
========================================== */

export const getFeaturedCategories = async () => {
  const response = await api.get(
    "/categories/featured"
  );

  return response.data;
};

/* ==========================================
   GET CATEGORY BY SLUG
========================================== */

export const getCategoryBySlug = async (
  slug
) => {
  const response = await api.get(
    `/categories/${slug}`
  );

  return response.data;
};