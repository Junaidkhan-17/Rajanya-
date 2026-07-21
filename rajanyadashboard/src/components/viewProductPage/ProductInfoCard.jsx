

const ProductInfoCard = ({ product }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          1
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Product Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-35 gap-y-8">
        <div>
          <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
            Product Name <span className="text-red-500">*</span>
          </p>

          <p className="text-slate-800 font-bold">
            {product?.name}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
            Category <span className="text-red-500">*</span>
          </p>

          <p className="text-slate-800 font-bold">
            {product?.category}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
            Sub Category
          </p>

          <p className="text-slate-800 font-bold">
            {product?.subCategory}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
            Brand / Designer
          </p>

          <p className="text-slate-800 font-bold">
            {product?.brand}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;