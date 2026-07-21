import { Switch } from "@headlessui/react";

const StatusCard = ({ formData, setFormData }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          4
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Status
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Status */}

        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-5">
            Product Status <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={formData.status === "Active"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-5 h-5 accent-blue-600"
              />

              <span className="text-slate-700">
                Active
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={formData.status === "Inactive"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-5 h-5 accent-blue-600"
              />

              <span className="text-slate-700">
                Inactive
              </span>
            </label>
          </div>

          {/* Availability */}

          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mt-10 mb-5">
            Product Availability <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value="Available"
                checked={formData.productAvailability === "Available"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    productAvailability: e.target.value,
                  }))
                }
                className="w-5 h-5 accent-blue-600"
              />

              <span className="text-slate-700">
                Available
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value="Out of Stock"
                checked={
                  formData.productAvailability ===
                  "Out of Stock"
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    productAvailability: e.target.value,
                  }))
                }
                className="w-5 h-5 accent-blue-600"
              />

              <span className="text-slate-700">
                Out of Stock
              </span>
            </label>
          </div>
        </div>

        {/* Featured */}

        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-5">
            Featured Product
          </label>

          <div className="flex items-center gap-4">
            <Switch
              checked={formData.featured}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  featured: value,
                }))
              }
              className={`${
                formData.featured
                  ? "bg-black"
                  : "bg-slate-300"
              } relative inline-flex h-7 w-12 items-center rounded-full transition`}
            >
              <span
                className={`${
                  formData.featured
                    ? "translate-x-6"
                    : "translate-x-1"
                } inline-block h-5 w-5 transform rounded-full bg-white transition`}
              />
            </Switch>

            <span className="text-slate-600">
              Yes, make it featured
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;