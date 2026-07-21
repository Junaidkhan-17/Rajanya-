import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
// import api from "../../utils/api";

import CategoryInformation from "../../components/addCategoryPage/CategoryInformation";
import CategoryImageUpload from "../../components/addCategoryPage/CategoryImageUpload";
import CategoryDescription from "../../components/addCategoryPage/CategoryDescription";
import CategoryStatus from "../../components/addCategoryPage/CategoryStatus";
import CategorySettings from "../../components/addCategoryPage/CategorySettings";
import ImageGuidelines from "../../components/addCategoryPage/ImageGuidelines";
import CategoryActions from "../../components/addCategoryPage/CategoryActions";

const AddCategoryPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryName: "",
    parentCategory: "",
    slug: "",
    gender: "All",

    description: "",

    image: null,

    featured: false,
    showOnHomepage: true,
    showInNavigation: true,

    status: "Draft",

    createdBy: "Admin",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Category Payload =>", formData);

    // await api.post("/categories/add", formData);

    toast.success("Category Added Successfully");
    navigate("/categories");
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div>
          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-sm mb-2">
            <NavLink
              to="/"
              className="text-slate-400 hover:text-blue-500 transition"
            >
              Dashboard
            </NavLink>

            <span className="text-slate-400">›</span>

            <NavLink
              to="/categories"
              className="text-slate-400 hover:text-blue-500 transition"
            >
              Categories
            </NavLink>

            <span className="text-slate-400">›</span>

            <span className="font-semibold text-slate-800">
              Add Category
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Add Category
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Create a new category for products and collections in your
            Virtual Dressing Room.
          </p>
        </div>

        {/* Back */}

        <NavLink
          to="/categories"
          className="inline-flex items-center justify-center gap-2
          h-11 px-5 rounded-xl border border-slate-300
          bg-black text-white text-sm font-medium
          hover:bg-white hover:text-black transition w-full sm:w-fit"
        >
          <ArrowLeft size={18} />
          Back to Categories
        </NavLink>
      </div>

      {/* Row 1 */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <CategoryInformation
          formData={formData}
          handleChange={handleChange}
        />

        <CategoryImageUpload
          formData={formData}
          handleChange={handleChange}
        />
      </div>

      {/* Row 2 */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <div className="h-full">
          <CategoryDescription
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <div className="h-full">
          <CategoryStatus
            formData={formData}
            handleChange={handleChange}
          />
        </div>
      </div>

      {/* Row 3 */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <div className="h-full">
          <CategorySettings
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <div className="h-full">
          <ImageGuidelines />
        </div>
      </div>

      {/* Actions */}

      <CategoryActions
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddCategoryPage;