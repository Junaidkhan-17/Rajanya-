const VCategoryInformation = ({ category }) => {
  if (!category) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
      <div className="flex items-start gap-4">
        {/* Category Image */}

        <img
          src={
            category.image ||
            "https://via.placeholder.com/100x100?text=Category"
          }
          alt={category.categoryName}
          className="w-16 h-16 rounded-full object-cover border border-slate-200"
        />

        <div className="flex-1">
          {/* Heading */}

          <h2 className="text-xl font-semibold text-slate-900">
            Category Information
          </h2>

          {/* Details */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Category Name */}

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Category Name
              </p>

              <p className="mt-2 font-semibold text-slate-800">
                {category.categoryName || "-"}
              </p>
            </div>

            {/* Slug */}

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Category Slug
              </p>

              <p className="mt-2 font-semibold text-slate-800">
                {category.slug || "-"}
              </p>
            </div>

            {/* Parent Category */}

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Parent Category
              </p>

              <p className="mt-2 font-semibold text-slate-800">
                {category.parentCategory?.categoryName || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCategoryInformation;