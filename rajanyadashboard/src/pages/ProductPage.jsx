import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import AddProductButton from "../components/products/AddProductButton";
import ProductFilters from "../components/products/ProductFilters";
import ProductStats from "../components/products/ProductStats";
import ProductTable from "../components/products/ProductTable";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const initialFilters = {
    category: "",
    size: "",
    priceRange: "",
    status: "",
    selectedDate: null,
  };

  const [filters, setFilters] = useState(initialFilters);
  const searchQuery = searchParams.get("search") || "";
  const filtersWithSearch = { ...filters, search: searchQuery };

  const handleSearchChange = (search) => {
    const nextParams = new URLSearchParams(searchParams);
    if (search) {
      nextParams.set("search", search);
    } else {
      nextParams.delete("search");
    }
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Products Management
          </h1>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-slate-800"
                  : "text-slate-400 hover:text-black transition-colors"
              }
            >
              Dashboard
            </NavLink>

            <span className="text-slate-300">&gt;</span>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-slate-800"
                  : "text-slate-400 hover:text-black transition-colors"
              }
            >
              Products
            </NavLink>
          </div>
        </div>

        <AddProductButton />
      </div>

      {/* Stats */}
      <ProductStats />

      {/* Filters */}
      <ProductFilters
        filters={filtersWithSearch}
        setFilters={setFilters}
        onSearchChange={handleSearchChange}
      />

      {/* Table */}
      <ProductTable
        filters={filtersWithSearch}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
};

export default ProductPage;
