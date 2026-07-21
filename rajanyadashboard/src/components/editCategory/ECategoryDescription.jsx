const ECategoryDescription = ({ category, setCategory }) => {
  const handleChange = (e) => {
    setCategory((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded bg-black text-white flex items-center justify-center text-xs font-bold">
          3
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Category Description
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Short Description
          <span className="text-red-500">*</span>
        </label>

        <textarea
          name="description"
          rows={4}
          value={category?.description || ""}
          onChange={handleChange}
          placeholder="Enter category description..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none resize-none focus:border-black"
        />

        
      </div>
    </div>
  );
};

export default ECategoryDescription;
