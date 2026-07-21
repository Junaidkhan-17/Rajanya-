import {
  ShoppingBag,
  Triangle,
  Star,
  Package,
} from "lucide-react";

export default function ProductStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      
      {/* Card 1 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <ShoppingBag className="text-purple-600" size={24} />
          </div>

          <div>
            <p className="text-slate-400 text-sm">
              Total Products
            </p>

            <h3 className="text-2xl font-bold text-slate-800">
              356
            </h3>

            <p className="text-green-500 text-xs font-semibold">
              +25 This Month
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <Triangle className="text-orange-500" size={24} />
          </div>

          <div>
            <p className="text-slate-400 text-sm">
              Categories Used
            </p>

            <h3 className="text-2xl font-bold text-slate-800">
              12
            </h3>

            <p className="text-orange-500 text-xs font-semibold uppercase">
              Active Categories
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <Star className="text-green-500" size={24} />
          </div>

          <div>
            <p className="text-slate-400 text-sm">
              Featured Products
            </p>

            <h3 className="text-2xl font-bold text-slate-800">
              48
            </h3>

            <p className="text-green-500 text-xs font-semibold">
              +8 This Month
            </p>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <Package className="text-blue-500" size={24} />
          </div>

          <div>
            <p className="text-slate-400 text-sm">
              Active Products
            </p>

            <h3 className="text-2xl font-bold text-slate-800">
              324
            </h3>

            <p className="text-blue-500 text-xs font-semibold">
              91% of Total
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}