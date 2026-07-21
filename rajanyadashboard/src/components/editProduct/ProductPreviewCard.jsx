const ProductPreviewCard = ({ formData }) => {
  const price =
    formData.pricing && formData.pricing.length > 0
      ? formData.pricing[0]
      : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">

      {/* Header */}

      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          5
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Product Preview
        </h2>
      </div>

      {/* Cover Image */}

      <div className="overflow-hidden rounded-2xl border border-slate-200">

        {formData.coverImage ? (
          <img
            src={formData.coverImage}
            alt={formData.productName}
            className="w-100px h-[400px] object-cover"
          />
        ) : (
          <div className="w-full h-[330px] flex items-center justify-center bg-slate-100 text-slate-400">
            No Image
          </div>
        )}

      </div>

      {/* Product Name */}

      <div className="mt-5">

        <h3 className="font-semibold text-slate-800 text-lg">
          {formData.productName || "Product Name"}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {typeof formData.category === "object"
            ? formData.category?.categoryName ||
              formData.category?.name
            : formData.category || "Category"}
        </p>

      </div>

      {/* Price */}

      {price && (

        <div className="mt-5 flex items-center gap-2">

          <span className="text-red-500 line-through text-sm">
            ₹{price.totalPrice}
          </span>

          <span className="text-2xl font-bold text-slate-900">
            ₹{price.discountPrice}
          </span>

          <span className="text-sm text-slate-500">
            / {price.days} Day{price.days > 1 ? "s" : ""}
          </span>

        </div>

      )}

      {/* Status & Availability */}

      <div className="mt-6 border-t border-slate-200 pt-5 space-y-4">

        {/* Status */}

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-500">
            Status
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              formData.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {formData.status || "Active"}
          </span>

        </div>

        {/* Availability */}

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-500">
            Availability
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              formData.productAvailability === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {formData.productAvailability || "Available"}
          </span>

        </div>

      </div>

    </div>
  );
};

export default ProductPreviewCard;