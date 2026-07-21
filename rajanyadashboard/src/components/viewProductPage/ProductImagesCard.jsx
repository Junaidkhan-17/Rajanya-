const ProductImagesCard = ({ product }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}{" "}
      <div className="flex items-center gap-3 mb-6">
        {" "}
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          3{" "}
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Product Images</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Cover Image */}
        <div>
          <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-4">
            Cover Image <span className="text-red-500">*</span>
          </p>

          <div className="w-full max-w-[260px]">
            <img
              src={product?.coverImage}
              alt={product?.name}
              className="
            w-full
            h-[280px]
            object-cover
            rounded-xl
            border border-slate-200
          "
            />
          </div>
        </div>

        {/* Gallery Images */}
        <div>
          <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-4">
            Gallery Images <span className="text-red-500">*</span>
          </p>

          <div className="flex flex-wrap gap-4">
            {product?.galleryImages?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                className="
              w-[62px]
              h-[90px]
              md:w-[72px]
              md:h-[100px]
              object-cover
              rounded-lg
              border border-slate-200
            "
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCard;
