import { Check } from "lucide-react";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const fabricOptions = [
  "Silk Blend",
  "Cotton",
  "Velvet",
  "Linen",
  "Rayon",
  "Georgette",
];

const ProductAttributesCard = ({ formData, setFormData }) => {
  const toggleSize = (size) => {
    const alreadySelected = formData.availableSizes.includes(size);

    setFormData((prev) => ({
      ...prev,
      availableSizes: alreadySelected
        ? prev.availableSizes.filter((item) => item !== size)
        : [...prev.availableSizes, size],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          7
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Product Attributes
        </h2>
      </div>

      {/* Sizes */}

      <div>
        <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4">
          Available Sizes <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-wrap gap-5">

          {sizeOptions.map((size) => {
            const checked = formData.availableSizes.includes(size);

            return (
              <label
                key={size}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSize(size)}
                  className="hidden"
                />

                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition
                    ${
                      checked
                        ? "bg-green-100 border-green-400"
                        : "border-slate-300 bg-white"
                    }`}
                >
                  {checked && (
                    <Check
                      size={13}
                      className="text-green-600"
                    />
                  )}
                </div>

                <span className="text-sm text-slate-700">
                  {size}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Color + Fabric */}

      <div className="grid grid-cols-2 gap-5 mt-7">

        {/* Color */}

        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-3">
            Color <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.color}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                color: e.target.value,
              }))
            }
            placeholder="Color"
            className="w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:border-black"
          />
        </div>

        {/* Fabric */}

        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-3">
            Fabric
          </label>

          <select
            value={formData.fabric}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                fabric: e.target.value,
              }))
            }
            className="w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:border-black"
          >
            <option value="">Select Fabric</option>

            {fabricOptions.map((fabric) => (
              <option
                key={fabric}
                value={fabric}
              >
                {fabric}
              </option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
};

export default ProductAttributesCard;