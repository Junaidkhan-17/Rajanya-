import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import TryOnTable from "../components/virtualTryOn/TryOnTable";
import TryStatsOn from "./../components/virtualTryOn/TryStatsOn";

const VirtualTryOnPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    month: "",
    status: "",
    sort: "latest",
  });

  const handleDeleteSelected = () => {
    console.log("Delete Selected");
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Virtual Try-On Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all AI try-on requests, review results and customer details.
          </p>
        </div>

        <NavLink
          to="/categories"
          className="inline-flex items-center justify-center gap-2 border border-slate-300 rounded-xl px-5 py-3 bg-white hover:bg-slate-50 w-fit"
        >
          <ArrowLeft size={18} />
          Back to Categories
        </NavLink>
      </div>

      {/* Stats */}

      <TryStatsOn />

      {/* Filters */}

      {/* Table */}

      <TryOnTable filters={filters} />
    </div>
  );
};

export default VirtualTryOnPage;
