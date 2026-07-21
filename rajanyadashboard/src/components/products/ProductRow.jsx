import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductRow({
  product,
  selectedProducts,
  setSelectedProducts,
  onDeleteClick,
}) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-all duration-200">
      {/* Checkbox */}
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={selectedProducts.includes(product.id)}
          onChange={() => {
            if (selectedProducts.includes(product.id)) {
              setSelectedProducts(
                selectedProducts.filter((id) => id !== product.id),
              );
            } else {
              setSelectedProducts([...selectedProducts, product.id]);
            }
          }}
          className="w-4 h-4 accent-slate-900"
        />
      </td>

      {/* IMAGE */}
      <td className="px-4 py-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </td>

      {/* PRODUCT NAME */}
      <td className="px-4 py-3">
        <div>
          <h3 className="font-medium text-slate-700 text-sm sm:text-base">
            {product.name}
          </h3>

          <p className="text-slate-500 text-sm">{product.subtitle}</p>
        </div>
      </td>

      {/* CATEGORY */}
      <td className="px-4 py-4">
        <span className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-xs font-medium">
          {product.category}
        </span>
      </td>

      {/* PRICE */}
      <td className="px-4 py-4 font-semibold text-slate-700 text-sm sm:text-base">
        {product.price}
      </td>

      {/* SIZES */}
      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-2">
          {product.sizes.split(",").map((size) => (
            <span
              key={size}
              className="px-2 py-0.5 text-xs text-slate-500 bg-slate-100 rounded-md"
            >
              {size.trim()}
            </span>
          ))}
        </div>
      </td>

      {/* STOCK */}
      <td className="px-4 py-4">
        <span
          className={`font-semibold text-sm sm:text-base ${
            product.stock > 15 ? "text-green-600" : "text-orange-500"
          }`}
        >
          {product.stock}
        </span>
      </td>

      {/* STATUS */}
      <td className="px-4 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.status}
        </span>
      </td>

      {/* DATE */}
      <td className="px-4 py-4 text-xs sm:text-sm text-slate-400">
        {product.date}
      </td>

      {/* ACTIONS */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          {/* View */}
          <button
            onClick={() => navigate(`/products/view/${product.id}`)}
            className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 transition"
          >
            <Eye size={18} />
          </button>

          {/* Edit */}
          <button
            onClick={() => navigate(`/products/edit/${product.id}`)}
            className="w-10 h-10 rounded-xl border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition"
          >
            <Pencil size={16} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDeleteClick(product)}
            className="w-10 h-10 rounded-xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
