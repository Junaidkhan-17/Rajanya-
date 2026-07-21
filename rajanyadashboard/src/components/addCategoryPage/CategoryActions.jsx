import { Save, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const CategoryActions = ({ handleSubmit }) => {
  return (
    <div className=" border-slate-200 rounded-2xl shp-5">
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
        {/* Cancel */}
        <NavLink
          to="/categories"
          className="w-full sm:w-auto h-11 px-6 rounded-xl
          border border-slate-300 bg-red-500 text-white
          flex items-center justify-center gap-2
          hover:bg-white hover:text-red-500 transition"
        >
          <X size={18} />
          Cancel
        </NavLink>

        {/* Save Draft */}
        <button
          type="button"
          className="w-full sm:w-auto h-11 px-6 rounded-xl
          border border-black
          text-black
          flex items-center justify-center gap-2
          hover:bg-slate-100 transition"
        >
          <Save size={18} />
          Save Draft
        </button>

        {/* Save Category */}
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full sm:w-auto h-11 px-6 rounded-xl
          bg-black text-white
          flex items-center justify-center gap-2
          hover:bg-slate-900 transition"
        >
          <Save size={18} />
          Save Category
        </button>
      </div>
    </div>
  );
};

export default CategoryActions;
