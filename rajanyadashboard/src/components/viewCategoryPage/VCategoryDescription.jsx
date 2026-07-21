const VCategoryDescription = ({ category }) => {
  if (!category) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full">
      {/* Heading */}

      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Category Description
        </h2>
      </div>

      {/* Body */}

      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
          Short Description
        </p>

        <p className="text-[15px] leading-7 text-slate-700 whitespace-pre-line">
          {category.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default VCategoryDescription;