import { ShoppingBag } from "lucide-react";

const TryOnProductCard = ({ request }) => {
  if (!request?.product) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
          <ShoppingBag size={20} className="text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Product Information</h2>

          <p className="text-sm text-slate-500">Selected product details</p>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Image */}

        <img
          src={request.product.image}
          alt={request.product.name}
          className="w-24 h-32 rounded-xl object-cover border"
        />

        {/* Details */}

        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs text-slate-500">Product Name</p>

            <p className="font-semibold">{request.product.name}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Category</p>

            <p className="font-medium">{request.product.category}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">Size</p>

              <p className="font-semibold">{request.product.size}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Try-On Price</p>

              <p className="font-semibold">₹{request.product.price}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-500">Request Date</p>

            <p className="font-semibold">{request.requestDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnProductCard;
