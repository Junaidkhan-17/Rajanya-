import { Package } from "lucide-react";

const EditProductInfo = ({ booking, setBooking }) => {
  const product = booking.product || {};

  const handleChange = (field, value) => {
    setBooking((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      {/* Header */}

      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5 border-b border-slate-100">
        <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
          <Package size={18} className="text-violet-600" />
        </div>

        <h3 className="font-bold uppercase tracking-wide text-xs sm:text-sm text-slate-800">
          Product Information
        </h3>
      </div>

      {/* Body */}

      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5">
        {/* Image */}

        <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 mx-auto sm:mx-0">
          <img
            src={
              product.image ||
              "https://placehold.co/300x450?text=Product"
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}

        <div className="flex-1 grid grid-cols-1 gap-4">
          {/* Product Name - locked, cannot be edited */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Product Name
            </label>

            <input
              type="text"
              value={product.name || ""}
              disabled
              readOnly
              className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 bg-slate-50 text-slate-500 cursor-not-allowed"
            />
          </div>

          {/* Category - locked, cannot be edited */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Category
            </label>

            <select
              value={product.category || ""}
              disabled
              className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 bg-slate-50 text-slate-500 cursor-not-allowed appearance-none"
            >
              <option>Bridal Wear</option>
              <option>Party Wear</option>
              <option>Casual Wear</option>
              <option>Ethnic Wear</option>
            </select>
          </div>

          {/* Size - still editable */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Selected Size
            </label>

            <select
              value={product.size || ""}
              onChange={(e) =>
                handleChange("size", e.target.value)
              }
              className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4"
            >
              <option>XS</option>
              <option>S</option>
              <option>M (Medium)</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductInfo;