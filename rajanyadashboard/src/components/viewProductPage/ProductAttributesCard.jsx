import { Check } from "lucide-react";

const ProductAttributesCard = ({ product }) => {
  const sizes = product?.sizes || [];
  const color = product?.color || "";
  const fabric = product?.fabric || "";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          5
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Product Attributes
        </h2>
      </div>

      {/* Available Sizes */}
      <div className="mb-8">
        <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-4">
          Available Sizes <span className="text-red-500">*</span>
        </p>

        {sizes.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {sizes.map((size, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-green-50 flex items-center justify-center">
                  <Check size={13} className="text-green-600 stroke-[3]" />
                </div>

                <span className="text-sm font-medium text-slate-600">
                  {size}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-slate-200 rounded-xl h-12"></div>
        )}
      </div>

      {/* Color & Fabric */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-8">
        {/* Color */}
        <div>
          <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-3">
            Color <span className="text-red-500">*</span>
          </p>

          {color ? (
            <p className="text-xl font-bold text-slate-700">{color}</p>
          ) : (
            <div className="border border-slate-200 rounded-xl h-12"></div>
          )}
        </div>

        {/* Fabric */}
        <div>
          <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-3">
            Fabric
          </p>

          {fabric ? (
            <p className="text-xl font-bold text-slate-700">{fabric}</p>
          ) : (
            <div className="border border-slate-200 rounded-xl h-12"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAttributesCard;