const CategoryInformation = ({ formData, handleChange }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-bold">
          1
        </div>

        <h2 className="text-xl font-semibold text-slate-900">
          Category Information
        </h2>
      </div>

      <div className="space-y-6">

        {/* Category Name */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            placeholder="Enter category name eg. Wedding"
            className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Parent Category + Slug */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Parent Category <span className="text-red-500 font-bold">*</span>
            </label>

            <input
              type="text"
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              placeholder="eg. Men's Wear"
              className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category Slug <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="eg. mens-wear"
              className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default CategoryInformation;