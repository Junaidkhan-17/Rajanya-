import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CategoryPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

      <p className="text-sm text-slate-500">
        Page{" "}
        <span className="font-semibold text-black">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-black">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-2">

        {/* Previous */}

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:bg-slate-100 transition"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Numbers */}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-xl text-sm font-medium transition
            ${
              currentPage === page
                ? "bg-black text-white"
                : "border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:bg-slate-100 transition"
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
};

export default CategoryPagination;