import { AlertTriangle, ShieldCheck, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteTryOn = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    // await api.delete(`/virtual-tryon/${id}`);

    alert(`Deleted Request ${id}`);

    navigate("/virtual-tryon");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

        {/* Icon */}

        <div className="flex justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 border border-red-100">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Title */}

        <h2 className="mt-6 text-3xl font-bold text-center text-slate-900">
          Delete Try-On Request?
        </h2>

        {/* Description */}

        <p className="mt-4 text-center text-slate-500 leading-7">
          Are you sure you want to delete this request?
          <br />
          This action cannot be undone and all associated
          <br />
          AI results will be permanently removed from the
          database.
        </p>

        {/* Buttons */}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="h-14 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 h-14 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            <Trash2 size={18} />
            Delete Request
          </button>
        </div>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={14} />
          <span>Admin Authorization Required</span>
        </div>
      </div>
    </div>
  );
};

export default DeleteTryOn;