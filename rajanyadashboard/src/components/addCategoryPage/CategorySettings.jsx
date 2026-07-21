const DisplaySettings = ({ formData, handleChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-bold">
          5
        </div>

        <h2 className="text-lg font-semibold text-slate-900">
          Display Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Featured */}

        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">
            Featured Category
          </h4>

          <div className="flex gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="featured"
                value="true"
                checked={formData.featured === true}
                onChange={() =>
                  handleChange({
                    target: {
                      name: "featured",
                      value: true,
                      type: "text",
                    },
                  })
                }
              />
              Yes
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="featured"
                value="false"
                checked={formData.featured === false}
                onChange={() =>
                  handleChange({
                    target: {
                      name: "featured",
                      value: false,
                      type: "text",
                    },
                  })
                }
              />
              No
            </label>
          </div>
        </div>

        {/* Homepage */}

        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">
            Show on Homepage
          </h4>

          <div className="flex gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="showHomepage"
                value="true"
                checked={formData.showHomepage === true}
                onChange={() =>
                  handleChange({
                    target: {
                      name: "showHomepage",
                      value: true,
                      type: "text",
                    },
                  })
                }
              />
              Yes
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="showHomepage"
                value="false"
                checked={formData.showHomepage === false}
                onChange={() =>
                  handleChange({
                    target: {
                      name: "showHomepage",
                      value: false,
                      type: "text",
                    },
                  })
                }
              />
              No
            </label>
          </div>
        </div>

        {/* Navigation */}

        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">
            Show in Navigation Menu
          </h4>

          <div className="flex gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="showNavigation"
                value="true"
                checked={formData.showNavigation === true}
                onChange={() =>
                  handleChange({
                    target: {
                      name: "showNavigation",
                      value: true,
                      type: "text",
                    },
                  })
                }
              />
              Yes
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="showNavigation"
                value="false"
                checked={formData.showNavigation === false}
                onChange={() =>
                  handleChange({
                    target: {
                      name: "showNavigation",
                      value: false,
                      type: "text",
                    },
                  })
                }
              />
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;