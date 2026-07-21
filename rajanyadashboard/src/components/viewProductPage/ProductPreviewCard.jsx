const ProductPreviewCard = ({ product }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-5 py-4 border-b border-slate-100">
        <h2 className="text-base md:text-lg font-semibold text-slate-800">
          Product Preview
        </h2>
      </div>

      <div className="p-4 md:p-5">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product?.image}
            alt={product?.name}
            className="
              w-full
              max-w-[220px]
              sm:max-w-[250px]
              md:max-w-[280px]
              h-[260px]
              sm:h-[300px]
              md:h-[340px]
              object-cover
              rounded-2xl
            "
          />
        </div>

        {/* Product Details */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-slate-700">
            {product?.name}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {product?.category} • {product?.subCategory}
          </p>

          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {product?.originalPrice && (
              <span className="text-red-400 line-through text-sm">
                ₹{product.originalPrice}
              </span>
            )}

            <span className="text-xl font-semibold text-slate-900">
              ₹{product?.price}
            </span>

            <span className="text-xl font-semibold text-slate-900">
              / {product?.days} Days
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="mt-5 border-t border-slate-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Status
            </span>

            <span
              className={`text-[11px] font-semibold px-3 py-1 rounded-md ${
                product?.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product?.status?.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Availability
            </span>

            <span
              className={`text-[11px] font-semibold px-3 py-1 rounded-md ${
                product?.availability === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product?.availability?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewCard;