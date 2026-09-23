const axios = require("axios");
const FormData = require("form-data");

const FITROOM_API_URL = "https://platform.fitroom.app/api/tryon/v2/tasks";

/*
========================================
Create FitRoom Virtual Try-On Task
========================================
*/

exports.createFitRoomTryOnTask = async ({
  modelImage,
  clothImage,
  clothType = "full_set",
  hdMode = false,
}) => {
  try {
    if (!modelImage) {
      throw new Error("Customer model image is required.");
    }

    if (!clothImage) {
      throw new Error("Product clothing image is required.");
    }

    if (!process.env.FITROOM_API_KEY) {
      throw new Error("FITROOM_API_KEY is not configured.");
    }

    const formData = new FormData();

    /*
    ========================================
    Customer Image
    ========================================
    */

    const modelResponse = await axios.get(modelImage, {
      responseType: "arraybuffer",
    });

    formData.append("model_image", Buffer.from(modelResponse.data), {
      filename: "model-image.jpg",
      contentType: modelResponse.headers["content-type"] || "image/jpeg",
    });

    /*
    ========================================
    Product Clothing Image
    ========================================
    */

    const clothResponse = await axios.get(clothImage, {
      responseType: "arraybuffer",
    });

    formData.append("cloth_image", Buffer.from(clothResponse.data), {
      filename: "cloth-image.jpg",
      contentType: clothResponse.headers["content-type"] || "image/jpeg",
    });

    /*
    ========================================
    FitRoom Options
    ========================================
    */

    formData.append("cloth_type", clothType);
    formData.append("hd_mode", String(hdMode));

    /*
    ========================================
    Create FitRoom Task
    ========================================
    */

    const response = await axios.post(FITROOM_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        "X-API-KEY": process.env.FITROOM_API_KEY,
      },

      timeout: 120000,
    });

    return {
      success: true,
      taskId: response.data?.task_id || null,
      data: response.data,
    };
  } catch (error) {
    console.error("========== FITROOM CREATE TASK ERROR ==========");

    console.error(error.response?.data || error.message);

    return {
      success: false,
      taskId: null,
      data: null,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to create FitRoom try-on task.",
    };
  }
};

/*
========================================
Get FitRoom Task Status
========================================
*/

exports.getFitRoomTaskStatus = async (taskId) => {
  try {
    if (!taskId) {
      throw new Error("FitRoom task ID is required.");
    }

    if (!process.env.FITROOM_API_KEY) {
      throw new Error("FITROOM_API_KEY is not configured.");
    }

    const response = await axios.get(`${FITROOM_API_URL}/${taskId}`, {
      headers: {
        "X-API-KEY": process.env.FITROOM_API_KEY,
      },

      timeout: 120000,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("========== FITROOM STATUS ERROR ==========");

    console.error(error.response?.data || error.message);

    return {
      success: false,
      data: null,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to get FitRoom task status.",
    };
  }
};
