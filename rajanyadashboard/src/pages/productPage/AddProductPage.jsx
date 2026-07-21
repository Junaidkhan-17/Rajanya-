import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProductInformation from "../../components/addProductPage/ProductInformation";
import ProductDescription from "../../components/addProductPage/ProductDescription";
import ProductImages from "../../components/addProductPage/ProductImage";
import ProductAttributes from "../../components/addProductPage/ProductAttributes";
import PricingInformation from "../../components/addProductPage/PricingInformation";
import ProductStatus from "../../components/addProductPage/ProductStatus";
import ProductActions from "../../components/addProductPage/ProductActions";

// import api from "../../services/api";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    productCode: "",
    slug: "",
    productName: "",

    category: "",
    subCategory: "",
    brandDesigner: "",

    shortDescription: "",
    fullDescription: "",
    fabricCare: "",

    coverImage: "",
    coverImageFile: null,

    galleryImages: [],
    galleryImageFiles: [],

    featured: false,
    status: "Active",
    productAvailability: "Available",

    stock: 0,
    securityDeposit: 0,

    durationPricing: [
      {
        days: "",
        discountPrice: "",
        totalPrice: "",
      },
    ],

    availableSizes: [],
    color: "",
    fabric: "",
  });

  /*
  API
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.keys(productData).forEach((key) => {
        if (
          key !== "coverImageFile" &&
          key !== "galleryImageFiles"
        ) {
          formData.append(
            key,
            typeof productData[key] === "object"
              ? JSON.stringify(productData[key])
              : productData[key]
          );
        }
      });

      if (productData.coverImageFile) {
        formData.append(
          "coverImage",
          productData.coverImageFile
        );
      }

      productData.galleryImageFiles.forEach((img) => {
        formData.append("galleryImages", img);
      });

      await api.post("/product/add", formData);

    } catch (err) {
      console.log(err);
    }
  };
  */

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <NavLink to="/" className="text-slate-400 hover:text-indigo-600">
              Dashboard
            </NavLink>

            <span className="text-slate-300">›</span>

            <NavLink
              to="/products"
              className="text-slate-400 hover:text-indigo-600"
            >
              Products
            </NavLink>

            <span className="text-slate-300">›</span>

            <span className="font-bold text-black">Add Product</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>

          <p className="text-sm text-slate-500 mt-1">
            Create a new product for your rental collection.
          </p>
        </div>

        <NavLink
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-black rounded-xl hover:bg-slate-50 transition"
        >
          <ArrowLeft size={16} />
          Back to Products
        </NavLink>
      </div>

      {/* Main */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-6 space-y-5">
          <ProductInformation
            productData={productData}
            setProductData={setProductData}
          />

          <ProductImages
            productData={productData}
            setProductData={setProductData}
          />

          <PricingInformation
            productData={productData}
            setProductData={setProductData}
          />
        </div>

        <div className="xl:col-span-6 space-y-5">
          <ProductDescription
            productData={productData}
            setProductData={setProductData}
          />

          <ProductAttributes
            productData={productData}
            setProductData={setProductData}
          />

          <ProductStatus
            productData={productData}
            setProductData={setProductData}
          />
        </div>
      </div>

      <ProductActions
        productData={productData}
        // onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProductPage;
