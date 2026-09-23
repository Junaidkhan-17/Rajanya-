/*
========================================
Virtual Try-On Service
========================================

Genlook integration has been removed.

A new Virtual Try-On provider will be
integrated separately.
========================================
*/

exports.generateVirtualTryOnImage = async () => {
  return {
    success: false,
    generatedImage: null,
    message:
      "Virtual Try-On provider is currently unavailable.",
  };
};