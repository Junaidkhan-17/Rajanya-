import { Star, Home, Menu } from "lucide-react";

const VCategoryPreview = ({ category }) => {
  if (!category) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        Loading...
      </div>
    );
  }

  const statusClass =
    category.status === "Active"
      ? "bg-green-100 text-green-700"
      : category.status === "Inactive"
      ? "bg-red-100 text-red-600"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
      {/* Heading */}

      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Category Preview
      </h2>

      {/* Category Name + Status */}

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-slate-900">
          {category.categoryName || "-"}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}
        >
          {category.status || "Draft"}
        </span>
      </div>

      {/* Details */}

      <div className="space-y-5">
        {/* Featured */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Star
              size={16}
              className={
                category.featured
                  ? "text-yellow-500 fill-yellow-400"
                  : "text-slate-300"
              }
            />

            <span>Featured Category</span>
          </div>

          <span className="font-semibold text-slate-800 text-sm">
            {category.featured ? "Yes" : "No"}
          </span>
        </div>

        {/* Homepage */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Home
              size={16}
              className={
                category.showOnHomepage
                  ? "text-orange-500"
                  : "text-slate-300"
              }
            />

            <span>Homepage Visible</span>
          </div>

          <span className="font-semibold text-slate-800 text-sm">
            {category.showOnHomepage ? "Yes" : "No"}
          </span>
        </div>

        {/* Navigation */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Menu
              size={16}
              className={
                category.showInNavigation
                  ? "text-blue-500"
                  : "text-slate-300"
              }
            />

            <span>Navigation Enabled</span>
          </div>

          <span className="font-semibold text-slate-800 text-sm">
            {category.showInNavigation ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VCategoryPreview;