import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationPayment = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-5 border-t bg-white">
      <p className="text-sm text-slate-600 font-medium">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:bg-slate-100 transition"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`w-12 h-12 rounded-xl font-semibold transition ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:bg-slate-100 transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PaginationPayment;