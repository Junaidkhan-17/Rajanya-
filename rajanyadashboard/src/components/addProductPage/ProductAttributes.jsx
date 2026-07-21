const ProductAttributes = ({ productData, setProductData }) => {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Custom"];

  const fabrics = [
    "Silk",
    "Cotton",
    "Georgette",
    "Velvet",
    "Net",
  ];

  const handleSizeChange = (size) => {
    const currentSizes = productData.availableSizes || [];

    if (currentSizes.includes(size)) {
      setProductData((prev) => ({
        ...prev,
        availableSizes: currentSizes.filter((item) => item !== size),
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        availableSizes: [...currentSizes, size],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-4 mb-8">
        <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center text-white text-sm font-semibold">
          5
        </div>

        <h2 className="text-[18px] font-semibold text-slate-800">
          Product Attributes
        </h2>
      </div>

      {/* Sizes */}

      <div className="mb-7">
        <label className="block text-sm uppercase tracking-wider text-slate-500 mb-5">
          Available Sizes <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-wrap items-center gap-8">
          {sizes.map((size) => (
            <label
              key={size}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(productData.availableSizes || []).includes(size)}
                onChange={() => handleSizeChange(size)}
                className="w-5 h-5 rounded border-slate-300 accent-black"
              />

              <span className="text-[15px] text-slate-600">
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Color + Fabric */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color */}

        <div>
          <label className="block text-sm uppercase tracking-wider text-slate-500 mb-2">
            Color
          </label>

          <input
            type="text"
            name="color"
            value={productData.color || ""}
            onChange={handleChange}
            placeholder="Enter color"
            className="w-full h-12 px-5 border border-slate-200 rounded-2xl outline-none focus:border-black"
          />
        </div>

        {/* Fabric */}

        <div>
          <label className="block text-sm uppercase tracking-wider text-slate-500 mb-2">
            Fabric
          </label>

          <select
            name="fabric"
            value={productData.fabric || ""}
            onChange={handleChange}
            className="w-full h-12 px-5 border border-slate-200 rounded-2xl outline-none focus:border-black"
          >
            <option value="">Select Fabric</option>

            {fabrics.map((fabric) => (
              <option key={fabric} value={fabric}>
                {fabric}
              </option>
            ))}
          </select>
        </div>
      </div>

    
    </div>
  );
};

export default ProductAttributes;