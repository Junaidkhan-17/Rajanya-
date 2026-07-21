const CategoryDescription = ({ formData, handleChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-bold">
          3
        </div>

        <h2 className="text-lg font-semibold text-slate-900">
          Category Description
        </h2>
      </div>

      {/* Description */}

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Short Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={1}
          placeholder="Write a short description (max 160 Characters) "
          className="w-full rounded-xl border border-slate-200 px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>
    </div>
  );
};

export default CategoryDescription;
