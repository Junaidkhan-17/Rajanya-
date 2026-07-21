import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// import api from "../../services/api";

import VCategoryInformation from "../../components/viewCategoryPage/VCategoryInformation";
import VCategoryPreview from "../../components/viewCategoryPage/VCategoryPreview";
import VCategoryDescription from "../../components/viewCategoryPage/VCategoryDescription";
import VCategoryStatus from "../../components/viewCategoryPage/VCategoryStatus";
import VCategorySettings from "../../components/viewCategoryPage/VCategorySettings";
import VCategoryMetaCard from "../../components/viewCategoryPage/VCategoryMetaCard";
import VCategoryAction from "../../components/viewCategoryPage/VCategoryAction";

const dummyCategories = [
  {
    _id: "1",

    categoryName: "Sherwani",

    parentCategory: {
      _id: "101",
      categoryName: "Men's Wear",
    },

    slug: "mens-wear",

    gender: "Men",

    description:
      "Premium sherwanis, suits, tuxedos and ethnic wear for men.",

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=300",

    featured: true,

    showOnHomepage: true,

    showInNavigation: true,

    status: "Active",

    createdBy: "Admin Rajanya",

    createdAt: "2026-05-20T10:20:00.000Z",

    updatedAt: "2026-08-15T11:15:00.000Z",

    productsCount: 18,
  },

  {
    _id: "2",

    categoryName: "Party Wear",

    parentCategory: {
      _id: "102",
      categoryName: "Women's Wear",
    },

    slug: "party-wear",

    gender: "Women",

    description:
      "Beautiful party wear dresses for every special occasion.",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",

    featured: false,

    showOnHomepage: true,

    showInNavigation: true,

    status: "Inactive",

    createdBy: "Admin Rajanya",

    createdAt: "2026-06-18T09:30:00.000Z",

    updatedAt: "2026-06-18T12:40:00.000Z",

    productsCount: 9,
  },

  {
    _id: "3",

    categoryName: "Casual Shirts",

    parentCategory: {
      _id: "101",
      categoryName: "Men's Wear",
    },

    slug: "casual-shirts",

    gender: "Men",

    description:
      "Comfortable casual shirts for everyday fashion.",

    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1?w=300",

    featured: true,

    showOnHomepage: false,

    showInNavigation: true,

    status: "Draft",

    createdBy: "Admin Rajanya",

    createdAt: "2026-06-16T09:00:00.000Z",

    updatedAt: "2026-07-20T10:00:00.000Z",

    productsCount: 25,
  },
];

const ViewCategoryPage = () => {
  const { id } = useParams();

  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(false);

  // ================= API =================

  /*
  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/categories/${id}`);

      setCategory(res.data.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  */

  // ================= Dummy =================

  useEffect(() => {
    setLoading(true);

    const selectedCategory = dummyCategories.find(
      (item) => item._id === id
    );

    setCategory(selectedCategory || null);

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium">
        Loading...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-20 text-lg font-medium">
        Category Not Found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <NavLink
              to="/"
              className="text-slate-400 hover:text-black"
            >
              Dashboard
            </NavLink>

            <span>›</span>

            <NavLink
              to="/categories"
              className="text-slate-400 hover:text-black"
            >
              Categories
            </NavLink>

            <span>›</span>

            <span className="font-semibold">
              View Category
            </span>
          </div>

          <h1 className="text-3xl font-bold">
            View Category
          </h1>

          <p className="text-slate-500 mt-1">
            View complete details of the selected category.
          </p>
        </div>

        <NavLink
          to="/categories"
          className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-black text-white"
        >
          <ArrowLeft size={18} />
          Back to Categories
        </NavLink>
      </div>

      {/* Row 1 */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VCategoryInformation category={category} />

        <VCategoryPreview category={category} />
      </div>

      {/* Row 2 */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VCategoryDescription category={category} />

        <VCategoryStatus category={category} />
      </div>

      {/* Row 3 */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VCategorySettings category={category} />

        <VCategoryMetaCard category={category} />
      </div>

      {/* Bottom */}

      <VCategoryAction category={category} />
    </div>
  );
};

export default ViewCategoryPage;