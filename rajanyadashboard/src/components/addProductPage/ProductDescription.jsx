const ProductDescription = ({ productData, setProductData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center text-sm font-semibold">
          2
        </div>

        <h2 className="text-xl font-semibold text-slate-800">
          Product Description
        </h2>
      </div>

      <div className="space-y-6">
        {/* Short Description */}

        <div>
          <label className="block text-sm font-semibold tracking-wide text-purple-900 mb-2">
            Short Description <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={4}
            maxLength={200}
            name="shortDescription"
            value={productData.shortDescription || ""}
            onChange={handleChange}
            placeholder="Enter short description (max 200 characters)"
            className="w-full border border-slate-200 rounded-xl p-4 outline-none focus:border-indigo-500 resize-none"
          />

          <p className="text-xs text-slate-400 mt-2">
            {(productData.shortDescription || "").length}/200 Characters
          </p>
        </div>

        {/* Full Description */}

        <div>
          <label className="block text-sm font-semibold tracking-wide text-purple-900 mb-2">
            Full Description <span className="text-red-500">*</span>
          </label>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-5 px-4 py-3 border-b bg-slate-50 text-slate-600">
              <button type="button" className="font-bold">
                B
              </button>

              <button type="button" className="underline">
                U
              </button>

              <button type="button">≡</button>

              <button type="button">☰</button>

              <button type="button">🔗</button>
            </div>

            <textarea
              rows={8}
              name="fullDescription"
              value={productData.fullDescription || ""}
              onChange={handleChange}
              placeholder="Enter detailed description of the product, fabric, work, occasion etc."
              className="w-full p-4 outline-none resize-none"
            />
          </div>
        </div>

        {/* Fabric & Care */}

        <div>
          <label className="block text-sm font-semibold tracking-wide text-purple-900 mb-2">
            Fabric & Care <span className="text-red-500">*</span>
          </label>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-5 px-4 py-3 border-b bg-slate-50 text-slate-600">
              <button type="button" className="font-bold">
                B
              </button>

              <button type="button" className="underline">
                U
              </button>

              <button type="button">≡</button>

              <button type="button">☰</button>

              <button type="button">🔗</button>
            </div>

            <textarea
              rows={6}
              name="fabricCare"
              value={productData.fabricCare || ""}
              onChange={handleChange}
              placeholder="Enter fabric and care instructions"
              className="w-full p-4 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/*
      API
      await api.post("/products/add", productData)
      */}
    </div>
  );
};

export default ProductDescription;