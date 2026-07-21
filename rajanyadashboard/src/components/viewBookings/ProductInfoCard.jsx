import { ShoppingBag } from "lucide-react";

const ProductInfoCard = ({ booking }) => {
  if (!booking || !booking.product) return null;
  const { product } = booking;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
          <ShoppingBag size={16} className="text-violet-600" />
        </div>

        <h2 className="text-lg font-bold text-slate-800">
          Product Information
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col sm:flex-row gap-5">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-32 rounded-xl object-cover border mx-auto sm:mx-0 shrink-0"
        />

        {/* Details */}
        <div className="flex-1 min-w-0 overflow-x-auto">
          <div className="space-y-3 min-w-[240px]">
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 font-semibold shrink-0">
                Product Name :
              </span>
              <span className="font-medium text-right break-words">
                {product.name}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-slate-500 font-semibold shrink-0">
                Category :
              </span>
              <span className="font-medium text-right break-words">
                {product.category}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-slate-500 font-semibold shrink-0">
                Collection :
              </span>
              <span className="font-medium text-right break-words">
                {product.collection}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-slate-500 font-semibold shrink-0">
                Selected Size :
              </span>
              <span className="font-medium text-right break-words">
                {product.size}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-slate-500 font-semibold shrink-0">
                SKU :
              </span>
              <span className="font-medium text-right break-words">
                {product.sku}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;