const ProductInfoCard = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          1
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Product Information
        </h2>
      </div>

      <div className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Product Name"
            className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Category + Sub Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2">
              Category <span className="text-red-500">*</span>
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Category</option>
              <option value="Men's Wear">Men's Wear</option>
              <option value="Women's Wear">Women's Wear</option>
              <option value="Bridal">Bridal</option>
              <option value="Reception Wear">Reception Wear</option>
              <option value="Party Wear">Party Wear</option>
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2">
              Sub Category
            </label>

            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Sub Category</option>
              <option value="Sherwani">Sherwani</option>
              <option value="Kurta">Kurta</option>
              <option value="Suit">Suit</option>
              <option value="Lehenga">Lehenga</option>
              <option value="Gown">Gown</option>
              <option value="Saree">Saree</option>
            </select>
          </div>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2">
            Brand / Designer
          </label>

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter Brand Name"
            className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;