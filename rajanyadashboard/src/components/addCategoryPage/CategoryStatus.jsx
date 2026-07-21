const CategoryStatus = ({ formData, handleChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 ">
      {/* Heading */}

      <div className="flex items-center gap-3 mb-5">
        <div className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-bold">
          4
        </div>

        <h2 className="text-lg font-semibold text-slate-900">
          Category Status
        </h2>
      </div>

      <p className="text-sm text-slate-500 mb-6">
        Enable or disable this category based on its availability and display
        requirements.
      </p>

      <label className="block text-sm font-medium text-slate-700 mb-3">
        Status <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-10">
        {/* Active */}

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value="Active"
            checked={formData.status === "Active"}
            onChange={handleChange}
            className="accent-green-600"
          />

          <span className="text-sm text-slate-700">Active</span>
        </label>

        {/* Inactive */}

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value="Inactive"
            checked={formData.status === "Inactive"}
            onChange={handleChange}
            className="accent-red-500"
          />

          <span className="text-sm text-slate-700">Inactive</span>
        </label>
      </div>
    </div>
  );
};

export default CategoryStatus;
