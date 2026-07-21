import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Plus } from "lucide-react";

import CategoryStats from "../components/category/CategoryStats";
import CategoryFilters from "../components/category/CategoryFilters";
import CategoryTable from "../components/category/CategoryTable";
import CategoryPagination from "../components/category/CategoryPagination";


const CategoriesPage = () => {
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalCategories: 11,
    productsAssigned: 180,
    featuredCategories: 5,
    activeCategories: 8,
  });

  const [categories, setCategories] = useState([]);

  //filters
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  //table

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //pagination

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      //api call

      //dummy data
      setCategories([
        {
          _id: "1",
          categoryName: "Ethnic Wear",
          parentCategory: "Women's Wear",
          image: "https://picsum.photos/80?1",
          productsCount: 18,
          featured: true,
          status: "Active",
          createdAt: "2026-06-20",
        },
        {
          _id: "2",
          categoryName: "Party Wear",
          parentCategory: "Women's Wear",
          image: "https://picsum.photos/80?2",
          productsCount: 9,
          featured: false,
          status: "Inactive",
          createdAt: "2026-06-18",
        },
        {
          _id: "3",
          categoryName: "Casual Shirts",
          parentCategory: "Men's Wear",
          image: "https://picsum.photos/80?3",
          productsCount: 25,
          featured: true,
          status: "Active",
          createdAt: "2026-06-16",
        },
        {
          _id: "4",
          categoryName: "Formal Shirts",
          parentCategory: "Men's Wear",
          image: "https://picsum.photos/80?4",
          productsCount: 11,
          featured: false,
          status: "Draft",
          createdAt: "2026-06-12",
        },
        {
          _id: "5",
          categoryName: "Wedding Wear",
          parentCategory: "Women's Wear",
          image: "https://picsum.photos/80?5",
          productsCount: 14,
          featured: true,
          status: "Active",
          createdAt: "2026-06-11",
        },
        {
          _id: "6",
          categoryName: "Kids Wear",
          parentCategory: "Kids Wear",
          image: "https://picsum.photos/80?6",
          productsCount: 10,
          featured: false,
          status: "Active",
          createdAt: "2026-06-10",
        },
        {
          _id: "7",
          categoryName: "Office Wear",
          parentCategory: "Men's Wear",
          image: "https://picsum.photos/80?7",
          productsCount: 8,
          featured: false,
          status: "Inactive",
          createdAt: "2026-06-09",
        },
        {
          _id: "8",
          categoryName: "Designer Sarees",
          parentCategory: "Women's Wear",
          image: "https://picsum.photos/80?8",
          productsCount: 21,
          featured: true,
          status: "Active",
          createdAt: "2026-06-08",
        },
        {
          _id: "9",
          categoryName: "Lehengas",
          parentCategory: "Women's Wear",
          image: "https://picsum.photos/80?9",
          productsCount: 12,
          featured: false,
          status: "Draft",
          createdAt: "2026-06-07",
        },
        {
          _id: "10",
          categoryName: "Blazers",
          parentCategory: "Men's Wear",
          image: "https://picsum.photos/80?10",
          productsCount: 19,
          featured: true,
          status: "Active",
          createdAt: "2026-06-06",
        },
        {
          _id: "11",
          categoryName: "Kurta Sets",
          parentCategory: "Women's Wear",
          image: "https://picsum.photos/80?11",
          productsCount: 13,
          featured: false,
          status: "Active",
          createdAt: "2026-06-05",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, featured, sortBy, status, date]);

  const filteredCategories = useMemo(() => {
    let data = [...categories];

    if (search) {
      data = data.filter((item) =>
        item.categoryName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (featured !== "") {
      data = data.filter((item) => String(item.featured) === featured);
    }

    if (status !== "") {
      data = data.filter((item) => item.status === status);
    }

    if (sortBy) {
      data = data.filter(
        (item) =>
          item.parentCategory?.trim().toLowerCase() ===
          sortBy.trim().toLowerCase(),
      );
    }

    if (date) {
      data = data.filter(
        (item) =>
          new Date(item.createdAt).toDateString() ===
          new Date(date).toDateString(),
      );
    }

    return data;
  }, [categories, search, featured, sortBy, status, date]);

  //pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6 relative">
      {loading && <LoadingOverlay />}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <NavLink to="/" className="text-slate-400 hover:text-black">
              Dashboard
            </NavLink>

            <span className="text-slate-400">›</span>

            <span className="font-semibold text-slate-800">Categories</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Categories Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all fashion categories available in your Virtual Dressing
            Room platform.
          </p>
        </div>

        <NavLink
          to="/categories/add"
          className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-black text-white hover:bg-slate-900 transition w-full sm:w-fit"
        >
          <Plus size={18} />
          Add Category
        </NavLink>
      </div>

      {/* stats */}
      <CategoryStats stats={stats} />

      {/* filters */}
      <CategoryFilters
        search={search}
        setSearch={setSearch}
        featured={featured}
        setFeatured={setFeatured}
        sortBy={sortBy}
        setSortBy={setSortBy}
        date={date}
        setDate={setDate}
        status={status}
        setStatus={setStatus}
      />

      {/* table */}
      <CategoryTable
        categories={currentCategories}
        loading={loading}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onDelete={(category) => {
          setSelectedCategory(category);
        }}
      />

      {/* pagination */}
      <CategoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCategories.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CategoriesPage;
