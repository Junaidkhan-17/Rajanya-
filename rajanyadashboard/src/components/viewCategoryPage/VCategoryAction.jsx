import { NavLink, useNavigate } from "react-router-dom"; // useNavigate add karo
import { Pencil, Trash2 } from "lucide-react";

const VCategoryAction = ({ category }) => {
  const navigate = useNavigate(); // yahan add karo

  return (
    <div className="flex justify-end gap-4 pt-2">
      {/* Edit Button */}
      <NavLink
        to={`/categories/edit/${category?._id}`}
        className="inline-flex items-center gap-2
        px-6 py-3 rounded-xl
        bg-black text-white
        font-medium text-sm
        hover:bg-slate-800 transition"
      >
        <Pencil size={16} />
        Edit Category
      </NavLink>

      {/* Delete Button */}
      <button
        className="inline-flex items-center gap-2
        px-6 py-3 rounded-xl
        bg-red-500 text-white
        font-medium text-sm
        hover:bg-red-600 transition"
        onClick={() => navigate(`/categories/delete/${category?._id}`)} // sirf yahan change karo
      >
        <Trash2 size={16} />
        Delete Category
      </button>
    </div>
  );
};

export default VCategoryAction;