import { Check } from "lucide-react";

const VCategorySettings = ({ category }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full">
      {/* Heading */}

      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Display Settings
        </h2>
      </div>

      {/* Body */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        {/* Featured */}

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-4">
            Featured Category
          </p>

          <div className="flex items-center gap-2">
            <Check
              size={16}
              className={
                category?.featured ? "text-green-500" : "text-slate-300"
              }
            />

            <span className="font-medium text-slate-700">
              {category?.featured ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Homepage */}

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-4">
            Show On Homepage
          </p>

          <div className="flex items-center gap-2">
            <Check
              size={16}
              className={
                category?.showOnHomepage ? "text-green-500" : "text-slate-300"
              }
            />

            <span className="font-medium text-slate-700">
              {category?.showOnHomepage ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Navigation */}

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-4">
            Show In Navigation Menu
          </p>

          <div className="flex items-center gap-2">
            <Check
              size={16}
              className={
                category?.showInNavigation ? "text-green-500" : "text-slate-300"
              }
            />

            <span className="font-medium text-slate-700">
              {category?.showInNavigation ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCategorySettings;
