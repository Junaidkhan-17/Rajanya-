import { Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ECategoryActions = ({
  onSaveDraft,
  onSaveCategory,
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      {/* Cancel */}
      <button
        type="button"
        onClick={handleCancel}
        className="
          flex items-center gap-2
          px-6 h-11
          border border-slate-300
          rounded-xl
          text-slate-700
          font-medium
          hover:bg-slate-50
          transition
        "
      >
        <X size={16} />
        Cancel
      </button>

      {/* Right Buttons */}
      <div className="flex gap-3">
        {/* Save Draft */}
        <button
          type="button"
          onClick={onSaveDraft}
          className="
            px-6 h-11
            border border-slate-300
            rounded-xl
            bg-white
            text-slate-700
            font-medium
            hover:bg-slate-50
            transition
          "
        >
          Save Draft
        </button>

        {/* Update Category */}
        <button
          type="button"
          onClick={onSaveCategory}
          className="
            flex items-center gap-2
            px-6 h-11
            bg-black
            text-white
            rounded-xl
            font-medium
            hover:bg-slate-800
            transition
          "
        >
          <Save size={16} />
          Update Category
        </button>
      </div>
    </div>
  );
};

export default ECategoryActions;