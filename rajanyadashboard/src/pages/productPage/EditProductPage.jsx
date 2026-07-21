import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// import api from "../../services/api";

import ProductInfoCard from "../../components/editProduct/ProductInfoCard";
import ProductImagesCard from "../../components/editProduct/ProductImagesCard";
import PricingCard from "../../components/editProduct/PricingCard";
import StatusCard from "../../components/editProduct/StatusCard";
import ProductPreviewCard from "../../components/editProduct/ProductPreviewCard";
import ProductDescriptionCard from "../../components/editProduct/ProductDescriptionCard";
import ProductAttributesCard from "../../components/editProduct/ProductAttributesCard";
import BottomSection from "../../components/editProduct/BottomSection";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subCategory: "",
    brandDesigner: "",

    shortDescription: "",
    fullDescription: "",
    fabricCare: "",

    coverImage: "",
    galleryImages: [],

    durationPricing: [],

    status: "Active",
    productAvailability: "Available",
    featured: false,

    stock: 0,

    availableSizes: [],
    color: "",
    fabric: "",
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      /*
      api
      const res = await api.get(`/products/${id}`);
      setFormData(res.data.data);
      */

      console.log("Fetch Product", id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Save Draft
  const handleSaveDraft = async () => {
    try {
      setSaving(true);

      /*
      api
      await api.put(`/products/update/${id}`, {
        ...formData,
        status: "Inactive",
      });
      */

      console.log("Draft Saved", {
        ...formData,
        status: "Inactive",
      });

      alert("Product saved as draft");
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  // Save Product
  const handleSaveProduct = async () => {
    try {
      setSaving(true);

      /*
      api
      await api.put(`/products/update/${id}`, {
        ...formData,
        status: "Active",
      });
      */

      console.log("Product Updated", {
        ...formData,
        status: "Active",
      });

      alert("Product updated successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  // Delete Product
  const handleDelete = async () => {
    try {
      if (!window.confirm("Delete this product?")) return;

      /*
      api
      await api.delete(`/products/delete/${id}`);
      */

      console.log("Delete Product", id);

      alert("Product deleted successfully");

      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-slate-500 text-lg">
        Loading Product...
      </div>
    );
  }
    return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
            <NavLink to="/" className="text-slate-400 hover:text-black">
              Dashboard
            </NavLink>

            <span>›</span>

            <NavLink
              to="/products"
              className="text-slate-400 hover:text-black"
            >
              Products
            </NavLink>

            <span>›</span>

            <span className="font-semibold text-black">
              Edit Product
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            Edit Product
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Update your product information.
          </p>
        </div>

        <NavLink
          to="/products"
          className="inline-flex items-center justify-center gap-2 border border-black rounded-xl px-5 py-3 bg-white w-fit"
        >
          <ArrowLeft size={18} />
          Back to Products
        </NavLink>
      </div>

      {/* Main */}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Left */}

        <div className="xl:col-span-8 space-y-6">
          <ProductInfoCard
            formData={formData}
            setFormData={setFormData}
          />

          <ProductImagesCard
            formData={formData}
            setFormData={setFormData}
          />

          <PricingCard
            formData={formData}
            setFormData={setFormData}
          />

          <StatusCard
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        {/* Right */}

        <div className="xl:col-span-4 space-y-6">
          <ProductPreviewCard
            formData={formData}
          />

          <ProductDescriptionCard
            formData={formData}
            setFormData={setFormData}
          />

          <ProductAttributesCard
            formData={formData}
            setFormData={setFormData}
          />
        </div>

      </div>

      {/* Bottom */}

      <BottomSection
        saving={saving}
        onSaveDraft={handleSaveDraft}
        onSaveProduct={handleSaveProduct}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EditProductPage;