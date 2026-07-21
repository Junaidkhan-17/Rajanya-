import { Plus, Trash2 } from "lucide-react";

const PricingInformation = ({ productData, setProductData }) => {
  const pricingRows = productData.durationPricing || [];

  const addRow = () => {
    setProductData((prev) => ({
      ...prev,
      durationPricing: [
        ...(prev.durationPricing || []),
        {
          days: "",
          discountPrice: "",
          totalPrice: "",
        },
      ],
    }));
  };

  const deleteRow = (index) => {
    const updated = [...pricingRows];
    updated.splice(index, 1);

    setProductData((prev) => ({
      ...prev,
      durationPricing:
        updated.length > 0
          ? updated
          : [
              {
                days: "",
                discountPrice: "",
                totalPrice: "",
              },
            ],
    }));
  };

  const handleChange = (index, field, value) => {
    const updated = [...pricingRows];

    updated[index][field] = value;

    setProductData((prev) => ({
      ...prev,
      durationPricing: updated,
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
            4
          </div>

          <h2 className="text-lg font-semibold text-slate-800">
            Pricing Information
          </h2>
        </div>

        <button
          type="button"
          onClick={addRow}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition"
        >
          <Plus size={14} />
          Add Duration Price
        </button>
      </div>

      {/* Pricing Rows */}

      <div className="space-y-4">
        {pricingRows.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          >
            {/* Days */}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                No. Of Days
              </label>

              <input
                type="number"
                value={row.days}
                onChange={(e) =>
                  handleChange(index, "days", e.target.value)
                }
                placeholder="3"
                className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none focus:border-black"
              />
            </div>

            {/* Discount */}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Discount Price
              </label>

              <input
                type="number"
                value={row.discountPrice}
                onChange={(e) =>
                  handleChange(
                    index,
                    "discountPrice",
                    e.target.value
                  )
                }
                placeholder="4495"
                className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none focus:border-black"
              />
            </div>

            {/* Total */}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Total Price
              </label>

              <input
                type="number"
                value={row.totalPrice}
                onChange={(e) =>
                  handleChange(
                    index,
                    "totalPrice",
                    e.target.value
                  )
                }
                placeholder="8454"
                className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none focus:border-black"
              />
            </div>

            {/* Delete */}

            <button
              type="button"
              onClick={() => deleteRow(index)}
              className="h-12 w-12 border border-red-200 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

   
    </div>
  );
};

export default PricingInformation;