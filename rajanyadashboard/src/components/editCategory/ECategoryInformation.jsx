const ECategoryInformation = ({ category, setCategory }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded bg-black text-white flex items-center justify-center text-xs font-bold">
          1
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Category Information
        </h2>
      </div>

      <div className="space-y-5">
        {/* Category Name */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Category Name
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="categoryName"
            value={category?.categoryName || ""}
            onChange={handleChange}
            className="w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:border-black"
          />
        </div>

        {/* Parent + Slug */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Parent Category */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Parent Category
            </label>

            <input
              type="text"
              name="parentCategory"
              value={
                typeof category?.parentCategory === "object"
                  ? category?.parentCategory?.categoryName || ""
                  : category?.parentCategory || ""
              }
              onChange={handleChange}
              className="w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:border-black"
            />

            {/*
              api connect
            */}
          </div>

          {/* Slug */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Category Slug (URL)
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="slug"
              value={category?.slug || ""}
              onChange={handleChange}
              className="w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:border-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECategoryInformation;
