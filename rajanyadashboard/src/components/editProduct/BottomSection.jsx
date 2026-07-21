import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomSection = ({ saving, onSaveDraft, onSaveProduct, onDelete }) => {
  return (
    <div className="flex flex-col gap-4 mt-8 sm:flex-row sm:items-center sm:justify-between">
      <NavLink
        to="/products"
        className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition w-full sm:w-[180px] lg:w-auto"
      >
        <ArrowLeft size={18} />
        Back to Products
      </NavLink>

      <div className="flex flex-col gap-3 sm:flex-row">
        

        <button
          type="button"
           className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border bg-black border-black text-white hover:bg-white hover:text-black font-medium"
          onClick={() => {
            console.log("Save Product Clicked");
            onSaveProduct();
          }}
          disabled={saving}
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Product"}
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 font-medium"
        >
          <Trash2 size={18} />
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default BottomSection;
