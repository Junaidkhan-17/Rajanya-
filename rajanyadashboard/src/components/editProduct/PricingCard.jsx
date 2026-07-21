import { Plus, Trash2 } from "lucide-react";

const PricingCard = ({ formData, setFormData }) => {
  const pricing = formData.durationPricing || [];

  const handleChange = (index, field, value) => {
    const updated = [...pricing];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      durationPricing: updated,
    }));
  };

  const addPricing = () => {
    setFormData((prev) => ({
      ...prev,
      durationPricing: [
        ...pricing,
        {
          days: "",
          discountPrice: "",
          totalPrice: "",
        },
      ],
    }));
  };

  const removePricing = (index) => {
    const updated = pricing.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      durationPricing: updated,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
            3
          </div>

          <h2 className="text-lg font-semibold text-slate-800">
            Pricing Information
          </h2>
        </div>

        <button
          type="button"
          onClick={addPricing}
          className="w-full sm:w-auto h-11 px-5 rounded-xl bg-black text-white text-sm font-medium hover:bg-slate-900 transition"
        >
          + Add Duration Price
        </button>
      </div>
      {/* Heading */}

      <div className="grid grid-cols-[170px_1fr_1fr_60px] gap-5 mb-4">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          No. Of Day's
        </p>

        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Discount Price
        </p>

        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Total Price
        </p>
      </div>

      {/* Rows */}

      <div className="space-y-3">
        {pricing.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[170px_1fr_1fr_60px] gap-5 items-center"
          >
            {/* Days */}

            <input
              type="number"
              value={item.days}
              onChange={(e) => handleChange(index, "days", e.target.value)}
              placeholder="1 Days"
              className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-black"
            />

            {/* Discount */}

            <input
              type="number"
              value={item.discountPrice}
              onChange={(e) =>
                handleChange(index, "discountPrice", e.target.value)
              }
              placeholder="₹ 3455"
              className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-black"
            />

            {/* Total */}

            <input
              type="number"
              value={item.totalPrice}
              onChange={(e) =>
                handleChange(index, "totalPrice", e.target.value)
              }
              placeholder="₹ 5454"
              className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-black"
            />

            {/* Delete */}

            <button
              type="button"
              onClick={() => removePricing(index)}
              className="w-12 h-12 border border-red-300 rounded-xl flex items-center justify-center hover:bg-red-50 transition"
            >
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        ))}

        {pricing.length === 0 && (
          <div className="text-center py-10 text-slate-400 border-2 border-dashed rounded-xl">
            No Pricing Added
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
