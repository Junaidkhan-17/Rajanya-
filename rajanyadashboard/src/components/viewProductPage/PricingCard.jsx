const PricingCard = ({ product }) => {
  const pricing = product?.pricing || [];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          4
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Pricing Information
        </h2>
      </div>

      {pricing.length > 0 ? (
        <div className="space-y-3">
          {pricing.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {/* Days */}
              <div>
                <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
                  No. Of Days
                </p>

                <div className="border border-slate-200 rounded-xl px-4 py-3 min-h-[48px] flex items-center">
                  {item.days}
                </div>
              </div>

              {/* Discount Price */}
              <div>
                <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
                  Discount Price
                </p>

                <div className="border border-slate-200 rounded-xl px-4 py-3 min-h-[48px] flex items-center">
                  ₹{item.discountPrice}
                </div>
              </div>

              {/* Total Price */}
              <div>
                <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
                  Total Price
                </p>

                <div className="border border-slate-200 rounded-xl px-4 py-3 min-h-[48px] flex items-center">
                  ₹{item.totalPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Backend connect hone se pehle sirf layout dikhane ke liye
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
              No. Of Days
            </p>

            <div className="border border-slate-200 rounded-xl h-12"></div>
          </div>

          <div>
            <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
              Discount Price
            </p>

            <div className="border border-slate-200 rounded-xl h-12"></div>
          </div>

          <div>
            <p className="text-xs uppercase font-semibold tracking-widest text-slate-500 mb-2">
              Total Price
            </p>

            <div className="border border-slate-200 rounded-xl h-12"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCard;