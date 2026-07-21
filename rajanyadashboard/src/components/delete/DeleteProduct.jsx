import { X, Trash2 } from "lucide-react";

const DeleteProduct = ({
  open,
  onClose,
  onDelete,
  title = "Delete Item?",
  itemName = "",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 transition"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <Trash2 size={28} className="text-red-500" />
        </div>

        {/* Title */}
        <h2 className="mt-5 text-center text-2xl font-bold text-slate-800">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-3 text-center text-sm leading-7 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-800">"{itemName}"</span>?
          This action is permanent and cannot be undone.
        </p>

        {/* Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="h-11 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="h-11 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
