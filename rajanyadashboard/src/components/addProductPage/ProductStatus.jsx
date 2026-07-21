import React from "react";

const ProductStatus = ({ productData, setProductData }) => {
  const handleChange = (field, value) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          6
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Status
        </h2>
      </div>

      <div className="space-y-6">
        {/* Product Status + Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
              Product Status <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={productData.status === "Active"}
                  onChange={() => handleChange("status", "Active")}
                  className="accent-blue-600"
                />
                Active
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={productData.status === "Inactive"}
                  onChange={() => handleChange("status", "Inactive")}
                  className="accent-blue-600"
                />
                Inactive
              </label>
            </div>
          </div>

          {/* Featured */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
              Featured Product
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  handleChange("featured", !productData.featured)
                }
                className={`relative w-12 h-6 rounded-full transition ${
                  productData.featured ? "bg-black" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    productData.featured ? "left-7" : "left-1"
                  }`}
                />
              </button>

              <span className="text-sm text-slate-500">
                Yes, make it featured
              </span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Product Availability <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="availability"
                checked={productData.productAvailability === "Available"}
                onChange={() =>
                  handleChange("productAvailability", "Available")
                }
                className="accent-blue-600"
              />
              Available
            </label>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="availability"
                checked={productData.productAvailability === "Out of Stock"}
                onChange={() =>
                  handleChange("productAvailability", "Out of Stock")
                }
                className="accent-blue-600"
              />
              Out of Stock
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStatus;