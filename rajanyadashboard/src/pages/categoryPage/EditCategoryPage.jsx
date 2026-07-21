import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ECategoryInformation from "../../components/editCategory/ECategoryInformation";
import ECategoryImages from "../../components/editCategory/ECategoryImages";
import ECategoryDescription from "../../components/editCategory/ECategoryDescription";
import ECategoryStatus from "../../components/editCategory/ECategoryStatus";
import ECategorySettings from "../../components/editCategory/ECategorySettings";
import ECategoryImageGuide from "../../components/editCategory/ECategoryImageGuide";
import ECategoryActions from "../../components/editCategory/ECategoryActions";

// import api from "../../services/api";

const EditCategoryPage = () => {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  

  /*
  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      const res = await api.get(`/categories/${id}`);
      setCategory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  */

  useEffect(() => {
    setCategory({
      _id: id,

      categoryName: "Sherwani",

      parentCategory: {
        _id: "6855bcd123456789",
        categoryName: "Men's Wear",
      },

      slug: "mens-wear",

      gender: "Men",

      description: "Premium sherwanis, suits, tuxedos and ethnic wear for men.",

      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500",

      featured: true,

      showOnHomepage: true,

      showInNavigation: true,

      status: "Active",

      createdBy: "Admin",

      createdAt: "2026-06-20T10:30:00.000Z",

      updatedAt: "2026-06-28T09:15:00.000Z",
    });
  }, [id]);

  // save draft
  const handleSaveDraft = async () => {
    try {
      /*
      await api.put(`/categories/update/${id}`, {
        ...category,
        status: "Inactive",
      });
      */

      console.log("Draft Saved", {
        ...category,
        status: "Inactive",
      });

      alert("Draft saved successfully");
    } catch (err) {
      console.log(err);
    }
  };

  //save category
  const handleSaveCategory = async () => {
    try {
      /*
      await api.put(`/categories/update/${id}`, {
        ...category,
        status: "Active",
      });
      */

      console.log("Category Updated", {
        ...category,
        status: "Active",
      });

      alert("Category updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  if (!category) return null;

  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <NavLink to="/" className="text-slate-400 hover:text-black">
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

            <span className="font-semibold">Edit Category</span>
          </div>

          <h1 className="text-3xl font-bold">Edit Category</h1>

          <p className="text-slate-500 mt-1">
            Update your category details, images and display settings.
          </p>
        </div>

        <NavLink
          to="/categories"
          className="inline-flex items-center gap-2 px-5 h-11 rounded-xl border border-slate-300 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back to Categories
        </NavLink>
      </div>

      {/* Row 1 */}

      <div className="grid lg:grid-cols-2 gap-5">
        <ECategoryInformation category={category} setCategory={setCategory} />

        <ECategoryImages category={category} setCategory={setCategory} />
      </div>

      {/* Row 2 */}

      <div className="grid lg:grid-cols-2 gap-5">
        <ECategoryDescription category={category} setCategory={setCategory} />

        <ECategoryStatus category={category} setCategory={setCategory} />
      </div>

      {/* Row 3 */}

      <div className="grid lg:grid-cols-2 gap-5">
        <ECategorySettings category={category} setCategory={setCategory} />

        <ECategoryImageGuide />
      </div>

      {/* Actions */}

      <ECategoryActions
        category={category}
        onSaveDraft={handleSaveDraft}
        onSaveCategory={handleSaveCategory}
      />
    </div>
  );
};

export default EditCategoryPage;
