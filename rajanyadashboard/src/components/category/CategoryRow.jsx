import { Eye, Pencil, Trash2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryRow = ({ category, index, selectedRows, setSelectedRows }) => {
  const navigate = useNavigate();

  const data = {
    _id: category?._id || String(index + 1),

    image:
      category?.image ||
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200",

    categoryName: category?.categoryName || "Ethnic Wear",

    parentCategory: category?.parentCategory || "Women's Fashion",

    productsCount: category?.productsCount ?? 32,

    featured: category?.featured ?? true,

    status: category?.status || "Active",

    createdAt: category?.createdAt || "2026-06-24",
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
      {/* Checkbox */}
      <td className="px-5 py-5 text-center">
        <input
          type="checkbox"
          checked={selectedRows.includes(data._id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, data._id]);
            } else {
              setSelectedRows(selectedRows.filter((item) => item !== data._id));
            }
          }}
        />
      </td>

      {/* Serial */}
      <td className="px-4 py-5 text-center text-sm font-medium text-slate-500">
        {index + 1}
      </td>

      {/* Image */}
      <td className="px-4 py-5">
        <img
          src={data.image}
          alt={data.categoryName}
          className="w-14 h-14 rounded-xl object-cover border border-slate-200"
        />
      </td>

      {/* Category */}
      <td className="px-4 py-5">
        <h3 className="font-semibold text-slate-800">{data.categoryName}</h3>

        <p className="text-sm text-slate-400 mt-1">{data.parentCategory}</p>
      </td>

      {/* Products */}
      <td className="px-4 py-5 text-center">
        <span className="font-semibold text-slate-700">
          {data.productsCount}
        </span>
      </td>

      {/* Featured */}
      <td className="px-4 py-5 text-center">
        <div className="flex items-center justify-center gap-2">
          <Star
            size={16}
            fill={data.featured ? "#FACC15" : "none"}
            className={data.featured ? "text-yellow-400" : "text-slate-300"}
          />

          <span className="text-sm text-slate-600">
            {data.featured ? "Yes" : "No"}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-5 text-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
          ${
            data.status === "Active"
              ? "bg-green-100 text-green-700"
              : data.status === "Inactive"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {data.status}
        </span>
      </td>

      {/* Date */}
      <td className="px-4 py-5 text-center text-sm text-slate-500">
        {new Date(data.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className="px-4 py-5">
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => navigate(`/categories/view/${data._id}`)}
            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition"
          >
            <Eye size={16} className="text-blue-600" />
          </button>

          <button
            onClick={() => navigate(`/categories/edit/${data._id}`)}
            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
          >
            <Pencil size={16} className="text-slate-700" />
          </button>

          <button
            onClick={() => navigate(`/categories/delete/${data._id}`)}
            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-red-50 transition"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;
